import "server-only"

import { promises as fs } from "node:fs"
import path from "node:path"

// The path is scoped to examples/ so Next.js traces only that folder, not the
// whole app.
export async function readExampleSource(name: string): Promise<string> {
  return fs.readFile(
    path.join(process.cwd(), "examples", `${name}.tsx`),
    "utf8"
  )
}
