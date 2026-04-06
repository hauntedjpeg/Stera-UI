import fs from "node:fs"
import path from "node:path"

export interface SteraConfig {
  $schema?: string
  version: 1
  css: string
  aliases: {
    components: string
    utils: string
    ui: string
    lib: string
    hooks: string
  }
}

/** Legacy config shape from shadcn-era bootstrapping. */
interface LegacySteraConfig {
  tailwind: { css: string }
  aliases: SteraConfig["aliases"]
}

export const CONFIG_FILE = "components.json"

/**
 * Normalize a legacy (pre-v1) config to the current shape.
 * Detects old format by checking for `tailwind` key without `version`.
 */
function migrateConfig(raw: Record<string, unknown>): SteraConfig {
  if (!("version" in raw) && "tailwind" in raw) {
    const legacy = raw as unknown as LegacySteraConfig
    return {
      version: 1,
      css: legacy.tailwind.css || "src/styles/globals.css",
      aliases: legacy.aliases,
    }
  }
  return raw as unknown as SteraConfig
}

export function findConfigPath(cwd: string): string | null {
  let dir = path.resolve(cwd)

  while (true) {
    const configPath = path.join(dir, CONFIG_FILE)
    if (fs.existsSync(configPath)) return configPath

    const parent = path.dirname(dir)
    if (parent === dir) return null
    dir = parent
  }
}

export function loadConfig(cwd: string): SteraConfig | null {
  const configPath = findConfigPath(cwd)
  if (!configPath) return null

  try {
    const raw = JSON.parse(fs.readFileSync(configPath, "utf-8"))
    return migrateConfig(raw)
  } catch {
    return null
  }
}
