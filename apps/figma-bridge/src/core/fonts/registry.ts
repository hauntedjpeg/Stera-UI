export type KnownFont = {
  nextVar: string
  fontsourcePackage: string
  fontsourceFamily: string
  stack: "sans-serif" | "serif" | "monospace"
}

export const KNOWN_FAMILIES: Record<string, KnownFont> = {
  geist: {
    nextVar: "--font-geist-sans",
    fontsourcePackage: "@fontsource-variable/geist",
    fontsourceFamily: "'Geist Variable', sans-serif",
    stack: "sans-serif",
  },
  "geist mono": {
    nextVar: "--font-geist-mono",
    fontsourcePackage: "@fontsource-variable/geist-mono",
    fontsourceFamily: "'Geist Mono Variable', monospace",
    stack: "monospace",
  },
  inter: {
    nextVar: "--font-inter",
    fontsourcePackage: "@fontsource-variable/inter",
    fontsourceFamily: "'Inter Variable', sans-serif",
    stack: "sans-serif",
  },
  "jetbrains mono": {
    nextVar: "--font-jetbrains-mono",
    fontsourcePackage: "@fontsource-variable/jetbrains-mono",
    fontsourceFamily: "'JetBrains Mono Variable', monospace",
    stack: "monospace",
  },
  roboto: {
    nextVar: "--font-roboto",
    fontsourcePackage: "@fontsource/roboto",
    fontsourceFamily: "Roboto, sans-serif",
    stack: "sans-serif",
  },
  "roboto mono": {
    nextVar: "--font-roboto-mono",
    fontsourcePackage: "@fontsource/roboto-mono",
    fontsourceFamily: "'Roboto Mono', monospace",
    stack: "monospace",
  },
  "zalando sans": {
    nextVar: "--font-zalando-sans",
    fontsourcePackage: "@fontsource-variable/zalando-sans",
    fontsourceFamily: "'Zalando Sans Variable', sans-serif",
    stack: "sans-serif",
  },
  "zalando sans semiexpanded": {
    nextVar: "--font-zalando-sans-semiexpanded",
    fontsourcePackage: "@fontsource-variable/zalando-sans-semiexpanded",
    fontsourceFamily: "'Zalando Sans SemiExpanded Variable', sans-serif",
    stack: "sans-serif",
  },
}

export function lookupFont(family: string): KnownFont | undefined {
  return KNOWN_FAMILIES[family.trim().toLowerCase()]
}

export function guessStack(
  family: string
): "sans-serif" | "serif" | "monospace" {
  const known = lookupFont(family)
  if (known) return known.stack
  const lower = family.toLowerCase()
  if (/mono|code|courier/.test(lower)) return "monospace"
  if (/serif/.test(lower) && !/sans/.test(lower)) return "serif"
  return "sans-serif"
}
