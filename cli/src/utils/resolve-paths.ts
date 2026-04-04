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
 * Falls back to stripping "@/" if tsconfig can't be loaded.
 */
function resolveAlias(alias: string, projectRoot: string): string {
  const tsConfig = loadConfig(projectRoot)

  if (tsConfig.resultType === "success") {
    const match = createMatchPath(tsConfig.absoluteBaseUrl, tsConfig.paths)
    const resolved = match(alias, undefined, () => true, [".ts", ".tsx"])

    if (resolved) {
      return path.relative(projectRoot, resolved)
    }
  }

  // Fallback: strip "@/" prefix
  return alias.replace(/^@\//, "")
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
