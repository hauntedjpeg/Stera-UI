import fs from "node:fs"
import path from "node:path"
import type { SteraConfig } from "./resolve-config.js"
import type { RegistryItem } from "../registry.js"
import { resolveOutputPath } from "./resolve-paths.js"

/**
 * Write component files to the consumer's project.
 * Returns the list of files written.
 */
export function writeComponentFiles(
  items: RegistryItem[],
  config: SteraConfig,
  projectRoot: string
): string[] {
  const written: string[] = []

  for (const item of items) {
    for (const file of item.files) {
      const outputPath = resolveOutputPath(config, projectRoot, file)

      // Create directory if needed
      const dir = path.dirname(outputPath)
      fs.mkdirSync(dir, { recursive: true })

      // Write file
      fs.writeFileSync(outputPath, file.content, "utf-8")
      written.push(path.relative(projectRoot, outputPath))
    }
  }

  return written
}
