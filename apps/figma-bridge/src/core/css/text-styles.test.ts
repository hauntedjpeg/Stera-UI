import { describe, it, expect } from "vitest"
import type { SerializedTextStyle } from "../../shared/messages.js"
import { buildUtilities, findUnresolvedReferences } from "./text-styles.js"

/**
 * Mirrors the real file: Medium and Strong are both 500, so anything inferring
 * the token from the numeric weight would be ambiguous.
 */
const nameMap = new Map<string, string>([
  ["v-font-sans", "--font-sans"],
  ["v-size-heading-sm", "--font-size-heading-sm"],
  ["v-lh-28", "--line-height-28"],
  ["v-weight-medium", "--font-weight-medium"],
  ["v-weight-strong", "--font-weight-strong"],
  ["v-ls-tight", "--letter-spacing-tight"],
])

function style(over: Partial<SerializedTextStyle> = {}): SerializedTextStyle {
  return {
    id: "S:1",
    name: "Heading/SM",
    fontFamily: "Geist",
    fontStyle: "Medium",
    fontSize: 20,
    lineHeight: { unit: "PIXELS", value: 28 },
    letterSpacing: { unit: "PIXELS", value: -0.4 },
    boundVariables: {
      fontFamily: "v-font-sans",
      fontSize: "v-size-heading-sm",
      lineHeight: "v-lh-28",
      fontWeight: "v-weight-strong",
      letterSpacing: "v-ls-tight",
    },
    ...over,
  }
}

const opts = { nameMap, unit: "rem" as const }

describe("buildUtilities", () => {
  it("emits the weight the text style is actually bound to", () => {
    const { css, warnings } = buildUtilities({ textStyles: [style()], ...opts })
    expect(css).toBe(
      [
        "@utility st-heading-sm {",
        "  font-family: var(--font-sans);",
        "  font-size: var(--font-size-heading-sm);",
        "  line-height: var(--line-height-28);",
        "  font-weight: var(--font-weight-strong);",
        "  letter-spacing: var(--letter-spacing-tight);",
        "}",
      ].join("\n")
    )
    expect(warnings).toEqual([])
  })

  it("distinguishes Medium from Strong even though both resolve to 500", () => {
    const { css } = buildUtilities({
      textStyles: [
        style({
          boundVariables: {
            ...style().boundVariables,
            fontWeight: "v-weight-medium",
          },
        }),
      ],
      ...opts,
    })
    expect(css).toContain("font-weight: var(--font-weight-medium);")
  })

  it("derives the utility name from the full Figma style path", () => {
    const { css } = buildUtilities({
      textStyles: [
        style({ name: "Heading/SM" }),
        style({ id: "S:2", name: "Body/MD Compact" }),
      ],
      ...opts,
    })
    expect(css).toContain("@utility st-heading-sm {")
    expect(css).toContain("@utility st-body-md-compact {")
  })

  it("orders body before heading before display before hero", () => {
    const { css } = buildUtilities({
      textStyles: [
        style({ id: "S:1", name: "Hero/LG" }),
        style({ id: "S:2", name: "Heading/SM" }),
        style({ id: "S:3", name: "Body/MD" }),
        style({ id: "S:4", name: "Display/LG" }),
      ],
      ...opts,
    })
    const order = [...css.matchAll(/@utility (st-[a-z0-9-]+)/g)].map(
      (m) => m[1]
    )
    expect(order).toEqual([
      "st-body-md",
      "st-heading-sm",
      "st-display-lg",
      "st-hero-lg",
    ])
  })

  it("falls back to a literal and warns when a field is unbound", () => {
    const { css, warnings } = buildUtilities({
      textStyles: [
        style({
          fontStyle: "Bold",
          boundVariables: {
            fontFamily: "v-font-sans",
            fontSize: "v-size-heading-sm",
          },
        }),
      ],
      ...opts,
    })
    expect(css).toContain("line-height: 1.75rem;")
    expect(css).toContain("font-weight: 700;")
    expect(css).toContain("letter-spacing: -0.025rem;")
    expect(
      warnings.some((w) => /"Heading\/SM".*no variable bound to weight/.test(w))
    ).toBe(true)
    expect(
      warnings.some((w) =>
        /"Heading\/SM".*no variable bound to line height/.test(w)
      )
    ).toBe(true)
    expect(warnings.some((w) => /letter spacing/.test(w))).toBe(false)
  })

  it("maps an unbound family to the font role that carries it", () => {
    const unbound = style({
      boundVariables: { ...style().boundVariables, fontFamily: undefined },
    })
    const { css } = buildUtilities({
      textStyles: [unbound],
      ...opts,
      familyRoles: new Map([["geist", "--font-sans"]]),
    })
    expect(css).toContain("font-family: var(--font-sans);")
  })

  it("quotes an unbound family no role carries and adds a fallback stack", () => {
    const unbound = style({
      fontFamily: "Obscurity Mono",
      boundVariables: { ...style().boundVariables, fontFamily: undefined },
    })
    const { css } = buildUtilities({ textStyles: [unbound], ...opts })
    expect(css).toContain(
      "font-family: 'Obscurity Mono', ui-monospace, monospace;"
    )
  })

  it("falls back and warns when a bound variable is outside the export", () => {
    const { css, warnings } = buildUtilities({
      textStyles: [
        style({
          boundVariables: {
            ...style().boundVariables,
            fontWeight: "v-not-exported",
          },
        }),
      ],
      ...opts,
    })
    expect(css).toContain("font-weight: 500;")
    expect(
      warnings.some((w) => /not part of the exported collections/.test(w))
    ).toBe(true)
  })

  it("honours the px unit choice for unbound literals", () => {
    const { css } = buildUtilities({
      textStyles: [style({ boundVariables: {} })],
      nameMap,
      unit: "px",
    })
    expect(css).toContain("font-size: 20px;")
    expect(css).toContain("line-height: 28px;")
  })

  it("handles AUTO line height and percent letter spacing", () => {
    const { css } = buildUtilities({
      textStyles: [
        style({
          lineHeight: { unit: "AUTO" },
          letterSpacing: { unit: "PERCENT", value: -2 },
          boundVariables: {},
        }),
      ],
      ...opts,
    })
    expect(css).toContain("line-height: normal;")
    expect(css).toContain("letter-spacing: -0.02em;")
  })

  it.each([
    [-5, "tighter"],
    [-2.5, "tight"],
    [0, "normal"],
    [2.5, "wide"],
    [5, "wider"],
    [10, "widest"],
  ])(
    "maps raw %s%% letter spacing to var(--tracking-%s) without warning",
    (value, key) => {
      const { css, warnings } = buildUtilities({
        textStyles: [
          style({
            letterSpacing: { unit: "PERCENT", value },
            boundVariables: {
              ...style().boundVariables,
              letterSpacing: undefined,
            },
          }),
        ],
        ...opts,
      })
      expect(css).toContain(`letter-spacing: var(--tracking-${key});`)
      expect(warnings).toEqual([])
    }
  )

  it("maps pixel letter spacing that lands exactly on the tracking scale", () => {
    const { css } = buildUtilities({
      textStyles: [
        style({
          fontSize: 20,
          letterSpacing: { unit: "PIXELS", value: -1 },
          boundVariables: {},
        }),
      ],
      ...opts,
    })
    expect(css).toContain("letter-spacing: var(--tracking-tighter);")
  })

  it("still warns when letter spacing is bound to a variable outside the export", () => {
    const { css, warnings } = buildUtilities({
      textStyles: [
        style({
          boundVariables: {
            ...style().boundVariables,
            letterSpacing: "v-not-exported",
          },
        }),
      ],
      ...opts,
    })
    expect(css).toContain("letter-spacing: -0.025rem;")
    expect(
      warnings.some((w) =>
        /letter spacing to a variable that is not part/.test(w)
      )
    ).toBe(true)
  })
})

describe("findUnresolvedReferences", () => {
  it("reports only references missing from the emitted names", () => {
    const css = "@utility st-a {\n  font-weight: var(--font-weight-medium);\n}"
    expect(findUnresolvedReferences(css, ["--font-weight-strong"])).toEqual([
      "--font-weight-medium",
    ])
    expect(findUnresolvedReferences(css, ["--font-weight-medium"])).toEqual([])
  })
})
