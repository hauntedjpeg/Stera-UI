import type {
  RawVariable,
  RawVariableCollection,
  RawVariableValue,
  RawVariablesPayload,
  SerializedCollection,
  SerializedTextStyle,
  SerializedValue,
  SerializedVariable,
  StoredPrefs,
  SandboxToUi,
  UiToSandbox,
} from "./shared/messages.js"
import { DEFAULT_PREFS } from "./shared/messages.js"

const PREFS_KEY_PREFIX = "stera-ui-bridge:prefs:"

function serializeValue(raw: VariableValue): SerializedValue {
  if (typeof raw === "number") return { kind: "number", value: raw }
  if (typeof raw === "string") return { kind: "string", value: raw }
  if (typeof raw === "boolean") return { kind: "boolean", value: raw }
  if (
    raw &&
    typeof raw === "object" &&
    "type" in raw &&
    (raw as VariableAlias).type === "VARIABLE_ALIAS"
  ) {
    return { kind: "alias", targetId: (raw as VariableAlias).id }
  }
  if (
    raw &&
    typeof raw === "object" &&
    "r" in raw &&
    "g" in raw &&
    "b" in raw
  ) {
    const c = raw as RGB | RGBA
    return {
      kind: "color",
      r: c.r,
      g: c.g,
      b: c.b,
      a: "a" in c ? c.a : 1,
    }
  }
  return { kind: "string", value: String(raw) }
}

function rawValue(raw: VariableValue): RawVariableValue {
  if (typeof raw === "number") return raw
  if (typeof raw === "string") return raw
  if (typeof raw === "boolean") return raw
  if (
    raw &&
    typeof raw === "object" &&
    "type" in raw &&
    (raw as VariableAlias).type === "VARIABLE_ALIAS"
  ) {
    return { type: "VARIABLE_ALIAS", id: (raw as VariableAlias).id }
  }
  if (
    raw &&
    typeof raw === "object" &&
    "r" in raw &&
    "g" in raw &&
    "b" in raw
  ) {
    const c = raw as RGB | RGBA
    return {
      r: c.r,
      g: c.g,
      b: c.b,
      a: "a" in c ? c.a : 1,
    }
  }
  return String(raw)
}

async function extractRawVariables(): Promise<RawVariablesPayload> {
  const collections = await figma.variables.getLocalVariableCollectionsAsync()
  const variables: Record<string, RawVariable> = {}
  const variableCollections: Record<string, RawVariableCollection> = {}

  for (const col of collections) {
    variableCollections[col.id] = {
      id: col.id,
      name: col.name,
      key: col.key,
      modes: col.modes.map((m) => ({ modeId: m.modeId, name: m.name })),
      defaultModeId: col.defaultModeId,
      remote: col.remote,
      hiddenFromPublishing: col.hiddenFromPublishing,
      variableIds: [...col.variableIds],
    }

    for (const varId of col.variableIds) {
      const v = await figma.variables.getVariableByIdAsync(varId)
      if (!v) continue
      const valuesByMode: Record<string, RawVariableValue> = {}
      for (const modeId of Object.keys(v.valuesByMode)) {
        valuesByMode[modeId] = rawValue(v.valuesByMode[modeId])
      }
      variables[v.id] = {
        id: v.id,
        name: v.name,
        key: v.key,
        variableCollectionId: v.variableCollectionId,
        resolvedType: v.resolvedType,
        valuesByMode,
        remote: v.remote,
        description: v.description,
        hiddenFromPublishing: v.hiddenFromPublishing,
        scopes: [...v.scopes],
        codeSyntax: { ...v.codeSyntax },
      }
    }
  }

  return {
    status: 200,
    error: false,
    meta: { variables, variableCollections },
  }
}

async function extractDoc(): Promise<SerializedCollection[]> {
  const collections = await figma.variables.getLocalVariableCollectionsAsync()
  const out: SerializedCollection[] = []

  for (const col of collections) {
    const variables: SerializedVariable[] = []
    for (const varId of col.variableIds) {
      const v = await figma.variables.getVariableByIdAsync(varId)
      if (!v) continue
      if (
        v.resolvedType !== "COLOR" &&
        v.resolvedType !== "FLOAT" &&
        v.resolvedType !== "STRING" &&
        v.resolvedType !== "BOOLEAN"
      ) {
        continue
      }
      const valuesByMode: Record<string, SerializedValue> = {}
      for (const modeId of Object.keys(v.valuesByMode)) {
        valuesByMode[modeId] = serializeValue(v.valuesByMode[modeId])
      }
      variables.push({
        id: v.id,
        name: v.name,
        type: v.resolvedType,
        valuesByMode,
      })
    }

    out.push({
      id: col.id,
      name: col.name,
      modes: col.modes.map((m) => ({ id: m.modeId, name: m.name })),
      variables,
    })
  }

  return out
}

const BOUND_TEXT_FIELDS = [
  "fontFamily",
  "fontStyle",
  "fontWeight",
  "fontSize",
  "lineHeight",
  "letterSpacing",
] as const

function boundVariableIds(
  style: TextStyle
): SerializedTextStyle["boundVariables"] {
  const bound = style.boundVariables ?? {}
  const out: SerializedTextStyle["boundVariables"] = {}
  for (const field of BOUND_TEXT_FIELDS) {
    const alias = (bound as Record<string, VariableAlias | undefined>)[field]
    if (alias && alias.id) out[field] = alias.id
  }
  return out
}

async function extractTextStyles(): Promise<SerializedTextStyle[]> {
  const styles = await figma.getLocalTextStylesAsync()
  return styles.map((s) => ({
    id: s.id,
    name: s.name,
    fontFamily: s.fontName.family,
    fontStyle: s.fontName.style,
    fontSize: s.fontSize,
    lineHeight:
      s.lineHeight.unit === "AUTO"
        ? { unit: "AUTO" as const }
        : { unit: s.lineHeight.unit, value: s.lineHeight.value },
    letterSpacing: {
      unit: s.letterSpacing.unit,
      value: s.letterSpacing.value,
    },
    boundVariables: boundVariableIds(s),
  }))
}

function prefsKey(): string {
  const fileKey = figma.fileKey ?? "unknown-file"
  return `${PREFS_KEY_PREFIX}${fileKey}`
}

async function loadPrefs(): Promise<StoredPrefs> {
  const raw = await figma.clientStorage.getAsync(prefsKey())
  if (!raw) return { ...DEFAULT_PREFS }
  try {
    return { ...DEFAULT_PREFS, ...(raw as Partial<StoredPrefs>) }
  } catch {
    return { ...DEFAULT_PREFS }
  }
}

async function savePrefs(prefs: StoredPrefs): Promise<void> {
  await figma.clientStorage.setAsync(prefsKey(), prefs)
}

function post(message: SandboxToUi): void {
  figma.ui.postMessage(message)
}

figma.showUI(__html__, { width: 440, height: 620, themeColors: true })

figma.ui.onmessage = async (msg: UiToSandbox) => {
  try {
    if (msg.type === "load-variables") {
      const [collections, textStyles, raw, prefs] = await Promise.all([
        extractDoc(),
        extractTextStyles(),
        extractRawVariables(),
        loadPrefs(),
      ])
      post({
        type: "variables-loaded",
        doc: { collections, textStyles },
        raw,
        prefs,
        fileName: figma.root.name,
      })
      return
    }
    if (msg.type === "save-prefs") {
      await savePrefs(msg.prefs)
      post({ type: "prefs-saved" })
      return
    }
    if (msg.type === "close") {
      figma.closePlugin()
      return
    }
  } catch (err) {
    post({
      type: "error",
      message: err instanceof Error ? err.message : String(err),
    })
  }
}
