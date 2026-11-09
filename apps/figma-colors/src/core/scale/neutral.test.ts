import Color from "colorjs.io"
import { describe, expect, it } from "vitest"
import { generateNeutralScale, type NeutralOptions } from "./neutral.js"
import {
  DEFAULT_NEUTRAL_TARGETS,
  type NeutralTargets,
} from "./neutral-targets.js"
import { SCALE_STEPS, type ScaleEntry } from "./steps.js"

const HEX_6 = /^#[0-9a-f]{6}$/i

/** 8-bit sRGB rounding moves OKLCH lightness by less than this... */
const L_TOLERANCE = 0.006
/** ...except near black, where one 8-bit step is a large OKLCH move. */
const NEAR_BLACK_L_TOLERANCE = 0.015
/** Below this lightness, rounding also smears chroma onto gray-ish steps. */
const NEAR_BLACK_L = 0.15

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

  it("starts at the page: 25 is the background, 50 and 100 sit at least their offsets away and never nearer than their targets", () => {
    const { light, dark } = DEFAULT_NEUTRAL_TARGETS
    for (const hex of SEEDS) {
      for (const [lightBackground, darkBackground] of PAGES) {
        const { entries } = generateNeutralScale(
          options({ hex, lightBackground, darkBackground })
        )
        const pageLight = oklch(lightBackground).L
        const pageDark = oklch(darkBackground).L
        for (const step of [25, 50, 100] as const) {
          const entry = entries.find((e) => e.step === step) as ScaleEntry
          const fromLight = Math.max(0, pageLight - (light.offsets[step] ?? 0))
          const fromDark = Math.min(1, pageDark + (dark.offsets[step] ?? 0))
          const wantLight =
            step === 25 ? fromLight : Math.min(fromLight, light.L[step])
          const wantDark =
            step === 25 ? fromDark : Math.max(fromDark, dark.L[step])
          expect(Math.abs(oklch(entry.light).L - wantLight)).toBeLessThan(
            L_TOLERANCE
          )
          // 8-bit sRGB is coarse near black, so dark steps get more slack.
          expect(Math.abs(oklch(entry.dark).L - wantDark)).toBeLessThan(
            NEAR_BLACK_L_TOLERANCE
          )
        }
      }
    }
  })

  it("keeps 50 and 100 subtle on a dark page lifted off black", () => {
    // #0f0f0f is already near where 50 sits on black; the first steps must
    // stay close above it rather than jump by the black-page distances.
    const { entries } = generateNeutralScale(
      options({ hex: "#000000", darkBackground: "#0f0f0f" })
    )
    const dark = lightnesses(entries, "dark")
    const page = oklch("#0f0f0f").L
    expect(dark[0]).toBeCloseTo(page, 1)
    expect(dark[1] - page).toBeLessThan(0.06)
    expect(dark[2] - page).toBeLessThan(0.1)
    // And the rest still climbs in order from there.
    for (let i = 1; i < dark.length; i++) {
      expect(dark[i]).toBeGreaterThan(dark[i - 1])
    }
  })

  it("makes 25 the page itself on pure white and black", () => {
    const { entries } = generateNeutralScale(options({ hex: "#000000" }))
    expect(entries[0].light).toBe("#ffffff")
    expect(entries[0].dark).toBe("#000000")
  })

  it("puts 200–950 on their target lightness on the default pages, whatever the seed", () => {
    for (const hex of SEEDS) {
      const { entries } = generateNeutralScale(options({ hex }))
      for (const entry of entries) {
        if (entry.step < 200) continue
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
    // 25, 50 and 100 follow the page down by the page's own drop.
    const drop = 1 - oklch("#f0e6d8").L
    for (const i of [0, 1, 2]) {
      expect(white[i] - cream[i]).toBeCloseTo(drop, 1)
    }
    // 800–950 are absolute.
    for (const i of [9, 10, 11]) expect(cream[i]).toBeCloseTo(white[i], 2)
    // The dark ramp did not move.
    expect(onCream.entries.map((e) => e.dark)).toEqual(
      onWhite.entries.map((e) => e.dark)
    )
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
        for (const mode of ["light", "dark"] as const) {
          const { L, C } = oklch(entry[mode])
          const slack = L < NEAR_BLACK_L ? 0.012 : 0.002
          expect(C).toBeLessThanOrEqual(
            DEFAULT_NEUTRAL_TARGETS[mode].K[entry.step] + slack
          )
        }
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
