import { normalizeHex } from "../color/hex.js"
import { cmaxSrgb, hexToOklch, oklchToHex, wcag, type Oklch } from "./gamut.js"
import { SCALE_STEPS, type ScaleEntry, type ScaleStep } from "./steps.js"
import {
  DARK_BG_MAX_L,
  DEFAULT_TARGETS,
  FIXED_STEPS,
  ladder,
  LIGHT_BG_MIN_L,
  shiftedHue,
  type FixedStep,
  type Mode,
  type Targets,
} from "./targets.js"

/**
 * Stera's own ramp generator for semantic families (brand, accent, success,
 * ...). Steps are roles, not an even lightness scale, in three bands:
 *
 * - 25–400, the subtle and muted surfaces: fixed lightness and chroma shared
 *   by every family, so `Success/Light/50` and `Brand/Light/50` are the same
 *   tint in different hues. Only the seed's hue and vividness flow in.
 * - 500–700, the solid: 500 is the seed verbatim, 600 and 700 are the hover
 *   and pressed states with one and two notches more contrast against the
 *   page (darker in light mode, lighter in dark mode). A seed with no room
 *   that way, past the bold step or within the pressed offset of the end of
 *   the range, has its states step back toward the page instead.
 * - 800–950, the bold surface: fixed again. 950 is the darkest step in light
 *   mode and the lightest tinted surface in dark mode; 900 and 800 are its
 *   hover and pressed states, stepping back toward the seed.
 *
 * Dark mode has no seed of its own. Dark 500 is the seed when it has enough
 * contrast against the dark page, otherwise it is lifted so it has the same
 * contrast against the dark page that the seed has against the light page.
 */
export type TunedOptions = {
  hex: string
  lightBackground: string
  darkBackground: string
}

export type TunedResult = {
  entries: ScaleEntry[]
  /** Warnings worth showing next to the preview. */
  notes: string[]
}

/** Seeds under this chroma are treated as gray: no hue, no tint. */
const ACHROMATIC_C = 0.005
/** `ink-x` aliases the seed; below this against the page it gets a note. */
const INK_MIN_CONTRAST = 4.5
const LIFT_ITERATIONS = 24

type Ramp = Record<ScaleStep, Oklch>
type Hexes = Record<ScaleStep, string>

/** A reason the backgrounds cannot carry a ramp, or null when they can. */
export function backgroundError(
  lightBackground: string,
  darkBackground: string
): string | null {
  const light = normalizeHex(lightBackground)
  const dark = normalizeHex(darkBackground)
  if (!light || !dark) return "Backgrounds must be hex colors."
  const lightL = hexToOklch(light).L
  const darkL = hexToOklch(dark).L
  if (lightL < LIGHT_BG_MIN_L) {
    return `Light background is too dark for a light ramp (L ${percent(lightL)}, needs ${percent(LIGHT_BG_MIN_L)} or more).`
  }
  if (darkL > DARK_BG_MAX_L) {
    return `Dark background is too light for a dark ramp (L ${percent(darkL)}, needs ${percent(DARK_BG_MAX_L)} or less).`
  }
  return null
}

export function generateTunedScale(
  options: TunedOptions,
  targets: Targets = DEFAULT_TARGETS
): TunedResult {
  const error = backgroundError(options.lightBackground, options.darkBackground)
  if (error) throw new Error(error)
  const hex = normalizeHex(options.hex)
  if (!hex) throw new Error(`Invalid hex color: ${options.hex}`)
  const lightBg = normalizeHex(options.lightBackground) as string
  const darkBg = normalizeHex(options.darkBackground) as string

  const seed = hexToOklch(hex)
  const gray = seed.C < ACHROMATIC_C
  const H = gray ? 0 : seed.H
  const lightL = ladder("light", hexToOklch(lightBg).L, targets)
  const darkL = ladder("dark", hexToOklch(darkBg).L, targets)
  const s = gray ? 0 : vividness(seed, lightL, targets.light)
  const notes: string[] = []

  const light = fixedRamp("light", lightL, H, s, targets)
  if (seedBand(light, seed, "light", targets)) {
    notes.push(
      "Light solid has no room to get darker, so its hover and pressed states get lighter."
    )
  }
  const lightHexes = toHexes(light)
  lightHexes[500] = hex

  const dark = fixedRamp("dark", darkL, H, s, targets)
  const lifted = liftDarkSolid(seed, hex, lightBg, darkBg, targets)
  if (lifted.note) notes.push(lifted.note)
  if (seedBand(dark, lifted.color, "dark", targets)) {
    notes.push(
      "Dark solid has no room to get lighter, so its hover and pressed states get darker."
    )
  }
  const darkHexes = toHexes(dark)
  if (!lifted.moved) darkHexes[500] = hex

  const ink = wcag(hex, lightBg)
  if (ink < INK_MIN_CONTRAST) {
    notes.push(
      `Ink at 500 is ${ink.toFixed(1)}:1 against the light page; small text needs 4.5:1.`
    )
  }

  const entries = SCALE_STEPS.map((step) => ({
    step,
    light: lightHexes[step],
    dark: darkHexes[step],
  }))
  return { entries, notes }
}

/** The nine shared steps: target lightness, curve chroma scaled by vividness, seed hue. */
function fixedRamp(
  mode: Mode,
  L: Record<FixedStep, number>,
  H: number,
  s: number,
  targets: Targets
): Ramp {
  const ramp = {} as Ramp
  for (const step of FIXED_STEPS) {
    const hue = s === 0 ? 0 : shiftedHue(H, L[step], targets.hueShift)
    const chroma =
      s === 0 ? 0 : Math.min(s * targets[mode].K[step], cmaxSrgb(L[step], hue))
    ramp[step] = { L: L[step], C: chroma, H: hue }
  }
  return ramp
}

/**
 * Fill 500–700 from the solid: the solid itself, then two states that move
 * away from the page. A solid past the bold step, or too near the end of the
 * range for the pressed offset, has no room that way, so its states move
 * toward the page instead; returns true when that happens. Pure black and
 * white have no room either way, so the offsets also compress to fit.
 */
function seedBand(
  ramp: Ramp,
  solid: Oklch,
  mode: Mode,
  targets: Targets
): boolean {
  const bold = ramp[950].L
  const [d1, d2] = targets.stateDelta
  const roomAway = mode === "light" ? solid.L : 1 - solid.L
  const reversed =
    (mode === "light" ? solid.L < bold : solid.L > bold) || roomAway < d2
  const towardPage = mode === "light" ? 1 : -1
  const away = reversed ? towardPage : -towardPage
  const available = away < 0 ? solid.L : 1 - solid.L
  const deltas = [0, Math.min(d1, available / 2), Math.min(d2, available)]
  const steps: ScaleStep[] = [500, 600, 700]
  steps.forEach((step, i) => {
    const L = clamp01(solid.L + away * deltas[i])
    const gray = solid.C < ACHROMATIC_C
    const H = gray ? 0 : shiftedHue(solid.H, L, targets.hueShift)
    const C = gray ? 0 : Math.min(solid.C, cmaxSrgb(L, H))
    ramp[step] = { L, C, H }
  })
  return reversed
}

/**
 * The dark solid. The seed itself when it stands out enough against the dark
 * page; otherwise lightened, keeping hue and chroma where the gamut allows,
 * until it has the contrast the seed has against the light page.
 */
function liftDarkSolid(
  seed: Oklch,
  hex: string,
  lightBg: string,
  darkBg: string,
  targets: Targets
): { color: Oklch; moved: boolean; note: string | null } {
  const current = wcag(hex, darkBg)
  if (current >= targets.darkSolidMinContrast) {
    return { color: seed, moved: false, note: null }
  }
  const goal = wcag(hex, lightBg)
  const at = (L: number): Oklch => ({
    L,
    C: Math.min(seed.C, cmaxSrgb(L, seed.H)),
    H: seed.H,
  })
  const contrastAt = (L: number) => {
    const { C, H } = at(L)
    return wcag(oklchToHex(L, C, H), darkBg)
  }
  if (contrastAt(1) < goal) {
    const color = at(1)
    return {
      color,
      moved: true,
      note: `Dark solid lifted to white (${contrastAt(1).toFixed(1)}:1); the seed's ${goal.toFixed(1)}:1 against the light page is out of reach.`,
    }
  }
  let low = seed.L
  let high = 1
  for (let i = 0; i < LIFT_ITERATIONS; i++) {
    const mid = (low + high) / 2
    if (contrastAt(mid) < goal) low = mid
    else high = mid
  }
  const color = at(high)
  return {
    color,
    moved: true,
    note: `Dark solid lifted to L ${percent(high)} so it keeps the seed's ${goal.toFixed(1)}:1 against the page (the seed is ${current.toFixed(1)}:1 on the dark page).`,
  }
}

/**
 * How vivid the seed is relative to the chroma curve at its own lightness,
 * 0..1. The curve is the fixed steps plus the solid reference point.
 */
function vividness(
  seed: Oklch,
  L: Record<FixedStep, number>,
  mode: Targets["light"]
): number {
  const points = [
    ...FIXED_STEPS.map((step) => ({ L: L[step], k: mode.K[step] })),
    { L: mode.solidRef.L, k: mode.solidRef.K },
  ].sort((a, b) => a.L - b.L)
  let k = points[points.length - 1].k
  if (seed.L <= points[0].L) {
    k = points[0].k
  } else {
    for (let i = 1; i < points.length; i++) {
      if (seed.L <= points[i].L) {
        const a = points[i - 1]
        const b = points[i]
        const t = (seed.L - a.L) / (b.L - a.L)
        k = a.k + (b.k - a.k) * t
        break
      }
    }
  }
  return Math.min(1, Math.max(0, seed.C / k))
}

function toHexes(ramp: Ramp): Hexes {
  const out = {} as Hexes
  for (const step of SCALE_STEPS) {
    const { L, C, H } = ramp[step]
    out[step] = oklchToHex(L, C, H)
  }
  return out
}

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value))
}

function percent(value: number): string {
  return `${Math.round(value * 100)}%`
}
