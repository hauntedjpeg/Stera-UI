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
  for (const scaleType of ["accent", "gray"] as const) {
    it(`returns the 12 named steps per appearance for ${scaleType}`, () => {
      const { entries } = generateBiModalScale(options({ scaleType }))
      expect(entries.map((e) => e.step)).toEqual([...SCALE_STEPS])
      for (const entry of entries) {
        expect(entry.light).toMatch(HEX_6)
        expect(entry.dark).toMatch(HEX_6)
      }
    })
  }

  it("is deterministic", () => {
    const a = generateBiModalScale(options({ hex: "#859991" }))
    const b = generateBiModalScale(options({ hex: "#859991" }))
    expect(a).toEqual(b)
  })

  it("writes the seed at light 500 for Semantic and has no notes for Standard", () => {
    const semantic = generateBiModalScale(options({}))
    expect(semantic.entries[6]).toMatchObject({ step: 500, light: "#3b82f6" })
    const standard = generateBiModalScale(options({ scaleType: "gray" }))
    expect(standard.notes).toEqual([])
  })

  it("darkens the first eight light gray steps monotonically after smoothing", () => {
    const { entries } = generateBiModalScale(
      options({ hex: "#8b8d98", scaleType: "gray" })
    )
    const top = entries.slice(0, 8).map((e) => lightness(e.light))
    for (let i = 1; i < top.length; i++) {
      expect(top[i]).toBeLessThan(top[i - 1])
    }
  })

  it("darkens light and lightens dark from 25 to 950", () => {
    for (const scaleType of ["accent", "gray"] as const) {
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
