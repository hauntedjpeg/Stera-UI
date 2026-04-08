import fs from "node:fs"
import path from "node:path"
import { patchCssVariables, removeCssImport } from "./patch-css-vars.js"
import { CHECK, WARN, dim } from "./format.js"

const GEIST_IMPORTS = `import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"`

/**
 * Check whether a layout file can be safely patched.
 * Returns false for layouts that are too complex for string-based patching.
 */
function canPatchLayout(content: string): boolean {
  // Must have an <html tag
  if (!/<html[\s>]/.test(content)) return false
  // Reject if there are multiple <html tags (unlikely but guard)
  if ((content.match(/<html[\s>]/g) || []).length > 1) return false
  return true
}

/**
 * Insert import statements after the last existing import line.
 */
function insertImports(content: string, imports: string): string {
  const lines = content.split("\n")
  let lastImportIndex = -1

  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim()
    if (
      trimmed.startsWith("import ") ||
      trimmed.startsWith("import{") ||
      trimmed.startsWith("import\t")
    ) {
      lastImportIndex = i
    }
  }

  if (lastImportIndex >= 0) {
    lines.splice(lastImportIndex + 1, 0, imports)
  } else {
    lines.unshift(imports)
  }

  return lines.join("\n")
}

/**
 * Add CSS variable classNames to the <html> tag.
 *
 * Handles these patterns:
 * - <html lang="en">  → <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
 * - <html className="dark"> → <html className={`dark ${GeistSans.variable} ${GeistMono.variable}`}>
 * - <html className={someVar}> → <html className={`${someVar} ${GeistSans.variable} ${GeistMono.variable}`}>
 * - <html className={`${inter.variable}`}> → <html className={`${inter.variable} ${GeistSans.variable} ${GeistMono.variable}`}>
 */
function addClassNameToHtml(content: string): string {
  const fontClasses = "${GeistSans.variable} ${GeistMono.variable}"

  // Case 1: className with template literal
  const templateMatch = content.match(
    /(<html[^>]*className=\{`)(.*?)(`\})/s
  )
  if (templateMatch) {
    const existing = templateMatch[2].trim()
    const newClassName = existing ? `${existing} ${fontClasses}` : fontClasses
    return content.replace(
      templateMatch[0],
      `${templateMatch[1]}${newClassName}${templateMatch[3]}`
    )
  }

  // Case 2: className with expression (e.g., className={someVar})
  const exprMatch = content.match(
    /(<html[^>]*className=\{)([^}`]+)(\})/
  )
  if (exprMatch) {
    return content.replace(
      exprMatch[0],
      `${exprMatch[1]}\`\${${exprMatch[2].trim()}} ${fontClasses}\`${exprMatch[3]}`
    )
  }

  // Case 3: className with string literal
  const stringMatch = content.match(
    /(<html[^>]*className=)(["'])([^"']*)(["'])/
  )
  if (stringMatch) {
    const existing = stringMatch[3].trim()
    const newClassName = existing ? `${existing} ${fontClasses}` : fontClasses
    return content.replace(
      stringMatch[0],
      `${stringMatch[1]}{\`${newClassName}\`}`
    )
  }

  // Case 4: No className at all — add one
  return content.replace(
    /<html(\s)/,
    `<html className={\`${fontClasses}\`}$1`
  )
}

/**
 * Generate the code snippet for manual insertion when auto-patching fails.
 */
function generateSnippet(): string {
  return `
  Add these imports to your root layout file:

    ${dim(GEIST_IMPORTS)}

  Then add the font variables to your <html> tag:

    ${dim('<html className={`${GeistSans.variable} ${GeistMono.variable}`}>')}
`
}

/**
 * Set up Geist fonts using next/font for a Next.js project.
 *
 * 1. Patches layout.tsx with geist/font imports and className
 * 2. Updates CSS variables to reference next/font CSS variables
 * 3. Removes @import './fonts.css' from globals if present
 *
 * @returns true if layout was auto-patched, false if manual snippet was printed
 */
export function setupFontsNextjs(
  cwd: string,
  layoutFile: string,
  cssFile: string
): boolean {
  const layoutPath = path.join(cwd, layoutFile)
  const cssPath = path.join(cwd, cssFile)

  let layoutContent = fs.readFileSync(layoutPath, "utf-8")

  // Check if geist fonts are already imported
  if (
    layoutContent.includes("geist/font/sans") ||
    layoutContent.includes("GeistSans")
  ) {
    console.log(`  ${dim("geist/font already configured in " + layoutFile)}`)
    return true
  }

  // Check if we can safely patch
  if (!canPatchLayout(layoutContent)) {
    console.log(`  ${WARN}  Could not auto-patch ${layoutFile}`)
    console.log(generateSnippet())
    return false
  }

  // Insert imports
  layoutContent = insertImports(layoutContent, GEIST_IMPORTS)

  // Add className to <html>
  layoutContent = addClassNameToHtml(layoutContent)

  // Write patched layout
  fs.writeFileSync(layoutPath, layoutContent, "utf-8")
  console.log(`  ${CHECK}  Updated ${layoutFile} with geist/font imports`)

  // Patch CSS variables to use next/font CSS variables
  if (fs.existsSync(cssPath)) {
    const patched = patchCssVariables(cssPath, {
      "--font-display": "var(--font-geist-sans)",
      "--font-body": "var(--font-geist-sans)",
    })
    if (patched.length > 0) {
      console.log(`  ${CHECK}  Updated font variables in ${path.relative(cwd, cssPath)}`)
    }

    // Remove @import './fonts.css' since next/font handles @font-face
    removeCssImport(cssPath, "./fonts.css")
  }

  return true
}
