import { describe, expect, it } from "vitest"
import {
  flatVariableName,
  hasLegacyStepNames,
  legacyRampNames,
  listRampGroups,
  rampVariableName,
  stripVariantSegment,
} from "./variable-names.js"

describe("rampVariableName", () => {
  it("nests the variant between family and step", () => {
    expect(rampVariableName("Blue", "Light", 1)).toBe("Blue/Light/1")
    expect(rampVariableName("Blue", "Dark", 12)).toBe("Blue/Dark/12")
    expect(flatVariableName("Blue", 3)).toBe("Blue/3")
  })
})

describe("stripVariantSegment", () => {
  it("drops a trailing Light or Dark segment", () => {
    expect(stripVariantSegment("Neutral/Light")).toBe("Neutral")
    expect(stripVariantSegment("Brand/Accent/Dark")).toBe("Brand/Accent")
  })

  it("keeps a top-level group named Light", () => {
    expect(stripVariantSegment("Light")).toBe("Light")
  })

  it("only matches whole segments", () => {
    expect(stripVariantSegment("Moonlight")).toBe("Moonlight")
  })
})

describe("listRampGroups", () => {
  it("merges Light and Dark into one sorted group per family", () => {
    expect(
      listRampGroups([
        { name: "Neutral/Light/1", isAlias: false },
        { name: "Neutral/Dark/1", isAlias: false },
        { name: "Brand/Light/1", isAlias: false },
        { name: "Ungrouped", isAlias: false },
      ])
    ).toEqual(["Brand", "Neutral"])
  })

  it("leaves out groups holding any alias", () => {
    expect(
      listRampGroups([
        { name: "Surface/Light/1", isAlias: false },
        { name: "Surface/Dark/1", isAlias: true },
        { name: "Blue/Light/1", isAlias: false },
      ])
    ).toEqual(["Blue"])
  })
})

describe("hasLegacyStepNames", () => {
  it("detects 50-950 steps under the color", () => {
    expect(hasLegacyStepNames(["Blue/500"], "Blue")).toBe(true)
    expect(hasLegacyStepNames(["Blue/Light/5", "Red/500"], "Blue")).toBe(false)
  })
})

describe("legacyRampNames", () => {
  it("maps a ramp index onto the older step schemes", () => {
    expect(legacyRampNames("Blue", "Light", 0)).toEqual([
      "Blue/Light/1",
      "Blue/1",
    ])
    expect(legacyRampNames("Blue", "Light", 11)).toEqual([
      "Blue/Light/12",
      "Blue/12",
    ])
  })

  it("never lets the dark variant claim a flat variable", () => {
    expect(legacyRampNames("Blue", "Dark", 0)).toEqual(["Blue/Dark/1"])
  })
})
