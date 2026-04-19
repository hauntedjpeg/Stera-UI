import "server-only"

import { promises as fs } from "node:fs"
import path from "node:path"

const registryRoot = path.join(process.cwd(), "registry")

export async function readRegistryFile(relPathInsideRegistry: string): Promise<string> {
  const abs = path.join(registryRoot, relPathInsideRegistry)
  return fs.readFile(abs, "utf8")
}
