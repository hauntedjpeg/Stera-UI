import { normalizeHex } from "../color/hex.js"
import { cmaxSrgb, hexToOklch, oklchToHex, type Oklch } from "./gamut.js"
import {
  DEFAULT_NEUTRAL_TARGETS,
  neutralLadder,
  type Mode,
  type NeutralModeTargets,
  type NeutralTargets,
} from "./neutral-targets.js"
import { backgroundError } from "./semantic.js"
import { SCALE_STEPS, type ScaleEntry, type ScaleStep } from "./steps.js"

/**
 * The Neutral ramp: the gray family behind a UI's surfaces. It has the
 * Semantic role layout (subtle, muted, solid, bold) and, unless `anchored` is
 * false, the same page anchoring, but no seed band: every one of the twelve steps sits on a fixed
 * target lightness, strictly darker as the steps rise in light mode and
 * strictly lighter in dark mode. The seed only donates its hue and how vivid
 * it is; its lightness is dropped, so the seed hex need not appear in its own
 * ramp. A pure gray seed gives a pure gray ramp.
 *
 * The numbers live in `neutral-targets.ts`. This file only applies them.
 */

export type NeutralOptions = {
  hex: string
  lightBackground: string
  darkBackground: string
  /**
   * Whether the first steps follow the backgrounds. Default true. When false
   * the ramp is absolute, like a Standard one: the backgrounds are neither
   * read nor validated, and every step sits on its target.
   */
  anchored?: boolean
}

export type NeutralResult = {
  entries: ScaleEntry[]
  /** Always empty. Kept for symmetry with the Semantic generator. */
  notes: string[]
}

/**
 * Seeds under this chroma are treated as gray: no hue, no tint. `semantic.ts`
 * and `standard.ts` keep their own copies of this threshold; the generators
 * are deliberately independent, so consolidating them is a separate refactor.
 */
const ACHROMATIC_C = 0.005

/**
 * How vivid the seed is relative to the chroma curve at its own lightness,
 * 0..1. The curve is every step's `K` at that step's target lightness on the
 * default page. A twin of `relativeChroma` in `standard.ts`.
 */
function relativeChroma(seed: Oklch, mode: NeutralModeTargets): number {
  const points = SCALE_STEPS.map((step) => ({
    L: mode.L[step],
    k: mode.K[step],
  })).sort((a, b) => a.L - b.L)

  let k = points[points.length - 1].k
  if (seed.L <= points[0].L) {
    k = points[0].k
  } else {
    for (let i = 1; i < points.length; i++) {
      if (seed.L <= points[i].L) {
        const a = points[i - 1]
        const b = points[i]
        const t = (seed.L - a.L) / (b.L - a.L)
        k = a.k + (b.k - a.k) * t
        break
      }
    }
  }
  return Math.min(1, Math.max(0, seed.C / k))
}

/** One appearance of the ramp: anchored lightness, curve chroma scaled by `s`. */
function ramp(
  mode: Mode,
  backgroundL: number | null,
  H: number,
  s: number,
  targets: NeutralTargets
): Record<ScaleStep, string> {
  const L = neutralLadder(mode, backgroundL, targets)
  const { K } = targets[mode]
  const out = {} as Record<ScaleStep, string>
  for (const step of SCALE_STEPS) {
    const C = s === 0 ? 0 : Math.min(s * K[step], cmaxSrgb(L[step], H))
    out[step] = oklchToHex(L[step], C, s === 0 ? 0 : H)
  }
  return out
}

/** Generate both appearances of a Neutral ramp, paired step by step. */
export function generateNeutralScale(
  options: NeutralOptions,
  targets: NeutralTargets = DEFAULT_NEUTRAL_TARGETS
): NeutralResult {
  const anchored = options.anchored ?? true
  if (anchored) {
    const error = backgroundError(
      options.lightBackground,
      options.darkBackground
    )
    if (error) throw new Error(error)
  }
  const hex = normalizeHex(options.hex)
  if (!hex) throw new Error(`Invalid hex color: ${options.hex}`)
  const pageL = (background: string): number | null =>
    anchored ? hexToOklch(normalizeHex(background) as string).L : null

  const seed = hexToOklch(hex)
  const gray = seed.C < ACHROMATIC_C
  const H = gray ? 0 : seed.H
  // Measured on the light curve and reused for both appearances, so a seed is
  // equally vivid in either mode.
  const s = gray ? 0 : relativeChroma(seed, targets.light)

  const light = ramp("light", pageL(options.lightBackground), H, s, targets)
  const dark = ramp("dark", pageL(options.darkBackground), H, s, targets)

  return {
    entries: SCALE_STEPS.map((step) => ({
      step,
      light: light[step],
      dark: dark[step],
    })),
    notes: [],
  }
}
