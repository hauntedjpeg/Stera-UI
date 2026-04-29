import "server-only"

import { highlight } from "fumadocs-core/highlight"

import { readRegistryFile } from "../lib/read-file"
import { getRegistrySourcePath } from "../lib/registry"
import { CodeBlock } from "./code-block"

const transformerForceNoLineNumbers = {
  name: "stera:force-no-line-numbers",
  pre(node: { properties: Record<string, unknown> }) {
    node.properties["data-line-numbers"] = "false"
  },
}

export async function ComponentSource({
  name,
  code,
  className,
  hideCopyButton,
  hideLineNumbers,
}: {
  name: string
  code?: string
  className?: string
  hideCopyButton?: boolean
  hideLineNumbers?: boolean
}) {
  let source = code
  if (source === undefined) {
    const relPath = getRegistrySourcePath(name)
    if (!relPath) return null
    source = await readRegistryFile(relPath)
  }

  const rendered = await highlight(source, {
    lang: "tsx",
    themes: {
      light: "github-light-default",
      dark: "github-dark",
    },
    defaultColor: false,
    transformers: hideLineNumbers ? [transformerForceNoLineNumbers] : undefined,
  })

  return (
    <CodeBlock
      embedded
      hideCopyButton={hideCopyButton}
      className={className}
      data-slot="component-source"
    >
      {rendered}
    </CodeBlock>
  )
}
