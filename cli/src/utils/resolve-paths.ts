import path from "node:path"
import type { SteraConfig } from "./resolve-config.js"

// Map registry item types to the config alias that determines their output directory
const TYPE_TO_ALIAS: Record<string, keyof SteraConfig["aliases"]> = {
  "registry:ui": "ui",
  "registry:lib": "lib",
  "registry:hook": "hooks",
  "registry:component": "components",
}

/**
 * Resolve the alias string (e.g. "@/components/ui") to a filesystem path
 * relative to the project root.
 */
function aliasToDir(alias: string): string {
  // "@/components/ui" -> "components/ui"
  // "@/lib" -> "lib"
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
    const dir = aliasToDir(config.aliases[alias])
    const filename = path.basename(file.path)
    return path.join(projectRoot, dir, filename)
  }

  // registry:style -> write to the directory containing the tailwind css file
  if (file.type === "registry:style") {
    const cssDir = path.dirname(config.tailwind.css)
    const filename = path.basename(file.path)
    return path.join(projectRoot, cssDir, filename)
  }

  // Fallback: use the file path as-is relative to project root
  return path.join(projectRoot, file.path)
}
