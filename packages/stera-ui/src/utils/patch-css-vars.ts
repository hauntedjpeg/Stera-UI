import fs from "node:fs"

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
