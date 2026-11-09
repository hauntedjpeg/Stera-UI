import type { ScaleStep } from "./steps.js"

/**
 * What each step of a Semantic or Neutral ramp is for, the same in every
 * family and in both modes. This is the table the Theme aliases follow; the
 * plugin only shows it. 500 is the solid (the seed, in a Semantic ramp); 600
 * and 700 move away from the page. 800 is the bold surface and 900 and 950 are
 * its states, moving further from the page.
 */
export const STEP_ROLES: Record<ScaleStep, string> = {
  25: "surface-subtle",
  50: "surface-subtle-hover",
  100: "surface-subtle-pressed",
  200: "surface-muted, border",
  300: "surface-muted-hover, ink-subtle, border-bold",
  400: "surface-muted-pressed",
  500: "surface, ink",
  600: "surface-hover",
  700: "surface-pressed",
  800: "surface-bold, ink-bold",
  900: "surface-bold-hover",
  950: "surface-bold-pressed",
}

export type RoleBand = {
  name: string
  /** Base, hover, pressed, in that order. */
  steps: readonly [ScaleStep, ScaleStep, ScaleStep]
}

/**
 * The four role bands of a Semantic or Neutral ramp. Every band reads base, hover,
 * pressed, each one further from the page than the last.
 */
export const ROLE_BANDS: readonly RoleBand[] = [
  { name: "subtle", steps: [25, 50, 100] },
  { name: "muted", steps: [200, 300, 400] },
  { name: "solid", steps: [500, 600, 700] },
  { name: "bold", steps: [800, 900, 950] },
]
