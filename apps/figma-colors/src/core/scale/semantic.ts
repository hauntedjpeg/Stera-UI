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
 *   page (darker in light mode, lighter in dark mode). Each state keeps at
 *   least `stateMinContrast` against the step before it. A seed with no room
 *   for that, past the bold step or too near black or white, has its states
 *   step back toward the page instead.
 * - 800–950, the bold surface: fixed again. 800 is the bold surface and 900
 *   and 950 are its hover and pressed states, moving further from the page;
 *   950 is the darkest step in light mode and the lightest tinted surface in
 *   dark mode.
 *
 * Dark mode has no seed of its own. Dark 500 is the seed when it has enough
 * contrast against the dark page, otherwise it is lifted so it has the same
 * contrast against the dark page that the seed has against the light page.
 */
export type SemanticOptions = {
  hex: string
  lightBackground: string
  darkBackground: string
}

export type SemanticResult = {
  entries: ScaleEntry[]
  /** Warnings worth showing next to the preview. */
  notes: string[]
}

/** Seeds under this chroma are treated as gray: no hue, no tint. */
const ACHROMATIC_C = 0.005
/** `ink-x` aliases the seed; below this against the page it gets a note. */
const INK_MIN_CONTRAST = 4.5
const LIFT_ITERATIONS = 24
const STATE_ITERATIONS = 24

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

export function generateSemanticScale(
  options: SemanticOptions,
  targets: Targets = DEFAULT_TARGETS
): SemanticResult {
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
 * away from the page by `stateDelta`, each pushed further when it has less
 * than `stateMinContrast` against the step before (OKLCH lightness barely
 * changes the color near black). A solid past the bold step, or with no room
 * for two such states away from the page, moves toward the page instead;
 * returns true when that happens.
 */
function seedBand(
  ramp: Ramp,
  solid: Oklch,
  mode: Mode,
  targets: Targets
): boolean {
  const towardPage = mode === "light" ? 1 : -1
  const pastBold =
    mode === "light" ? solid.L < ramp[950].L : solid.L > ramp[950].L
  const preferred = pastBold ? towardPage : -towardPage
  const base = stateColor(solid, solid.L, targets)
  let direction = preferred
  let states = stateSteps(solid, base, direction, targets)
  if (!states) {
    direction = -preferred
    states = stateSteps(solid, base, direction, targets)
  }
  if (!states) {
    direction = preferred
    states = compressedSteps(solid, direction, targets)
  }
  ramp[500] = base
  ramp[600] = states[0]
  ramp[700] = states[1]
  return direction === towardPage
}

/** 600 and 700 moving `direction` (+1 lighter), or null when they don't fit. */
function stateSteps(
  solid: Oklch,
  base: Oklch,
  direction: number,
  targets: Targets
): [Oklch, Oklch] | null {
  const [d1, d2] = targets.stateDelta
  const hover = stateStep(
    solid,
    base,
    base.L + direction * d1,
    direction,
    targets
  )
  if (!hover) return null
  const pressed = stateStep(
    solid,
    hover,
    hover.L + direction * (d2 - d1),
    direction,
    targets
  )
  return pressed ? [hover, pressed] : null
}

/**
 * The state at lightness `L`, or further along `direction` until it has
 * `stateMinContrast` against `previous`. Null when even the end of the range
 * falls short.
 */
function stateStep(
  solid: Oklch,
  previous: Oklch,
  L: number,
  direction: number,
  targets: Targets
): Oklch | null {
  const from = toHex(previous)
  const contrastAt = (lightness: number) =>
    wcag(from, toHex(stateColor(solid, lightness, targets)))
  const floor = targets.stateMinContrast
  const start = clamp01(L)
  if (contrastAt(start) >= floor) return stateColor(solid, start, targets)
  const end = direction > 0 ? 1 : 0
  if (contrastAt(end) < floor) return null
  let near = start
  let far = end
  for (let i = 0; i < STATE_ITERATIONS; i++) {
    const mid = (near + far) / 2
    if (contrastAt(mid) < floor) near = mid
    else far = mid
  }
  return stateColor(solid, far, targets)
}

/** The plain offsets, squeezed into whatever room is left. A last resort. */
function compressedSteps(
  solid: Oklch,
  direction: number,
  targets: Targets
): [Oklch, Oklch] {
  const [d1, d2] = targets.stateDelta
  const available = direction < 0 ? solid.L : 1 - solid.L
  const at = (delta: number) =>
    stateColor(solid, clamp01(solid.L + direction * delta), targets)
  return [at(Math.min(d1, available / 2)), at(Math.min(d2, available))]
}

/** The solid's hue and chroma at lightness `L`, within the gamut. */
function stateColor(solid: Oklch, L: number, targets: Targets): Oklch {
  if (solid.C < ACHROMATIC_C) return { L, C: 0, H: 0 }
  const H = shiftedHue(solid.H, L, targets.hueShift)
  return { L, C: Math.min(solid.C, cmaxSrgb(L, H)), H }
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
  for (const step of SCALE_STEPS) out[step] = toHex(ramp[step])
  return out
}

function toHex({ L, C, H }: Oklch): string {
  return oklchToHex(L, C, H)
}

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value))
}

function percent(value: number): string {
  return `${Math.round(value * 100)}%`
}
