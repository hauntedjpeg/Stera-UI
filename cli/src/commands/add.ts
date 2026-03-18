import path from "node:path"
import { loadConfig, findConfigPath } from "../utils/resolve-config.js"
import { resolveDependencies, getComponent } from "../registry.js"
import { writeComponentFiles } from "../utils/write-files.js"
import { installDependencies } from "../utils/install-deps.js"

export function add(components: string[], options: { cwd?: string; yes?: boolean }) {
  const cwd = options.cwd ? path.resolve(options.cwd) : process.cwd()

  // Validate components exist
  for (const name of components) {
    const item = getComponent(name)
    if (!item) {
      console.error(`Error: Component "${name}" not found in registry.`)
      console.error(`Run "stera-ui list" to see available components.`)
      process.exit(1)
    }
  }

  // Load config
  const configPath = findConfigPath(cwd)
  if (!configPath) {
    console.error(
      "Error: components.json not found. Run \"stera-ui init\" first."
    )
    process.exit(1)
  }

  const config = loadConfig(cwd)
  if (!config) {
    console.error("Error: Failed to parse components.json.")
    process.exit(1)
  }

  const projectRoot = path.dirname(configPath)

  // Resolve all dependencies
  const resolved = resolveDependencies(components)

  // Show what will be installed
  const requested = new Set(components)
  const additional = resolved.filter((item) => !requested.has(item.name))

  console.log("\nComponents to install:")
  for (const item of resolved) {
    const tag = requested.has(item.name) ? "" : " (dependency)"
    console.log(`  ${item.name}${tag}`)
  }

  // Collect npm dependencies
  const allNpmDeps: string[] = []
  for (const item of resolved) {
    if (item.dependencies) {
      allNpmDeps.push(...item.dependencies)
    }
  }
  const uniqueNpmDeps = [...new Set(allNpmDeps)].sort()

  if (uniqueNpmDeps.length > 0) {
    console.log("\nnpm dependencies:")
    for (const dep of uniqueNpmDeps) {
      console.log(`  ${dep}`)
    }
  }

  console.log("")

  // Write files
  const written = writeComponentFiles(resolved, config, projectRoot)

  console.log("Files written:")
  for (const file of written) {
    console.log(`  ${file}`)
  }

  // Install npm dependencies
  if (uniqueNpmDeps.length > 0) {
    console.log("")
    installDependencies(uniqueNpmDeps, projectRoot)
  }

  console.log("\nDone.")
}
