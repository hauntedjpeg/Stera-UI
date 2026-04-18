import fs from "node:fs"
import path from "node:path"
import { loadConfig } from "tsconfig-paths"

export interface ProjectInfo {
  hasSrc: boolean
  framework: "next" | "vite" | "other"
  rsc: boolean
  existingCssFile: string | null
  /** Path to the root layout file (layout.tsx for Next.js, index.html for Vite) */
  layoutFile: string | null
}

/**
 * Check if any of the given filenames exist in the directory.
 */
function hasFile(cwd: string, filenames: string[]): boolean {
  return filenames.some((f) => fs.existsSync(path.join(cwd, f)))
}

/**
 * Search common locations for a CSS file that contains Tailwind directives.
 * Returns the relative path from cwd, or null if not found.
 */
function findTailwindCssFile(cwd: string): string | null {
  const candidates = [
    "src/app/globals.css",
    "src/styles/globals.css",
    "src/index.css",
    "app/globals.css",
    "styles/globals.css",
    "index.css",
  ]

  for (const candidate of candidates) {
    const fullPath = path.join(cwd, candidate)
    if (!fs.existsSync(fullPath)) continue

    const content = fs.readFileSync(fullPath, "utf-8")
    if (
      content.includes('@import "tailwindcss"') ||
      content.includes("@import 'tailwindcss'") ||
      content.includes("@tailwind base")
    ) {
      return candidate
    }
  }

  return null
}

/**
 * Detect the project structure to inform configuration defaults.
 *
 * Checks for:
 * - src/ directory
 * - Framework (Next.js, Vite)
 * - React Server Components (Next.js App Router)
 * - Existing Tailwind CSS entry file
 */
export function detectProject(cwd: string): ProjectInfo {
  const hasSrc = fs.existsSync(path.join(cwd, "src"))

  // Framework detection
  let framework: ProjectInfo["framework"] = "other"
  if (hasFile(cwd, ["next.config.ts", "next.config.js", "next.config.mjs"])) {
    framework = "next"
  } else if (
    hasFile(cwd, ["vite.config.ts", "vite.config.js", "vite.config.mjs"])
  ) {
    framework = "vite"
  }

  // RSC detection: Next.js with app/ directory
  let rsc = false
  if (framework === "next") {
    const appDir = hasSrc ? "src/app" : "app"
    rsc = fs.existsSync(path.join(cwd, appDir))
  }

  // Find existing Tailwind CSS file
  const existingCssFile = findTailwindCssFile(cwd)

  // Find layout file
  let layoutFile: string | null = null
  if (framework === "next") {
    const appDir = hasSrc ? "src/app" : "app"
    for (const ext of ["tsx", "jsx", "ts", "js"]) {
      const candidate = `${appDir}/layout.${ext}`
      if (fs.existsSync(path.join(cwd, candidate))) {
        layoutFile = candidate
        break
      }
    }
  } else if (framework === "vite") {
    if (fs.existsSync(path.join(cwd, "index.html"))) {
      layoutFile = "index.html"
    }
  }

  return { hasSrc, framework, rsc, existingCssFile, layoutFile }
}

/**
 * Detect the alias prefix (e.g. "@" or "~") from the project's tsconfig.json
 * `compilerOptions.paths`. Mirrors shadcn's approach.
 *
 * Returns null when tsconfig can't be loaded or defines no path mappings —
 * `init` should surface a clear error in that case rather than templating
 * aliases that won't resolve.
 */
export function detectAliasPrefix(cwd: string): string | null {
  let tsConfig
  try {
    tsConfig = loadConfig(cwd)
  } catch {
    return null
  }

  if (
    tsConfig.resultType !== "success" ||
    Object.keys(tsConfig.paths).length === 0
  ) {
    return null
  }

  // Prefer aliases whose target points at the project root, src/, or app/.
  for (const [alias, targets] of Object.entries(tsConfig.paths)) {
    if (
      targets.includes("./*") ||
      targets.includes("./src/*") ||
      targets.includes("./app/*")
    ) {
      return alias.replace(/\/\*$/, "")
    }
  }

  // Fall back to the first defined alias key.
  const first = Object.keys(tsConfig.paths)[0]
  return first ? first.replace(/\/\*$/, "") : null
}
