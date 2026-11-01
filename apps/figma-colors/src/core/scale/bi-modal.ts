import Color from "colorjs.io"
import { generateRadixColors } from "../radix/generate-radix-colors.js"

export const SCALE_STEPS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const
export type ScaleStep = (typeof SCALE_STEPS)[number]

export type ScaleType = "accent" | "gray"

export type ScaleEntry = {
  step: ScaleStep
  light: string
  dark: string
}

export type GenerationOptions = {
  hex: string
  scaleType: ScaleType
  lightBackground: string
  darkBackground: string
}

// When generating an accent scale, Radix's algorithm still requires a `gray` arg.
// The gray output is computed but discarded; `getButtonHoverColor` only searches
// the accent scale, so this constant has no effect on the returned accent.
const UNUSED_GRAY = "#8B8D98"

// Symmetric: when generating a gray scale, the accent input is required but the
// accent output is discarded.
const UNUSED_ACCENT = "#3B82F6"

// Ratio by which each successive lightness gap grows across steps 1..8 of the
// light gray scale. Tunable: higher values keep steps 2-3 closer to white and
// push more of the total drop toward steps 6-8.
const TOP_GAP_GROWTH = 1.3

/**
 * Re-space the lightness of steps 2..7 of a light-mode gray scale.
 *
 * In Radix's reference gray scales the step 1->2 lightness gap is roughly a
 * third of the 2->3 gap, so step 2 reads as a duplicate of step 1 and step 3
 * looks like a jump. Steps 1 and 8 are kept fixed; steps 2..7 are placed
 * between them so each gap is `TOP_GAP_GROWTH` times the previous one. Only
 * lightness changes: chroma and hue of every step are preserved, and steps
 * 8..12 are returned untouched.
 */
function smoothLightGrayTop(hexes: string[]): string[] {
  const colors = hexes.map((hex) => new Color(hex).to("oklch"))
  // colorjs.io types coords as possibly null; a missing coordinate falls
  // through the guard below and leaves the scale untouched.
  const first = colors[0].coords[0] ?? NaN
  const last = colors[7].coords[0] ?? NaN
  if (!(first > last)) return hexes

  let weightSum = 0
  for (let k = 0; k < 7; k++) weightSum += Math.pow(TOP_GAP_GROWTH, k)
  const firstGap = (first - last) / weightSum

  let lightness = first
  for (let k = 0; k < 6; k++) {
    lightness -= firstGap * Math.pow(TOP_GAP_GROWTH, k)
    colors[k + 1].coords[0] = lightness
  }

  return hexes.map((hex, i) =>
    i >= 1 && i <= 6 ? colors[i].to("srgb").toString({ format: "hex" }) : hex
  )
}

/**
 * Run the Radix generator once per appearance and pair the results step by
 * step. Only the 12 solid steps are kept; the generator's alpha, contrast and
 * surface outputs are discarded.
 */
export function generateBiModalScale(options: GenerationOptions): ScaleEntry[] {
  const accent = options.scaleType === "accent" ? options.hex : UNUSED_ACCENT
  const gray = options.scaleType === "gray" ? options.hex : UNUSED_GRAY

  const lightResult = generateRadixColors({
    appearance: "light",
    accent,
    gray,
    background: options.lightBackground,
  })

  const darkResult = generateRadixColors({
    appearance: "dark",
    accent,
    gray,
    background: options.darkBackground,
  })

  const lightScale: string[] =
    options.scaleType === "accent"
      ? lightResult.accentScale
      : smoothLightGrayTop(lightResult.grayScale)
  const darkScale: string[] =
    options.scaleType === "accent"
      ? darkResult.accentScale
      : darkResult.grayScale

  return SCALE_STEPS.map((step, i) => ({
    step,
    light: lightScale[i],
    dark: darkScale[i],
  }))
}
