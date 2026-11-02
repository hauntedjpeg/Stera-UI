import Color from "colorjs.io"
import { generateRadixColors } from "../radix/generate-radix-colors.js"
import { SCALE_STEPS, type ScaleEntry } from "./steps.js"
import { generateTunedScale } from "./tuned.js"

export { SCALE_STEPS, type ScaleEntry, type ScaleStep } from "./steps.js"

/** "accent" is shown as Tuned, "gray" as Standard. */
export type ScaleType = "accent" | "gray"

export type GenerationOptions = {
  hex: string
  scaleType: ScaleType
  lightBackground: string
  darkBackground: string
}

export type GenerationResult = {
  entries: ScaleEntry[]
  /** Tuned only: warnings worth showing next to the preview. */
  notes: string[]
}

// Radix's gray generator still requires an accent input; its accent output
// is discarded.
const UNUSED_ACCENT = "#3B82F6"

// Ratio by which each successive lightness gap grows across the first eight
// steps of the light gray scale. Tunable: higher values keep steps 50 and 100
// closer to white and push more of the total drop toward steps 300-400.
const TOP_GAP_GROWTH = 1.3

/**
 * Re-space the lightness of the second through seventh steps of a light-mode
 * gray scale.
 *
 * In Radix's reference gray scales the first lightness gap is roughly a third
 * of the second, so the second step reads as a duplicate of the first and the
 * third looks like a jump. The first and eighth steps are kept fixed; the
 * steps between are placed so each gap is `TOP_GAP_GROWTH` times the previous
 * one. Only lightness changes: chroma and hue of every step are preserved, and
 * the remaining steps are returned untouched.
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
 * Standard: the Radix gray scale, run once per appearance, with the light
 * top re-spaced. Radix's twelve steps map onto the step names in order.
 */
function generateStandardScale(options: GenerationOptions): GenerationResult {
  const light = generateRadixColors({
    appearance: "light",
    accent: UNUSED_ACCENT,
    gray: options.hex,
    background: options.lightBackground,
  })
  const dark = generateRadixColors({
    appearance: "dark",
    accent: UNUSED_ACCENT,
    gray: options.hex,
    background: options.darkBackground,
  })
  const lightScale = smoothLightGrayTop(light.grayScale)
  const darkScale: string[] = dark.grayScale
  return {
    entries: SCALE_STEPS.map((step, i) => ({
      step,
      light: lightScale[i],
      dark: darkScale[i],
    })),
    notes: [],
  }
}

/** Generate both appearances of a ramp, paired step by step. */
export function generateBiModalScale(
  options: GenerationOptions
): GenerationResult {
  if (options.scaleType === "gray") return generateStandardScale(options)
  return generateTunedScale({
    hex: options.hex,
    lightBackground: options.lightBackground,
    darkBackground: options.darkBackground,
  })
}
