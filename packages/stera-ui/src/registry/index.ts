import {
  registryIndexSchema,
  registryItemSchema,
  type RegistryIndexEntry,
  type RegistryItem,
} from "../schema/index.js"

const REGISTRY_URL = process.env.REGISTRY_URL ?? "https://ui.stera.sh/r"
const FETCH_TIMEOUT_MS = 15_000

export type { RegistryItem, RegistryIndexEntry }

/** Thrown when requested components (or their dependencies) are not in the registry. */
export class ComponentNotFoundError extends Error {
  readonly components: string[]

  constructor(components: string[]) {
    super(
      components.length === 1
        ? `Component "${components[0]}" not found in registry.`
        : `Components not found in registry: ${components
            .map((c) => `"${c}"`)
            .join(", ")}.`
    )
    this.name = "ComponentNotFoundError"
    this.components = components
  }
}

let _indexCache: RegistryIndexEntry[] | null = null

async function fetchJSON(url: string): Promise<unknown> {
  let res: Response
  try {
    res = await fetch(url, { signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) })
  } catch (err) {
    if (err instanceof Error && err.name === "TimeoutError") {
      throw new Error(
        `Timed out fetching ${url} after ${FETCH_TIMEOUT_MS / 1000}s. Check your network connection.`
      )
    }
    throw new Error(
      `Failed to fetch ${url}: ${err instanceof Error ? err.message : String(err)}`
    )
  }
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`)
  }
  return res.json()
}

/**
 * Fetch the registry index (component list without file contents).
 */
export async function fetchRegistryIndex(): Promise<RegistryIndexEntry[]> {
  if (_indexCache) return _indexCache

  const data = await fetchJSON(`${REGISTRY_URL}/index.json`)
  const parsed = registryIndexSchema.safeParse(data)
  if (!parsed.success) {
    throw new Error(
      `Registry index at ${REGISTRY_URL}/index.json returned unexpected data.`
    )
  }
  _indexCache = parsed.data.items
  return _indexCache
}

/**
 * Fetch a single registry item with its file contents.
 */
export async function fetchRegistryItem(name: string): Promise<RegistryItem> {
  const data = await fetchJSON(`${REGISTRY_URL}/${name}.json`)
  const parsed = registryItemSchema.safeParse(data)
  if (!parsed.success) {
    throw new Error(
      `Registry item "${name}" returned unexpected data from ${REGISTRY_URL}/${name}.json.`
    )
  }
  return parsed.data
}

/**
 * Get a component from the registry index (no file contents).
 */
export async function getComponent(
  name: string
): Promise<RegistryIndexEntry | undefined> {
  const index = await fetchRegistryIndex()
  return index.find((item) => item.name === name)
}

/**
 * Get all components from the registry index.
 */
export async function getAllComponents(): Promise<RegistryIndexEntry[]> {
  return fetchRegistryIndex()
}

/**
 * Resolve all dependencies for the given component names.
 * Fetches full registry items (with file contents) for each.
 *
 * The dependency graph is walked using the registry index (a single cached
 * request), then all needed items are fetched in one parallel batch.
 * Order is preserved: requested components first, then dependencies.
 *
 * @throws ComponentNotFoundError when any name (requested or transitive)
 *   is missing from the registry index.
 */
export async function resolveDependencies(
  names: string[]
): Promise<RegistryItem[]> {
  const index = await fetchRegistryIndex()
  const byName = new Map(index.map((entry) => [entry.name, entry]))

  const needed: string[] = []
  const seen = new Set<string>()
  const missing: string[] = []
  const queue = [...names]

  while (queue.length > 0) {
    const name = queue.shift()!
    if (seen.has(name)) continue
    seen.add(name)

    const entry = byName.get(name)
    if (!entry) {
      missing.push(name)
      continue
    }

    needed.push(name)
    queue.push(...(entry.registryDependencies ?? []))
  }

  if (missing.length > 0) {
    throw new ComponentNotFoundError(missing)
  }

  return Promise.all(needed.map((name) => fetchRegistryItem(name)))
}
