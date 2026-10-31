export type SerializedValue =
  | { kind: "color"; r: number; g: number; b: number; a: number }
  | { kind: "number"; value: number }
  | { kind: "string"; value: string }
  | { kind: "boolean"; value: boolean }
  | { kind: "alias"; targetId: string }

export type SerializedVariable = {
  id: string
  name: string
  type: "COLOR" | "FLOAT" | "STRING" | "BOOLEAN"
  valuesByMode: Record<string, SerializedValue>
}

export type SerializedCollection = {
  id: string
  name: string
  modes: Array<{ id: string; name: string }>
  variables: SerializedVariable[]
}

/**
 * A Figma text style, flattened for the bridge. Bound fields carry the Figma
 * variable id so the generator can resolve them to the exact custom property —
 * `Weight/Medium` and `Weight/Strong` can both be 500, so only the variable
 * identity survives the round trip.
 */
export type SerializedTextStyle = {
  id: string
  /** Full Figma path, e.g. "Heading/SM". */
  name: string
  fontFamily: string
  /** fontName.style, e.g. "Medium" — the weight fallback when unbound. */
  fontStyle: string
  fontSize: number
  lineHeight: { unit: "AUTO" } | { unit: "PIXELS" | "PERCENT"; value: number }
  letterSpacing: { unit: "PIXELS" | "PERCENT"; value: number }
  boundVariables: {
    fontFamily?: string
    fontStyle?: string
    fontWeight?: string
    fontSize?: string
    lineHeight?: string
    letterSpacing?: string
  }
}

export type VariableDoc = {
  collections: SerializedCollection[]
  textStyles: SerializedTextStyle[]
}

export type RawColorValue = { r: number; g: number; b: number; a: number }
export type RawAliasValue = { type: "VARIABLE_ALIAS"; id: string }
export type RawVariableValue =
  | RawColorValue
  | RawAliasValue
  | number
  | string
  | boolean

export type RawVariable = {
  id: string
  name: string
  key: string
  variableCollectionId: string
  resolvedType: string
  valuesByMode: Record<string, RawVariableValue>
  remote: boolean
  description: string
  hiddenFromPublishing: boolean
  scopes: string[]
  codeSyntax: Record<string, string>
}

export type RawVariableCollection = {
  id: string
  name: string
  key: string
  modes: Array<{ modeId: string; name: string }>
  defaultModeId: string
  remote: boolean
  hiddenFromPublishing: boolean
  variableIds: string[]
}

export type RawVariablesPayload = {
  status: number
  error: boolean
  meta: {
    variables: Record<string, RawVariable>
    variableCollections: Record<string, RawVariableCollection>
  }
}

export type FontStrategy = "next-font" | "fontsource-variable" | "raw"
export type NextFontConvention = "family-named" | "match-init"

export type UnitChoice = "rem" | "px"

export type StoredPrefs = {
  strategy: FontStrategy
  nextConvention: NextFontConvention
  unitByCollectionName: Record<string, UnitChoice>
  prefix?: string
  darkModeIdByCollectionId: Record<string, string>
}

export const DEFAULT_PREFS: StoredPrefs = {
  strategy: "next-font",
  nextConvention: "family-named",
  unitByCollectionName: {},
  darkModeIdByCollectionId: {},
}

export type SandboxToUi =
  | {
      type: "variables-loaded"
      doc: VariableDoc
      raw: RawVariablesPayload
      prefs: StoredPrefs
      fileName: string
    }
  | { type: "prefs-saved" }
  | { type: "error"; message: string }

export type UiToSandbox =
  | { type: "load-variables" }
  | { type: "save-prefs"; prefs: StoredPrefs }
  | { type: "close" }

export function postToSandbox(message: UiToSandbox): void {
  parent.postMessage({ pluginMessage: message }, "*")
}
