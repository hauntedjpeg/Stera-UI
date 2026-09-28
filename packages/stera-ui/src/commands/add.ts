import path from "node:path"
import {
  loadConfig,
  findConfigPath,
  CONFIG_FILE,
} from "../utils/resolve-config.js"
import {
  resolveDependencies,
  ComponentNotFoundError,
  type RegistryItem,
} from "../registry/index.js"
import { writeComponentFiles } from "../utils/write-files.js"
import { installDependencies } from "../utils/install-deps.js"
import { applyTransforms } from "../utils/transform.js"
import { transformImports } from "../utils/transform-imports.js"
import { writeStyles, migrateLegacyStyles } from "../utils/write-styles.js"
import { CHECK, CROSS, dim } from "../utils/format.js"
import { createSpinner } from "../utils/spinner.js"

const transforms = [transformImports]

export async function add(
  components: string[],
  options: { cwd?: string; yes?: boolean; overwrite?: boolean }
) {
  const cwd = options.cwd ? path.resolve(options.cwd) : process.cwd()

  // Load config first — needed for both the globals refresh and component installs.
  const configPath = findConfigPath(cwd)
  if (!configPath) {
    console.error(
      `  ${CROSS}  ${CONFIG_FILE} not found. Run "stera-ui init" first.`
    )
    process.exit(1)
  }

  const config = loadConfig(cwd)
  if (!config) {
    console.error(`  ${CROSS}  Failed to parse ${CONFIG_FILE}.`)
    process.exit(1)
  }

  const projectRoot = path.dirname(configPath)

  // `add globals` is a special refresh operation — it rewrites the ui/ style
  // partials from the registry, prompting before replacing the ones users
  // customize. Not compatible with adding components in the same invocation.
  if (components.includes("globals")) {
    if (components.length > 1) {
      console.error(
        `  ${CROSS}  "stera-ui add globals" refreshes design tokens and cannot be combined with other components.`
      )
      console.error(
        `     Run "stera-ui add globals" and "stera-ui add ${components
          .filter((c) => c !== "globals")
          .join(" ")}" separately.`
      )
      process.exit(1)
    }

    const spinner = createSpinner("Refreshing base styles")
    let result
    let migrated: string | null = null
    try {
      migrated = await migrateLegacyStyles(config, projectRoot)
      result = await writeStyles(config, projectRoot, {
        overwrite: options.overwrite,
      })
    } catch (err) {
      spinner.fail("Failed to refresh base styles")
      throw err
    }
    spinner.succeed(`Refreshed ${result.written.length} style files`)

    if (migrated) {
      console.log(
        `  ${CHECK}  Migrated ${path.relative(projectRoot, migrated)} to ui/`
      )
    }
    for (const target of result.written) {
      console.log(`  ${CHECK}  ${target}`)
    }
    for (const file of result.skipped) {
      const reason =
        file.reason === "unchanged" ? "unchanged" : "kept your version"
      console.log(`  ${dim(`-  ${file.path} (${reason})`)}`)
    }
    console.log("")
    return
  }

  const spinner = createSpinner("Fetching registry")

  // Resolve requested components and their dependencies. Missing names
  // (requested or transitive) surface as a single ComponentNotFoundError.
  let resolved: RegistryItem[]
  try {
    resolved = await resolveDependencies(components)
  } catch (err) {
    if (err instanceof ComponentNotFoundError) {
      spinner.fail(err.message)
      console.error(`  Run "stera-ui list" to see available components.`)
      process.exit(1)
    }
    spinner.fail("Failed to fetch registry")
    throw err
  }

  spinner.succeed("Registry resolved")

  // Apply transforms to file contents
  for (const item of resolved) {
    for (const file of item.files ?? []) {
      if (file.content) {
        file.content = applyTransforms(
          file.content,
          { config, filename: file.path },
          transforms
        )
      }
    }
  }

  // Collect npm dependencies
  const allNpmDeps: string[] = []
  for (const item of resolved) {
    if (item.dependencies) {
      allNpmDeps.push(...item.dependencies)
    }
  }
  const uniqueNpmDeps = [...new Set(allNpmDeps)].sort()

  // Write files (with overwrite detection)
  const { written, skipped } = await writeComponentFiles(
    resolved,
    config,
    projectRoot,
    { overwrite: options.overwrite }
  )

  for (const file of written) {
    console.log(`  ${CHECK}  ${file}`)
  }

  for (const file of skipped) {
    const label = file.reason === "unchanged" ? "(unchanged)" : "(skipped)"
    console.log(`  ${dim(`·  ${file.path}  ${label}`)}`)
  }

  // Install npm dependencies
  if (uniqueNpmDeps.length > 0) {
    await installDependencies(uniqueNpmDeps, projectRoot)
  }

  console.log("")
}
