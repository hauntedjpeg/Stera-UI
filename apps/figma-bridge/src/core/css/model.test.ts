import { describe, it, expect } from "vitest"
import { generatePartials } from "./partials.js"
import type {
  SerializedCollection,
  SerializedValue,
} from "../../shared/messages.js"
import { rgbaToOklchCss } from "../color/oklch.js"
import { selectExportedCollections, type GenerateOptions } from "./model.js"
import {
  basePrimitives,
  themeSemantic,
  baseTypography,
  referenceDimension,
  figmaOnlyLayout,
  baseOptions,
  headingSmStyle,
} from "./fixtures.js"

// Model behavior, asserted on every partial joined together.
function generateCss(options: GenerateOptions) {
  const { files, warnings, errors } = generatePartials(options)
  return {
    css: files.map((f) => f.contents).join("\n"),
    warnings,
    errors,
  }
}

// The partials split :root between colors.css and typography.css.
function rootOf(css: string) {
  return [...css.matchAll(/:root \{([\s\S]*?)\n\}/g)]
    .map((m) => m[1])
    .join("\n")
}

describe("buildModel", () => {
  it("hard-fails when no collections exist", () => {
    const { errors, css } = generateCss({
      ...baseOptions,
      collections: [],
    })
    expect(errors[0]).toMatch(/no variable collections/i)
    expect(css).toBe("")
  })

  it("hard-fails when Theme has no dark mode", () => {
    const noDark: SerializedCollection = {
      ...themeSemantic,
      modes: [{ id: "light", name: "Light" }],
      variables: themeSemantic.variables.map((v) => ({
        ...v,
        valuesByMode: { light: v.valuesByMode.light },
      })),
    }
    const { errors } = generateCss({
      ...baseOptions,
      collections: [basePrimitives, noDark, baseTypography],
    })
    expect(errors[0]).toMatch(/no dark mode/i)
  })

  it("hard-fails when Color is missing entirely", () => {
    const { errors } = generateCss({
      ...baseOptions,
      collections: [themeSemantic, baseTypography],
    })
    expect(errors[0]).toMatch(/"Color"/)
  })

  it("hard-fails when Theme is missing entirely", () => {
    const { errors, css } = generateCss({
      ...baseOptions,
      collections: [basePrimitives, baseTypography],
    })
    expect(errors[0]).toMatch(/"Theme"/)
    expect(css).toBe("")
  })

  it("warns when the Color collection has no Dark ramps", () => {
    const lightOnly: SerializedCollection = {
      ...basePrimitives,
      variables: basePrimitives.variables.filter(
        (v) => !/\/Dark\//.test(v.name)
      ),
    }
    const { warnings } = generateCss({
      ...baseOptions,
      collections: [lightOnly, themeSemantic, baseTypography],
    })
    expect(warnings.some((w) => /No Dark ramps/.test(w))).toBe(true)
  })

  it("emits expected top-level structure", () => {
    const { css, errors } = generateCss({
      ...baseOptions,
      collections: [basePrimitives, themeSemantic, baseTypography],
    })
    expect(errors).toEqual([])
    expect(css).toContain('@import "tailwindcss";')
    expect(css).toContain("@custom-variant dark")
    expect(css).toContain("@theme inline")
    expect(css).toContain(":root {")
    expect(css).toContain(".dark {")
  })

  it("strips trailing /- segment from semantic paths", () => {
    const { css } = generateCss({
      ...baseOptions,
      collections: [basePrimitives, themeSemantic, baseTypography],
    })
    expect(css).toMatch(/--surface:\s*var\(--neutral-1\);/)
    expect(css).toMatch(/--surface-brand:\s*var\(--brand-9\);/)
    expect(css).toMatch(/--text:\s*var\(--black-11\);/)
    expect(css).not.toMatch(/--surface-:/)
    expect(css).not.toMatch(/--surface-brand-:/)
  })

  it("excludes any collection prefixed Reference", () => {
    const { css } = generateCss({
      ...baseOptions,
      collections: [
        basePrimitives,
        themeSemantic,
        baseTypography,
        referenceDimension,
      ],
    })
    expect(css).not.toContain("--spacing-4")
  })

  it("no longer emits a @theme radius block for a Reference Radii group", () => {
    const { css } = generateCss({
      ...baseOptions,
      collections: [
        basePrimitives,
        themeSemantic,
        baseTypography,
        referenceDimension,
      ],
    })
    expect(css).not.toMatch(/@theme \{/)
    expect(css).not.toContain("--radius-")
    expect(css).toContain("@theme inline")
  })

  it("drops the Light segment from ramp names but keeps Dark", () => {
    const { css } = generateCss({
      ...baseOptions,
      collections: [basePrimitives, themeSemantic, baseTypography],
    })
    const rootBody = rootOf(css)
    expect(rootBody).toMatch(/--neutral-1:\s*oklch\(/)
    expect(rootBody).toMatch(/--neutral-dark-1:\s*oklch\(/)
    expect(rootBody).toMatch(/--brand-9:\s*oklch\(/)
    expect(rootBody).toMatch(/--brand-dark-3:\s*oklch\(/)
    // Black/White have no Light/Dark subgroup and stay unqualified.
    expect(rootBody).toMatch(/--black-11:\s*oklch\(/)
    expect(rootBody).toMatch(/--white-11:\s*oklch\(/)
    expect(css).not.toMatch(/--neutral-light-/)
  })

  it("sorts each family light-ramp-first regardless of Figma order", () => {
    const shuffled: SerializedCollection = {
      ...basePrimitives,
      variables: [...basePrimitives.variables].reverse(),
    }
    const { css } = generateCss({
      ...baseOptions,
      collections: [shuffled, themeSemantic, baseTypography],
    })
    const rootBody = rootOf(css)
    expect(rootBody.indexOf("--neutral-1:")).toBeLessThan(
      rootBody.indexOf("--neutral-dark-1:")
    )
    expect(rootBody.indexOf("--neutral-dark-12:")).toBeLessThan(
      rootBody.indexOf("--brand-9:")
    )
  })

  it(".dark holds only semantic tokens — ramps are never redeclared", () => {
    const { css } = generateCss({
      ...baseOptions,
      collections: [basePrimitives, themeSemantic, baseTypography],
    })
    const darkBody = css.match(/\.dark \{([\s\S]*?)\n\}/)![1]
    expect(darkBody).not.toMatch(/--neutral-1:\s*oklch\(/)
    expect(darkBody).not.toMatch(/--brand-9:\s*oklch\(/)
    expect(darkBody).not.toMatch(/--font-size-/)
    expect(darkBody).not.toMatch(/--font-weight-/)
    expect(darkBody).toMatch(/--surface:\s*var\(--neutral-dark-1\);/)
    expect(darkBody).toMatch(/--text:\s*var\(--white-11\);/)
  })

  it("switches semantic tokens per mode, including across ramps and steps", () => {
    const { css } = generateCss({
      ...baseOptions,
      collections: [basePrimitives, themeSemantic, baseTypography],
    })
    const rootBody = rootOf(css)
    const darkBody = css.match(/\.dark \{([\s\S]*?)\n\}/)![1]

    // Different step of the same ramp.
    expect(rootBody).toMatch(/--surface-brand:\s*var\(--brand-9\);/)
    expect(darkBody).toMatch(/--surface-brand:\s*var\(--brand-dark-3\);/)

    // Different ramp entirely.
    expect(rootBody).toMatch(/--text:\s*var\(--black-11\);/)
    expect(darkBody).toMatch(/--text:\s*var\(--white-11\);/)

    // Mode-invariant: the same primitive in both blocks. This is only lossless
    // because ramps are never redeclared under `.dark`.
    expect(rootBody).toMatch(/--text-onbrand:\s*var\(--neutral-1\);/)
    expect(darkBody).toMatch(/--text-onbrand:\s*var\(--neutral-1\);/)
  })

  it("mirrors every semantic token into .dark", () => {
    const { css } = generateCss({
      ...baseOptions,
      collections: [basePrimitives, themeSemantic, baseTypography],
    })
    const darkBody = css.match(/\.dark \{([\s\S]*?)\n\}/)![1]
    const darkLines = darkBody.match(/--[a-z0-9-]+:/g) ?? []
    expect(darkLines.length).toBe(themeSemantic.variables.length)
  })

  it("warns when a semantic token has no value in the dark mode", () => {
    const partial: SerializedCollection = {
      ...themeSemantic,
      variables: themeSemantic.variables.map((v) =>
        v.id === "v-text-onbrand"
          ? { ...v, valuesByMode: { light: v.valuesByMode.light } }
          : v
      ),
    }
    const { warnings } = generateCss({
      ...baseOptions,
      collections: [basePrimitives, partial, baseTypography],
    })
    expect(
      warnings.some((w) => /no value in the dark mode.*--text-onbrand/.test(w))
    ).toBe(true)
  })

  it("warns when a Color ramp and a Theme token export under the same name", () => {
    const color: SerializedCollection = {
      ...basePrimitives,
      variables: [
        ...basePrimitives.variables,
        {
          id: "v-alpha-light-1",
          name: "Alpha/Light/1",
          type: "COLOR",
          valuesByMode: { value: { kind: "color", r: 0, g: 0, b: 0, a: 0.02 } },
        },
      ],
    }
    const theme: SerializedCollection = {
      ...themeSemantic,
      variables: [
        ...themeSemantic.variables,
        {
          id: "v-alpha-1",
          name: "Alpha/1",
          type: "COLOR",
          valuesByMode: {
            light: { kind: "alias", targetId: "v-alpha-light-1" },
            dark: { kind: "alias", targetId: "v-alpha-light-1" },
          },
        },
      ],
    }
    const { warnings } = generateCss({
      ...baseOptions,
      collections: [color, theme, baseTypography],
    })
    expect(
      warnings.some((w) =>
        /^1 CSS variable name is produced.*--alpha-1 \(Color: Alpha\/Light\/1, Theme: Alpha\/1\)/.test(
          w
        )
      )
    ).toBe(true)
  })

  it("warns when two variables in one collection export under the same name", () => {
    const color: SerializedCollection = {
      ...basePrimitives,
      variables: [
        ...basePrimitives.variables,
        {
          id: "v-neutral-1",
          name: "Neutral/1",
          type: "COLOR",
          valuesByMode: { value: { kind: "color", r: 1, g: 1, b: 1, a: 1 } },
        },
      ],
    }
    const { warnings } = generateCss({
      ...baseOptions,
      collections: [color, themeSemantic, baseTypography],
    })
    expect(
      warnings.some((w) =>
        /--neutral-1 \(Color: Neutral\/Light\/1, Color: Neutral\/1\)/.test(w)
      )
    ).toBe(true)
  })

  it("Theme aliases resolve to var(--primitive) references", () => {
    const { css } = generateCss({
      ...baseOptions,
      collections: [basePrimitives, themeSemantic, baseTypography],
    })
    expect(css).toMatch(/--surface:\s*var\(--neutral-1\);/)
    expect(css).not.toMatch(/unresolved alias/)
  })

  it("dynamically generates @theme inline from Theme only", () => {
    const { css } = generateCss({
      ...baseOptions,
      collections: [basePrimitives, themeSemantic, baseTypography],
    })
    const themeMatch = css.match(/@theme inline \{([\s\S]*?)\n\}/)
    expect(themeMatch).not.toBeNull()
    const themeBody = themeMatch![1]
    expect(themeBody).toMatch(/--color-surface:\s*var\(--surface\);/)
    expect(themeBody).toMatch(
      /--color-surface-brand:\s*var\(--surface-brand\);/
    )
    expect(themeBody).toMatch(/--color-text:\s*var\(--text\);/)
    expect(themeBody).not.toMatch(/--font-/)
    expect(themeBody).not.toMatch(/--line-height-/)
    expect(themeBody).not.toMatch(/--letter-spacing-/)
    const colorLines = themeBody.match(/--color-[a-z0-9-]+:/g) ?? []
    expect(colorLines.length).toBe(themeSemantic.variables.length)
  })

  it("prefixes typography tokens with font-size / font-weight / line-height / letter-spacing", () => {
    const { css } = generateCss({
      ...baseOptions,
      collections: [basePrimitives, themeSemantic, baseTypography],
    })
    expect(css).toContain("--font-size-body-sm:")
    expect(css).toContain("--line-height-snug:")
    expect(css).toContain("--line-height-28:")
    expect(css).toContain("--font-weight-regular: 400;")
    expect(css).toContain("--letter-spacing-tight:")
    expect(css).not.toMatch(/^\s*--body-sm:/m)
    expect(css).not.toMatch(/^\s*--snug:/m)
    expect(css).not.toMatch(/^\s*--weight-regular:/m)
  })

  it("emits letter-spacing in rem (not px) by default", () => {
    const { css } = generateCss({
      ...baseOptions,
      collections: [basePrimitives, themeSemantic, baseTypography],
    })
    const rootBody = rootOf(css)
    const lsLine = rootBody.match(/--letter-spacing-tight:\s*([^;]+);/)
    expect(lsLine).not.toBeNull()
    expect(lsLine![1]).toMatch(/rem$/)
    expect(lsLine![1]).not.toMatch(/px$/)
  })

  it("utility blocks reference the renamed font-size/font-weight vars", () => {
    const { css } = generateCss({
      ...baseOptions,
      collections: [basePrimitives, themeSemantic, baseTypography],
    })
    expect(css).toMatch(/@utility st-body-sm \{[^}]*var\(--font-size-body-sm\)/)
    expect(css).toMatch(
      /@utility st-body-sm \{[^}]*var\(--font-weight-regular\)/
    )
  })

  it("builds utilities from text styles, using their bound weight", () => {
    const { css, warnings } = generateCss({
      ...baseOptions,
      collections: [basePrimitives, themeSemantic, baseTypography],
      textStyles: [headingSmStyle],
    })
    expect(css).toMatch(
      /@utility st-heading-sm \{[^}]*font-weight: var\(--font-weight-strong\);/
    )
    expect(css).not.toContain("var(--font-weight-medium)")
    expect(warnings).toEqual([])
  })

  it("maps raw letter spacing to Tailwind tracking without warnings", () => {
    const { css, warnings } = generateCss({
      ...baseOptions,
      collections: [basePrimitives, themeSemantic, baseTypography],
      textStyles: [
        {
          ...headingSmStyle,
          letterSpacing: { unit: "PERCENT", value: -5 },
          boundVariables: {
            ...headingSmStyle.boundVariables,
            letterSpacing: undefined,
          },
        },
      ],
    })
    expect(css).toMatch(
      /@utility st-heading-sm \{[^}]*letter-spacing: var\(--tracking-tighter\);/
    )
    expect(warnings).toEqual([])
  })

  it("drops the built-in typography blocks when the file has text styles", () => {
    const { css } = generateCss({
      ...baseOptions,
      collections: [basePrimitives, themeSemantic, baseTypography],
      textStyles: [headingSmStyle],
    })
    expect(css).not.toContain("@utility st-hero-xl")
  })

  it("falls back to the built-in utilities and warns when there are no text styles", () => {
    const { css, warnings } = generateCss({
      ...baseOptions,
      collections: [basePrimitives, themeSemantic, baseTypography],
      textStyles: [],
    })
    expect(css).toContain("@utility st-hero-xl")
    expect(warnings.some((w) => /No local text styles found/.test(w))).toBe(
      true
    )
  })

  it("warns when a utility references a variable the export does not emit", () => {
    const { warnings } = generateCss({
      ...baseOptions,
      collections: [basePrimitives, themeSemantic, baseTypography],
      textStyles: [],
    })
    // The built-in fallback references sizes this fixture does not define.
    expect(
      warnings.some((w) =>
        /reference.*not in this export.*--font-size-hero-xl/.test(w)
      )
    ).toBe(true)
  })

  it("Typography font roles emit without fontAssignments", () => {
    const { css } = generateCss({
      ...baseOptions,
      collections: [basePrimitives, themeSemantic, baseTypography],
    })
    expect(css).toMatch(/--font-sans:\s*'Geist';/)
  })

  const baseTypographyPlain: SerializedCollection = {
    ...baseTypography,
    variables: baseTypography.variables.map((v) =>
      v.id === "v-font-sans"
        ? {
            ...v,
            valuesByMode: { default: { kind: "string", value: "Geist" } },
          }
        : v
    ),
  }

  it("next-font strategy overrides raw Typography font roles", () => {
    const { css } = generateCss({
      ...baseOptions,
      strategy: "next-font",
      collections: [basePrimitives, themeSemantic, baseTypographyPlain],
      fontAssignments: [
        { role: "--font-sans", family: "Geist" },
        { role: "--font-heading", family: "Geist" },
      ],
    })
    const rootBody = rootOf(css)
    const fontSansLines = rootBody.match(/^\s*--font-sans:[^\n]*$/gm) ?? []
    expect(fontSansLines.length).toBe(1)
    expect(fontSansLines[0]).toContain("var(--font-geist-sans, sans-serif")
    expect(rootBody).not.toMatch(/--font-sans:\s*Geist;/)
    expect(rootBody).toMatch(
      /--font-heading:\s*var\(--font-geist-sans, sans-serif\);/
    )
  })

  it("fontsource-variable strategy overrides raw Typography and emits the @import", () => {
    const { css } = generateCss({
      ...baseOptions,
      strategy: "fontsource-variable",
      collections: [basePrimitives, themeSemantic, baseTypographyPlain],
      fontAssignments: [{ role: "--font-sans", family: "Geist" }],
    })
    const rootBody = rootOf(css)
    expect(rootBody).toMatch(/--font-sans:\s*'Geist Variable', sans-serif;/)
    expect(rootBody).not.toMatch(/--font-sans:\s*Geist;/)
    expect(css).toMatch(/@import "@fontsource-variable\/geist";/)
  })

  it("raw strategy emits the fallback stack instead of the bare Typography value", () => {
    const { css } = generateCss({
      ...baseOptions,
      strategy: "raw",
      collections: [basePrimitives, themeSemantic, baseTypographyPlain],
      fontAssignments: [{ role: "--font-sans", family: "Geist" }],
    })
    const rootBody = rootOf(css)
    const fontSansLines = rootBody.match(/^\s*--font-sans:[^\n]*$/gm) ?? []
    expect(fontSansLines.length).toBe(1)
    expect(fontSansLines[0]).toMatch(/'Geist',\s*sans-serif/)
  })

  it("fontAssignments fills roles missing from Typography", () => {
    const { css } = generateCss({
      ...baseOptions,
      collections: [basePrimitives, themeSemantic, baseTypography],
      fontAssignments: [{ role: "--font-mono", family: "JetBrains Mono" }],
    })
    const rootBody = rootOf(css)
    expect(rootBody).toMatch(/--font-sans:\s*'Geist';/)
    expect(rootBody).toMatch(
      /--font-mono:\s*var\(--font-jetbrains-mono, ui-monospace, monospace\);/
    )
  })

  describe("ignored collections", () => {
    const themeWith = (
      light: SerializedValue,
      dark: SerializedValue
    ): SerializedCollection => ({
      ...themeSemantic,
      variables: [
        ...themeSemantic.variables,
        {
          id: "v-surface-note",
          name: "Surface/Note",
          type: "COLOR",
          valuesByMode: { light, dark },
        },
      ],
    })
    const alias = (targetId: string): SerializedValue => ({
      kind: "alias",
      targetId,
    })

    it("selects only Color, Theme and Typography", () => {
      const selected = selectExportedCollections([
        basePrimitives,
        figmaOnlyLayout,
        themeSemantic,
        referenceDimension,
        baseTypography,
        { ...basePrimitives, id: "col-colors", name: "Colors" },
      ])
      expect(selected.map((c) => c.name)).toEqual([
        "Color",
        "Theme",
        "Typography",
      ])
    })

    it("contributes nothing from a Figma-only collection", () => {
      const base = generateCss({
        ...baseOptions,
        collections: [basePrimitives, themeSemantic, baseTypography],
      })
      const withExtra = generateCss({
        ...baseOptions,
        collections: [
          basePrimitives,
          themeSemantic,
          baseTypography,
          figmaOnlyLayout,
        ],
      })
      expect(withExtra.css).toBe(base.css)
      expect(withExtra.warnings).toEqual(base.warnings)
      expect(withExtra.css).not.toContain("--gutter")
    })

    it("inlines a Theme alias into an ignored collection, per mode", () => {
      const { css, warnings } = generateCss({
        ...baseOptions,
        collections: [
          basePrimitives,
          themeWith(alias("v-layout-annotation"), alias("v-layout-annotation")),
          baseTypography,
          figmaOnlyLayout,
        ],
      })
      const red = rgbaToOklchCss({ r: 1, g: 0, b: 0, a: 1 })
      const blue = rgbaToOklchCss({ r: 0, g: 0, b: 1, a: 1 })
      const rootBody = rootOf(css)
      const darkBody = css.match(/\.dark \{([\s\S]*?)\n\}/)![1]
      expect(rootBody).toContain(`--surface-note: ${red};`)
      expect(darkBody).toContain(`--surface-note: ${blue};`)
      expect(css).not.toContain("unresolved alias")
      expect(warnings.join("\n")).not.toMatch(/could not be resolved/)
    })

    it("inlines a Typography alias into Reference with the collection unit", () => {
      const typography: SerializedCollection = {
        ...baseTypography,
        variables: [
          ...baseTypography.variables,
          {
            id: "v-size-ref",
            name: "Size/Ref",
            type: "FLOAT",
            valuesByMode: { default: alias("v-spacing-4") },
          },
        ],
      }
      const { css } = generateCss({
        ...baseOptions,
        collections: [
          basePrimitives,
          themeSemantic,
          typography,
          referenceDimension,
        ],
      })
      expect(css).toMatch(/--font-size-ref:\s*0\.25rem;/)
    })

    it("stops at the first exported variable in an alias chain", () => {
      const { css } = generateCss({
        ...baseOptions,
        collections: [
          basePrimitives,
          themeWith(alias("v-layout-proxy"), alias("v-layout-proxy")),
          baseTypography,
          figmaOnlyLayout,
        ],
      })
      const rootBody = rootOf(css)
      const darkBody = css.match(/\.dark \{([\s\S]*?)\n\}/)![1]
      expect(rootBody).toMatch(/--surface-note:\s*var\(--neutral-1\);/)
      expect(darkBody).toMatch(/--surface-note:\s*var\(--neutral-dark-1\);/)
    })

    it("ignores the Utilities group in Theme", () => {
      const withUtilities: SerializedCollection = {
        ...themeSemantic,
        variables: [
          ...themeSemantic.variables,
          {
            id: "v-util-outline",
            name: "Utilities/Outline",
            type: "COLOR",
            valuesByMode: {
              light: { kind: "color", r: 1, g: 0, b: 0, a: 1 },
              dark: { kind: "color", r: 0, g: 0, b: 1, a: 1 },
            },
          },
          {
            id: "v-surface-note",
            name: "Surface/Note",
            type: "COLOR",
            valuesByMode: {
              light: alias("v-util-outline"),
              dark: alias("v-util-outline"),
            },
          },
        ],
      }
      const [, theme] = selectExportedCollections([
        basePrimitives,
        withUtilities,
      ])
      expect(theme.variables.map((v) => v.name)).not.toContain(
        "Utilities/Outline"
      )

      const { css, warnings } = generateCss({
        ...baseOptions,
        collections: [basePrimitives, withUtilities, baseTypography],
      })
      expect(css).not.toContain("--utilities-")
      expect(css).not.toContain("unresolved alias")
      expect(warnings.join("\n")).not.toMatch(/could not be resolved/)
      const rootBody = rootOf(css)
      const darkBody = css.match(/\.dark \{([\s\S]*?)\n\}/)![1]
      expect(rootBody).toContain(
        `--surface-note: ${rgbaToOklchCss({ r: 1, g: 0, b: 0, a: 1 })};`
      )
      expect(darkBody).toContain(
        `--surface-note: ${rgbaToOklchCss({ r: 0, g: 0, b: 1, a: 1 })};`
      )
    })

    it("keeps a top-level Theme variable that is merely named Utilities", () => {
      const theme: SerializedCollection = {
        ...themeSemantic,
        variables: [
          ...themeSemantic.variables,
          {
            id: "v-utilities",
            name: "Utilities",
            type: "COLOR",
            valuesByMode: {
              light: alias("v-neutral-light-1"),
              dark: alias("v-neutral-dark-1"),
            },
          },
        ],
      }
      const { css } = generateCss({
        ...baseOptions,
        collections: [basePrimitives, theme, baseTypography],
      })
      expect(css).toMatch(/--utilities:\s*var\(--neutral-1\);/)
    })

    it("still flags an alias to a variable that does not exist", () => {
      const { css, warnings } = generateCss({
        ...baseOptions,
        collections: [
          basePrimitives,
          themeWith(alias("v-gone"), alias("v-gone")),
          baseTypography,
        ],
      })
      expect(css).toContain("/* unresolved alias */")
      expect(warnings.join("\n")).toMatch(/2 aliases could not be resolved/)
    })
  })
})
