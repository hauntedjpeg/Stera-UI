import * as React from "react"

import {
  getRegistryComponent,
  getRegistryComponentSlug,
} from "../lib/registry"
import { ComponentPreviewFrame } from "./component-preview-frame"
import { ComponentSource } from "./component-source"

export function ComponentPreview({
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

  const slug = getRegistryComponentSlug(name) ?? undefined

  return (
    <ComponentPreviewFrame
      className={className}
      previewClassName={previewClassName}
      align={align}
      hideCode={hideCode}
      caption={caption}
      slug={slug}
      component={React.createElement(Component)}
      source={<ComponentSource name={name} />}
    />
  )
}
