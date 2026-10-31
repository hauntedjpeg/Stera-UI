import { describe, it, expect } from "vitest"
import { rgbaToOklch, rgbaToOklchCss } from "./oklch.js"

describe("rgbaToOklch", () => {
  it("converts black", () => {
    const { L, C } = rgbaToOklch({ r: 0, g: 0, b: 0, a: 1 })
    expect(L).toBeCloseTo(0, 4)
    expect(C).toBeCloseTo(0, 4)
  })

  it("converts white", () => {
    const { L, C } = rgbaToOklch({ r: 1, g: 1, b: 1, a: 1 })
    expect(L).toBeCloseTo(1, 3)
    expect(C).toBeCloseTo(0, 3)
  })

  it("converts pure red", () => {
    const { L, C, H } = rgbaToOklch({ r: 1, g: 0, b: 0, a: 1 })
    expect(L).toBeCloseTo(0.628, 2)
    expect(C).toBeCloseTo(0.2577, 2)
    expect(H).toBeCloseTo(29.23, 1)
  })

  it("emits alpha channel in CSS when translucent", () => {
    expect(rgbaToOklchCss({ r: 0, g: 0, b: 0, a: 0.5 })).toMatch(/\/ 0\.5\)/)
  })

  it("omits alpha when fully opaque", () => {
    expect(rgbaToOklchCss({ r: 0, g: 0, b: 0, a: 1 })).not.toContain("/")
  })
})
