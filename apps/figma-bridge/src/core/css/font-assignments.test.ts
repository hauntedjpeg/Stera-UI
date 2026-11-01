import { describe, it, expect } from "vitest"
import type { SerializedCollection } from "../../shared/messages.js"
import { deriveFontAssignments } from "./model.js"
import { generatePartials } from "./partials.js"
import {
  basePrimitives,
  baseOptions,
  baseTypography,
  themeSemantic,
} from "./fixtures.js"

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

  it("ignores text-type weight variables even though they export as --font-weight-*", () => {
    const assignments = deriveFontAssignments(
      [
        typography([
          str("a", "Font/Sans", "Inter"),
          str("b", "Weight/Regular", "Regular"),
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

  it("falls back to the Stera defaults when Figma has no font variables", () => {
    const assignments = deriveFontAssignments(
      [typography([str("a", "Label/Copy", "Hello")])],
      undefined
    )
    expect(assignments.map((a) => a.family)).toEqual([
      "Zalando Sans",
      "Geist Mono",
      "Zalando Sans SemiExpanded",
    ])
  })
})

describe("font roles in the exported typography.css", () => {
  function typographyCss(collections: SerializedCollection[], prefix?: string) {
    const result = generatePartials({
      ...baseOptions,
      collections,
      prefix,
      fontAssignments: deriveFontAssignments(collections, prefix),
    })
    return result.files.find((f) => f.path === "ui/typography.css")!.contents
  }

  const fontTypography = typography([
    ...baseTypography.variables.slice(1),
    str("a", "Font/Sans", "Zalando Sans"),
    str("b", "Font/Display", "Zalando Sans SemiExpanded"),
    str("c", "Font/Mono", "Geist Mono"),
  ])

  it("emits family-named variables with fallback stacks", () => {
    const css = typographyCss([basePrimitives, themeSemantic, fontTypography])
    expect(css).toContain("--font-sans: var(--font-zalando-sans, sans-serif);")
    expect(css).toContain(
      "--font-mono: var(--font-geist-mono, ui-monospace, monospace);"
    )
  })

  it("keeps custom roles with the other font roles, before weights and sizes", () => {
    const css = typographyCss([basePrimitives, themeSemantic, fontTypography])
    const names = [...css.matchAll(/^\s*(--[\w-]+):/gm)].map((m) => m[1])
    expect(names.slice(0, 3)).toEqual([
      "--font-sans",
      "--font-display",
      "--font-mono",
    ])
  })

  it("keeps the strategy output under a prefix with capitals", () => {
    const css = typographyCss(
      [basePrimitives, themeSemantic, fontTypography],
      "St"
    )
    expect(css).toContain(
      "--St-font-sans: var(--font-zalando-sans, sans-serif);"
    )
  })
})
