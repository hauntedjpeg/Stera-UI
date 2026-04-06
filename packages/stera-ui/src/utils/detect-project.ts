import fs from "node:fs"
import path from "node:path"

export interface ProjectInfo {
  hasSrc: boolean
  framework: "next" | "vite" | "other"
  rsc: boolean
  existingCssFile: string | null
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

  return { hasSrc, framework, rsc, existingCssFile }
}
