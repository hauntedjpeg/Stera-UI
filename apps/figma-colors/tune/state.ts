import {
  DEFAULT_NEUTRAL_TARGETS,
  type NeutralTargets,
} from "../src/core/scale/neutral-targets.js"
import {
  DEFAULT_STANDARD_TARGETS,
  type StandardTargets,
} from "../src/core/scale/standard-targets.js"
import { DEFAULT_TARGETS, type Targets } from "../src/core/scale/targets.js"

export type Seed = { name: string; hex: string }

export type TuneState = {
  targets: Targets
  neutralTargets: NeutralTargets
  standardTargets: StandardTargets
  seeds: Seed[]
  pages: { light: string; dark: string }
  /** The seed of the Neutral and Standard reference rows. */
  neutral: string
  numbers: boolean
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
  numbers: false,
}

const STORAGE_KEY = "stera-ui-colors:tune"

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
    numbers: stored.numbers ?? base.numbers,
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
