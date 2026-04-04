import fs from "node:fs"
import path from "node:path"
import type { SteraConfig } from "./resolve-config.js"

/**
 * Check if the user's CSS file contains Stera design tokens.
 * Looks for `--bg-brand` as a distinctive marker that Stera globals are present.
 */
export function hasGlobalsCss(config: SteraConfig, projectRoot: string): boolean {
  const cssPath = path.resolve(projectRoot, config.css)

  if (!fs.existsSync(cssPath)) {
    return false
  }

  const content = fs.readFileSync(cssPath, "utf-8")
  return content.includes("--bg-brand")
}
