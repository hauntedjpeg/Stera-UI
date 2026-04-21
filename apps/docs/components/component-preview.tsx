import * as React from "react"

import { readRegistryFile } from "../lib/read-file"
import {
  getRegistryComponent,
  getRegistryComponentSlug,
  getRegistrySourcePath,
} from "../lib/registry"
import { ComponentPreviewTabs } from "./component-preview-tabs"
import { ComponentSource } from "./component-source"

export async function ComponentPreview({
  name,
  align = "center",
  previewClassName,
  hideCode = false,
  caption,
  className,
}: {
  name: string
  align?: "center" | "start" | "end"
  previewClassName?: string
  hideCode?: boolean
  caption?: string
  className?: string
}) {
  const Component = getRegistryComponent(name)

  if (!Component) {
    return (
      <p className="my-6 text-sm text-text-secondary">
        Example{" "}
        <code className="rounded bg-bg-surface-secondary px-1.5 py-0.5 font-mono">
          {name}
        </code>{" "}
        not found in registry.
      </p>
    )
  }

  const sourcePath = getRegistrySourcePath(name)
  const rawSource = sourcePath ? await readRegistryFile(sourcePath) : ""
  const slug = getRegistryComponentSlug(name) ?? undefined

  return (
    <ComponentPreviewTabs
      className={className}
      previewClassName={previewClassName}
      align={align}
      hideCode={hideCode}
      caption={caption}
      slug={slug}
      component={React.createElement(Component)}
      source={<ComponentSource name={name} />}
      rawSource={rawSource}
    />
  )
}
