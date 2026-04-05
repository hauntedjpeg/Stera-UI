import { getAllComponents } from "../registry.js"
import { LOGO, dim } from "../utils/format.js"

export function list() {
  const items = getAllComponents()

  // Group by type
  const groups = new Map<string, typeof items>()
  for (const item of items) {
    const type = item.type.replace("registry:", "")
    if (!groups.has(type)) groups.set(type, [])
    groups.get(type)!.push(item)
  }

  console.log(`\n  ${LOGO}  Available components\n`)

  for (const [type, groupItems] of groups) {
    console.log(`  ${type}`)
    for (const item of groupItems) {
      const deps = item.registryDependencies?.length
        ? dim(`  (depends on: ${item.registryDependencies.join(", ")})`)
        : ""
      console.log(`    ${item.name}${deps}`)
    }
    console.log("")
  }

  console.log(`  ${dim(`${items.length} components available`)}\n`)
}
