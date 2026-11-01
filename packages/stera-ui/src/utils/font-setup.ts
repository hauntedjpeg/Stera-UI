import fs from "node:fs/promises"
import { existsSync } from "node:fs"
import path from "node:path"
import { fetchRegistryItem } from "../registry/index.js"
import type { RegistryFontItem } from "../schema/index.js"
import type { ProjectInfo } from "./detect-project.js"
import { installDependencies } from "./install-deps.js"
import { CHECK, WARN } from "./format.js"

export interface FontTreeResult {
  /** Font variable → registered family, defined in `ui/fonts.css` (fontsource) */
  cssVars: Record<string, string>
  /** npm dependencies to install */
  dependencies: string[]
  /** CSS @import lines to add (fontsource) */
  cssImports: string[]
}

/** Partial that loads fontsource fonts on non-Next.js projects. CLI-owned. */
export const FONTS_TARGET = "ui/fonts.css"

const FONTS_HEADER =
  "/* Font files and the family variables ui/typography.css reads. Managed by stera-ui. */"

/**
 * Family variables the font roles in `ui/typography.css` point at.
 *
 * `--font-sans: var(--font-zalando-sans, sans-serif);` →
 * `--font-zalando-sans`. Only `--font-*` declarations whose value starts with
 * a `var(--font-…)` reference count, so sizes and weights never match.
 */
export function readFontVariables(css: string): string[] {
  const variables: string[] = []
  const pattern = /^\s*--font-[\w-]+\s*:\s*var\(\s*(--font-[\w-]+)\s*[,)]/gm
  for (const match of css.matchAll(pattern)) {
    if (!variables.includes(match[1])) variables.push(match[1])
  }
  return variables
}

/**
 * Registry item that provides a family variable: `--font-geist-mono` is
 * `font-geist-mono`. The registry build enforces this naming for every
 * variable `ui/typography.css` references.
 */
export function fontItemName(variable: string): string {
  return `font-${variable.replace(/^--font-/, "")}`
}

/**
 * Fetch the font items for the given family variables.
 *
 * @returns The items found, and the variables no registry item provides.
 */
export async function fetchFontItems(variables: string[]): Promise<{
  fonts: RegistryFontItem[]
  missing: string[]
}> {
  const results = await Promise.all(
    variables.map(async (variable) => {
      try {
        const item = await fetchRegistryItem(fontItemName(variable))
        return item.type === "registry:font" && item.font.variable === variable
          ? item
          : null
      } catch {
        return null
      }
    })
  )

  return {
    fonts: results.filter((item) => item !== null),
    missing: variables.filter((_, i) => results[i] === null),
  }
}

/**
 * Merge fontsource imports and family variables into `ui/fonts.css`.
 *
 * Existing imports and variables are left as they are, so a family the user
 * edited by hand survives. Pure — returns the new file content.
 */
export function buildFontsCss(
  existing: string | null,
  imports: string[],
  vars: Record<string, string>
): string {
  let content = existing ?? `${FONTS_HEADER}\n`

  const newImports = imports.filter((line) => !content.includes(line))
  if (newImports.length > 0) {
    const lines = content.split("\n")
    let lastImport = -1
    lines.forEach((line, i) => {
      if (line.trim().startsWith("@import")) lastImport = i
    })
    // Imports must precede every rule; after the header comment otherwise.
    const at =
      lastImport >= 0 ? lastImport + 1 : lines[0] === FONTS_HEADER ? 1 : 0
    lines.splice(at, 0, ...newImports)
    content = lines.join("\n")
  }

  const newVars = Object.entries(vars).filter(
    ([name]) => !new RegExp(`^\\s*${name}\\s*:`, "m").test(content)
  )
  if (newVars.length > 0) {
    const decls = newVars.map(([name, value]) => `  ${name}: ${value};`)
    const root = content.match(/:root\s*\{[^}]*\}/)
    if (root) {
      const block = root[0]
      const updated = block.replace(/\s*\}$/, `\n${decls.join("\n")}\n}`)
      content = content.replace(block, updated)
    } else {
      content = `${content.trimEnd()}\n\n:root {\n${decls.join("\n")}\n}\n`
    }
  }

  return content
}

/**
 * Work out what a non-Next.js project needs to load the given fonts.
 *
 * `ui/typography.css` points each role at a family-named variable
 * (`--font-sans: var(--font-zalando-sans, …)`), the same name the font item
 * declares, so the two always agree.
 *
 * - **Next.js**: Nothing here. next/font defines the variable on <html> via
 *   the layout file (see `updateFonts`).
 * - **Other frameworks**: The @fontsource-variable/* package to install, its
 *   @import, and the family to define the variable as.
 */
export function massageTreeForFonts(
  fonts: RegistryFontItem[],
  project: ProjectInfo
): FontTreeResult {
  const result: FontTreeResult = {
    cssVars: {},
    dependencies: [],
    cssImports: [],
  }

  if (fonts.length === 0 || project.framework === "next") return result

  for (const font of fonts) {
    const fontName = font.name.replace(/^font-/, "")
    const fontSourceDep =
      font.font.dependency ?? `@fontsource-variable/${fontName}`
    result.dependencies.push(fontSourceDep)
    result.cssImports.push(`@import "${fontSourceDep}";`)
    result.cssVars[font.font.variable] = font.font.family
  }

  return result
}

/**
 * Load `fonts` in the project.
 *
 * - **Next.js**: next/font/google declarations in the root layout. The
 *   ts-morph tooling behind this loads only here, so `add` stays fast.
 * - **Other frameworks**: fontsource packages, registered in `ui/fonts.css`.
 *   `ui/typography.css` is never edited — it stays exactly what the registry
 *   (and Figma) ships, and its `var(--font-…)` references resolve against the
 *   variables defined there.
 *
 * @returns For non-Next.js projects, `ui/fonts.css` and whether it is new.
 */
export async function setupFonts(
  fonts: RegistryFontItem[],
  project: ProjectInfo,
  cssDir: string,
  cwd: string
): Promise<{ fontsPath: string; created: boolean } | null> {
  if (fonts.length === 0) return null

  if (project.framework === "next") {
    const { updateFonts } = await import("./update-fonts.js")
    await updateFonts(fonts, project, cwd)
    return null
  }

  const tree = massageTreeForFonts(fonts, project)
  await installDependencies(tree.dependencies, cwd)

  const fontsPath = path.join(cssDir, FONTS_TARGET)
  const created = !existsSync(fontsPath)
  const existing = created ? null : await fs.readFile(fontsPath, "utf-8")
  const content = buildFontsCss(existing, tree.cssImports, tree.cssVars)
  if (content !== existing) {
    await fs.mkdir(path.dirname(fontsPath), { recursive: true })
    await fs.writeFile(fontsPath, content, "utf-8")
    console.log(`${CHECK} Added fonts to ${path.relative(cwd, fontsPath)}`)
  }

  return { fontsPath, created }
}

/** Warn about family variables no registry font provides. */
export function warnMissingFonts(missing: string[], typographyPath: string) {
  if (missing.length === 0) return
  console.log(
    `${WARN} No registry font provides ${missing.join(", ")} (used in ${path.basename(typographyPath)}). Load it yourself: https://ui.stera.sh/docs/fonts`
  )
}
