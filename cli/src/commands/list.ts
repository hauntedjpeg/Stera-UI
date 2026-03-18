import { getAllComponents } from "../registry.js"

export function list() {
  const items = getAllComponents()

  // Group by type
  const groups = new Map<string, typeof items>()
  for (const item of items) {
    const type = item.type.replace("registry:", "")
    if (!groups.has(type)) groups.set(type, [])
    groups.get(type)!.push(item)
  }

  for (const [type, groupItems] of groups) {
    console.log(`\n  ${type}:`)
    for (const item of groupItems) {
      const deps = item.registryDependencies?.length
        ? ` (depends on: ${item.registryDependencies.join(", ")})`
        : ""
      console.log(`    ${item.name}${deps}`)
    }
  }

  console.log(`\n  ${items.length} components available.\n`)
}
