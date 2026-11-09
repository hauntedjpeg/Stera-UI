import "server-only"

import { highlight } from "fumadocs-core/highlight"

import { codeThemeOptions } from "../lib/code-theme"
import { readExampleSource } from "../lib/read-file"
import { hasRegistryExample } from "../lib/registry"
import { CodeBlock, CodeBlockPre } from "./code-block"

export async function ComponentSource({
  name,
  code,
  className,
  hideCopyButton,
}: {
  name: string
  code?: string
  className?: string
  hideCopyButton?: boolean
}) {
  let source = code
  if (source === undefined) {
    if (!hasRegistryExample(name)) return null
    source = await readExampleSource(name)
  }

  const rendered = await highlight(source, {
    lang: "tsx",
    ...codeThemeOptions,
    components: { pre: CodeBlockPre },
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
