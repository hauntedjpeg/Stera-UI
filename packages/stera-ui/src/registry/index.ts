import type { RegistryItem } from "../schema/index.js"

const REGISTRY_URL =
  process.env.REGISTRY_URL ?? "https://ui.stera.site/r"

export type { RegistryItem }

interface RegistryIndexItem {
  name: string
  type: string
  dependencies?: string[]
  registryDependencies?: string[]
}

let _indexCache: RegistryIndexItem[] | null = null

async function fetchJSON<T>(url: string): Promise<T> {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`)
  }
  return res.json() as Promise<T>
}

/**
 * Fetch the registry index (component list without file contents).
 */
export async function fetchRegistryIndex(): Promise<RegistryIndexItem[]> {
  if (_indexCache) return _indexCache

  const data = await fetchJSON<{ name: string; items: RegistryIndexItem[] }>(
    `${REGISTRY_URL}/index.json`
  )
  _indexCache = data.items
  return _indexCache
}

/**
 * Fetch a single registry item with its file contents.
 */
export async function fetchRegistryItem(name: string): Promise<RegistryItem> {
  return fetchJSON<RegistryItem>(`${REGISTRY_URL}/${name}.json`)
}

/**
 * Get a component from the registry index (no file contents).
 */
export async function getComponent(name: string): Promise<RegistryIndexItem | undefined> {
  const index = await fetchRegistryIndex()
  return index.find((item) => item.name === name)
}

/**
 * Get all components from the registry index.
 */
export async function getAllComponents(): Promise<RegistryIndexItem[]> {
  return fetchRegistryIndex()
}

/**
 * Resolve all dependencies for the given component names.
 * Fetches full registry items (with file contents) for each.
 */
export async function resolveDependencies(names: string[]): Promise<RegistryItem[]> {
  const resolved = new Map<string, RegistryItem>()
  const queue = [...names]

  while (queue.length > 0) {
    const name = queue.shift()!
    if (resolved.has(name)) continue

    let item: RegistryItem
    try {
      item = await fetchRegistryItem(name)
    } catch {
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
