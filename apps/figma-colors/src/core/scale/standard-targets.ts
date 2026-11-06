import type { ScaleStep } from "./steps.js"

/**
 * Tuning data for the Standard ramp generator. Everything a designer might want
 * to adjust lives in `DEFAULT_STANDARD_TARGETS`; `standard.ts` only applies the
 * numbers. The tests check the contract (every step on its target lightness,
 * gaps that grow from 25 to 950, hue-equal steps), not the exact values, so
 * these can be changed with the playground (`pnpm tune`) and pasted back here.
 *
 * Standard is a traditional, Tailwind-like ramp, so it is much simpler than
 * `targets.ts`: all twelve steps are fixed, there is no seed band and no page
 * anchoring. A Standard ramp is an absolute palette — the same seed gives the
 * same hexes in every project, whatever the page color. Page-relative behavior
 * is Semantic's job.
 */

export type Mode = "light" | "dark"

export type StandardModeTargets = {
  /** Target OKLCH lightness of every step. */
  L: Record<ScaleStep, number>
  /** Target OKLCH chroma of every step for a fully vivid seed. */
  K: Record<ScaleStep, number>
}

export type StandardTargets = {
  light: StandardModeTargets
  dark: StandardModeTargets
}

/**
 * The lightness tables were seeded from geometric gap ladders, where each gap is
 * a fixed multiple of the one before it. The two ends trade off against each
 * other, because the total range is fixed: a gentler low end is necessarily a
 * steeper high end.
 *
 * Light is deliberately lopsided, in two segments. 25 to 400 runs 0.992 down to
 * 0.880 at a growth of 1.30, so the six lightest steps sit within 0.11 of each
 * other and read as barely-separated surfaces; 400 to 950 then covers the
 * remaining 0.71 at a growth of 1.06, close to even. That puts a deliberate
 * jump at 400 to 500, the same shape Tailwind's own scales have.
 *
 * Dark is a single ladder, 0.220 up to 0.960 at a growth of 1.20, which already
 * reads well across the whole range.
 *
 * The tables are the source of truth now; re-seed them with those numbers if
 * the shape ever needs rebuilding from scratch.
 *
 * The chroma tables are a bell peaking at 700, sampled from Tailwind's own vivid
 * families at each step's lightness rather than by step number, so they follow
 * the lightness tables if those move. sRGB holds the most chroma around L 0.55
 * to 0.60, which is where both modes' step 700 sits. Dark 950 is nearly white and dark 25
 * nearly black, so both ends stay low.
 */
export const DEFAULT_STANDARD_TARGETS: StandardTargets = {
  light: {
    L: {
      25: 0.992,
      50: 0.98,
      100: 0.964,
      200: 0.943,
      300: 0.915,
      400: 0.88,
      500: 0.778,
      600: 0.67,
      700: 0.556,
      800: 0.435,
      900: 0.306,
      950: 0.17,
    },
    K: {
      25: 0.006,
      50: 0.013,
      100: 0.024,
      200: 0.04,
      300: 0.06,
      400: 0.085,
      500: 0.14,
      600: 0.185,
      700: 0.21,
      800: 0.195,
      900: 0.145,
      950: 0.09,
    },
  },
  dark: {
    L: {
      25: 0.22,
      50: 0.243,
      100: 0.271,
      200: 0.304,
      300: 0.344,
      400: 0.391,
      500: 0.449,
      600: 0.517,
      700: 0.6,
      800: 0.699,
      900: 0.817,
      950: 0.96,
    },
    K: {
      25: 0.03,
      50: 0.042,
      100: 0.055,
      200: 0.07,
      300: 0.09,
      400: 0.115,
      500: 0.145,
      600: 0.18,
      700: 0.2,
      800: 0.165,
      900: 0.105,
      950: 0.028,
    },
  },
}
