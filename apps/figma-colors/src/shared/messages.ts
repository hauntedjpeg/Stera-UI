import type { ScaleEntry, ScaleType } from "../core/scale/bi-modal.js"

/** A local collection and the ramp groups it holds (possibly none). */
export type CollectionSummary = {
  id: string
  name: string
  groups: string[]
}

export type TargetMode = "add" | "update"

export type StoredPrefs = {
  hex: string
  scaleType: ScaleType
  lightBackground: string
  darkBackground: string
  mode: TargetMode
}

export const DEFAULT_PREFS: StoredPrefs = {
  hex: "#859991",
  scaleType: "accent",
  lightBackground: "#ffffff",
  darkBackground: "#000000",
  mode: "add",
}

export type SandboxToUi =
  | {
      type: "loaded"
      collections: CollectionSummary[]
      prefs: StoredPrefs
    }
  | { type: "variables-written"; collections: CollectionSummary[] }
  | { type: "legacy-naming"; collectionName: string }
  | { type: "error"; message: string }

export type UiToSandbox =
  | { type: "load" }
  | {
      type: "write-variables"
      colorName: string
      /** Omitted to use, or create, the default `Color` collection. */
      collectionId?: string
      scale: ScaleEntry[]
    }
  | { type: "save-prefs"; prefs: StoredPrefs }

export function postToSandbox(message: UiToSandbox): void {
  parent.postMessage({ pluginMessage: message }, "*")
}
