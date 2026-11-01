import { kebab } from "../naming/kebab.js"
import { fallbackStack, lookupFont } from "./registry.js"

export type FontStrategy = "next-font" | "fontsource-variable" | "raw"

export type FontAssignment = {
  role: string
  family: string
}

export type FontEmitResult = {
  declarations: string[]
  warnings: string[]
}

export function emitFontDeclarations(
  assignments: FontAssignment[],
  strategy: FontStrategy
): FontEmitResult {
  const declarations: string[] = []
  const warnings: string[] = []
  const warnedFamilies = new Set<string>()

  for (const { role, family } of assignments) {
    const trimmed = family.trim()
    if (!trimmed) continue

    if (strategy === "next-font") {
      // next/font lets the project pick any variable name, and the kebab-cased
      // family is the obvious one, so it is the default rather than a guess
      // worth warning about. The registry only supplies exceptions, like Geist's
      // `--font-geist-sans` from the geist package / create-next-app. The
      // fallback keeps text in a sensible family when no font is loaded.
      const nextVar = lookupFont(trimmed)?.nextVar ?? `--font-${kebab(trimmed)}`
      declarations.push(
        `  ${role}: var(${nextVar}, ${fallbackStack(trimmed)});`
      )
      continue
    }

    if (strategy === "fontsource-variable") {
      const known = lookupFont(trimmed)
      if (known) {
        declarations.push(`  ${role}: ${known.fontsourceFamily};`)
      } else {
        const stack = fallbackStack(trimmed)
        declarations.push(`  ${role}: '${trimmed}', ${stack};`)
        // Unlike next/font, this can genuinely break: the package to import and
        // the family name it registers can't be derived from the Figma name.
        // Several roles often share one family, so say it once.
        if (!warnedFamilies.has(trimmed.toLowerCase())) {
          warnedFamilies.add(trimmed.toLowerCase())
          warnings.push(
            `Unknown font family "${trimmed}" — no @fontsource-variable mapping, so no @import was added. Emitted generic '${trimmed}', ${stack}; install and import the font yourself, or add it to KNOWN_FAMILIES.`
          )
        }
      }
      continue
    }

    declarations.push(`  ${role}: '${trimmed}', ${fallbackStack(trimmed)};`)
  }

  return { declarations, warnings }
}

export function fontsourceImports(
  assignments: FontAssignment[],
  strategy: FontStrategy
): string[] {
  if (strategy !== "fontsource-variable") return []
  const pkgs = new Set<string>()
  for (const { family } of assignments) {
    const known = lookupFont(family)
    if (known) pkgs.add(known.fontsourcePackage)
  }
  return [...pkgs].sort().map((p) => `@import "${p}";`)
}
