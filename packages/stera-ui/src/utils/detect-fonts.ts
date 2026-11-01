import fs from "node:fs"
import path from "node:path"
import type { ProjectInfo } from "./detect-project.js"

export interface DetectedFonts {
  /** User has next/font imports in their layout file */
  hasNextFont: boolean
  /** User has @font-face declarations in CSS */
  hasFontFace: boolean
  /** User has Google Fonts links in HTML/layout */
  hasGoogleFontsLink: boolean
  /** Extracted font-family names from CSS */
  fontFamilies: string[]
  /** CSS variables declared through next/font (e.g. "--font-inter") */
  nextFontVariables: string[]
}

/**
 * Read a file if it exists, otherwise return null.
 */
function readIfExists(filePath: string): string | null {
  try {
    return fs.readFileSync(filePath, "utf-8")
  } catch {
    return null
  }
}

/**
 * Scan layout file for next/font imports and extract CSS variable names.
 */
function detectNextFont(layoutContent: string): {
  hasNextFont: boolean
  nextFontVariables: string[]
} {
  // [^;]* rather than .* so multi-line (formatted) imports match too.
  const hasNextFont =
    /import[^;]*?from\s+['"](next\/font|@next\/font|geist\/font)/.test(
      layoutContent
    )

  // Match patterns like: variable: '--font-inter' or variable: "--font-inter"
  const nextFontVariables: string[] = []
  for (const match of layoutContent.matchAll(/variable:\s*['"](--.+?)['"]/g)) {
    if (!nextFontVariables.includes(match[1])) nextFontVariables.push(match[1])
  }

  return { hasNextFont, nextFontVariables }
}

/**
 * Scan CSS content for @font-face declarations and extract font-family names.
 */
function detectFontFace(cssContent: string): {
  hasFontFace: boolean
  fontFamilies: string[]
} {
  const hasFontFace = /@font-face\s*\{/.test(cssContent)

  const fontFamilies: string[] = []
  const regex = /font-family:\s*['"]?([^'";}\n]+?)['"]?\s*;/g
  let match: RegExpExecArray | null
  while ((match = regex.exec(cssContent)) !== null) {
    const family = match[1].trim()
    if (family && !fontFamilies.includes(family)) {
      fontFamilies.push(family)
    }
  }

  return { hasFontFace, fontFamilies }
}

/**
 * Scan file content for Google Fonts links.
 */
function detectGoogleFonts(content: string): boolean {
  return (
    content.includes("fonts.googleapis.com") ||
    content.includes("fonts.gstatic.com")
  )
}

/**
 * Detect existing font configuration in the user's project.
 */
export function detectFonts(cwd: string, project: ProjectInfo): DetectedFonts {
  const result: DetectedFonts = {
    hasNextFont: false,
    hasFontFace: false,
    hasGoogleFontsLink: false,
    fontFamilies: [],
    nextFontVariables: [],
  }

  // Check layout file for next/font and Google Fonts
  if (project.layoutFile) {
    const layoutContent = readIfExists(path.join(cwd, project.layoutFile))
    if (layoutContent) {
      const nextFontResult = detectNextFont(layoutContent)
      result.hasNextFont = nextFontResult.hasNextFont
      result.nextFontVariables = nextFontResult.nextFontVariables

      if (detectGoogleFonts(layoutContent)) {
        result.hasGoogleFontsLink = true
      }
    }
  }

  // Check CSS files for @font-face
  if (project.existingCssFile) {
    const cssContent = readIfExists(path.join(cwd, project.existingCssFile))
    if (cssContent) {
      const fontFaceResult = detectFontFace(cssContent)
      result.hasFontFace = fontFaceResult.hasFontFace
      result.fontFamilies.push(...fontFaceResult.fontFamilies)

      if (detectGoogleFonts(cssContent)) {
        result.hasGoogleFontsLink = true
      }

      // Also scan imported CSS files
      const importRegex = /@import\s+['"](.+?)['"]/g
      let importMatch: RegExpExecArray | null
      while ((importMatch = importRegex.exec(cssContent)) !== null) {
        const importPath = importMatch[1]
        const resolvedPath = path.join(
          cwd,
          path.dirname(project.existingCssFile),
          importPath
        )
        const importedContent = readIfExists(resolvedPath)
        if (importedContent) {
          const imported = detectFontFace(importedContent)
          if (imported.hasFontFace) result.hasFontFace = true
          for (const family of imported.fontFamilies) {
            if (!result.fontFamilies.includes(family)) {
              result.fontFamilies.push(family)
            }
          }
        }
      }
    }
  }

  // Check index.html for Google Fonts (Vite/other)
  for (const htmlFile of ["index.html", "src/index.html"]) {
    const htmlContent = readIfExists(path.join(cwd, htmlFile))
    if (htmlContent && detectGoogleFonts(htmlContent)) {
      result.hasGoogleFontsLink = true
    }
  }

  return result
}

export interface FontOverride {
  line: number
  /** The declaration as written, e.g. `font-family: Arial, sans-serif` */
  declaration: string
  /** Where it sits: `@theme inline` or the rule's selector. */
  context: string
}

/**
 * Rules in the user's own stylesheet that win over the Stera font tokens:
 *
 * - `--font-sans` and friends inside `@theme inline`. Inline theme values are
 *   baked into Tailwind's `font-sans` utility and the page's default font, so
 *   those skip the `--font-sans` variable Stera defines.
 * - `font-family` on `html`, `body` or `:root`, which plain text inherits.
 *
 * create-next-app ships both. A plain `@theme` block is harmless: its
 * variables live in a cascade layer that Stera's unlayered ones override.
 */
export function findFontOverrides(css: string): FontOverride[] {
  // Blank out comments, keeping newlines so line numbers stay right.
  const src = css.replace(/\/\*[\s\S]*?\*\//g, (comment) =>
    comment.replace(/[^\n]/g, " ")
  )

  const overrides: FontOverride[] = []
  const contexts: string[] = []
  let buffer = ""
  let bufferLine = 1
  let line = 1

  const check = () => {
    const match = buffer.trim().match(/^([\w-]+)\s*:\s*([\s\S]+)$/)
    buffer = ""
    if (!match) return
    const [, property, value] = match
    const context = contexts[contexts.length - 1] ?? ""
    const isInlineTheme = /^@theme\b[^{]*\binline\b/.test(context)
    const isRootRule =
      !context.startsWith("@") &&
      /(^|[\s,>+~])(html|body|:root)(?![\w-])/.test(context)

    if (
      (isInlineTheme && /^--font-(sans|serif|mono|heading)$/.test(property)) ||
      (isRootRule && property === "font-family")
    ) {
      overrides.push({
        line: bufferLine,
        declaration: `${property}: ${value.trim().replace(/\s+/g, " ")}`,
        context: isInlineTheme ? "@theme inline" : context,
      })
    }
  }

  for (const char of src) {
    if (char === "{") {
      contexts.push(buffer.trim().replace(/\s+/g, " "))
      buffer = ""
    } else if (char === ";" || char === "}") {
      check()
      if (char === "}") contexts.pop()
    } else {
      if (!buffer.trim() && char.trim()) bufferLine = line
      buffer += char
    }
    if (char === "\n") line++
  }

  return overrides
}
