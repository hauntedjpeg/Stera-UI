import fs from "node:fs"
import path from "node:path"
import type { SteraConfig } from "./resolve-config.js"

/**
 * Check if Stera has already been initialised in the user's project.
 * Looks for the presence of `stera-ui.css` alongside the user's CSS file.
 */
export function hasGlobalsCss(config: SteraConfig, projectRoot: string): boolean {
  const cssPath = path.resolve(projectRoot, config.css)

  if (!fs.existsSync(cssPath)) {
    return false
  }

  const steraPath = path.join(path.dirname(cssPath), "stera-ui.css")
  return fs.existsSync(steraPath)
}
