/**
 * The step names of a generated ramp. Tailwind-style numbers, lightest first
 * in light mode. Dark ramps are mirrored: step 25 is always the one nearest the
 * page background, so a semantic token aliases the same step in both modes.
 */
export const SCALE_STEPS = [
  25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950,
] as const
export type ScaleStep = (typeof SCALE_STEPS)[number]

export type ScaleEntry = {
  step: ScaleStep
  light: string
  dark: string
}

export function stepIndex(step: ScaleStep): number {
  return SCALE_STEPS.indexOf(step)
}
