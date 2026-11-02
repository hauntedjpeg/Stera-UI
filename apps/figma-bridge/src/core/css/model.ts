import type {
  SerializedCollection,
  SerializedTextStyle,
  SerializedValue,
  SerializedVariable,
  FontStrategy,
  UnitChoice,
} from "../../shared/messages.js"
import { rgbaToOklchCss } from "../color/oklch.js"
import { toKebabName } from "../naming/kebab.js"
import {
  emitFontDeclarations,
  fontsourceImports,
  type FontAssignment,
} from "../fonts/strategy.js"
import { STERA_UTILITIES } from "./utilities.js"
import {
  buildUtilities,
  findUnresolvedReferences,
  TAILWIND_THEME_VARS,
} from "./text-styles.js"
import { isWeightHead, weightFromStyleName } from "./weights.js"

export type GenerateOptions = {
  collections: SerializedCollection[]
  textStyles?: SerializedTextStyle[]
  strategy: FontStrategy
  /** Unit for every non-weight number: font sizes, spacing and radius. */
  unit: UnitChoice
  prefix?: string
  fontAssignments: FontAssignment[]
}

const COLOR_PRIMITIVE_COLLECTION = "Color"
const SEMANTIC_COLOR_COLLECTION = "Theme"
const TYPOGRAPHY_COLLECTION = "Typography"
const INCLUDED_COLLECTIONS = new Set([
  COLOR_PRIMITIVE_COLLECTION,
  SEMANTIC_COLOR_COLLECTION,
  TYPOGRAPHY_COLLECTION,
])
const STRIP_FIRST_SEGMENT = new Set([TYPOGRAPHY_COLLECTION])
const REFERENCE_COLLECTION = /^Reference\b/i
// Top-level groups that only matter inside Figma, per collection.
const IGNORED_GROUPS: Record<string, RegExp> = {
  [SEMANTIC_COLOR_COLLECTION]: /^utilities$/i,
}
const LIGHT_RAMP_SEGMENT = /^light$/i
const DARK_RAMP_SEGMENT = /^dark$/i
const TYPO_CATEGORY_SEGMENTS = new Set([
  "size",
  "weight",
  "line-height",
  "letter-spacing",
  "font",
])
type NumberUnit = "rem" | "px" | "unitless"
type NameMap = Map<string, string>
export type Decl = { name: string; head: string; value: string }

/**
 * The parsed, sorted, framework-agnostic shape of an export, rendered into the
 * Stera-UI partials by `generatePartials`.
 *
 * Light/dark lives entirely in the semantic layer: `colorRamps` holds every
 * primitive exactly once (the Figma `Color` collection is mode-less), and
 * `semanticLight` / `semanticDark` alias into them per mode. That is what makes
 * a token like `Text/Onbrand` — which points at the same primitive in both
 * modes — round-trip losslessly, since no ramp is ever redeclared under `.dark`.
 */
export type CssModel = {
  imports: string[]
  colorRamps: Decl[]
  typography: Decl[]
  semanticLight: Decl[]
  semanticDark: Decl[]
  utilitiesCss: string
}

export type BuildModelResult = {
  model: CssModel | null
  warnings: string[]
  errors: string[]
}

function rewriteTypographyHead(head: string, collectionName: string): string {
  if (head === "weight") return "font-weight"
  if (head.startsWith("weight-")) return `font-${head}`
  if (collectionName !== TYPOGRAPHY_COLLECTION) return head
  if (head === "font" || head.startsWith("font-")) return head
  if (head === "letter-spacing" || head.startsWith("letter-spacing-"))
    return head
  if (head === "line-height" || head.startsWith("line-height-")) return head
  if (head === "size") return "font-size"
  if (head.startsWith("size-")) return `font-${head}`
  if (/^(body|heading|display|hero)(-|$)/.test(head)) return `font-size-${head}`
  return `line-height-${head}`
}

function normalizeName(
  rawPath: string,
  collectionName: string,
  prefix: string | undefined
): string {
  let path = rawPath.replace(/\/-$/, "")
  if (collectionName === COLOR_PRIMITIVE_COLLECTION) {
    // Ramps are grouped `Family/Light/N` and `Family/Dark/N`. The light ramp is
    // the unqualified one downstream code has always referenced, so its segment
    // is dropped (`Neutral/Light/25` -> `--neutral-25`) while dark keeps its own
    // namespace (`Neutral/Dark/25` -> `--neutral-dark-25`). Only a non-leading
    // segment is stripped, so a family literally named `Light` survives.
    path = path
      .split("/")
      .filter((seg, i) => i === 0 || !LIGHT_RAMP_SEGMENT.test(seg.trim()))
      .join("/")
  }
  if (STRIP_FIRST_SEGMENT.has(collectionName)) {
    const segments = path.split("/")
    const firstSeg = (segments[0] ?? "")
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
    const firstIsCategory =
      collectionName === TYPOGRAPHY_COLLECTION &&
      TYPO_CATEGORY_SEGMENTS.has(firstSeg)
    if (!firstIsCategory) {
      path = segments.slice(1).join("/")
    }
  }
  const head = toKebabName(path || rawPath, undefined).replace(/^--/, "")
  const rewritten = rewriteTypographyHead(head, collectionName)
  return prefix ? `--${prefix}-${rewritten}` : `--${rewritten}`
}

/**
 * The collections that map 1:1 to code. Everything else in the file — the
 * `Reference*` collections and any Figma-only ones — is ignored, both by the
 * generator and by the UI that lists what will be exported. Figma-only groups
 * inside an exported collection (`Theme: Utilities/…`) are dropped here too, so
 * they are treated exactly like a variable in an ignored collection.
 */
export function selectExportedCollections(
  collections: SerializedCollection[]
): SerializedCollection[] {
  return collections
    .filter(
      (c) =>
        !REFERENCE_COLLECTION.test(c.name) && INCLUDED_COLLECTIONS.has(c.name)
    )
    .map((c) => {
      const ignored = IGNORED_GROUPS[c.name]
      if (!ignored) return c
      return {
        ...c,
        variables: c.variables.filter((v) => {
          const segments = v.name.split("/")
          return segments.length < 2 || !ignored.test(segments[0].trim())
        }),
      }
    })
}

type VariableIndex = Map<
  string,
  { v: SerializedVariable; c: SerializedCollection }
>

/** Every variable in the file by id, ignored collections included. */
function indexVariables(collections: SerializedCollection[]): VariableIndex {
  return new Map(
    collections.flatMap((c) =>
      c.variables.map((v) => [v.id, { v, c }] as const)
    )
  )
}

function buildNameMap(
  collections: SerializedCollection[],
  prefix: string | undefined
): NameMap {
  const map: NameMap = new Map()
  for (const c of collections) {
    for (const v of c.variables) {
      map.set(v.id, normalizeName(v.name, c.name, prefix))
    }
  }
  return map
}

/**
 * CSS names that more than one Figma variable maps to, each with its sources
 * labelled `Collection: Path`. Dropping the `Light` ramp segment makes this easy
 * to hit: `Color: Alpha/Light/1` and `Theme: Alpha/1` both become `--alpha-1`,
 * and the alias between them then renders as `--alpha-1: var(--alpha-1)`.
 */
function findNameCollisions(
  collections: SerializedCollection[],
  nameMap: NameMap
): Array<{ name: string; sources: string[] }> {
  const sourcesByName = new Map<string, string[]>()
  for (const c of collections) {
    for (const v of c.variables) {
      const name = nameMap.get(v.id)
      if (!name) continue
      const sources = sourcesByName.get(name) ?? []
      sources.push(`${c.name}: ${v.name}`)
      sourcesByName.set(name, sources)
    }
  }
  return Array.from(sourcesByName, ([name, sources]) => ({
    name,
    sources,
  })).filter((entry) => entry.sources.length > 1)
}

const FONT_FAMILY_HEAD = /^font(-|$)/
const DEFAULT_FONT_ASSIGNMENTS: FontAssignment[] = [
  { role: "--font-sans", family: "Zalando Sans" },
  { role: "--font-mono", family: "Geist Mono" },
  { role: "--font-heading", family: "Zalando Sans SemiExpanded" },
]

/**
 * The font-family variables to route through the font strategy. Only STRING
 * variables in the Typography collection whose exported name is `--font` or
 * `--font-*` count, and each one's role *is* that exported name — the same name
 * its `:root` decl and every text-style utility bound to it use — so two
 * variables can never collapse onto one role. A file with no such variables
 * gets the defaults Stera-UI ships with. Text-type weights (`--font-weight-*`)
 * also match the pattern, so they are skipped explicitly.
 */
export function deriveFontAssignments(
  collections: SerializedCollection[],
  prefix: string | undefined
): FontAssignment[] {
  const typo = collections.find(
    (c) =>
      c.name === TYPOGRAPHY_COLLECTION && !REFERENCE_COLLECTION.test(c.name)
  )
  const byId = indexVariables(collections)

  const assignments: FontAssignment[] = []
  for (const v of typo?.variables ?? []) {
    if (v.type !== "STRING") continue
    const role = normalizeName(v.name, TYPOGRAPHY_COLLECTION, prefix)
    const head = headFromName(role, prefix)
    if (isWeightHead(head) || !FONT_FAMILY_HEAD.test(head)) continue

    // Follow aliases (e.g. into a Reference collection) to the literal family.
    let value: SerializedValue | undefined = v.valuesByMode[typo!.modes[0].id]
    for (let hops = 0; value?.kind === "alias" && hops < 10; hops++) {
      const target = byId.get(value.targetId)
      value = target?.v.valuesByMode[target.c.modes[0].id]
    }
    if (value?.kind !== "string") continue
    // Figma values are often written CSS-style, e.g. `'Geist'`.
    const family = value.value
      .trim()
      .replace(/^(['"])(.*)\1$/, "$2")
      .trim()
    if (family) assignments.push({ role, family })
  }
  return assignments.length > 0 ? assignments : DEFAULT_FONT_ASSIGNMENTS
}

function findColorPrimitiveCollection(
  collections: SerializedCollection[]
): SerializedCollection | undefined {
  return collections.find((c) => c.name === COLOR_PRIMITIVE_COLLECTION)
}

function findSemanticColorCollection(
  collections: SerializedCollection[]
): SerializedCollection | undefined {
  return collections.find((c) => c.name === SEMANTIC_COLOR_COLLECTION)
}

function findTypographyCollection(
  collections: SerializedCollection[]
): SerializedCollection | undefined {
  return collections.find((c) => c.name === TYPOGRAPHY_COLLECTION)
}

function detectDarkModeId(
  collection: SerializedCollection
): string | undefined {
  return collection.modes.find((m) => /dark/i.test(m.name))?.id
}

function detectLightModeId(
  collection: SerializedCollection,
  darkModeId: string | undefined
): string {
  const light = collection.modes.find((m) => /light|default/i.test(m.name))
  if (light) return light.id
  const notDark = collection.modes.find((m) => m.id !== darkModeId)
  return (notDark ?? collection.modes[0]).id
}

function renderValue(
  value: SerializedValue,
  nameMap: NameMap,
  unit: NumberUnit,
  unresolved: { count: number },
  byId: VariableIndex,
  modeName: string
): string {
  switch (value.kind) {
    case "color":
      return rgbaToOklchCss(value)
    case "number": {
      if (unit === "unitless")
        return `${Math.round(value.value * 10000) / 10000}`
      if (unit === "px") return `${Math.round(value.value * 10000) / 10000}px`
      const rounded = Math.round((value.value / 16) * 10000) / 10000
      return `${rounded}rem`
    }
    case "string":
      // Only weights are unitless. A text weight variable holds a style name
      // ("SemiBold"), which CSS needs as a number.
      if (unit === "unitless")
        return String(weightFromStyleName(value.value) ?? value.value)
      return value.value
    case "boolean":
      return String(value.value)
    case "alias": {
      // An alias into an ignored collection has no custom property to point at,
      // so follow it to the first exported variable or, failing that, inline
      // the literal. The target is read in the mode named like the source's
      // (Theme's `Dark` reads the target's `Dark`), else its first mode.
      let current: SerializedValue = value
      for (let hops = 0; current.kind === "alias" && hops < 10; hops++) {
        const targetName = nameMap.get(current.targetId)
        if (targetName) return `var(${targetName})`
        const target = byId.get(current.targetId)
        if (!target) break
        const mode =
          target.c.modes.find(
            (m) => m.name.toLowerCase() === modeName.toLowerCase()
          ) ?? target.c.modes[0]
        const next = mode ? target.v.valuesByMode[mode.id] : undefined
        if (!next) break
        current = next
      }
      if (current.kind === "alias") {
        unresolved.count += 1
        return "/* unresolved alias */"
      }
      return renderValue(current, nameMap, unit, unresolved, byId, modeName)
    }
  }
}

function headFromName(name: string, prefix: string | undefined): string {
  const noDash = name.replace(/^--/, "")
  if (prefix && noDash.startsWith(`${prefix}-`))
    return noDash.slice(prefix.length + 1)
  return noDash
}

function resolveNumberUnit(
  head: string,
  collectionUnit: UnitChoice
): NumberUnit {
  if (isWeightHead(head)) return "unitless"
  return collectionUnit
}

function collectionDecls(
  collection: SerializedCollection,
  modeId: string,
  nameMap: NameMap,
  prefix: string | undefined,
  unit: UnitChoice,
  unresolved: { count: number },
  byId: VariableIndex
): Decl[] {
  const decls: Decl[] = []
  const modeName = collection.modes.find((m) => m.id === modeId)?.name ?? ""
  for (const v of collection.variables) {
    const name = nameMap.get(v.id)
    if (!name) continue
    const head = headFromName(name, prefix)
    const value = v.valuesByMode[modeId]
    if (!value) continue
    const effectiveUnit = resolveNumberUnit(head, unit)
    decls.push({
      name,
      head,
      value: renderValue(
        value,
        nameMap,
        effectiveUnit,
        unresolved,
        byId,
        modeName
      ),
    })
  }
  return decls
}

function semanticGroupKey(head: string): number {
  if (head === "surface" || head.startsWith("surface-")) return 0
  if (head === "ink" || head.startsWith("ink-")) return 1
  if (head === "text" || head.startsWith("text-")) return 1
  if (head === "border" || head.startsWith("border-")) return 2
  if (head === "ring" || head.startsWith("ring-")) return 3
  if (head.startsWith("chart-")) return 4
  return Number.POSITIVE_INFINITY
}

function primitiveGroupKey(head: string): number {
  if (isWeightHead(head)) return 1
  if (head === "font-size" || head.startsWith("font-size-")) return 3
  // Every other --font-* is a family role, custom ones like --font-display too.
  if (FONT_FAMILY_HEAD.test(head)) return 0
  if (head === "letter-spacing" || head.startsWith("letter-spacing-")) return 2
  if (head === "line-height" || head.startsWith("line-height-")) return 4
  return 5
}

function colorPrimitiveGroupKey(head: string): number {
  const order = [
    "neutral",
    "brand",
    "accent",
    "danger",
    "success",
    "warning",
    "black",
    "white",
    "bw",
  ]
  // Composite key: family first, then light before dark. Without the second
  // term the two ramps of a family would interleave according to whatever order
  // Figma happened to return.
  const dark = head.includes("-dark-") || head.endsWith("-dark") ? 1 : 0
  for (let i = 0; i < order.length; i += 1) {
    if (head === order[i] || head.startsWith(`${order[i]}-`))
      return i * 2 + dark
  }
  return order.length * 2 + dark
}

function stableSortBy<T>(arr: T[], key: (x: T) => number): T[] {
  return arr
    .map((item, index) => ({ item, index }))
    .sort((a, b) => {
      const ka = key(a.item)
      const kb = key(b.item)
      if (ka !== kb) return ka - kb
      return a.index - b.index
    })
    .map((x) => x.item)
}

export function formatDecls(decls: Decl[], indent: string): string {
  return decls.map((d) => `${indent}${d.name}: ${d.value};`).join("\n")
}

export function buildThemeInline(themeDecls: Decl[]): string | null {
  if (themeDecls.length === 0) return null
  const lines = themeDecls.map((d) => `  --color-${d.head}: var(${d.name});`)
  return `@theme inline {\n${lines.join("\n")}\n}`
}

export function buildModel(options: GenerateOptions): BuildModelResult {
  const warnings: string[] = []
  const errors: string[] = []

  const {
    collections,
    textStyles = [],
    strategy,
    unit,
    prefix,
    fontAssignments,
  } = options

  if (collections.length === 0) {
    errors.push("This file has no variable collections.")
    return { model: null, warnings, errors }
  }

  const scoped = selectExportedCollections(collections)
  if (scoped.length === 0) {
    errors.push(
      `None of this file's collections are named ${Array.from(INCLUDED_COLLECTIONS).join(", ")}.`
    )
    return { model: null, warnings, errors }
  }

  const colorCollection = findColorPrimitiveCollection(scoped)
  if (!colorCollection) {
    errors.push(
      `Missing a "${COLOR_PRIMITIVE_COLLECTION}" collection of primitive ramps.`
    )
    return { model: null, warnings, errors }
  }

  // Light/dark is a property of the semantic layer now, so the Theme collection
  // is the one that has to carry the two modes — and without it there is nothing
  // to put under `.dark` at all.
  const themeCollection = findSemanticColorCollection(scoped)
  if (!themeCollection) {
    errors.push(`Missing a "${SEMANTIC_COLOR_COLLECTION}" collection.`)
    return { model: null, warnings, errors }
  }

  const darkModeId = detectDarkModeId(themeCollection)
  if (!darkModeId) {
    errors.push(`The "${themeCollection.name}" collection has no Dark mode.`)
    return { model: null, warnings, errors }
  }
  const lightModeId = detectLightModeId(themeCollection, darkModeId)

  const typoCollection = findTypographyCollection(scoped)

  // Both of these mean the file still has the old structure, where the ramps
  // themselves switched per mode. Warn rather than fail: the export is still
  // usable, it just will not theme.
  if (colorCollection.modes.length > 1) {
    warnings.push(
      `Color collection "${colorCollection.name}" has ${colorCollection.modes.length} modes; only "${colorCollection.modes[0].name}" was read. Primitive ramps are expected to be mode-less now, with Light and Dark as name segments.`
    )
  }
  if (
    !colorCollection.variables.some((v) =>
      v.name
        .split("/")
        .some((seg, i) => i > 0 && DARK_RAMP_SEGMENT.test(seg.trim()))
    )
  ) {
    warnings.push(
      `No Dark ramps found in the Color collection. Dark-mode semantic tokens will resolve to light values. Group each ramp as "Family/Light/N" and "Family/Dark/N".`
    )
  }

  const nameMap = buildNameMap(scoped, prefix)

  const collisions = findNameCollisions(scoped, nameMap)
  if (collisions.length > 0) {
    const list = collisions
      .map((c) => `${c.name} (${c.sources.join(", ")})`)
      .join(", ")
    warnings.push(
      `${collisions.length} CSS variable name${collisions.length === 1 ? " is" : "s are"} produced by more than one Figma variable, so the later declaration overrides the earlier one and an alias between them becomes a self-reference: ${list}. Rename one side in Figma so each name is unique.`
    )
  }

  const unresolved = { count: 0 }
  const byId = indexVariables(collections)

  const colorRampDecls = collectionDecls(
    colorCollection,
    colorCollection.modes[0].id,
    nameMap,
    prefix,
    unit,
    unresolved,
    byId
  )
  const typoDecls = typoCollection
    ? collectionDecls(
        typoCollection,
        typoCollection.modes[0].id,
        nameMap,
        prefix,
        unit,
        unresolved,
        byId
      )
    : []
  const semanticLightDecls = collectionDecls(
    themeCollection,
    lightModeId,
    nameMap,
    prefix,
    unit,
    unresolved,
    byId
  )
  const semanticDarkDecls = collectionDecls(
    themeCollection,
    darkModeId,
    nameMap,
    prefix,
    unit,
    unresolved,
    byId
  )

  // Figma only applies a text weight variable whose value is a style name, so
  // a numeric string ("550") is flagged too, though it would be valid CSS.
  const invalidWeights = (typoCollection?.variables ?? []).filter((v) => {
    const name = nameMap.get(v.id)
    const value = v.valuesByMode[typoCollection!.modes[0].id]
    return (
      name !== undefined &&
      isWeightHead(headFromName(name, prefix)) &&
      value?.kind === "string" &&
      weightFromStyleName(value.value) === null
    )
  })
  if (invalidWeights.length > 0) {
    const list = invalidWeights.map((v) => `"${v.name}"`).join(", ")
    warnings.push(
      `${invalidWeights.length} text weight variable${invalidWeights.length === 1 ? " is" : "s are"} not a weight style name: ${list}. Figma only applies names like "Regular" or "SemiBold", and the export emitted the value as-is.`
    )
  }

  // `collectionDecls` drops a variable that has no value in the requested mode,
  // which would otherwise silently leave a token stuck on its light value.
  const darkNames = new Set(semanticDarkDecls.map((d) => d.name))
  const missingInDark = semanticLightDecls
    .filter((d) => !darkNames.has(d.name))
    .map((d) => d.name)
  if (missingInDark.length > 0) {
    warnings.push(
      `${missingInDark.length} semantic token${missingInDark.length === 1 ? " has" : "s have"} no value in the dark mode and will fall back to the light value: ${missingInDark.join(", ")}.`
    )
  }

  if (unresolved.count > 0) {
    warnings.push(
      `${unresolved.count} alias${unresolved.count === 1 ? "" : "es"} could not be resolved. Check that referenced variables still exist in your Figma file.`
    )
  }

  const fontResult = emitFontDeclarations(fontAssignments, strategy)
  warnings.push(...fontResult.warnings)

  const fontDecls: Decl[] = fontResult.declarations
    .map((line) => {
      const match = line.match(/^\s*(--[\w-]+):\s*(.+?);?\s*$/)
      if (!match) return null
      const name = match[1]
      const value = match[2]
      return { name, head: headFromName(name, prefix), value }
    })
    .filter((d): d is Decl => d !== null)

  const fontHeads = new Set(fontDecls.map((d) => d.head))
  const typoDeclsWithoutFonts = typoDecls.filter((d) => !fontHeads.has(d.head))

  const imports = ['@import "tailwindcss";', '@import "tw-animate-css";']
  imports.push(...fontsourceImports(fontAssignments, strategy))

  const colorRamps = stableSortBy(colorRampDecls, (d) =>
    colorPrimitiveGroupKey(d.head)
  )
  const typography = stableSortBy(
    [...fontDecls, ...typoDeclsWithoutFonts],
    (d) => primitiveGroupKey(d.head)
  )
  const semanticLight = stableSortBy(semanticLightDecls, (d) =>
    semanticGroupKey(d.head)
  )
  const semanticDark = stableSortBy(semanticDarkDecls, (d) =>
    semanticGroupKey(d.head)
  )

  let utilitiesCss: string
  if (textStyles.length === 0) {
    // `getLocalTextStylesAsync` only returns styles defined in this file, so a
    // document consuming a published library has none. Ship the built-in set
    // rather than exporting no typography utilities at all.
    utilitiesCss = STERA_UTILITIES
    warnings.push(
      "No local text styles found, so the built-in typography utilities were used. These are not derived from your Figma file — if your text styles live in a published library, export from the library file to keep them in sync."
    )
  } else {
    const familyRoles = new Map<string, string>()
    for (const { role, family } of fontAssignments) {
      const key = family.trim().toLowerCase()
      if (!familyRoles.has(key)) familyRoles.set(key, role)
    }
    const built = buildUtilities({
      textStyles,
      nameMap,
      unit,
      familyRoles,
    })
    utilitiesCss = built.css
    warnings.push(...built.warnings)
  }

  const emittedNames = [
    ...colorRamps,
    ...typography,
    ...semanticLight,
    ...semanticDark,
  ].map((d) => d.name)
  const missing = findUnresolvedReferences(utilitiesCss, [
    ...emittedNames,
    ...TAILWIND_THEME_VARS,
  ])
  if (missing.length > 0) {
    warnings.push(
      `The typography utilities reference ${missing.length === 1 ? "a variable that is" : "variables that are"} not in this export: ${missing.join(", ")}. Those declarations will not apply.`
    )
  }

  return {
    model: {
      imports,
      colorRamps,
      typography,
      semanticLight,
      semanticDark,
      utilitiesCss,
    },
    warnings,
    errors,
  }
}
