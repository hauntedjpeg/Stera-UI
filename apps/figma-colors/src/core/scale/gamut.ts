import Color from "colorjs.io"
import { expandHex } from "../color/hex.js"

export type Oklch = { L: number; C: number; H: number }

/** Parse a hex color. Achromatic colors get hue 0 rather than NaN. */
export function hexToOklch(hex: string): Oklch {
  const [L, C, H] = new Color(hex).to("oklch").coords
  return {
    L: L ?? 0,
    C: C ?? 0,
    H: H == null || Number.isNaN(H) ? 0 : H,
  }
}

/**
 * Serialize an OKLCH color as a 6-digit sRGB hex. Out-of-gamut input is
 * clipped; callers keep chroma under `cmaxSrgb` so the clip is only a guard.
 */
export function oklchToHex(L: number, C: number, H: number): string {
  const color = new Color("oklch", [L, C, H])
    .to("srgb")
    .toGamut({ method: "clip" })
  return expandHex(color.toString({ format: "hex" }))
}

const CMAX_ITERATIONS = 24
const CMAX_UPPER = 0.4

/**
 * The largest OKLCH chroma that stays inside sRGB at this lightness and hue.
 * A fixed number of bisection steps keeps the result deterministic.
 */
export function cmaxSrgb(L: number, H: number): number {
  let low = 0
  let high = CMAX_UPPER
  for (let i = 0; i < CMAX_ITERATIONS; i++) {
    const mid = (low + high) / 2
    if (new Color("oklch", [L, mid, H]).inGamut("srgb")) low = mid
    else high = mid
  }
  return low
}

/** WCAG 2.1 contrast ratio between two colors, 1..21. */
export function wcag(a: string, b: string): number {
  return new Color(a).contrastWCAG21(new Color(b))
}
