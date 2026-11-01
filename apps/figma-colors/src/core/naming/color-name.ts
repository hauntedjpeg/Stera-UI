import { colornames } from "color-name-list"
import { normalizeHex } from "../color/hex.js"

const FALLBACK_NAME = "Color"

/**
 * Suggest a color name by finding the nearest match in the color-name-list
 * database (~30,000 named colors) using RGB Euclidean distance.
 */
export function suggestColorName(hex: string): string {
  const target = normalizeHex(hex)
  if (!target) return FALLBACK_NAME

  const tr = parseInt(target.slice(1, 3), 16)
  const tg = parseInt(target.slice(3, 5), 16)
  const tb = parseInt(target.slice(5, 7), 16)

  let bestName = FALLBACK_NAME
  let bestDist = Infinity

  for (const entry of colornames) {
    const h = entry.hex.replace("#", "")
    if (h.length !== 6) continue
    const dr = tr - parseInt(h.slice(0, 2), 16)
    const dg = tg - parseInt(h.slice(2, 4), 16)
    const db = tb - parseInt(h.slice(4, 6), 16)
    const dist = dr * dr + dg * dg + db * db
    if (dist < bestDist) {
      bestDist = dist
      bestName = entry.name
    }
  }

  return bestName
}
