import { describe, expect, it } from "vitest"
import { normalizeHex } from "../color/hex.js"
import { hexToOklch, wcag } from "./gamut.js"
import { SCALE_STEPS, type ScaleStep } from "./steps.js"
import {
  DEFAULT_TARGETS,
  FIXED_STEPS,
  ladder,
  type FixedStep,
  type Mode,
  type Targets,
} from "./targets.js"
import {
  backgroundError,
  generateTunedScale,
  type TunedOptions,
} from "./tuned.js"

const HEX_6 = /^#[0-9a-f]{6}$/

/** The seeds behind the live accent, warning, success, danger and brand ramps. */
const LIVE = {
  lime: "#d0ee38",
  yellow: "#ffd800",
  green: "#14ae5c",
  red: "#f24822",
  nearBlack: "#111111",
}
/** Seeds whose chroma reaches the curve at their own lightness (vividness 1). */
const VIVID = [
  LIVE.lime,
  LIVE.yellow,
  LIVE.green,
  LIVE.red,
  "#3b82f6",
  "#f9a8d4",
]
/** Chromatic seeds below full vividness. */
const MUTED = ["#1e3a8a", "#0d9488"]
const ACHROMATIC = ["#808080", "#000000", "#ffffff", LIVE.nearBlack]
const ALL = [...VIVID, ...MUTED, ...ACHROMATIC]
const MODES: Mode[] = ["light", "dark"]
const PAGES = [
  { lightBackground: "#ffffff", darkBackground: "#000000" },
  { lightBackground: "#faf7f2", darkBackground: "#111111" },
]
/** Hues outside the yellow range, whose shades keep the seed hue. */
const YELLOW_RANGE = DEFAULT_TARGETS.hueShift.range

function options(patch: Partial<TunedOptions>): TunedOptions {
  return {
    hex: "#3b82f6",
    lightBackground: "#ffffff",
    darkBackground: "#000000",
    ...patch,
  }
}

type Result = ReturnType<typeof generateTunedScale>

function hexAt(result: Result, step: ScaleStep, mode: Mode): string {
  const entry = result.entries.find((e) => e.step === step)
  if (!entry) throw new Error(`missing step ${step}`)
  return entry[mode]
}

function L(result: Result, step: ScaleStep, mode: Mode): number {
  return hexToOklch(hexAt(result, step, mode)).L
}

function isYellow(hex: string): boolean {
  const { H } = hexToOklch(hex)
  return H >= YELLOW_RANGE[0] && H <= YELLOW_RANGE[1]
}

function hueDistance(a: number, b: number): number {
  const d = Math.abs(a - b) % 360
  return d > 180 ? 360 - d : d
}

describe("generateTunedScale", () => {
  it("returns 24 six-digit hexes in step order and is deterministic", () => {
    for (const hex of ALL) {
      const a = generateTunedScale(options({ hex }))
      const b = generateTunedScale(options({ hex }))
      expect(a).toEqual(b)
      expect(a.entries.map((e) => e.step)).toEqual([...SCALE_STEPS])
      for (const entry of a.entries) {
        expect(entry.light).toMatch(HEX_6)
        expect(entry.dark).toMatch(HEX_6)
      }
    }
  })

  it("puts every fixed step on its target lightness for every seed and page", () => {
    for (const page of PAGES) {
      for (const mode of MODES) {
        const background =
          mode === "light" ? page.lightBackground : page.darkBackground
        const targets = ladder(mode, hexToOklch(background).L, DEFAULT_TARGETS)
        for (const hex of ALL) {
          const result = generateTunedScale(options({ hex, ...page }))
          for (const step of FIXED_STEPS) {
            expect(
              Math.abs(L(result, step, mode) - targets[step]),
              `${hex} ${mode} ${step} on ${background}`
            ).toBeLessThan(0.005)
          }
        }
      }
    }
  })

  it("gives vivid seeds the curve chroma where the gamut allows it", () => {
    // 300 and 400 clamp for teal and yellow in light mode, 800 for dark
    // oranges; that is the sRGB gamut, not the generator.
    const exact: FixedStep[] = [25, 50, 100, 200, 900, 950]
    const clamped: FixedStep[] = [300, 400, 800]
    for (const mode of MODES) {
      for (const hex of VIVID) {
        const result = generateTunedScale(options({ hex }))
        for (const step of exact) {
          const { C } = hexToOklch(hexAt(result, step, mode))
          const k = DEFAULT_TARGETS[mode].K[step]
          expect(Math.abs(C - k), `${hex} ${mode} ${step}`).toBeLessThan(0.002)
        }
        for (const step of clamped) {
          const { C } = hexToOklch(hexAt(result, step, mode))
          const k = DEFAULT_TARGETS[mode].K[step]
          expect(C, `${hex} ${mode} ${step}`).toBeLessThan(k + 0.002)
        }
      }
    }
  })

  it("writes the seed verbatim at light 500", () => {
    for (const page of PAGES) {
      for (const hex of ALL) {
        const result = generateTunedScale(options({ hex, ...page }))
        expect(hexAt(result, 500, "light")).toBe(normalizeHex(hex))
      }
    }
  })

  it("keeps the seed at dark 500 when it stands out against the dark page", () => {
    for (const hex of [
      LIVE.lime,
      LIVE.yellow,
      LIVE.green,
      LIVE.red,
      "#3b82f6",
    ]) {
      const result = generateTunedScale(options({ hex }))
      expect(wcag(hex, "#000000")).toBeGreaterThanOrEqual(
        DEFAULT_TARGETS.darkSolidMinContrast
      )
      expect(hexAt(result, 500, "dark")).toBe(normalizeHex(hex))
      expect(result.notes.some((n) => /lifted/.test(n))).toBe(false)
    }
  })

  it("lifts a dim dark solid to the seed's light-page contrast, with a note", () => {
    for (const page of PAGES) {
      for (const hex of [LIVE.nearBlack, "#1e3a8a"]) {
        const result = generateTunedScale(options({ hex, ...page }))
        expect(wcag(hex, page.darkBackground)).toBeLessThan(
          DEFAULT_TARGETS.darkSolidMinContrast
        )
        const goal = wcag(hex, page.lightBackground)
        const got = wcag(hexAt(result, 500, "dark"), page.darkBackground)
        expect(
          Math.abs(got - goal),
          `${hex} on ${page.darkBackground}`
        ).toBeLessThan(0.3)
        expect(result.notes.some((n) => /lifted/.test(n))).toBe(true)
      }
    }
  })

  it("orders the seed band away from the page, or back when the seed is past 950", () => {
    for (const page of PAGES) {
      for (const hex of ALL) {
        const result = generateTunedScale(options({ hex, ...page }))
        for (const mode of MODES) {
          const solid = L(result, 500, mode)
          const bold = L(result, 950, mode)
          const roomAway = mode === "light" ? solid : 1 - solid
          const reversed =
            (mode === "light" ? solid < bold : solid > bold) ||
            roomAway < DEFAULT_TARGETS.stateDelta[1]
          // +1 when the states get lighter, -1 when they get darker.
          const direction = (mode === "light") === reversed ? 1 : -1
          const room = direction > 0 ? 1 - solid : solid
          // Pure black and white have no room either way (less 8-bit rounding).
          const gap = Math.min(0.02, room / 2) - 0.004
          const label = `${hex} ${mode} on ${page[`${mode}Background`]}`
          expect(
            (L(result, 600, mode) - solid) * direction,
            label
          ).toBeGreaterThanOrEqual(gap)
          expect(
            (L(result, 700, mode) - L(result, 600, mode)) * direction,
            label
          ).toBeGreaterThanOrEqual(gap)
          const word = mode === "light" ? "Light" : "Dark"
          expect(
            result.notes.some((n) => n.startsWith(`${word} solid has no room`)),
            label
          ).toBe(reversed)
        }
        expect(L(result, 950, "light")).toBeLessThan(L(result, 900, "light"))
        expect(L(result, 900, "light")).toBeLessThan(L(result, 800, "light"))
        expect(L(result, 950, "dark")).toBeGreaterThan(L(result, 900, "dark"))
        expect(L(result, 900, "dark")).toBeGreaterThan(L(result, 800, "dark"))
      }
    }
  })

  it("reverses the states for seeds with no room away from the page", () => {
    // Near-black is past light 950; lime is within the pressed offset of white.
    const brand = generateTunedScale(options({ hex: LIVE.nearBlack }))
    expect(L(brand, 600, "light")).toBeGreaterThan(L(brand, 500, "light"))
    expect(brand.notes.some((n) => /Light solid has no room/.test(n))).toBe(
      true
    )
    const lime = generateTunedScale(options({ hex: LIVE.lime }))
    expect(L(lime, 600, "dark")).toBeLessThan(L(lime, 500, "dark"))
    expect(L(lime, 700, "dark")).toBeLessThan(L(lime, 600, "dark"))
    expect(lime.notes.some((n) => /Dark solid has no room/.test(n))).toBe(true)
    // A mid blue keeps the normal direction in both modes.
    const blue = generateTunedScale(options({ hex: "#3b82f6" }))
    expect(L(blue, 600, "light")).toBeLessThan(L(blue, 500, "light"))
    expect(L(blue, 600, "dark")).toBeGreaterThan(L(blue, 500, "dark"))
    expect(blue.notes.some((n) => /has no room/.test(n))).toBe(false)
  })

  it("keeps the seed hue through the states and shades, except for yellows", () => {
    const steps: ScaleStep[] = [600, 700, 800, 900, 950]
    for (const hex of [...VIVID, ...MUTED].filter((h) => !isYellow(h))) {
      const seedHue = hexToOklch(hex).H
      const result = generateTunedScale(options({ hex }))
      for (const mode of MODES) {
        for (const step of steps) {
          const { C, H } = hexToOklch(hexAt(result, step, mode))
          if (C < 0.02) continue
          // 8-bit rounding moves the hue of a low-chroma color by a few degrees.
          const tolerance = 2 + 0.2 / C
          expect(
            hueDistance(H, seedHue),
            `${hex} ${mode} ${step}`
          ).toBeLessThan(tolerance)
        }
      }
    }
  })

  it("rotates dark yellows toward orange, more the darker they get", () => {
    const yellow = LIVE.yellow
    const seedHue = hexToOklch(yellow).H
    expect(isYellow(yellow)).toBe(true)
    const result = generateTunedScale(options({ hex: yellow }))
    const shades: ScaleStep[] = [800, 900, 950]
    let previous = seedHue
    for (const step of shades) {
      const { H } = hexToOklch(hexAt(result, step, "light"))
      expect(H, `${step}`).toBeLessThan(previous + 0.5)
      previous = H
    }
    expect(previous).toBeLessThan(seedHue - 5)
    const dark25 = hexToOklch(hexAt(result, 25, "dark")).H
    expect(dark25).toBeLessThan(seedHue - 5)
  })

  it("keeps gray seeds gray with no NaN anywhere", () => {
    for (const hex of ACHROMATIC) {
      const result = generateTunedScale(options({ hex }))
      for (const entry of result.entries) {
        for (const mode of MODES) {
          const { L, C, H } = hexToOklch(entry[mode])
          expect(Number.isNaN(L) || Number.isNaN(H)).toBe(false)
          expect(C, `${hex} ${mode} ${entry.step}`).toBeLessThan(0.001)
        }
      }
    }
  })

  it("notes a seed too faint to be ink", () => {
    expect(
      generateTunedScale(options({ hex: LIVE.yellow })).notes.some((n) =>
        /Ink at 500/.test(n)
      )
    ).toBe(true)
    expect(
      generateTunedScale(options({ hex: "#1e3a8a" })).notes.some((n) =>
        /Ink at 500/.test(n)
      )
    ).toBe(false)
  })

  it("applies custom targets", () => {
    const custom: Targets = {
      ...DEFAULT_TARGETS,
      light: {
        ...DEFAULT_TARGETS.light,
        L: { ...DEFAULT_TARGETS.light.L, 25: 0.9 },
      },
      stateDelta: [0.1, 0.2],
    }
    const result = generateTunedScale(options({}), custom)
    expect(Math.abs(L(result, 25, "light") - 0.9)).toBeLessThan(0.005)
    const seedL = hexToOklch("#3b82f6").L
    expect(Math.abs(seedL - 0.1 - L(result, 600, "light"))).toBeLessThan(0.01)
  })

  it("rejects backgrounds a ramp cannot sit on", () => {
    expect(backgroundError("#ffffff", "#000000")).toBeNull()
    expect(backgroundError("#faf7f2", "#111111")).toBeNull()
    expect(backgroundError("#cccccc", "#000000")).toMatch(/too dark/)
    expect(backgroundError("#ffffff", "#777777")).toMatch(/too light/)
    expect(backgroundError("nope", "#000000")).toMatch(/hex/)
    expect(() =>
      generateTunedScale(options({ lightBackground: "#cccccc" }))
    ).toThrow(/too dark/)
  })
})
