import { describe, it, expect } from "vitest"
import { generatePartials } from "./partials.js"
import { rgbaToOklchCss } from "../color/oklch.js"
import {
  basePrimitives,
  themeSemantic,
  baseTypography,
  referenceDimension,
  figmaOnlyLayout,
  baseOptions,
  headingSmStyle,
} from "./fixtures.js"

const collections = [basePrimitives, themeSemantic, baseTypography]

function byName(
  files: { name: string; contents: string }[],
  name: string
): string {
  const file = files.find((f) => f.name === name)
  if (!file)
    throw new Error(
      `expected a ${name} partial, got: ${files.map((f) => f.name)}`
    )
  return file.contents
}

describe("generatePartials", () => {
  it("emits the Figma-derived partials in import order", () => {
    const { files, errors } = generatePartials({ ...baseOptions, collections })
    expect(errors).toEqual([])
    expect(files.map((f) => f.path)).toEqual([
      "ui/index.css",
      "ui/colors.css",
      "ui/typography.css",
    ])
    expect(files.map((f) => f.name)).toEqual([
      "index.css",
      "colors.css",
      "typography.css",
    ])
  })

  it("index.css carries the full import manifest and the dark variant", () => {
    const { files } = generatePartials({ ...baseOptions, collections })
    const index = byName(files, "index.css")
    expect(index).toContain('@import "tailwindcss";')
    expect(index).toContain('@import "tw-animate-css";')
    expect(index).toContain('@import "./colors.css";')
    expect(index).toContain('@import "./typography.css";')
    expect(index).toContain('@import "./scrollbar.css";')
    expect(index).toContain('@import "./scroll-fade.css";')
    expect(index).toContain('@import "./base.css";')
    expect(index).toContain("@custom-variant dark (&:is(.dark *));")
    // Every @import has to precede the @custom-variant rule to stay valid CSS.
    expect(index.lastIndexOf("@import")).toBeLessThan(
      index.indexOf("@custom-variant")
    )
  })

  it("folds fontsource imports into index.css ahead of the partial imports", () => {
    const { files } = generatePartials({
      ...baseOptions,
      collections,
      strategy: "fontsource-variable",
      fontAssignments: [{ role: "--font-sans", family: "Inter" }],
    })
    const index = byName(files, "index.css")
    expect(index).toContain('@import "@fontsource-variable/inter";')
    expect(index.indexOf("@fontsource-variable")).toBeLessThan(
      index.indexOf('@import "./colors.css";')
    )
  })

  it("colors.css holds @theme inline, :root ramps + light semantic, .dark semantic only", () => {
    const { files } = generatePartials({ ...baseOptions, collections })
    const colors = byName(files, "colors.css")

    const themeBody = colors.match(/@theme inline \{([\s\S]*?)\n\}/)![1]
    expect(themeBody).toMatch(/--color-surface:\s*var\(--surface\);/)

    const rootBody = colors.match(/:root \{([\s\S]*?)\n\}/)![1]
    expect(rootBody).toMatch(/--neutral-1:\s*oklch\(/)
    expect(rootBody).toMatch(/--neutral-dark-1:\s*oklch\(/)
    expect(rootBody).toMatch(/--surface:\s*var\(--neutral-1\);/)

    const darkBody = colors.match(/\.dark \{([\s\S]*?)\n\}/)![1]
    expect(darkBody).not.toMatch(/--neutral-1:\s*oklch\(/)
    expect(darkBody).not.toMatch(/--font-size-/)
    expect(darkBody).toMatch(/--surface:\s*var\(--neutral-dark-1\);/)

    expect(colors.indexOf("@theme inline")).toBeLessThan(
      colors.indexOf(":root {")
    )
    expect(colors.indexOf(":root {")).toBeLessThan(colors.indexOf(".dark {"))
  })

  it("hard-fails without a Theme collection, since it carries light and dark", () => {
    const { files, errors } = generatePartials({
      ...baseOptions,
      collections: [basePrimitives, baseTypography],
    })
    expect(files).toEqual([])
    expect(errors[0]).toMatch(/"Theme"/)
  })

  it("typography.css holds the type tokens and st-* utilities, and no color vars", () => {
    const { files } = generatePartials({
      ...baseOptions,
      collections,
      textStyles: [headingSmStyle],
    })
    const typography = byName(files, "typography.css")
    expect(typography).toContain("--font-size-body-sm:")
    expect(typography).toContain("--font-weight-regular: 400;")
    expect(typography).toContain("--letter-spacing-tight:")
    expect(typography).toMatch(/@utility st-heading-sm \{/)
    expect(typography).not.toContain("--neutral-1:")
    expect(typography).not.toContain("--surface:")
    expect(typography).not.toContain(".dark {")
  })

  it("leaves the static partials' content to the user's own files", () => {
    const { files } = generatePartials({ ...baseOptions, collections })
    for (const file of files) {
      expect(file.contents).not.toContain("@layer base")
      expect(file.contents).not.toContain("scrollbar-hide")
    }
  })

  it("applies the prefix across colors and typography", () => {
    const { files } = generatePartials({
      ...baseOptions,
      collections,
      prefix: "stera",
    })
    expect(byName(files, "colors.css")).toContain("--stera-neutral-1:")
    expect(byName(files, "typography.css")).toContain(
      "--stera-font-size-body-sm:"
    )
  })

  it("returns no files on a hard failure", () => {
    const { files, errors } = generatePartials({
      ...baseOptions,
      collections: [themeSemantic, baseTypography],
    })
    expect(files).toEqual([])
    expect(errors[0]).toMatch(/"Color"/)
  })

  it("never emits a @theme radius block for a Reference Radii group", () => {
    const { files } = generatePartials({
      ...baseOptions,
      collections: [...collections, referenceDimension],
    })
    for (const file of files) {
      expect(file.contents).not.toMatch(/@theme \{/)
      expect(file.contents).not.toContain("--radius-")
      expect(file.contents).not.toContain("--spacing-4")
    }
  })

  it("inlines an alias into an ignored collection in colors.css", () => {
    const theme = {
      ...themeSemantic,
      variables: [
        ...themeSemantic.variables,
        {
          id: "v-surface-note",
          name: "Surface/Note",
          type: "COLOR" as const,
          valuesByMode: {
            light: { kind: "alias" as const, targetId: "v-layout-annotation" },
            dark: { kind: "alias" as const, targetId: "v-layout-annotation" },
          },
        },
      ],
    }
    const { files } = generatePartials({
      ...baseOptions,
      collections: [basePrimitives, theme, baseTypography, figmaOnlyLayout],
    })
    const colors = byName(files, "colors.css")
    expect(colors).toContain(
      `--surface-note: ${rgbaToOklchCss({ r: 1, g: 0, b: 0, a: 1 })};`
    )
    expect(colors).toContain(
      `--surface-note: ${rgbaToOklchCss({ r: 0, g: 0, b: 1, a: 1 })};`
    )
    expect(colors).not.toContain("unresolved alias")
  })
})
