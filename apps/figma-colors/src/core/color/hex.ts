export const HEX_RE = /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/

/** Channels in 0..1, the shape Figma's `RGB` uses. */
export type Rgb = { r: number; g: number; b: number }

/**
 * Validates and normalizes user input to "#rrggbb" (lowercase).
 * Returns null if the input is not a valid 3- or 6-digit hex.
 */
export function normalizeHex(input: string): string | null {
  const match = input.match(HEX_RE)
  if (!match) return null
  let hex = match[1]
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
  }
  return "#" + hex.toLowerCase()
}

/**
 * Expands shorthand hex ("#fff" / "fff") to "#ffffff" (lowercase).
 * Returns the input unchanged if it is not a valid hex string.
 */
export function expandHex(hex: string): string {
  return normalizeHex(hex) ?? hex
}

/** Hex formatted for display and copying: "#FFFFFF". */
export function displayHex(hex: string): string {
  return expandHex(hex).toUpperCase()
}

/** Converts a 3- or 6-digit hex to 0..1 channels. Throws on invalid input. */
export function hexToRgb(hex: string): Rgb {
  const normalized = normalizeHex(hex)
  if (!normalized) throw new Error(`Invalid hex color: ${hex}`)
  return {
    r: parseInt(normalized.slice(1, 3), 16) / 255,
    g: parseInt(normalized.slice(3, 5), 16) / 255,
    b: parseInt(normalized.slice(5, 7), 16) / 255,
  }
}

/** Perceived-brightness check for picking dark or light text over a swatch. */
export function isLightColor(hex: string): boolean {
  const { r, g, b } = hexToRgb(hex)
  return (r * 0.299 + g * 0.587 + b * 0.114) * 255 > 150
}
