export type Rgba = { r: number; g: number; b: number; a: number }

const srgbToLinear = (c: number): number =>
  c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)

const cbrt = (x: number): number => Math.cbrt(x)

const round = (x: number, digits: number): number => {
  const f = Math.pow(10, digits)
  return Math.round(x * f) / f
}

export function rgbaToOklch({ r, g, b, a }: Rgba): {
  L: number
  C: number
  H: number
  a: number
} {
  const lr = srgbToLinear(r)
  const lg = srgbToLinear(g)
  const lb = srgbToLinear(b)

  const l_ = cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb)
  const m_ = cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb)
  const s_ = cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb)

  const L = 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_
  const A = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_
  const B = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_

  const C = Math.sqrt(A * A + B * B)
  let H = (Math.atan2(B, A) * 180) / Math.PI
  if (H < 0) H += 360
  if (C < 1e-6) H = 0

  return { L, C, H, a }
}

export function rgbaToOklchCss(rgba: Rgba): string {
  const { L, C, H, a } = rgbaToOklch(rgba)
  const Ls = `${round(L * 100, 2)}%`
  const Cs = `${round(C, 4)}`
  const Hs = `${round(H, 2)}`
  if (a < 1) {
    return `oklch(${Ls} ${Cs} ${Hs} / ${round(a, 4)})`
  }
  return `oklch(${Ls} ${Cs} ${Hs})`
}
