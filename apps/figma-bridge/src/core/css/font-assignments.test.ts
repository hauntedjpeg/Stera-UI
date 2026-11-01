import { describe, it, expect } from "vitest"
import type { SerializedCollection } from "../../shared/messages.js"
import { deriveFontAssignments } from "./model.js"
import { basePrimitives, baseTypography } from "./fixtures.js"

function typography(
  variables: SerializedCollection["variables"]
): SerializedCollection {
  return { ...baseTypography, variables }
}

const str = (id: string, name: string, value: string) => ({
  id,
  name,
  type: "STRING" as const,
  valuesByMode: { default: { kind: "string" as const, value } },
})

describe("deriveFontAssignments", () => {
  it("uses each font variable's exported name as its role and strips CSS quotes", () => {
    expect(deriveFontAssignments([baseTypography], undefined)).toEqual([
      { role: "--font-sans", family: "Geist" },
    ])
  })

  it("gives distinct variables distinct roles instead of collapsing them onto --font-sans", () => {
    const assignments = deriveFontAssignments(
      [
        typography([
          str("a", "Font/Sans", "Host Grotesk"),
          str("b", "Font/Display", "Host Grotesk"),
          str("c", "Font/Mono", "Geist Mono"),
        ]),
      ],
      undefined
    )
    expect(assignments.map((a) => a.role)).toEqual([
      "--font-sans",
      "--font-display",
      "--font-mono",
    ])
  })

  it("applies the prefix the same way the :root decls do", () => {
    expect(deriveFontAssignments([baseTypography], "st")).toEqual([
      { role: "--st-font-sans", family: "Geist" },
    ])
  })

  it("ignores STRING variables outside Typography or not named as a font", () => {
    const assignments = deriveFontAssignments(
      [
        { ...basePrimitives, variables: [str("x", "Brand/Name", "Acme")] },
        typography([
          str("a", "Font/Sans", "Inter"),
          str("b", "Label/Copy", "Hello"),
        ]),
      ],
      undefined
    )
    expect(assignments).toEqual([{ role: "--font-sans", family: "Inter" }])
  })

  it("follows aliases to the literal family", () => {
    const reference: SerializedCollection = {
      id: "col-ref",
      name: "Reference Fonts",
      modes: [{ id: "ref", name: "Default" }],
      variables: [
        {
          id: "r",
          name: "Grotesk",
          type: "STRING",
          valuesByMode: { ref: { kind: "string", value: "Host Grotesk" } },
        },
      ],
    }
    const assignments = deriveFontAssignments(
      [
        reference,
        typography([
          {
            id: "a",
            name: "Font/Sans",
            type: "STRING",
            valuesByMode: { default: { kind: "alias", targetId: "r" } },
          },
        ]),
      ],
      undefined
    )
    expect(assignments).toEqual([
      { role: "--font-sans", family: "Host Grotesk" },
    ])
  })

  it("falls back to the Stera defaults when the file has no font variables", () => {
    const assignments = deriveFontAssignments([typography([])], undefined)
    expect(assignments.map((a) => a.family)).toEqual([
      "Zalando Sans",
      "Geist Mono",
      "Zalando Sans SemiExpanded",
    ])
  })
})
