import { SCALE_STEPS, type ScaleStep } from "./steps.js"
import type { Mode } from "./targets.js"

/**
 * Tuning data for the Neutral ramp generator. Everything a designer might
 * want to adjust lives in `DEFAULT_NEUTRAL_TARGETS`; `neutral.ts` only applies
 * the numbers. The tests check the contract (every step on target, strict
 * order, hue kept, gray seeds gray), not the exact values, so these can be
 * changed with the playground (`pnpm tune`) and pasted back here.
 *
 * The bold band (800–950) matches the Semantic numbers in `targets.ts`, so a
 * Neutral ramp's bold surfaces line up with every family's. Everything below
 * it is the Neutral's own: a run of surfaces that stays close to the page.
 * Nothing is imported from `targets.ts` on purpose: tuning one generator must
 * never move the other.
 */

export type { Mode }

export type NeutralModeTargets = {
  /** Target OKLCH lightness of every step on the default page. */
  L: Record<ScaleStep, number>
  /** Target OKLCH chroma of every step for a fully vivid seed. */
  K: Record<ScaleStep, number>
  /**
   * How the first steps follow the page. The first step sits exactly its
   * offset from the page, so with `25: 0` step 25 is the page itself and the
   * ramp starts at the background. The later offsets are minimum distances
   * from the page: the step sits there or on its target, whichever is further
   * from the page. On a pure white or black page the targets win; on a page
   * that has been lifted off black (or pulled off white) the steps keep a
   * visible gap above it instead of jumping to where they would sit on black.
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
  // 25–700 are all surfaces and stay close together, with gaps that grow
  // gently away from the page; 800–950 are the bold band and sit far off.
  // 25 is the page and 50/100 sit on their targets unless the page is so
  // close that the offsets push them further.
  light: {
    L: {
      25: 0.99,
      50: 0.975,
      100: 0.955,
      200: 0.925,
      300: 0.895,
      400: 0.86,
      500: 0.82,
      600: 0.775,
      700: 0.725,
      800: 0.32,
      900: 0.26,
      950: 0.2,
    },
    K: {
      25: 0.012,
      50: 0.018,
      100: 0.025,
      200: 0.032,
      300: 0.04,
      400: 0.05,
      500: 0.06,
      600: 0.07,
      700: 0.08,
      800: 0.07,
      900: 0.045,
      950: 0.032,
    },
    offsets: { 25: 0, 50: 0.025, 100: 0.045 },
  },
  dark: {
    L: {
      25: 0.12,
      50: 0.165,
      100: 0.21,
      200: 0.25,
      300: 0.285,
      400: 0.32,
      500: 0.36,
      600: 0.405,
      700: 0.455,
      800: 0.82,
      900: 0.88,
      950: 0.93,
    },
    K: {
      25: 0.012,
      50: 0.018,
      100: 0.025,
      200: 0.032,
      300: 0.04,
      400: 0.05,
      500: 0.06,
      600: 0.07,
      700: 0.08,
      800: 0.07,
      900: 0.045,
      // Dark 950 is nearly white, where blue only reaches 0.019.
      950: 0.018,
    },
    // About one visible step above a page that is already off black. On a
    // pure black page the targets, which allow for the 8-bit crush near
    // black, are further from the page and win.
    offsets: { 25: 0, 50: 0.04, 100: 0.075 },
  },
  minGap: 0.015,
}

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value))
}

/**
 * The lightness of every step for one mode, anchored to the page. Light
 * ramps descend from the page and dark ramps ascend from it. The first step
 * sits exactly its offset from the page, so the ramp starts at the
 * background. A later step with an offset sits at least that far from the
 * page and never nearer the page than its target. Every other step sits at
 * its target. In all cases a step is at least `minGap` past the one before.
 * Unlike the Semantic ladder nothing resets at the bold band, so the twelve
 * steps are strictly ordered by construction.
 */
export function neutralLadder(
  mode: Mode,
  backgroundL: number,
  targets: NeutralTargets
): Record<ScaleStep, number> {
  const { L, offsets } = targets[mode]
  const away = mode === "light" ? -1 : 1
  const further = (a: number, b: number) =>
    away < 0 ? Math.min(a, b) : Math.max(a, b)
  const out = {} as Record<ScaleStep, number>
  let previous: number | null = null
  for (const step of SCALE_STEPS) {
    const offset = offsets[step]
    let lightness: number
    if (offset !== undefined) {
      const fromPage = backgroundL + away * offset
      if (previous === null) {
        lightness = fromPage
      } else {
        lightness = further(
          further(fromPage, L[step]),
          previous + away * targets.minGap
        )
      }
    } else if (previous !== null) {
      lightness = further(L[step], previous + away * targets.minGap)
    } else {
      lightness = L[step]
    }
    lightness = clamp01(lightness)
    out[step] = lightness
    previous = lightness
  }
  return out
}
