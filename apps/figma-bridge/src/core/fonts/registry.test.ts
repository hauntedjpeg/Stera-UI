import { describe, expect, it } from "vitest"
import registryJson from "../../../../docs/registry.json"
import { lookupFont } from "./registry.js"

type RegistryFont = {
  name: string
  type: string
  font?: { variable: string; family: string; dependency?: string }
}

// The plugin names the variables and fontsource families that stera-ui init
// and the registry's font items load. Both sides must agree.
const registry = registryJson as { items: RegistryFont[] }

const fonts = registry.items.filter((item) => item.type === "registry:font")

describe("KNOWN_FAMILIES", () => {
  it("has registry font items to compare against", () => {
    expect(fonts.length).toBeGreaterThan(0)
  })

  it.each(fonts.map((item) => [item.name, item.font!] as const))(
    "agrees with the registry's %s item",
    (_name, font) => {
      // 'Zalando Sans Variable', sans-serif → Zalando Sans
      const family = font.family
        .split(",")[0]
        .replace(/['"]/g, "")
        .replace(/ Variable$/, "")
      const known = lookupFont(family)
      expect(known, `${family} is missing from KNOWN_FAMILIES`).toBeDefined()
      expect(known!.nextVar).toBe(font.variable)
      expect(known!.fontsourceFamily).toBe(font.family)
      expect(known!.fontsourcePackage).toBe(font.dependency)
    }
  )
})
