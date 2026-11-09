import Color from "colorjs.io"
import { describe, expect, it } from "vitest"
import { generateNeutralScale, type NeutralOptions } from "./neutral.js"
import {
  DEFAULT_NEUTRAL_TARGETS,
  type NeutralTargets,
} from "./neutral-targets.js"
import { SCALE_STEPS, type ScaleEntry } from "./steps.js"

const HEX_6 = /^#[0-9a-f]{6}$/i

/** 8-bit sRGB rounding moves OKLCH lightness by less than this. */
const L_TOLERANCE = 0.006

const GRAYS = ["#8b8d98", "#777777", "#111111", "#f5f5f5"]
const TINTED = ["#859991", "#a89f91", "#6b7280", "#64748b"]
const VIVID = ["#3b82f6", "#f24822", "#d0ee38", "#1e3a8a"]
const SEEDS = [...GRAYS, ...TINTED, ...VIVID]

const PAGES: [string, string][] = [
  ["#ffffff", "#000000"],
  ["#ffffff", "#111111"],
  ["#faf7f2", "#0a0a0a"],
]

function options(patch: Partial<NeutralOptions> = {}): NeutralOptions {
  return {
    hex: "#8b8d98",
    lightBackground: "#ffffff",
    darkBackground: "#000000",
    ...patch,
  }
}

function oklch(hex: string): { L: number; C: number; H: number } {
  const [L, C, H] = new Color(hex).to("oklch").coords
  return { L: L ?? NaN, C: C ?? 0, H: Number.isNaN(H) ? 0 : (H ?? 0) }
}

function lightnesses(entries: ScaleEntry[], mode: "light" | "dark") {
  return entries.map((e) => oklch(e[mode]).L)
}

function hueDistance(a: number, b: number): number {
  const d = Math.abs(a - b) % 360
  return Math.min(d, 360 - d)
}

describe("generateNeutralScale", () => {
  it("returns the twelve named steps as valid hex, with no notes", () => {
    const { entries, notes } = generateNeutralScale(options())
    expect(entries.map((e) => e.step)).toEqual([...SCALE_STEPS])
    for (const entry of entries) {
      expect(entry.light).toMatch(HEX_6)
      expect(entry.dark).toMatch(HEX_6)
    }
    expect(notes).toEqual([])
  })

  it("is deterministic", () => {
    expect(generateNeutralScale(options())).toEqual(
      generateNeutralScale(options())
    )
  })

  it("is strictly ordered for every seed and page: darker in light, lighter in dark", () => {
    const { minGap } = DEFAULT_NEUTRAL_TARGETS
    for (const hex of SEEDS) {
      for (const [lightBackground, darkBackground] of PAGES) {
        const { entries } = generateNeutralScale(
          options({ hex, lightBackground, darkBackground })
        )
        const light = lightnesses(entries, "light")
        const dark = lightnesses(entries, "dark")
        for (let i = 1; i < SCALE_STEPS.length; i++) {
          expect(light[i - 1] - light[i]).toBeGreaterThanOrEqual(
            minGap - L_TOLERANCE
          )
          expect(dark[i] - dark[i - 1]).toBeGreaterThanOrEqual(
            minGap - L_TOLERANCE
          )
        }
      }
    }
  })

  it("puts every step on its target lightness on the default pages, whatever the seed", () => {
    for (const hex of SEEDS) {
      const { entries } = generateNeutralScale(options({ hex }))
      for (const entry of entries) {
        expect(oklch(entry.light).L).toBeCloseTo(
          DEFAULT_NEUTRAL_TARGETS.light.L[entry.step],
          2
        )
        expect(oklch(entry.dark).L).toBeCloseTo(
          DEFAULT_NEUTRAL_TARGETS.dark.L[entry.step],
          2
        )
      }
    }
  })

  it("anchors the first steps to a cream page and leaves the bold band alone", () => {
    const onWhite = generateNeutralScale(options())
    const onCream = generateNeutralScale(
      options({ lightBackground: "#f0e6d8" })
    )
    const white = lightnesses(onWhite.entries, "light")
    const cream = lightnesses(onCream.entries, "light")
    // 25, 50 and 100 follow the page down.
    for (const i of [0, 1, 2]) expect(cream[i]).toBeLessThan(white[i])
    // 800–950 are absolute.
    for (const i of [9, 10, 11]) expect(cream[i]).toBeCloseTo(white[i], 2)
    // The dark ramp did not move.
    expect(onCream.entries.map((e) => e.dark)).toEqual(
      onWhite.entries.map((e) => e.dark)
    )
  })

  it("ignores the backgrounds when not anchored, and sits on its targets", () => {
    const absolute = generateNeutralScale(options({ anchored: false }))
    const moved = generateNeutralScale(
      options({
        anchored: false,
        lightBackground: "#f0e6d8",
        darkBackground: "#1a1a1a",
      })
    )
    expect(moved).toEqual(absolute)
    for (const entry of absolute.entries) {
      expect(oklch(entry.light).L).toBeCloseTo(
        DEFAULT_NEUTRAL_TARGETS.light.L[entry.step],
        2
      )
      expect(oklch(entry.dark).L).toBeCloseTo(
        DEFAULT_NEUTRAL_TARGETS.dark.L[entry.step],
        2
      )
    }
    // Unusable or malformed backgrounds no longer matter.
    expect(() =>
      generateNeutralScale(
        options({ anchored: false, lightBackground: "#999999" })
      )
    ).not.toThrow()
    expect(() =>
      generateNeutralScale(options({ anchored: false, lightBackground: "" }))
    ).not.toThrow()
  })

  it("stays strictly ordered when not anchored", () => {
    const { minGap } = DEFAULT_NEUTRAL_TARGETS
    for (const hex of SEEDS) {
      const { entries } = generateNeutralScale(
        options({ hex, anchored: false })
      )
      const light = lightnesses(entries, "light")
      const dark = lightnesses(entries, "dark")
      for (let i = 1; i < SCALE_STEPS.length; i++) {
        expect(light[i - 1] - light[i]).toBeGreaterThanOrEqual(
          minGap - L_TOLERANCE
        )
        expect(dark[i] - dark[i - 1]).toBeGreaterThanOrEqual(
          minGap - L_TOLERANCE
        )
      }
    }
  })

  it("rejects backgrounds that cannot carry a ramp", () => {
    expect(() =>
      generateNeutralScale(options({ lightBackground: "#999999" }))
    ).toThrow(/light background/i)
    expect(() =>
      generateNeutralScale(options({ darkBackground: "#888888" }))
    ).toThrow(/dark background/i)
    expect(() => generateNeutralScale(options({ hex: "nope" }))).toThrow(
      /invalid hex/i
    )
  })

  it("does not preserve the seed, whatever its lightness", () => {
    // The seed's own lightness is dropped, so it does not land on any step.
    // (A pure gray that happens to sit exactly on a target would, which is
    // why these seeds carry some chroma, like the Standard suite's.)
    for (const hex of ["#f59e0b", "#64748b", "#3b82f6", "#8b8d98"]) {
      const { entries } = generateNeutralScale(options({ hex }))
      const hexes = entries.flatMap((e) => [e.light, e.dark])
      expect(hexes).not.toContain(hex)
    }
  })

  it("keeps gray seeds gray", () => {
    for (const hex of ["#777777", "#111111", "#f5f5f5"]) {
      const { entries } = generateNeutralScale(options({ hex }))
      for (const entry of entries) {
        expect(oklch(entry.light).C).toBeLessThan(0.001)
        expect(oklch(entry.dark).C).toBeLessThan(0.001)
      }
    }
  })

  it("keeps the seed hue at every step where there is chroma to carry it", () => {
    for (const hex of [...TINTED, ...VIVID]) {
      const seed = oklch(hex)
      const { entries } = generateNeutralScale(options({ hex }))
      for (const entry of entries) {
        for (const value of [entry.light, entry.dark]) {
          const { C, H } = oklch(value)
          // 8-bit rounding swings the hue of a near-gray, so allow more
          // slack the less chroma there is, as the Standard suite does.
          if (C < 0.02) continue
          expect(hueDistance(H, seed.H)).toBeLessThan(2 + 0.2 / C)
        }
      }
    }
  })

  it("never exceeds the chroma curve", () => {
    for (const hex of SEEDS) {
      const { entries } = generateNeutralScale(options({ hex }))
      for (const entry of entries) {
        expect(oklch(entry.light).C).toBeLessThanOrEqual(
          DEFAULT_NEUTRAL_TARGETS.light.K[entry.step] + 0.002
        )
        expect(oklch(entry.dark).C).toBeLessThanOrEqual(
          DEFAULT_NEUTRAL_TARGETS.dark.K[entry.step] + 0.002
        )
      }
    }
  })

  it("gives a muted seed less chroma than a vivid one of the same hue", () => {
    const muted = generateNeutralScale(options({ hex: "#64748b" }))
    const vivid = generateNeutralScale(options({ hex: "#3b82f6" }))
    const at = (r: typeof muted, step: number) =>
      oklch(r.entries.find((e) => e.step === step)?.light ?? "#000").C
    expect(at(muted, 500)).toBeLessThan(at(vivid, 500))
    expect(at(muted, 200)).toBeLessThan(at(vivid, 200))
  })

  it("honors custom targets", () => {
    const custom: NeutralTargets = JSON.parse(
      JSON.stringify(DEFAULT_NEUTRAL_TARGETS)
    ) as NeutralTargets
    custom.light.L[500] = 0.5
    custom.dark.L[500] = 0.7
    const { entries } = generateNeutralScale(options(), custom)
    const solid = entries.find((e) => e.step === 500) as ScaleEntry
    expect(oklch(solid.light).L).toBeCloseTo(0.5, 2)
    expect(oklch(solid.dark).L).toBeCloseTo(0.7, 2)
  })
})
