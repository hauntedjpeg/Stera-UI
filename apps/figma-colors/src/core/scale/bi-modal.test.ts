import Color from "colorjs.io"
import { describe, expect, it } from "vitest"
import { generateBiModalScale, type GenerationOptions } from "./bi-modal.js"

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
    it(`returns 12 hex steps per appearance for ${scaleType}`, () => {
      const scale = generateBiModalScale(options({ scaleType }))
      expect(scale.map((e) => e.step)).toEqual([
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
      ])
      for (const entry of scale) {
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

  it("darkens light gray steps 1..8 monotonically after smoothing", () => {
    const scale = generateBiModalScale(
      options({ hex: "#8b8d98", scaleType: "gray" })
    )
    const top = scale.slice(0, 8).map((e) => lightness(e.light))
    for (let i = 1; i < top.length; i++) {
      expect(top[i]).toBeLessThan(top[i - 1])
    }
  })

  it("darkens light and lightens dark from step 1 to 12", () => {
    const scale = generateBiModalScale(options({}))
    expect(lightness(scale[11].light)).toBeLessThan(lightness(scale[0].light))
    expect(lightness(scale[11].dark)).toBeGreaterThan(lightness(scale[0].dark))
  })
})
