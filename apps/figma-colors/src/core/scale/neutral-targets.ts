import { SCALE_STEPS, type ScaleStep } from "./steps.js"
import type { Mode } from "./targets.js"

/**
 * Tuning data for the Neutral ramp generator. Everything a designer might
 * want to adjust lives in `DEFAULT_NEUTRAL_TARGETS`; `neutral.ts` only applies
 * the numbers. The tests check the contract (every step on target, strict
 * order, hue kept, gray seeds gray), not the exact values, so these can be
 * changed with the playground (`pnpm tune`) and pasted back here.
 *
 * The fixed steps started as a copy of the Semantic numbers in `targets.ts`,
 * so a Neutral ramp's subtle, muted and bold bands line up with every family's
 * on the default pages. They are a copy on purpose: tuning one generator must
 * never move the other.
 */

export type { Mode }

export type NeutralModeTargets = {
  /** Target OKLCH lightness of every step on the default page. */
  L: Record<ScaleStep, number>
  /** Target OKLCH chroma of every step for a fully vivid seed. */
  K: Record<ScaleStep, number>
  /**
   * How far the first steps must sit from the page background. A step takes
   * its target, or this offset from the background when that is nearer the
   * background, so a cream or near-black page still gets usable tints.
   */
  offsets: Partial<Record<ScaleStep, number>>
}

export type NeutralTargets = {
  light: NeutralModeTargets
  dark: NeutralModeTargets
  /**
   * Minimum lightness gap between consecutive steps. Every step is at least
   * this much further from the page than the one before, so the ramp is
   * strictly ordered whatever the page.
   */
  minGap: number
}

export const DEFAULT_NEUTRAL_TARGETS: NeutralTargets = {
  light: {
    L: {
      25: 0.97,
      50: 0.94,
      100: 0.905,
      200: 0.82,
      300: 0.73,
      400: 0.64,
      500: 0.56,
      600: 0.48,
      700: 0.4,
      800: 0.32,
      900: 0.26,
      950: 0.2,
    },
    K: {
      25: 0.013,
      50: 0.027,
      100: 0.048,
      200: 0.075,
      300: 0.11,
      400: 0.135,
      500: 0.14,
      600: 0.13,
      700: 0.11,
      800: 0.07,
      900: 0.045,
      950: 0.032,
    },
    offsets: { 25: 0.03, 50: 0.06, 100: 0.095 },
  },
  dark: {
    L: {
      25: 0.21,
      50: 0.265,
      100: 0.32,
      200: 0.37,
      300: 0.46,
      400: 0.54,
      500: 0.61,
      600: 0.68,
      700: 0.75,
      800: 0.82,
      900: 0.88,
      950: 0.93,
    },
    K: {
      25: 0.013,
      50: 0.027,
      100: 0.048,
      200: 0.075,
      300: 0.11,
      400: 0.135,
      500: 0.14,
      600: 0.13,
      700: 0.11,
      800: 0.07,
      900: 0.045,
      // Dark 950 is nearly white, where blue only reaches 0.019.
      950: 0.018,
    },
    offsets: { 25: 0.06, 50: 0.12, 100: 0.18 },
  },
  minGap: 0.03,
}

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value))
}

/**
 * The lightness of every step for one mode. With a page background, light
 * ramps descend from it and dark ramps ascend from it: a step with an offset
 * sits at its target or that far from the background, whichever is nearer
 * the background; every other step sits at its target or `minGap` past the
 * step before, whichever is nearer the background. With `backgroundL` null
 * the ramp is absolute: the offsets are skipped and only the targets and
 * `minGap` apply. Unlike the Semantic ladder nothing resets at the bold band,
 * so the twelve steps are strictly ordered by construction either way.
 */
export function neutralLadder(
  mode: Mode,
  backgroundL: number | null,
  targets: NeutralTargets
): Record<ScaleStep, number> {
  const { L, offsets } = targets[mode]
  const away = mode === "light" ? -1 : 1
  const nearer = (a: number, b: number) =>
    away < 0 ? Math.min(a, b) : Math.max(a, b)
  const out = {} as Record<ScaleStep, number>
  let previous: number | null = null
  for (const step of SCALE_STEPS) {
    let lightness = L[step]
    const offset = offsets[step]
    if (offset !== undefined && backgroundL !== null) {
      lightness = nearer(lightness, backgroundL + away * offset)
    } else if (previous !== null) {
      lightness = nearer(lightness, previous + away * targets.minGap)
    }
    lightness = clamp01(lightness)
    out[step] = lightness
    previous = lightness
  }
  return out
}
