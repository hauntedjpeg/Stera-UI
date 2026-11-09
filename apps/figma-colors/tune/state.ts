import {
  DEFAULT_NEUTRAL_TARGETS,
  type NeutralTargets,
} from "../src/core/scale/neutral-targets.js"
import {
  DEFAULT_STANDARD_TARGETS,
  type StandardTargets,
} from "../src/core/scale/standard-targets.js"
import { SCALE_STEPS, type ScaleStep } from "../src/core/scale/steps.js"
import {
  DEFAULT_TARGETS,
  type Mode,
  type Targets,
} from "../src/core/scale/targets.js"

export type Seed = { name: string; hex: string }

/** Which generator the panel edits and the toolbar copies or resets. */
export type Generator = "semantic" | "neutral" | "standard"
/** Which appearance the grid shows; "both" stacks them. */
export type ModeView = Mode | "both"
export type Panel = "step" | "rules" | "seeds"

/** Selection and view options. Kept apart from the targets, so a shared link carries numbers, not someone's open tab. */
export type UiState = {
  generator: Generator
  mode: ModeView
  step: ScaleStep
  panel: Panel
  /** Show L, C and contrast in the cells instead of the hex. */
  numbers: boolean
}

export const DEFAULT_UI: UiState = {
  generator: "semantic",
  mode: "light",
  step: 500,
  panel: "step",
  numbers: false,
}

export type TuneState = {
  targets: Targets
  neutralTargets: NeutralTargets
  standardTargets: StandardTargets
  seeds: Seed[]
  pages: { light: string; dark: string }
  /** The seed of the Neutral and Standard reference rows. */
  neutral: string
}

export const DEFAULT_SEEDS: Seed[] = [
  { name: "Brand", hex: "#111111" },
  { name: "Accent", hex: "#d0ee38" },
  { name: "Success", hex: "#14ae5c" },
  { name: "Warning", hex: "#ffd800" },
  { name: "Danger", hex: "#f24822" },
  { name: "Blue", hex: "#3b82f6" },
  { name: "Navy", hex: "#1e3a8a" },
  { name: "Teal", hex: "#0d9488" },
  { name: "Pink", hex: "#f9a8d4" },
]

export const DEFAULT_STATE: TuneState = {
  targets: DEFAULT_TARGETS,
  neutralTargets: DEFAULT_NEUTRAL_TARGETS,
  standardTargets: DEFAULT_STANDARD_TARGETS,
  seeds: DEFAULT_SEEDS,
  pages: { light: "#ffffff", dark: "#000000" },
  neutral: "#8b8d98",
}

const STORAGE_KEY = "stera-ui-colors:tune"
const UI_STORAGE_KEY = "stera-ui-colors:tune:ui"

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T
}

/** Deep-merge a stored state onto the defaults so a newer field never goes missing. */
function merge(stored: Partial<TuneState> | null): TuneState {
  const base = clone(DEFAULT_STATE)
  if (!stored || typeof stored !== "object") return base
  const t = stored.targets
  const nt = stored.neutralTargets
  const st = stored.standardTargets
  const mergeNeutralMode = (mode: "light" | "dark") => {
    const fallback = base.neutralTargets[mode]
    const next = nt?.[mode]
    return next
      ? {
          L: { ...fallback.L, ...next.L },
          K: { ...fallback.K, ...next.K },
          offsets: { ...fallback.offsets, ...next.offsets },
        }
      : fallback
  }
  const mergeStandardMode = (mode: "light" | "dark") => {
    const fallback = base.standardTargets[mode]
    const next = st?.[mode]
    return next
      ? { L: { ...fallback.L, ...next.L }, K: { ...fallback.K, ...next.K } }
      : fallback
  }
  return {
    targets: t
      ? {
          ...base.targets,
          ...t,
          light: { ...base.targets.light, ...t.light },
          dark: { ...base.targets.dark, ...t.dark },
          hueShift: { ...base.targets.hueShift, ...t.hueShift },
        }
      : base.targets,
    neutralTargets: nt
      ? {
          light: mergeNeutralMode("light"),
          dark: mergeNeutralMode("dark"),
          minGap: nt.minGap ?? base.neutralTargets.minGap,
        }
      : base.neutralTargets,
    standardTargets: st
      ? { light: mergeStandardMode("light"), dark: mergeStandardMode("dark") }
      : base.standardTargets,
    seeds: Array.isArray(stored.seeds) ? stored.seeds : base.seeds,
    pages: { ...base.pages, ...stored.pages },
    neutral: stored.neutral ?? base.neutral,
  }
}

function decode(raw: string | null): Partial<TuneState> | null {
  if (!raw) return null
  try {
    return JSON.parse(raw) as Partial<TuneState>
  } catch {
    return null
  }
}

/** The URL hash wins over local storage, so a pasted link shows its state. */
export function loadState(): TuneState {
  const hash = window.location.hash.slice(1)
  const fromHash = hash ? decode(decodeURIComponent(hash)) : null
  if (fromHash) return merge(fromHash)
  try {
    return merge(decode(window.localStorage.getItem(STORAGE_KEY)))
  } catch {
    return clone(DEFAULT_STATE)
  }
}

export function saveState(state: TuneState): void {
  const json = JSON.stringify(state)
  try {
    window.localStorage.setItem(STORAGE_KEY, json)
  } catch {
    // Storage can be unavailable; the hash still carries the state.
  }
  window.history.replaceState(null, "", `#${encodeURIComponent(json)}`)
}

export function loadUi(): UiState {
  try {
    const stored = decode(
      window.localStorage.getItem(UI_STORAGE_KEY)
    ) as Partial<UiState> | null
    if (!stored) return { ...DEFAULT_UI }
    return {
      generator: isOneOf(stored.generator, ["semantic", "neutral", "standard"])
        ? stored.generator
        : DEFAULT_UI.generator,
      mode: isOneOf(stored.mode, ["light", "dark", "both"])
        ? stored.mode
        : DEFAULT_UI.mode,
      step: (SCALE_STEPS as readonly number[]).includes(stored.step as number)
        ? (stored.step as ScaleStep)
        : DEFAULT_UI.step,
      panel: isOneOf(stored.panel, ["step", "rules", "seeds"])
        ? stored.panel
        : DEFAULT_UI.panel,
      numbers: stored.numbers ?? DEFAULT_UI.numbers,
    }
  } catch {
    return { ...DEFAULT_UI }
  }
}

export function saveUi(ui: UiState): void {
  try {
    window.localStorage.setItem(UI_STORAGE_KEY, JSON.stringify(ui))
  } catch {
    // Selection is a convenience; losing it is fine.
  }
}

function isOneOf<T extends string>(
  value: unknown,
  options: readonly T[]
): value is T {
  return (
    typeof value === "string" && (options as readonly string[]).includes(value)
  )
}

/**
 * How many numbers in `value` differ from `reference`, leaf by leaf. Drives
 * the modified badges on the generator tabs and the per-generator Reset.
 */
export function countChanges(value: unknown, reference: unknown): number {
  if (Array.isArray(value) && Array.isArray(reference)) {
    let n = 0
    for (let i = 0; i < Math.max(value.length, reference.length); i++) {
      n += countChanges(value[i], reference[i])
    }
    return n
  }
  if (
    value !== null &&
    reference !== null &&
    typeof value === "object" &&
    typeof reference === "object"
  ) {
    const a = value as Record<string, unknown>
    const b = reference as Record<string, unknown>
    let n = 0
    for (const key of new Set([...Object.keys(a), ...Object.keys(b)])) {
      n += countChanges(a[key], b[key])
    }
    return n
  }
  return value === reference ? 0 : 1
}

/** One target set as a pasteable `export const NAME: Type = { … }` literal. */
function serialize(name: string, type: string, value: unknown): string {
  const json = JSON.stringify(value, null, 2)
    .replace(/"(\d+|[a-zA-Z_]\w*)":/g, "$1:")
    .replace(/\[\s+([\d.,\s-]+?)\s+\]/g, (_, inner: string) => {
      return `[${inner.replace(/\s+/g, " ").trim()}]`
    })
  return `export const ${name}: ${type} = ${json}\n`
}

/** The Semantic targets, ready to paste into `targets.ts`. */
export function serializeTargets(targets: Targets): string {
  return serialize("DEFAULT_TARGETS", "Targets", targets)
}

/** The Neutral targets, ready to paste into `neutral-targets.ts`. */
export function serializeNeutralTargets(targets: NeutralTargets): string {
  return serialize("DEFAULT_NEUTRAL_TARGETS", "NeutralTargets", targets)
}

/** The Standard targets, ready to paste into `standard-targets.ts`. */
export function serializeStandardTargets(targets: StandardTargets): string {
  return serialize("DEFAULT_STANDARD_TARGETS", "StandardTargets", targets)
}
