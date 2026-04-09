import fs from "node:fs"
import path from "node:path"

const ROOT = path.resolve(import.meta.dirname, "..")
const REGISTRY_PATH = path.join(ROOT, "registry.json")
const OUTPUT_DIR = path.join(ROOT, "public", "r")

interface RegistryFile {
  path: string
  type: string
  content?: string
}

interface RegistryFontMeta {
  family: string
  provider: string
  import: string
  variable: string
  weight?: string[]
  subsets?: string[]
  selector?: string
  dependency?: string
}

interface RegistryItem {
  name: string
  type: string
  dependencies?: string[]
  registryDependencies?: string[]
  files?: RegistryFile[]
  font?: RegistryFontMeta
}

interface Registry {
  name: string
  items: RegistryItem[]
}

function buildRegistry() {
  const registry: Registry = JSON.parse(
    fs.readFileSync(REGISTRY_PATH, "utf-8")
  )

  const itemNames = new Set(registry.items.map((item) => item.name))
  const errors: string[] = []

  // Ensure output directory exists
  fs.mkdirSync(OUTPUT_DIR, { recursive: true })

  const indexItems: Omit<RegistryItem, "files">[] = []

  for (const item of registry.items) {
    // Validate registryDependencies reference existing items
    if (item.registryDependencies) {
      for (const dep of item.registryDependencies) {
        if (!itemNames.has(dep)) {
          errors.push(
            `[${item.name}] registryDependency "${dep}" does not exist in registry`
          )
        }
      }
    }

    // Font items have no files to read — emit them directly.
    if (item.type === "registry:font") {
      const builtItem: RegistryItem = {
        name: item.name,
        type: item.type,
        ...(item.font && { font: item.font }),
      }

      const itemPath = path.join(OUTPUT_DIR, `${item.name}.json`)
      fs.writeFileSync(itemPath, JSON.stringify(builtItem, null, 2))

      indexItems.push({
        name: item.name,
        type: item.type,
      })
      continue
    }

    // Read file contents and strip the registry/ prefix from paths
    const files: RegistryFile[] = (item.files ?? []).map((file) => {
      const fullPath = path.join(ROOT, file.path)

      if (!fs.existsSync(fullPath)) {
        errors.push(`[${item.name}] file not found: ${file.path}`)
        return { ...file, content: "" }
      }

      const content = fs.readFileSync(fullPath, "utf-8")

      // Strip the "registry/" prefix so paths map to consumer's project
      // e.g. "registry/ui/button.tsx" -> "ui/button.tsx"
      const consumerPath = file.path.replace(/^registry\//, "")

      return {
        path: consumerPath,
        type: file.type,
        content,
      }
    })

    const builtItem: RegistryItem = {
      name: item.name,
      type: item.type,
      ...(item.dependencies?.length && { dependencies: item.dependencies }),
      ...(item.registryDependencies?.length && {
        registryDependencies: item.registryDependencies,
      }),
      files,
    }

    // Write individual component JSON: public/r/{name}.json
    const itemPath = path.join(OUTPUT_DIR, `${item.name}.json`)
    fs.writeFileSync(itemPath, JSON.stringify(builtItem, null, 2))

    // Collect index entry (without file contents)
    indexItems.push({
      name: item.name,
      type: item.type,
      ...(item.dependencies?.length && { dependencies: item.dependencies }),
      ...(item.registryDependencies?.length && {
        registryDependencies: item.registryDependencies,
      }),
    })
  }

  if (errors.length > 0) {
    console.error("Registry build errors:")
    for (const err of errors) {
      console.error(`  ${err}`)
    }
    process.exit(1)
  }

  // Write registry index: public/r/index.json
  const indexPath = path.join(OUTPUT_DIR, "index.json")
  const index = {
    name: registry.name,
    items: indexItems,
  }
  fs.writeFileSync(indexPath, JSON.stringify(index, null, 2))

  console.log(
    `Built ${registry.items.length} registry items -> ${path.relative(ROOT, OUTPUT_DIR)}/`
  )
  console.log(
    `  ${registry.items.length} component files + index.json`
  )
}

buildRegistry()
