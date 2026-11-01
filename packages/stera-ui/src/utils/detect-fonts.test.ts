import { describe, expect, it } from "vitest"
import { findFontOverrides } from "./detect-fonts.js"

describe("findFontOverrides", () => {
  it("flags create-next-app's inline theme fonts and body font-family", () => {
    const css = `@import "tailwindcss";
@import "./ui/index.css";

:root {
  --background: #ffffff;
}

@theme inline {
  --color-background: var(--background);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

body {
  background: var(--background);
  font-family: Arial, Helvetica, sans-serif;
}
`
    expect(findFontOverrides(css)).toEqual([
      {
        line: 10,
        declaration: "--font-sans: var(--font-geist-sans)",
        context: "@theme inline",
      },
      {
        line: 11,
        declaration: "--font-mono: var(--font-geist-mono)",
        context: "@theme inline",
      },
      {
        line: 16,
        declaration: "font-family: Arial, Helvetica, sans-serif",
        context: "body",
      },
    ])
  })

  it("ignores a plain @theme block, other selectors and comments", () => {
    const css = `@theme {
  --font-sans: Inter;
}
.prose { font-family: Georgia; }
html .card { color: red; }
/* body { font-family: Arial; } */
@media (prefers-color-scheme: dark) {
  html { color: white; }
}
`
    expect(findFontOverrides(css)).toEqual([])
  })

  it("finds html and :root font-family, including inside @layer", () => {
    const css = `@layer base {\n  html,\n  :root {\n    font-family: system-ui;\n  }\n}\n`
    expect(findFontOverrides(css)).toEqual([
      {
        line: 4,
        declaration: "font-family: system-ui",
        context: "html, :root",
      },
    ])
  })
})
