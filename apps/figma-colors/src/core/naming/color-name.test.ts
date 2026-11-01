import { describe, expect, it } from "vitest"
import { suggestColorName } from "./color-name.js"

describe("suggestColorName", () => {
  it("names exact matches", () => {
    expect(suggestColorName("#000000")).toBe("Black")
    expect(suggestColorName("#ffffff")).toBe("White")
  })

  it("accepts shorthand hex", () => {
    expect(suggestColorName("#fff")).toBe(suggestColorName("#ffffff"))
  })

  it("falls back for invalid input", () => {
    expect(suggestColorName("not a color")).toBe("Color")
  })
})
