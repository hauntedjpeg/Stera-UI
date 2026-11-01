import { describe, expect, it } from "vitest"
// Stera UI Bridge reads what this plugin writes; run a generated ramp through
// its real model so a naming change on either side fails here.
import { buildModel } from "../../../figma-bridge/src/core/css/model.js"
import { baseOptions } from "../../../figma-bridge/src/core/css/fixtures.js"
import type {
  SerializedCollection,
  SerializedVariable,
} from "../../../figma-bridge/src/shared/messages.js"
import { hexToRgb } from "./color/hex.js"
import {
  DEFAULT_COLLECTION_NAME,
  rampVariableName,
  VARIANTS,
} from "./naming/variable-names.js"
import { generateBiModalScale } from "./scale/bi-modal.js"

/** Mirror of what the sandbox writes: one mode, Light/Dark as name segments. */
function colorCollection(): SerializedCollection {
  const variables: SerializedVariable[] = []
  const ramps = [
    { name: "Blue", hex: "#3b82f6", scaleType: "accent" as const },
    { name: "Neutral", hex: "#8b8d98", scaleType: "gray" as const },
  ]
  for (const ramp of ramps) {
    const scale = generateBiModalScale({
      hex: ramp.hex,
      scaleType: ramp.scaleType,
      lightBackground: "#ffffff",
      darkBackground: "#111111",
    })
    for (const entry of scale) {
      for (const variant of VARIANTS) {
        const name = rampVariableName(ramp.name, variant, entry.step)
        const hex = variant === "Light" ? entry.light : entry.dark
        variables.push({
          id: name,
          name,
          type: "COLOR",
          valuesByMode: { value: { kind: "color", ...hexToRgb(hex), a: 1 } },
        })
      }
    }
  }
  return {
    id: "col-color",
    name: DEFAULT_COLLECTION_NAME,
    modes: [{ id: "value", name: "Value" }],
    variables,
  }
}

const theme: SerializedCollection = {
  id: "col-theme",
  name: "Theme",
  modes: [
    { id: "light", name: "Light" },
    { id: "dark", name: "Dark" },
  ],
  variables: [
    {
      id: "surface",
      name: "Surface/-",
      type: "COLOR",
      valuesByMode: {
        light: { kind: "alias", targetId: "Neutral/Light/1" },
        dark: { kind: "alias", targetId: "Neutral/Dark/1" },
      },
    },
  ],
}

describe("Stera UI Bridge contract", () => {
  it("exports generated ramps as --family-N and --family-dark-N", () => {
    const { model, errors, warnings } = buildModel({
      ...baseOptions,
      collections: [colorCollection(), theme],
    })

    expect(errors).toEqual([])
    expect(warnings.filter((w) => /dark ramps|collision/i.test(w))).toEqual([])

    const names = model?.colorRamps.map((d) => d.name) ?? []
    expect(names).toContain("--blue-1")
    expect(names).toContain("--blue-dark-12")
    expect(names).toContain("--neutral-12")
    expect(names).toContain("--neutral-dark-1")
    expect(names).toHaveLength(48)
  })
})
