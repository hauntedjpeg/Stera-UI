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
  /** CSS variable name from next/font (e.g. "--font-inter") */
  nextFontVariable: string | null
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
  nextFontVariable: string | null
} {
  const hasNextFont =
    /import.*from\s+['"]next\/font/.test(layoutContent) ||
    /import.*from\s+['"]@next\/font/.test(layoutContent) ||
    /import.*from\s+['"]geist\/font/.test(layoutContent)

  let nextFontVariable: string | null = null
  // Match patterns like: variable: '--font-inter' or variable: "--font-inter"
  const varMatch = layoutContent.match(/variable:\s*['"](--.+?)['"]/)
  if (varMatch) {
    nextFontVariable = varMatch[1]
  }

  return { hasNextFont, nextFontVariable }
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
    nextFontVariable: null,
  }

  // Check layout file for next/font and Google Fonts
  if (project.layoutFile) {
    const layoutContent = readIfExists(path.join(cwd, project.layoutFile))
    if (layoutContent) {
      const nextFontResult = detectNextFont(layoutContent)
      result.hasNextFont = nextFontResult.hasNextFont
      result.nextFontVariable = nextFontResult.nextFontVariable

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
