import fs from "node:fs/promises"

/**
 * Insert an `@import` statement into an existing CSS file, placed after the
 * last existing `@import` line. Prepends to the file if none exist.
 *
 * Idempotent: if an `@import` for the same path already exists, no change
 * is made.
 */
export async function insertImportLine(
  filePath: string,
  importStatement: string
): Promise<void> {
  const content = await fs.readFile(filePath, "utf-8")

  const importPath = importStatement.match(/["']([^"']+)["']/)?.[1]
  if (importPath) {
    const escaped = importPath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    if (new RegExp(`@import\\s+["']${escaped}["']`).test(content)) return
  }

  const lines = content.split("\n")

  let lastImportIndex = -1
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim().startsWith("@import")) {
      lastImportIndex = i
    }
  }

  if (lastImportIndex >= 0) {
    lines.splice(lastImportIndex + 1, 0, importStatement)
  } else {
    lines.unshift(importStatement)
  }

  await fs.writeFile(filePath, lines.join("\n"), "utf-8")
}
