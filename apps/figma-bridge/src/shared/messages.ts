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

import type { FontStrategy } from "../core/fonts/strategy.js"

export type { FontStrategy }
export type UnitChoice = "rem" | "px"

export type StoredPrefs = {
  strategy: FontStrategy
  unit: UnitChoice
  prefix?: string
}

export const DEFAULT_PREFS: StoredPrefs = {
  strategy: "next-font",
  unit: "rem",
}

export type SandboxToUi =
  | {
      type: "variables-loaded"
      doc: VariableDoc
      prefs: StoredPrefs
    }
  | { type: "prefs-saved" }
  | { type: "error"; message: string }

export type UiToSandbox =
  | { type: "load-variables" }
  | { type: "save-prefs"; prefs: StoredPrefs }
  | { type: "open-url"; url: string }
  | { type: "close" }

export function postToSandbox(message: UiToSandbox): void {
  parent.postMessage({ pluginMessage: message }, "*")
}
