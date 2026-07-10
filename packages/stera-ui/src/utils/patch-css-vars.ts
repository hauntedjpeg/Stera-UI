import fs from "node:fs"

/**
 * Patch CSS custom property values in a file.
 *
 * Finds lines matching `--prop-name: <value>;` and replaces the value.
 * Works with the predictable structure of generated globals.css / stera-ui.css.
 *
 * @returns List of property names that were actually patched
 */
export function patchCssVariables(
  filePath: string,
  patches: Record<string, string>
): string[] {
  const content = fs.readFileSync(filePath, "utf-8")
  const lines = content.split("\n")
  const patched: string[] = []

  // Match lines like: "    --font-display: Geist;" — compiled once per
  // property rather than per line.
  const compiled = Object.entries(patches).map(([prop, newValue]) => ({
    prop,
    newValue,
    regex: new RegExp(`(\\s*${escapeRegex(prop)}:\\s*).+?(;)`),
  }))

  for (let i = 0; i < lines.length; i++) {
    for (const { prop, newValue, regex } of compiled) {
      if (regex.test(lines[i])) {
        lines[i] = lines[i].replace(regex, `$1${newValue}$2`)
        if (!patched.includes(prop)) patched.push(prop)
      }
    }
  }

  if (patched.length > 0) {
    fs.writeFileSync(filePath, lines.join("\n"), "utf-8")
  }

  return patched
}

/**
 * Remove an @import line from a CSS file.
 */
export function removeCssImport(filePath: string, importPath: string): boolean {
  const content = fs.readFileSync(filePath, "utf-8")
  const pattern = new RegExp(
    `@import\\s+['"]${escapeRegex(importPath)}['"]\\s*;?\\n?`
  )

  if (!pattern.test(content)) return false

  fs.writeFileSync(filePath, content.replace(pattern, ""), "utf-8")
  return true
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}
