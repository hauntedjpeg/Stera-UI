import "server-only"

import { highlight } from "fumadocs-core/highlight"

import { cn } from "@/lib/utils"
import { readRegistryFile } from "@/lib/read-file"
import { getRegistrySourcePath } from "@/lib/registry"
import { CopyButton } from "@/components/copy-button"

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
    <div
      className={cn(
        "stera-code-block relative [&_pre]:!m-0 [&_pre]:max-h-96 [&_pre]:overflow-auto [&_pre]:rounded-none [&_pre]:border-0 [&_pre]:bg-bg-surface-secondary [&_pre]:p-4 [&_pre]:text-sm [&_code]:!bg-transparent [&_code]:!p-0",
        className
      )}
      data-slot="component-source"
    >
      <CopyButton value={code} />
      {rendered}
    </div>
  )
}
