import { normalizeHex } from "../color/hex.js"
import { cmaxSrgb, hexToOklch, oklchToHex, type Oklch } from "./gamut.js"
import {
  DEFAULT_STANDARD_TARGETS,
  type Mode,
  type StandardModeTargets,
  type StandardTargets,
} from "./standard-targets.js"
import { SCALE_STEPS, type ScaleEntry } from "./steps.js"

/**
 * The Standard ramp: a traditional, Tailwind-like scale. Every one of the
 * twelve steps sits on a fixed target lightness, so each family lands on the
 * same lightness at the same step and contrast is predictable when a token is
 * re-pointed from one family to another. The seed only donates its hue and how
 * vivid it is; its own lightness is not preserved, so the seed hex does not
 * appear in its own ramp.
 *
 * Nothing here reads the page background. A Standard ramp is absolute, so the
 * same seed gives the same hexes in every project.
 */

export type StandardOptions = {
  hex: string
}

export type StandardResult = {
  entries: ScaleEntry[]
  /** Always empty. Kept for symmetry with the Semantic generator. */
  notes: string[]
}

/**
 * Seeds under this chroma are treated as gray: no hue, no tint. `semantic.ts`
 * keeps its own copy of this threshold; the two generators are deliberately
 * independent, so consolidating them is a separate refactor.
 */
const ACHROMATIC_C = 0.005

/**
 * How vivid the seed is relative to the chroma curve at its own lightness,
 * 0..1. The curve is every step's `K` at that step's lightness, which already
 * covers the whole range, so unlike the Semantic generator this needs no
 * synthetic reference point. A twin of `vividness` in `semantic.ts`.
 */
function relativeChroma(seed: Oklch, mode: StandardModeTargets): number {
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

/** One appearance of the ramp: target lightness, curve chroma scaled by `s`. */
function ramp(
  mode: Mode,
  H: number,
  s: number,
  targets: StandardTargets
): Record<number, string> {
  const { L, K } = targets[mode]
  const out: Record<number, string> = {}
  for (const step of SCALE_STEPS) {
    const C = s === 0 ? 0 : Math.min(s * K[step], cmaxSrgb(L[step], H))
    out[step] = oklchToHex(L[step], C, s === 0 ? 0 : H)
  }
  return out
}

/** Generate both appearances of a Standard ramp, paired step by step. */
export function generateStandardScale(
  options: StandardOptions,
  targets: StandardTargets = DEFAULT_STANDARD_TARGETS
): StandardResult {
  const hex = normalizeHex(options.hex)
  if (!hex) throw new Error(`Invalid hex color: ${options.hex}`)

  const seed = hexToOklch(hex)
  const gray = seed.C < ACHROMATIC_C
  const H = gray ? 0 : seed.H
  // Measured on the light curve and reused for both appearances, so a seed is
  // equally vivid in either mode.
  const s = gray ? 0 : relativeChroma(seed, targets.light)

  const light = ramp("light", H, s, targets)
  const dark = ramp("dark", H, s, targets)

  return {
    entries: SCALE_STEPS.map((step) => ({
      step,
      light: light[step],
      dark: dark[step],
    })),
    notes: [],
  }
}
