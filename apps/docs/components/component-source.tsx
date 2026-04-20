import "server-only"

import { highlight } from "fumadocs-core/highlight"

import { readRegistryFile } from "../lib/read-file"
import { getRegistrySourcePath } from "../lib/registry"
import { CodeBlock } from "./code-block"

export async function ComponentSource({
  name,
  className,
}: {
  name: string
  className?: string
}) {
  const relPath = getRegistrySourcePath(name)
  if (!relPath) return null

  const code = await readRegistryFile(relPath)
  const rendered = await highlight(code, {
    lang: "tsx",
    themes: {
      light: "github-light-default",
      dark: "github-dark",
    },
    defaultColor: false,
  })

  return (
    <CodeBlock embedded className={className} data-slot="component-source">
      {rendered}
    </CodeBlock>
  )
}
