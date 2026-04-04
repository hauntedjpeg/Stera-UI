import fs from "node:fs"
import path from "node:path"

export interface SteraConfig {
  style: string
  rsc: boolean
  tsx: boolean
  tailwind: {
    config: string
    css: string
    baseColor: string
    cssVariables: boolean
    prefix: string
  }
  iconLibrary: string
  aliases: {
    components: string
    utils: string
    ui: string
    lib: string
    hooks: string
  }
}

const CONFIG_FILE = "components.json"

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
    return JSON.parse(fs.readFileSync(configPath, "utf-8"))
  } catch {
    return null
  }
}
