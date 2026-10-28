import fs from "node:fs"
import path from "node:path"
import { loadTsConfigPaths } from "./tsconfig.js"

export interface ProjectInfo {
  hasSrc: boolean
  framework: "next" | "vite" | "other"
  /** Major version of vite (Vite projects only); null when it can't be read. */
  viteMajor: number | null
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
    hasFile(cwd, [
      "vite.config.ts",
      "vite.config.mts",
      "vite.config.js",
      "vite.config.mjs",
    ])
  ) {
    framework = "vite"
  }

  const viteMajor = framework === "vite" ? detectViteMajor(cwd) : null

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

  return { hasSrc, framework, viteMajor, rsc, existingCssFile, layoutFile }
}

function readJson(filePath: string): Record<string, unknown> | null {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf-8")) as Record<
      string,
      unknown
    >
  } catch {
    return null
  }
}

/**
 * Major version of the installed vite, falling back to the range declared in
 * package.json. Decides which resolver setup to recommend: Vite 8 resolves
 * tsconfig `paths` natively, older versions need `resolve.alias`.
 */
function detectViteMajor(cwd: string): number | null {
  const installed = readJson(
    path.join(cwd, "node_modules", "vite", "package.json")
  )
  const pkg = readJson(path.join(cwd, "package.json"))
  const deps = (pkg?.dependencies ?? {}) as Record<string, unknown>
  const devDeps = (pkg?.devDependencies ?? {}) as Record<string, unknown>

  for (const spec of [installed?.version, deps.vite, devDeps.vite]) {
    if (typeof spec !== "string") continue
    const match = spec.replace(/^[\^~>=\s]+/, "").match(/^(\d+)\./)
    if (match) return Number(match[1])
  }
  return null
}

/**
 * Detect the alias prefix (e.g. "@" or "~") from the project's tsconfig
 * `compilerOptions.paths`, following project references so create-vite's
 * tsconfig.app.json is found. Mirrors shadcn's prefix selection.
 *
 * Returns null when no config defines path mappings — `init` surfaces
 * framework-specific guidance in that case rather than templating aliases
 * that won't resolve.
 */
export function detectAliasPrefix(cwd: string): string | null {
  const { result } = loadTsConfigPaths(cwd)
  if (!result) return null

  // Prefer aliases whose target points at the project root, src/, or app/.
  for (const [alias, targets] of Object.entries(result.paths)) {
    if (
      targets.includes("./*") ||
      targets.includes("./src/*") ||
      targets.includes("./app/*")
    ) {
      return alias.replace(/\/\*$/, "")
    }
  }

  // Fall back to the first defined alias key.
  const first = Object.keys(result.paths)[0]
  return first ? first.replace(/\/\*$/, "") : null
}
