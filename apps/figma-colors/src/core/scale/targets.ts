import type { ScaleStep } from "./steps.js"

/**
 * Tuning data for the Semantic ramp generator. Everything a designer might want
 * to adjust lives in `DEFAULT_TARGETS`; `semantic.ts` only applies the numbers.
 * The tests check the contract (fixed steps on target, seed at 500, band
 * order, hue-equal tints), not the exact values, so these can be changed with
 * the playground (`pnpm tune`) and pasted back here.
 */

export type Mode = "light" | "dark"

/**
 * The steps whose lightness and chroma are the same in every family. The
 * other three (500, 600, 700) are the seed and its two states.
 */
export const FIXED_STEPS = [25, 50, 100, 200, 300, 400, 800, 900, 950] as const
export type FixedStep = (typeof FIXED_STEPS)[number]
export const SEED_STEPS = [500, 600, 700] as const

export type ModeTargets = {
  /** Target OKLCH lightness of each fixed step on the default page. */
  L: Record<FixedStep, number>
  /** Target OKLCH chroma of each fixed step for a fully vivid seed. */
  K: Record<FixedStep, number>
  /**
   * How far the first steps must sit from the page background. A step takes
   * its target, or this offset from the background when that is nearer the
   * background, so a cream or near-black page still gets usable tints.
   */
  offsets: Partial<Record<FixedStep, number>>
  /**
   * A synthetic point on the chroma curve where a typical solid sits. The
   * seed's vividness is its chroma relative to the curve at its own
   * lightness, and the seed band itself is not on the curve.
   */
  solidRef: { L: number; K: number }
}

export type HueShift = {
  /** Seed hues (degrees) the shift applies to. */
  range: [number, number]
  /** The hue dark steps rotate toward. */
  target: number
  /** The shift fades in from this lightness... */
  from: number
  /** ...and reaches `max` at this lightness. */
  to: number
  max: number
}

export type Targets = {
  light: ModeTargets
  dark: ModeTargets
  /** Minimum lightness gap between consecutive steps of the subtle and muted bands. */
  minGap: number
  /** Lightness offsets of 600 and 700 from the seed: darker in light, lighter in dark. */
  stateDelta: [number, number]
  /**
   * Minimum WCAG contrast from 500 to 600 and from 600 to 700. OKLCH
   * lightness has no toe, so near black the `stateDelta` offsets barely
   * change the color; a state that falls short moves further until it
   * reaches this, and a seed with no room for that turns back toward the page.
   */
  stateMinContrast: number
  /** Below this ratio against the dark page, the dark solid is lifted. */
  darkSolidMinContrast: number
  hueShift: HueShift
}

export const DEFAULT_TARGETS: Targets = {
  light: {
    L: {
      25: 0.97,
      50: 0.94,
      100: 0.905,
      200: 0.82,
      300: 0.73,
      400: 0.64,
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
      800: 0.07,
      900: 0.045,
      950: 0.032,
    },
    offsets: { 25: 0.03, 50: 0.06, 100: 0.095 },
    solidRef: { L: 0.62, K: 0.145 },
  },
  dark: {
    L: {
      25: 0.21,
      50: 0.265,
      100: 0.32,
      200: 0.37,
      300: 0.46,
      400: 0.54,
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
      800: 0.07,
      900: 0.045,
      // Dark 950 is nearly white, where blue only reaches 0.019.
      950: 0.018,
    },
    offsets: { 25: 0.06, 50: 0.12, 100: 0.18 },
    solidRef: { L: 0.66, K: 0.145 },
  },
  minGap: 0.03,
  stateDelta: [0.06, 0.12],
  stateMinContrast: 1.15,
  darkSolidMinContrast: 3,
  // Yellows and ambers go olive as they darken, so dark steps of hues in
  // `range` rotate toward orange. The weight depends on the step's lightness,
  // not its number, so both modes treat a dark color the same.
  hueShift: { range: [70, 110], target: 60, from: 0.6, to: 0.2, max: 0.75 },
}

/** Backgrounds outside these bounds cannot carry a full ramp. */
export const LIGHT_BG_MIN_L = 0.85
export const DARK_BG_MAX_L = 0.35

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value))
}

/**
 * The lightness of every fixed step for one mode, anchored to the page
 * background. Light ramps descend from the background, dark ramps ascend from
 * it. In the subtle and muted bands the first steps follow the offsets, the
 * rest the targets, with a minimum gap so a far-off background cannot push the
 * anchored steps into the fixed ones. The bold band is absolute.
 */
export function ladder(
  mode: Mode,
  backgroundL: number,
  targets: Targets
): Record<FixedStep, number> {
  const { L, offsets } = targets[mode]
  const away = mode === "light" ? -1 : 1
  const nearer = (a: number, b: number) =>
    away < 0 ? Math.min(a, b) : Math.max(a, b)
  const out = {} as Record<FixedStep, number>
  let previous: number | null = null
  for (const step of FIXED_STEPS) {
    let lightness = L[step]
    const offset = offsets[step]
    if (step >= 800) {
      previous = null
    } else if (offset !== undefined) {
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

/** The hue a color of lightness `L` takes, given the seed hue `H`. */
export function shiftedHue(H: number, L: number, shift: HueShift): number {
  const [low, high] = shift.range
  if (H < low || H > high) return H
  const t = clamp01((shift.from - L) / (shift.from - shift.to))
  return H - (H - shift.target) * t * shift.max
}

export function isFixedStep(step: ScaleStep): step is FixedStep {
  return (FIXED_STEPS as readonly number[]).includes(step)
}
