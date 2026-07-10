import fs from "node:fs"
import path from "node:path"
import { confirm } from "@inquirer/prompts"
import type { SteraConfig } from "./resolve-config.js"
import type { RegistryItem } from "../registry/index.js"
import { resolveOutputPath } from "./resolve-paths.js"

export interface WriteOptions {
  overwrite?: boolean
}

export interface SkippedFile {
  path: string
  /** "unchanged" — identical content on disk; "declined" — user kept their version. */
  reason: "unchanged" | "declined"
}

export interface WriteResult {
  written: string[]
  skipped: SkippedFile[]
}

/**
 * Prompt the user to confirm overwriting an existing file.
 * Returns false in non-TTY environments (e.g. CI).
 */
async function confirmOverwrite(relativePath: string): Promise<boolean> {
  if (!process.stdin.isTTY) {
    console.log(
      `  Skipping ${relativePath} (already exists, use --overwrite to replace)`
    )
    return false
  }

  return confirm({
    message: `${relativePath} already exists. Overwrite?`,
    default: false,
  })
}

/**
 * Write component files to the consumer's project.
 * Checks for existing files and prompts before overwriting.
 */
export async function writeComponentFiles(
  items: RegistryItem[],
  config: SteraConfig,
  projectRoot: string,
  options: WriteOptions = {}
): Promise<WriteResult> {
  const written: string[] = []
  const skipped: SkippedFile[] = []

  for (const item of items) {
    for (const file of item.files ?? []) {
      const outputPath = resolveOutputPath(config, projectRoot, file)
      const relativePath = path.relative(projectRoot, outputPath)

      // Check for existing file
      if (fs.existsSync(outputPath)) {
        const existing = fs.readFileSync(outputPath, "utf-8")

        // Skip if content is identical
        if (existing === file.content) {
          skipped.push({ path: relativePath, reason: "unchanged" })
          continue
        }

        // Prompt or check flag for overwrite
        if (!options.overwrite) {
          const confirmed = await confirmOverwrite(relativePath)
          if (!confirmed) {
            skipped.push({ path: relativePath, reason: "declined" })
            continue
          }
        }
      }

      // Create directory if needed
      const dir = path.dirname(outputPath)
      fs.mkdirSync(dir, { recursive: true })

      // Write file
      fs.writeFileSync(outputPath, file.content ?? "", "utf-8")
      written.push(relativePath)
    }
  }

  return { written, skipped }
}
