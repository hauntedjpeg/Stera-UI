import { describe, expect, it } from "vitest"
import { buildFontsCss, fontItemName, readFontVariables } from "./font-setup.js"

describe("readFontVariables", () => {
  it("reads the family variable behind each font role", () => {
    const css = `:root {
  --font-heading: var(--font-zalando-sans-semiexpanded, sans-serif);
  --font-sans: var(--font-zalando-sans, sans-serif);
  --font-mono: var(--font-geist-mono, ui-monospace, monospace);
  --font-weight-medium: 500;
  --font-size-body-sm: 0.75rem;
}
@utility st-body-sm {
  font-family: var(--font-sans);
}`
    expect(readFontVariables(css)).toEqual([
      "--font-zalando-sans-semiexpanded",
      "--font-zalando-sans",
      "--font-geist-mono",
    ])
  })

  it("accepts references without a fallback and dedupes", () => {
    const css = `--font-sans: var(--font-inter);\n--font-heading: var( --font-inter );`
    expect(readFontVariables(css)).toEqual(["--font-inter"])
  })

  it("ignores literal families", () => {
    expect(
      readFontVariables("--font-sans: 'Zalando Sans Variable', sans-serif;")
    ).toEqual([])
  })
})

describe("fontItemName", () => {
  it("maps a family variable to its registry item", () => {
    expect(fontItemName("--font-geist-mono")).toBe("font-geist-mono")
  })
})

describe("buildFontsCss", () => {
  const imports = ['@import "@fontsource-variable/zalando-sans";']
  const vars = { "--font-zalando-sans": "'Zalando Sans Variable', sans-serif" }

  it("creates the file with imports before the variables", () => {
    expect(buildFontsCss(null, imports, vars)).toBe(
      `/* Font files and the family variables ui/typography.css reads. Managed by stera-ui. */
@import "@fontsource-variable/zalando-sans";

:root {
  --font-zalando-sans: 'Zalando Sans Variable', sans-serif;
}
`
    )
  })

  it("merges new fonts into an existing file", () => {
    const first = buildFontsCss(null, imports, vars)
    const merged = buildFontsCss(
      first,
      ['@import "@fontsource-variable/geist-mono";'],
      { "--font-geist-mono": "'Geist Mono Variable', monospace" }
    )
    expect(merged).toContain(
      '@import "@fontsource-variable/zalando-sans";\n@import "@fontsource-variable/geist-mono";'
    )
    expect(merged).toContain(
      "  --font-zalando-sans: 'Zalando Sans Variable', sans-serif;\n  --font-geist-mono: 'Geist Mono Variable', monospace;\n}"
    )
  })

  it("is idempotent and keeps hand edits", () => {
    const edited = buildFontsCss(null, imports, vars).replace(
      "sans-serif;",
      "system-ui;"
    )
    expect(buildFontsCss(edited, imports, vars)).toBe(edited)
  })
})
