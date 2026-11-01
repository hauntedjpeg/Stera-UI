import type {
  CollectionSummary,
  SandboxToUi,
  StoredPrefs,
  UiToSandbox,
} from "./shared/messages.js"
import { DEFAULT_PREFS } from "./shared/messages.js"
import type { ScaleEntry } from "./core/scale/bi-modal.js"
import { hexToRgb } from "./core/color/hex.js"
import {
  DEFAULT_COLLECTION_NAME,
  flatVariableName,
  hasLegacyStepNames,
  listRampGroups,
  rampVariableName,
} from "./core/naming/variable-names.js"

// Not per file: the color and backgrounds are the user's working state, which
// they carry from file to file.
const PREFS_KEY = "stera-ui-colors:prefs"

function isAlias(value: VariableValue | undefined): boolean {
  return (
    value != null &&
    typeof value === "object" &&
    "type" in value &&
    value.type === "VARIABLE_ALIAS"
  )
}

async function listCollections(): Promise<CollectionSummary[]> {
  const collections = await figma.variables.getLocalVariableCollectionsAsync()
  const variables = await figma.variables.getLocalVariablesAsync("COLOR")
  return collections
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((c) => {
      const modeIds = c.modes.map((m) => m.modeId)
      const groups = listRampGroups(
        variables
          .filter((v) => v.variableCollectionId === c.id)
          .map((v) => ({
            name: v.name,
            isAlias: modeIds.some((id) => isAlias(v.valuesByMode[id])),
          }))
      )
      return { id: c.id, name: c.name, groups }
    })
}

async function resolveCollection(
  collectionId?: string
): Promise<VariableCollection> {
  if (collectionId) {
    const found =
      await figma.variables.getVariableCollectionByIdAsync(collectionId)
    if (found) return found
  }
  const collections = await figma.variables.getLocalVariableCollectionsAsync()
  return (
    collections.find((c) => c.name === DEFAULT_COLLECTION_NAME) ??
    figma.variables.createVariableCollection(DEFAULT_COLLECTION_NAME)
  )
}

async function collectionVariables(
  collection: VariableCollection
): Promise<Map<string, Variable>> {
  const all = await figma.variables.getLocalVariablesAsync("COLOR")
  const byName = new Map<string, Variable>()
  for (const v of all) {
    if (v.variableCollectionId === collection.id) byName.set(v.name, v)
  }
  return byName
}

/**
 * Upsert `byName[name]`, or adopt the variable at `legacyName` by renaming it.
 * The map is mutated so later steps see renames and creations.
 */
function resolveVariable(
  byName: Map<string, Variable>,
  collection: VariableCollection,
  name: string,
  legacyName?: string
): Variable {
  const found = byName.get(name)
  if (found) return found

  const legacy = legacyName ? byName.get(legacyName) : undefined
  if (legacyName && legacy) {
    legacy.name = name
    byName.delete(legacyName)
    byName.set(name, legacy)
    return legacy
  }

  const created = figma.variables.createVariable(name, collection, "COLOR")
  byName.set(name, created)
  return created
}

/**
 * Write the scale as `Name/Light/N` and `Name/Dark/N`. Modes are never added
 * or changed: light/dark lives in the names, so every existing mode gets the
 * same value. Only the light variant may claim a pre-subgroup `Name/N`
 * variable; dark is always create-or-update.
 */
function writeScale(
  byName: Map<string, Variable>,
  collection: VariableCollection,
  colorName: string,
  scale: ScaleEntry[]
): void {
  const modeIds = collection.modes.map((m) => m.modeId)
  for (const entry of scale) {
    const light = resolveVariable(
      byName,
      collection,
      rampVariableName(colorName, "Light", entry.step),
      flatVariableName(colorName, entry.step)
    )
    const dark = resolveVariable(
      byName,
      collection,
      rampVariableName(colorName, "Dark", entry.step)
    )
    for (const modeId of modeIds) {
      light.setValueForMode(modeId, hexToRgb(entry.light))
      dark.setValueForMode(modeId, hexToRgb(entry.dark))
    }
  }
}

async function loadPrefs(): Promise<StoredPrefs> {
  const raw = await figma.clientStorage.getAsync(PREFS_KEY)
  if (!raw || typeof raw !== "object") return { ...DEFAULT_PREFS }
  // Keep only current keys, so options a newer build dropped don't linger
  // in storage and get written back on every save.
  const stored = raw as Partial<StoredPrefs>
  return {
    hex: stored.hex ?? DEFAULT_PREFS.hex,
    scaleType: stored.scaleType ?? DEFAULT_PREFS.scaleType,
    lightBackground: stored.lightBackground ?? DEFAULT_PREFS.lightBackground,
    darkBackground: stored.darkBackground ?? DEFAULT_PREFS.darkBackground,
    mode: stored.mode ?? DEFAULT_PREFS.mode,
  }
}

function post(message: SandboxToUi): void {
  figma.ui.postMessage(message)
}

figma.showUI(__html__, { width: 480, height: 480, themeColors: true })

figma.ui.onmessage = async (msg: UiToSandbox) => {
  try {
    if (msg.type === "load") {
      const [collections, prefs] = await Promise.all([
        listCollections(),
        loadPrefs(),
      ])
      post({ type: "loaded", collections, prefs })
      return
    }
    if (msg.type === "save-prefs") {
      await figma.clientStorage.setAsync(PREFS_KEY, msg.prefs)
      return
    }
    if (msg.type === "write-variables") {
      const collection = await resolveCollection(msg.collectionId)
      const byName = await collectionVariables(collection)
      if (
        msg.collectionId &&
        hasLegacyStepNames(Array.from(byName.keys()), msg.colorName)
      ) {
        post({ type: "legacy-naming", collectionName: collection.name })
        return
      }
      writeScale(byName, collection, msg.colorName, msg.scale)
      figma.notify(
        `Added ${msg.scale.length * 2} "${msg.colorName}" color variables`
      )
      // A write can create the collection and new groups, so send fresh
      // pickers rather than waiting for a reopen.
      post({ type: "variables-written", collections: await listCollections() })
      return
    }
  } catch (err) {
    post({
      type: "error",
      message: err instanceof Error ? err.message : String(err),
    })
  }
}
