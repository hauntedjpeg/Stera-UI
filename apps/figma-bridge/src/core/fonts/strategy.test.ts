import { describe, it, expect } from "vitest"
import { emitFontDeclarations, fontsourceImports } from "./strategy.js"

const geistSans = { role: "--font-sans", family: "Geist" }
const geistMono = { role: "--font-mono", family: "Geist Mono" }
const unknown = { role: "--font-display", family: "Obscurity Pro" }

describe("emitFontDeclarations — next-font / family-named", () => {
  it("emits known family CSS-var references", () => {
    const { declarations, warnings } = emitFontDeclarations(
      [geistSans, geistMono],
      "next-font",
      "family-named"
    )
    expect(declarations).toEqual([
      "  --font-sans: var(--font-geist-sans);",
      "  --font-mono: var(--font-geist-mono);",
    ])
    expect(warnings).toEqual([])
  })

  it("derives the variable from the family name for unknown fonts, without warning", () => {
    const { declarations, warnings } = emitFontDeclarations(
      [unknown],
      "next-font",
      "family-named"
    )
    expect(declarations).toEqual([
      "  --font-display: var(--font-obscurity-pro);",
    ])
    expect(warnings).toEqual([])
  })
})

describe("emitFontDeclarations — next-font / match-init", () => {
  it("emits self-referential var refs", () => {
    const { declarations } = emitFontDeclarations(
      [geistSans, geistMono],
      "next-font",
      "match-init"
    )
    expect(declarations).toEqual([
      "  --font-sans: var(--font-sans);",
      "  --font-mono: var(--font-mono);",
    ])
  })
})

describe("emitFontDeclarations — fontsource-variable", () => {
  it("emits fontsource family strings for known fonts", () => {
    const { declarations, warnings } = emitFontDeclarations(
      [geistSans, geistMono],
      "fontsource-variable"
    )
    expect(declarations).toEqual([
      "  --font-sans: 'Geist Variable', sans-serif;",
      "  --font-mono: 'Geist Mono Variable', monospace;",
    ])
    expect(warnings).toEqual([])
  })

  it("warns for unknown family but still emits something usable", () => {
    const { declarations, warnings } = emitFontDeclarations(
      [unknown],
      "fontsource-variable"
    )
    expect(declarations[0]).toContain("'Obscurity Pro'")
    expect(warnings).toHaveLength(1)
  })

  it("warns once per unknown family, however many roles use it", () => {
    const { declarations, warnings } = emitFontDeclarations(
      [unknown, { role: "--font-heading", family: "Obscurity Pro" }],
      "fontsource-variable"
    )
    expect(declarations).toHaveLength(2)
    expect(warnings).toHaveLength(1)
  })
})

describe("emitFontDeclarations — raw", () => {
  it("emits literal family names with stack", () => {
    const { declarations } = emitFontDeclarations([geistSans, geistMono], "raw")
    expect(declarations).toEqual([
      "  --font-sans: Geist, sans-serif;",
      "  --font-mono: Geist Mono, monospace;",
    ])
  })
})

describe("fontsourceImports", () => {
  it("returns sorted @import statements for known fonts", () => {
    const imports = fontsourceImports(
      [geistSans, geistMono],
      "fontsource-variable"
    )
    expect(imports).toEqual([
      '@import "@fontsource-variable/geist";',
      '@import "@fontsource-variable/geist-mono";',
    ])
  })

  it("returns empty array for non-fontsource strategies", () => {
    expect(fontsourceImports([geistSans], "next-font")).toEqual([])
    expect(fontsourceImports([geistSans], "raw")).toEqual([])
  })
})
