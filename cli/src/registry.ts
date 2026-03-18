import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

interface RegistryFile {
  path: string
  type: string
  content: string
}

export interface RegistryItem {
  name: string
  type: string
  dependencies?: string[]
  registryDependencies?: string[]
  files: RegistryFile[]
}

interface Registry {
  name: string
  items: RegistryItem[]
}

let _registry: Registry | null = null

function loadRegistry(): Registry {
  if (_registry) return _registry

  const __dirname = path.dirname(fileURLToPath(import.meta.url))
  const registryPath = path.resolve(__dirname, "..", "registry.json")

  if (!fs.existsSync(registryPath)) {
    console.error(
      "Registry not found. Run `pnpm build:registry` first."
    )
    process.exit(1)
  }

  _registry = JSON.parse(fs.readFileSync(registryPath, "utf-8"))
  return _registry!
}

export function getComponent(name: string): RegistryItem | undefined {
  const registry = loadRegistry()
  return registry.items.find((item) => item.name === name)
}

export function getAllComponents(): RegistryItem[] {
  return loadRegistry().items
}

export function resolveDependencies(names: string[]): RegistryItem[] {
  const resolved = new Map<string, RegistryItem>()
  const queue = [...names]

  while (queue.length > 0) {
    const name = queue.shift()!
    if (resolved.has(name)) continue

    const item = getComponent(name)
    if (!item) {
      console.error(`Component "${name}" not found in registry.`)
      process.exit(1)
    }

    resolved.set(name, item)

    if (item.registryDependencies) {
      for (const dep of item.registryDependencies) {
        if (!resolved.has(dep)) {
          queue.push(dep)
        }
      }
    }
  }

  return Array.from(resolved.values())
}
