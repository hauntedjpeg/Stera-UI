import { describe, it, expect } from "vitest"
import { toKebabName, kebab } from "./kebab.js"

describe("toKebabName", () => {
  it("converts slash-delimited paths", () => {
    expect(toKebabName("surface/brand/hover")).toBe("--surface-brand-hover")
  })

  it("lowercases", () => {
    expect(toKebabName("Surface/Brand")).toBe("--surface-brand")
  })

  it("handles spaces and collapses separators", () => {
    expect(toKebabName("Color/Brand 500")).toBe("--color-brand-500")
  })

  it("applies optional prefix", () => {
    expect(toKebabName("surface/brand", "stera")).toBe("--stera-surface-brand")
  })

  it("strips trailing/leading dashes", () => {
    expect(toKebabName("-surface-brand-")).toBe("--surface-brand")
  })
})

describe("kebab", () => {
  it("kebab-cases family names", () => {
    expect(kebab("Geist Sans")).toBe("geist-sans")
    expect(kebab("JetBrains Mono")).toBe("jetbrains-mono")
  })
})
