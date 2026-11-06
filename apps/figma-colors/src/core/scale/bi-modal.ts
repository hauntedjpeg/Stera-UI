import { generateSemanticScale } from "./semantic.js"
import { generateStandardScale } from "./standard.js"
import { type ScaleEntry } from "./steps.js"

export { SCALE_STEPS, type ScaleEntry, type ScaleStep } from "./steps.js"

/** "accent" is shown as Semantic, "gray" as Standard. */
export type ScaleType = "accent" | "gray"

export type GenerationOptions = {
  hex: string
  scaleType: ScaleType
  /** Semantic only: Standard ramps are absolute and ignore the page. */
  lightBackground: string
  darkBackground: string
}

export type GenerationResult = {
  entries: ScaleEntry[]
  /** Semantic only: warnings worth showing next to the preview. */
  notes: string[]
}

/** Generate both appearances of a ramp, paired step by step. */
export function generateBiModalScale(
  options: GenerationOptions
): GenerationResult {
  if (options.scaleType === "gray") {
    return generateStandardScale({ hex: options.hex })
  }
  return generateSemanticScale({
    hex: options.hex,
    lightBackground: options.lightBackground,
    darkBackground: options.darkBackground,
  })
}
