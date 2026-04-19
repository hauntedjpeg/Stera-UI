import "server-only"

import { cn } from "@/lib/utils"
import { highlightCode } from "@/lib/highlight-code"
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
  const highlighted = await highlightCode(code, "tsx")

  return (
    <div className={cn("relative", className)} data-slot="component-source">
      <CopyButton value={code} />
      <div
        className="stera-code-block [&_pre]:!m-0 [&_pre]:max-h-96 [&_pre]:overflow-auto [&_pre]:rounded-none [&_pre]:border-0 [&_pre]:bg-bg-surface-secondary [&_pre]:p-4 [&_pre]:text-sm [&_code]:!bg-transparent [&_code]:!p-0"
        dangerouslySetInnerHTML={{ __html: highlighted }}
      />
    </div>
  )
}
