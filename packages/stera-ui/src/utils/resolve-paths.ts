import path from "node:path"
import { loadConfig, createMatchPath } from "tsconfig-paths"
import type { SteraConfig } from "./resolve-config.js"

// Map registry item types to the config alias that determines their output directory
const TYPE_TO_ALIAS: Record<string, keyof SteraConfig["aliases"]> = {
  "registry:ui": "ui",
  "registry:lib": "lib",
  "registry:hook": "hooks",
  "registry:component": "components",
}

/**
 * Resolve a config alias (e.g. "@/components/ui") to a filesystem directory
 * relative to the project root, using the project's tsconfig.json paths.
 *
 * Throws when the alias can't be resolved. `init` validates that tsconfig
 * defines paths before writing components.json, so a failure here means the
 * project regressed (tsconfig edited, components.json hand-written, etc.) —
 * surface it loudly rather than silently dropping files at the repo root.
 */
function resolveAlias(alias: string, projectRoot: string): string {
  const tsConfig = loadConfig(projectRoot)

  if (
    tsConfig.resultType === "success" &&
    Object.keys(tsConfig.paths).length > 0
  ) {
    // `createMatchPath` with `fileExists = () => true` happily falls back to
    // joining `<baseUrl>/<alias>` when no path key matches (so e.g.
    // "#nowhere/components" resolves to "<root>/#nowhere/components").
    // Guard against that by confirming the alias actually starts with a
    // configured paths prefix before trusting the match result.
    const hasMatchingPrefix = Object.keys(tsConfig.paths).some((key) => {
      const prefix = key.replace(/\/\*$/, "")
      return alias === prefix || alias.startsWith(`${prefix}/`)
    })

    if (hasMatchingPrefix) {
      const match = createMatchPath(tsConfig.absoluteBaseUrl, tsConfig.paths)
      const resolved = match(alias, undefined, () => true, [".ts", ".tsx"])

      if (resolved) {
        return path.relative(projectRoot, resolved)
      }
    }
  }

  throw new Error(
    `Could not resolve alias "${alias}" from tsconfig.json. ` +
      `Ensure compilerOptions.paths defines a mapping for it (e.g. "${alias}/*"), ` +
      `then re-run. See https://ui.stera.sh/docs/installation.`
  )
}

/**
 * Given a registry file, determine where it should be written in the consumer's project.
 */
export function resolveOutputPath(
  config: SteraConfig,
  projectRoot: string,
  file: { path: string; type: string }
): string {
  const alias = TYPE_TO_ALIAS[file.type]

  if (alias) {
    const dir = resolveAlias(config.aliases[alias], projectRoot)
    const filename = path.basename(file.path)
    return path.join(projectRoot, dir, filename)
  }

  // registry:style -> write to the directory containing the tailwind css file
  if (file.type === "registry:style") {
    const cssDir = path.dirname(config.css)
    const filename = path.basename(file.path)
    return path.join(projectRoot, cssDir, filename)
  }

  // Fallback: use the file path as-is relative to project root
  return path.join(projectRoot, file.path)
}
