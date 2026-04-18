import fs from "node:fs"
import path from "node:path"
import type { SteraConfig } from "./resolve-config.js"

/**
 * Check if Stera has already been initialised in the user's project.
 * Returns true if either a sibling `stera-ui.css` exists (existing-CSS init
 * path) or the user's CSS file itself contains Stera tokens inline
 * (no-existing-CSS init path, or a hand-rolled setup).
 */
export function hasGlobalsCss(config: SteraConfig, projectRoot: string): boolean {
  const cssPath = path.resolve(projectRoot, config.css)

  if (!fs.existsSync(cssPath)) {
    return false
  }

  const steraPath = path.join(path.dirname(cssPath), "stera-ui.css")
  if (fs.existsSync(steraPath)) {
    return true
  }

  try {
    const contents = fs.readFileSync(cssPath, "utf-8")
    return contents.includes("--color-bg-surface")
  } catch {
    return false
  }
}
