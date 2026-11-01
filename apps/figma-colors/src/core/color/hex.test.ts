import { describe, expect, it } from "vitest"
import {
  displayHex,
  expandHex,
  hexToRgb,
  isLightColor,
  normalizeHex,
} from "./hex.js"

describe("normalizeHex", () => {
  it("accepts 3- and 6-digit hex with or without #", () => {
    expect(normalizeHex("#FFF")).toBe("#ffffff")
    expect(normalizeHex("abc")).toBe("#aabbcc")
    expect(normalizeHex("12AB9f")).toBe("#12ab9f")
  })

  it("rejects anything else", () => {
    expect(normalizeHex("")).toBeNull()
    expect(normalizeHex("#ffff")).toBeNull()
    expect(normalizeHex("ggg")).toBeNull()
  })
})

describe("expandHex / displayHex", () => {
  it("passes invalid input through unchanged", () => {
    expect(expandHex("nope")).toBe("nope")
  })

  it("formats as uppercase #RRGGBB", () => {
    expect(displayHex("#0af")).toBe("#00AAFF")
  })
})

describe("hexToRgb", () => {
  it("returns 0..1 channels", () => {
    expect(hexToRgb("#ff0000")).toEqual({ r: 1, g: 0, b: 0 })
    expect(hexToRgb("fff")).toEqual({ r: 1, g: 1, b: 1 })
  })

  it("throws on invalid input", () => {
    expect(() => hexToRgb("#12")).toThrow()
  })
})

describe("isLightColor", () => {
  it("splits on perceived brightness", () => {
    expect(isLightColor("#ffffff")).toBe(true)
    expect(isLightColor("#000000")).toBe(false)
  })
})
