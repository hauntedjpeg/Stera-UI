import "server-only"

import { promises as fs } from "node:fs"
import path from "node:path"

const docsRoot = process.cwd()

export async function readRegistryFile(relPath: string): Promise<string> {
  const abs = path.join(docsRoot, relPath)
  return fs.readFile(abs, "utf8")
}
