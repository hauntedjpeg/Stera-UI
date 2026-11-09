import Color from "colorjs.io"
import { describe, expect, it } from "vitest"
import {
  generateBiModalScale,
  SCALE_STEPS,
  type GenerationOptions,
} from "./bi-modal.js"

const HEX_6 = /^#[0-9a-f]{6}$/i

function options(patch: Partial<GenerationOptions>): GenerationOptions {
  return {
    hex: "#3b82f6",
    scaleType: "accent",
    lightBackground: "#ffffff",
    darkBackground: "#111111",
    ...patch,
  }
}

function lightness(hex: string): number {
  return new Color(hex).to("oklch").coords[0] ?? NaN
}

describe("generateBiModalScale", () => {
  for (const scaleType of ["accent", "neutral", "gray"] as const) {
    it(`returns the 12 named steps per appearance for ${scaleType}`, () => {
      const { entries } = generateBiModalScale(options({ scaleType }))
      expect(entries.map((e) => e.step)).toEqual([...SCALE_STEPS])
      for (const entry of entries) {
        expect(entry.light).toMatch(HEX_6)
        expect(entry.dark).toMatch(HEX_6)
      }
    })
  }

  for (const scaleType of ["accent", "neutral", "gray"] as const) {
    it(`is deterministic for ${scaleType}`, () => {
      const a = generateBiModalScale(options({ hex: "#859991", scaleType }))
      const b = generateBiModalScale(options({ hex: "#859991", scaleType }))
      expect(a).toEqual(b)
    })
  }

  it("writes the seed at light 500 for Semantic and has no notes for Standard", () => {
    const semantic = generateBiModalScale(options({}))
    expect(semantic.entries[6]).toMatchObject({ step: 500, light: "#3b82f6" })
    const standard = generateBiModalScale(options({ scaleType: "gray" }))
    expect(standard.notes).toEqual([])
  })

  it("darkens every light Standard step monotonically", () => {
    const { entries } = generateBiModalScale(
      options({ hex: "#8b8d98", scaleType: "gray" })
    )
    const light = entries.map((e) => lightness(e.light))
    for (let i = 1; i < light.length; i++) {
      expect(light[i]).toBeLessThan(light[i - 1])
    }
  })

  it("orders every Neutral step: darker in light, lighter in dark", () => {
    const { entries } = generateBiModalScale(
      options({ hex: "#8b8d98", scaleType: "neutral" })
    )
    const light = entries.map((e) => lightness(e.light))
    const dark = entries.map((e) => lightness(e.dark))
    for (let i = 1; i < light.length; i++) {
      expect(light[i]).toBeLessThan(light[i - 1])
      expect(dark[i]).toBeGreaterThan(dark[i - 1])
    }
  })

  it("reads the backgrounds for Neutral", () => {
    const neutral = generateBiModalScale(
      options({ hex: "#8b8d98", scaleType: "neutral" })
    )
    const moved = generateBiModalScale(
      options({
        hex: "#8b8d98",
        scaleType: "neutral",
        lightBackground: "#faf7f2",
        darkBackground: "#0a0a0a",
      })
    )
    expect(moved).not.toEqual(neutral)
    expect(neutral.notes).toEqual([])
  })

  it("ignores the backgrounds for Neutral when neutralAnchored is false", () => {
    const absolute = generateBiModalScale(
      options({ hex: "#8b8d98", scaleType: "neutral", neutralAnchored: false })
    )
    const moved = generateBiModalScale(
      options({
        hex: "#8b8d98",
        scaleType: "neutral",
        neutralAnchored: false,
        lightBackground: "#faf7f2",
        darkBackground: "#0a0a0a",
      })
    )
    expect(moved).toEqual(absolute)
    // The flag is Neutral's alone: Semantic keeps reading the page.
    const semantic = generateBiModalScale(options({ neutralAnchored: false }))
    expect(semantic).toEqual(generateBiModalScale(options({})))
  })

  it("ignores the backgrounds for Standard but not for Semantic", () => {
    const pages = {
      lightBackground: "#faf7f2",
      darkBackground: "#0a0a0a",
    }
    const standard = generateBiModalScale(
      options({ hex: "#8b8d98", scaleType: "gray" })
    )
    const movedStandard = generateBiModalScale(
      options({ hex: "#8b8d98", scaleType: "gray", ...pages })
    )
    expect(movedStandard).toEqual(standard)

    const semantic = generateBiModalScale(options({ hex: "#8b8d98" }))
    const movedSemantic = generateBiModalScale(
      options({ hex: "#8b8d98", ...pages })
    )
    expect(movedSemantic).not.toEqual(semantic)
  })

  it("darkens light and lightens dark from 25 to 950", () => {
    for (const scaleType of ["accent", "neutral", "gray"] as const) {
      const { entries } = generateBiModalScale(options({ scaleType }))
      expect(lightness(entries[11].light)).toBeLessThan(
        lightness(entries[0].light)
      )
      expect(lightness(entries[11].dark)).toBeGreaterThan(
        lightness(entries[0].dark)
      )
    }
  })
})
