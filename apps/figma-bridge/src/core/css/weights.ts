/**
 * Font-style names Figma uses for weights. A text style exposes its weight as
 * one unless a number variable is bound, and a text variable bound to weight
 * holds one too (Figma binds it to `fontStyle` and ignores numeric strings).
 */
const STYLE_NAME_WEIGHTS: Record<string, number> = {
  thin: 100,
  extralight: 200,
  ultralight: 200,
  light: 300,
  regular: 400,
  normal: 400,
  book: 400,
  medium: 500,
  semibold: 600,
  demibold: 600,
  bold: 700,
  extrabold: 800,
  ultrabold: 800,
  black: 900,
  heavy: 900,
}

/** `"SemiBold"`, `"Semi Bold"` → 600. Null for anything that isn't a name. */
export function weightFromStyleName(fontStyle: string): number | null {
  const key = fontStyle.toLowerCase().replace(/[^a-z]/g, "")
  return STYLE_NAME_WEIGHTS[key] ?? null
}

/** Whether an exported name's head (prefix stripped) is a font weight. */
export function isWeightHead(head: string): boolean {
  return /^(font-)?weight(-|$)/.test(head)
}
