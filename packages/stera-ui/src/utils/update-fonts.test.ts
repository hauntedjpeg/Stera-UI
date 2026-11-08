import { describe, expect, it } from "vitest"
import ts from "typescript"
import { registryItemSchema, type RegistryFontItem } from "../schema/index.js"
import { massageTreeForFonts } from "./font-setup.js"
import { buildFontOptions, transformLayoutFonts } from "./update-fonts.js"

function font(
  name: string,
  importName: string,
  variable: string,
  family: string,
  extra: Partial<RegistryFontItem["font"]> = {}
): RegistryFontItem {
  return {
    name,
    type: "registry:font",
    font: {
      family,
      provider: "google",
      import: importName,
      variable,
      subsets: ["latin"],
      dependency: `@fontsource-variable/${name.replace(/^font-/, "")}`,
      ...extra,
    },
  }
}

const FONTS = [
  font(
    "font-zalando-sans",
    "Zalando_Sans",
    "--font-zalando-sans",
    "'Zalando Sans Variable', sans-serif"
  ),
  font(
    "font-zalando-sans-semiexpanded",
    "Zalando_Sans_SemiExpanded",
    "--font-zalando-sans-semiexpanded",
    "'Zalando Sans SemiExpanded Variable', sans-serif"
  ),
  font(
    "font-geist-mono",
    "Geist_Mono",
    "--font-geist-mono",
    "'Geist Mono Variable', monospace"
  ),
]

// create-next-app 16.
const CREATE_NEXT_APP = `import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Create Next App",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={\`\${geistSans.variable} \${geistMono.variable} h-full antialiased\`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
`

const BARE = `import "./globals.css"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
`

function layoutWithHtml(htmlAttributes: string, preamble = "") {
  return `${preamble}import "./globals.css"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html ${htmlAttributes}>
      <body>{children}</body>
    </html>
  )
}
`
}

function parseErrors(code: string) {
  const sourceFile = ts.createSourceFile(
    "layout.tsx",
    code,
    ts.ScriptTarget.Latest,
    false,
    ts.ScriptKind.TSX
  ) as ts.SourceFile & { parseDiagnostics: ts.Diagnostic[] }
  return sourceFile.parseDiagnostics.length
}

function declarationCount(code: string, name: string) {
  return code.match(new RegExp(`const ${name} =`, "g"))?.length ?? 0
}

function transform(input: string) {
  const result = transformLayoutFonts(input, FONTS)
  expect(result.appliedToHtml).toBe(true)
  return result.content
}

describe("transformLayoutFonts", () => {
  it("adds next/font declarations and html classes to a bare layout", () => {
    const out = transform(BARE)
    expect(out).toContain(
      'import { Zalando_Sans, Zalando_Sans_SemiExpanded, Geist_Mono } from "next/font/google"'
    )
    expect(out).toContain(
      'const zalandoSans = Zalando_Sans({\n  variable: "--font-zalando-sans",\n  subsets: ["latin"],\n})'
    )
    expect(out).toContain(
      '<html lang="en" className={`${zalandoSans.variable} ${zalandoSansSemiexpanded.variable} ${geistMono.variable}`}>'
    )
    expect(parseErrors(out)).toBe(0)
  })

  it("never adds a cn() import", () => {
    for (const input of [BARE, CREATE_NEXT_APP]) {
      expect(transform(input)).not.toMatch(/\bcn\b/)
    }
  })

  it("keeps declarations in registry order", () => {
    const out = transform(BARE)
    const order = ["zalandoSans =", "zalandoSansSemiexpanded =", "geistMono ="]
    const positions = order.map((needle) => out.indexOf(needle))
    expect(positions).toEqual([...positions].sort((a, b) => a - b))
  })

  it("is idempotent", () => {
    for (const input of [BARE, CREATE_NEXT_APP]) {
      const once = transform(input)
      expect(transform(once)).toBe(once)
    }
  })

  it("reuses an existing declaration with the same variable, options and all", () => {
    const out = transform(CREATE_NEXT_APP)
    expect(declarationCount(out, "geistMono")).toBe(1)
    expect(out).toContain('display: "swap"')
    expect(out).toContain(
      "className={`${zalandoSans.variable} ${zalandoSansSemiexpanded.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased`}"
    )
    expect(parseErrors(out)).toBe(0)
  })

  it("does not confuse --font-zalando-sans with --font-zalando-sans-semiexpanded", () => {
    const input = layoutWithHtml(
      "className={heading.variable}",
      'import { Zalando_Sans_SemiExpanded } from "next/font/google"\n\nconst heading = Zalando_Sans_SemiExpanded({ subsets: ["latin"], variable: "--font-zalando-sans-semiexpanded" })\n\n'
    )
    const out = transform(input)
    expect(out).toContain("const heading = Zalando_Sans_SemiExpanded(")
    expect(declarationCount(out, "zalandoSans")).toBe(1)
    expect(declarationCount(out, "zalandoSansSemiexpanded")).toBe(0)
    expect(out).toContain(
      "className={`${zalandoSans.variable} ${geistMono.variable} ${heading.variable}`}"
    )
    expect(transform(out)).toBe(out)
  })

  it("appends to an existing cn() call", () => {
    const out = transform(
      layoutWithHtml(
        'className={cn("antialiased", inter.variable)}',
        'import { cn } from "@/lib/utils"\n'
      )
    )
    expect(out).toContain(
      'className={cn("antialiased", inter.variable, zalandoSans.variable, zalandoSansSemiexpanded.variable, geistMono.variable)}'
    )
    expect(transform(out)).toBe(out)
  })

  it("merges into a plain string className", () => {
    const out = transform(layoutWithHtml('lang="en" className="h-full"'))
    expect(out).toContain(
      "className={`${zalandoSans.variable} ${zalandoSansSemiexpanded.variable} ${geistMono.variable} h-full`}"
    )
    expect(parseErrors(out)).toBe(0)
  })

  it("wraps any other expression in a template literal", () => {
    const out = transform(layoutWithHtml("className={GeistSans.className}"))
    expect(out).toContain(
      "className={`${zalandoSans.variable} ${zalandoSansSemiexpanded.variable} ${geistMono.variable} ${GeistSans.className}`}"
    )
    expect(transform(out)).toBe(out)
  })

  it("names a font after its variable", () => {
    const geist = font(
      "font-geist",
      "Geist",
      "--font-geist-sans",
      "'Geist Variable', sans-serif"
    )
    const { content } = transformLayoutFonts(BARE, [geist])
    expect(content).toContain("const geistSans = Geist({")
  })

  it("picks a fresh name when the default one is taken", () => {
    const input = layoutWithHtml(
      "className={geistMono.variable}",
      'import { Geist_Mono } from "next/font/google"\n\nconst geistMono = Geist_Mono({ variable: "--font-mono" })\n\n'
    )
    const out = transform(input)
    expect(out).toContain("const geistMono2 = Geist_Mono(")
    expect(parseErrors(out)).toBe(0)
  })

  it("handles a multi-line next/font import", () => {
    const input = layoutWithHtml(
      'lang="en"',
      'import {\n  Inter,\n  JetBrains_Mono,\n} from "next/font/google"\n'
    )
    const out = transform(input)
    expect(out).toMatch(/Inter,\s+JetBrains_Mono,\s+Zalando_Sans,/)
    expect(parseErrors(out)).toBe(0)
  })

  it("reports a layout without <html> and leaves it alone", () => {
    const input = `export default function RootLayout({ children }: { children: React.ReactNode }) {\n  return <>{children}</>\n}\n`
    const result = transformLayoutFonts(input, FONTS)
    expect(result).toEqual({ content: input, appliedToHtml: false })
  })
})

describe("massageTreeForFonts", () => {
  const vite = {
    hasSrc: true,
    framework: "vite" as const,
    viteMajor: 8,
    rsc: false,
    existingCssFile: "src/index.css",
    layoutFile: "index.html",
  }

  it("returns nothing for Next.js", () => {
    expect(massageTreeForFonts(FONTS, { ...vite, framework: "next" })).toEqual({
      cssVars: {},
      dependencies: [],
      cssImports: [],
    })
  })

  it("maps each font to its fontsource package and family", () => {
    const result = massageTreeForFonts(FONTS.slice(0, 1), vite)
    expect(result).toEqual({
      cssVars: { "--font-zalando-sans": "'Zalando Sans Variable', sans-serif" },
      dependencies: ["@fontsource-variable/zalando-sans"],
      cssImports: ['@import "@fontsource-variable/zalando-sans";'],
    })
  })
})

describe("buildFontOptions", () => {
  // next/font has no size metrics for Zalando Sans.
  const zalando = font(
    "font-zalando-sans",
    "Zalando_Sans",
    "--font-zalando-sans",
    "'Zalando Sans Variable', sans-serif",
    { fallback: ["sans-serif"], adjustFontFallback: false }
  )

  it("passes fallback and adjustFontFallback through to next/font", () => {
    expect(buildFontOptions(zalando, "\n")).toBe(
      '{\n  variable: "--font-zalando-sans",\n  subsets: ["latin"],\n  fallback: ["sans-serif"],\n  adjustFontFallback: false,\n}'
    )
  })

  it("writes them on one line for the manual steps", () => {
    expect(buildFontOptions(zalando, "")).toBe(
      '{ variable: "--font-zalando-sans", subsets: ["latin"], fallback: ["sans-serif"], adjustFontFallback: false }'
    )
  })

  it("leaves them out when the item doesn't set them", () => {
    expect(buildFontOptions(FONTS[2], "")).toBe(
      '{ variable: "--font-geist-mono", subsets: ["latin"] }'
    )
  })

  it("separates array entries without touching commas inside them", () => {
    const stack = font("font-x", "X", "--font-x", "'X', sans-serif", {
      fallback: ["Helvetica Neue, Arial", "sans-serif"],
    })
    expect(buildFontOptions(stack, "")).toContain(
      'fallback: ["Helvetica Neue, Arial", "sans-serif"]'
    )
  })

  it("survives schema parsing, which strips unknown keys", () => {
    const parsed = registryItemSchema.parse(zalando) as RegistryFontItem
    expect(parsed.font.fallback).toEqual(["sans-serif"])
    expect(parsed.font.adjustFontFallback).toBe(false)
  })
})
