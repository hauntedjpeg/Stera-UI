import fs from "node:fs"
import path from "node:path"
import {
  loadTsconfig,
  walkForTsConfig,
  type Tsconfig,
} from "tsconfig-paths/lib/tsconfig-loader.js"

/**
 * Fields tsconfig-paths parses (JSON5, `extends` merged) but does not type.
 */
interface RawTsConfig extends Tsconfig {
  references?: Array<{ path?: string }>
  include?: string[]
  files?: string[]
}

export interface TsConfigPaths {
  /** Absolute path of the file whose `compilerOptions.paths` is in effect. */
  configPath: string
  /** Directory `paths` targets resolve against (the file's directory unless baseUrl is set). */
  absoluteBaseUrl: string
  paths: Record<string, string[]>
}

export interface TsConfigLookup {
  /** Nearest tsconfig.json / jsconfig.json walking up from cwd, or null. */
  rootConfigPath: string | null
  /** Every config file that was read, in order, relative to cwd. */
  inspected: string[]
  /**
   * Where `paths` should be added when none exist: the root config, or the
   * referenced project that compiles the app (e.g. tsconfig.app.json).
   */
  suggestedConfigPath: string | null
  /** The config that defines non-empty `paths`, or null. */
  result: TsConfigPaths | null
}

// A referenced project may itself reference others; stop before pathological
// trees turn init into a filesystem crawl.
const MAX_REFERENCE_DEPTH = 3

// The lookup runs once per init and once per file written by `add`; cache per
// resolved cwd so the latter doesn't re-parse tsconfig for every component.
const cache = new Map<string, TsConfigLookup>()

/**
 * Find the tsconfig `paths` that apply to a project.
 *
 * Reads the nearest tsconfig.json (or jsconfig.json), following `extends`.
 * When that file defines no `paths` but lists project `references` — the
 * solution-style layout create-vite scaffolds, where the root is
 * `{ files: [], references: [...] }` and compilerOptions live in
 * tsconfig.app.json — the referenced projects are searched in order and the
 * first one with `paths` wins.
 */
export function loadTsConfigPaths(cwd: string): TsConfigLookup {
  const root = path.resolve(cwd)
  const cached = cache.get(root)
  if (cached) return cached

  const lookup = lookupPaths(root)
  cache.set(root, lookup)
  return lookup
}

export function clearTsConfigCache(): void {
  cache.clear()
}

function lookupPaths(cwd: string): TsConfigLookup {
  const rootConfigPath = walkForTsConfig(cwd) ?? null
  if (!rootConfigPath) {
    return {
      rootConfigPath: null,
      inspected: [],
      suggestedConfigPath: null,
      result: null,
    }
  }

  const inspected: string[] = []
  const visited = new Set<string>()
  const loaded = new Map<string, RawTsConfig>()

  const visit = (file: string, depth: number): TsConfigPaths | null => {
    if (visited.has(file)) return null
    visited.add(file)
    inspected.push(path.relative(cwd, file) || path.basename(file))

    const config = readConfig(file)
    if (!config) return null
    loaded.set(file, config)

    const paths = config.compilerOptions?.paths
    if (paths && Object.keys(paths).length > 0) {
      return {
        configPath: file,
        absoluteBaseUrl: path.resolve(
          path.dirname(file),
          config.compilerOptions?.baseUrl ?? ""
        ),
        paths,
      }
    }

    if (depth >= MAX_REFERENCE_DEPTH) return null
    for (const ref of resolveReferences(file, config)) {
      const found = visit(ref, depth + 1)
      if (found) return found
    }
    return null
  }

  const result = visit(rootConfigPath, 0)

  return {
    rootConfigPath,
    inspected,
    suggestedConfigPath: suggestConfigPath(rootConfigPath, loaded),
    result,
  }
}

function readConfig(file: string): RawTsConfig | null {
  try {
    return (loadTsconfig(file) as RawTsConfig | undefined) ?? null
  } catch {
    // Malformed JSON — treat as "no paths here" and keep looking. init
    // reports every file it inspected, so the user can spot the bad one.
    return null
  }
}

/**
 * Absolute paths of the config files a project references. A reference
 * `path` may point at a directory (meaning its tsconfig.json) or at a file;
 * missing targets are skipped.
 */
function resolveReferences(file: string, config: RawTsConfig): string[] {
  if (!Array.isArray(config.references)) return []

  const dir = path.dirname(file)
  const refs: string[] = []
  for (const ref of config.references) {
    if (typeof ref?.path !== "string") continue
    let target = path.resolve(dir, ref.path)
    try {
      if (fs.statSync(target).isDirectory()) {
        target = path.join(target, "tsconfig.json")
      }
      if (!fs.existsSync(target)) continue
    } catch {
      continue
    }
    refs.push(target)
  }
  return refs
}

/**
 * The file `paths` belong in when none were found. The root config, unless
 * it is a pure solution file (no compilerOptions, only references) — then the
 * referenced project that compiles the app: the one whose `include` covers
 * src/ or app/, falling back to the first reference.
 */
function suggestConfigPath(
  rootConfigPath: string,
  loaded: Map<string, RawTsConfig>
): string {
  const root = loaded.get(rootConfigPath)
  if (!root || root.compilerOptions || !Array.isArray(root.references)) {
    return rootConfigPath
  }

  const refs = resolveReferences(rootConfigPath, root)
  if (refs.length === 0) return rootConfigPath

  const appLike = /^(\.\/)?(src|app)(\/|$)|\*\*\/\*/
  const appRef = refs.find((ref) =>
    loaded.get(ref)?.include?.some((entry) => appLike.test(entry))
  )
  return appRef ?? refs[0]
}
