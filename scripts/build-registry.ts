import fs from "node:fs"
import path from "node:path"

const ROOT = path.resolve(import.meta.dirname, "..")
const REGISTRY_PATH = path.join(ROOT, "registry.json")
const OUTPUT_DIR = path.join(ROOT, "dist")

interface RegistryFile {
  path: string
  type: string
  content?: string
}

interface RegistryItem {
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

function buildRegistry() {
  const registry: Registry = JSON.parse(
    fs.readFileSync(REGISTRY_PATH, "utf-8")
  )

  const itemNames = new Set(registry.items.map((item) => item.name))
  const errors: string[] = []

  const builtItems: RegistryItem[] = registry.items.map((item) => {
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

    // Read file contents and strip the registry/ prefix from paths
    const files: RegistryFile[] = item.files.map((file) => {
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

    return {
      name: item.name,
      type: item.type,
      ...(item.dependencies?.length && { dependencies: item.dependencies }),
      ...(item.registryDependencies?.length && {
        registryDependencies: item.registryDependencies,
      }),
      files,
    }
  })

  if (errors.length > 0) {
    console.error("Registry build errors:")
    for (const err of errors) {
      console.error(`  ${err}`)
    }
    process.exit(1)
  }

  // Write output
  fs.mkdirSync(OUTPUT_DIR, { recursive: true })

  const output = {
    name: registry.name,
    items: builtItems,
  }

  const outputPath = path.join(OUTPUT_DIR, "registry.json")
  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2))

  console.log(
    `Built ${builtItems.length} registry items -> ${path.relative(ROOT, outputPath)}`
  )
}

buildRegistry()
