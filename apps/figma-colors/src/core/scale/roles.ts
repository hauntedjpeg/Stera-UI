import type { ScaleStep } from "./steps.js"

/**
 * What each step of a Tuned ramp is for, the same in every family and in
 * both modes. This is the table the Theme aliases follow; the plugin only
 * shows it. 500 is the seed; 600 and 700 move away from the page; 950 is the
 * bold surface and 900 and 800 its states, stepping back toward the seed.
 */
export const STEP_ROLES: Record<ScaleStep, string> = {
  25: "surface-subtle",
  50: "surface-subtle-hover",
  100: "surface-subtle-pressed",
  200: "surface-muted, border",
  300: "surface-muted-hover, ink-subtle, border-bold",
  400: "surface-muted-pressed",
  500: "surface, ink (the seed)",
  600: "surface-hover",
  700: "surface-pressed",
  800: "surface-bold-pressed",
  900: "surface-bold-hover",
  950: "surface-bold, ink-bold",
}
