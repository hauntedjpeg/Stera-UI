import fs from "node:fs"
import path from "node:path"
import readline from "node:readline/promises"
import type { SteraConfig } from "./resolve-config.js"
import type { RegistryItem } from "../registry/index.js"
import { resolveOutputPath } from "./resolve-paths.js"

export interface WriteOptions {
  overwrite?: boolean
}

export interface WriteResult {
  written: string[]
  skipped: string[]
}

/**
 * Prompt the user to confirm overwriting an existing file.
 * Returns false in non-TTY environments (e.g. CI).
 */
async function confirmOverwrite(relativePath: string): Promise<boolean> {
  if (!process.stdin.isTTY) {
    console.log(`  Skipping ${relativePath} (already exists, use --overwrite to replace)`)
    return false
  }

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })
  const answer = await rl.question(`  ${relativePath} already exists. Overwrite? (y/N) `)
  rl.close()
  return answer.toLowerCase() === "y"
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
  const skipped: string[] = []

  for (const item of items) {
    for (const file of item.files) {
      const outputPath = resolveOutputPath(config, projectRoot, file)
      const relativePath = path.relative(projectRoot, outputPath)

      // Check for existing file
      if (fs.existsSync(outputPath)) {
        const existing = fs.readFileSync(outputPath, "utf-8")

        // Skip if content is identical
        if (existing === file.content) {
          skipped.push(relativePath)
          continue
        }

        // Prompt or check flag for overwrite
        if (!options.overwrite) {
          const confirmed = await confirmOverwrite(relativePath)
          if (!confirmed) {
            skipped.push(relativePath)
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
