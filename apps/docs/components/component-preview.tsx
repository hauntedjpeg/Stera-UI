import * as React from "react"

import { getRegistryComponent } from "../lib/registry"
import { ComponentPreviewTabs } from "./component-preview-tabs"
import { ComponentSource } from "./component-source"

export function ComponentPreview({
  name,
  align = "center",
  previewClassName,
  hideCode = false,
  className,
}: {
  name: string
  align?: "center" | "start" | "end"
  previewClassName?: string
  hideCode?: boolean
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

  return (
    <ComponentPreviewTabs
      className={className}
      previewClassName={previewClassName}
      align={align}
      hideCode={hideCode}
      component={React.createElement(Component)}
      source={<ComponentSource name={name} />}
    />
  )
}
