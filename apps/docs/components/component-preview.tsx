import * as React from "react"

import { readExampleSource } from "../lib/read-file"
import { getRegistryComponent, getRegistryComponentSlug } from "../lib/registry"
import { ComponentPreviewFrame } from "./component-preview-frame"
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
      <p className="my-6 text-sm text-text-subtle">
        Example{" "}
        <code className="rounded bg-surface-subtle px-1.5 py-0.5 font-mono">
          {name}
        </code>{" "}
        not found in registry.
      </p>
    )
  }

  const slug = getRegistryComponentSlug(name) ?? undefined
  const code = await readExampleSource(name)

  return (
    <ComponentPreviewFrame
      className={className}
      previewClassName={previewClassName}
      align={align}
      hideCode={hideCode}
      caption={caption}
      slug={slug}
      code={code}
      component={React.createElement(Component)}
      source={
        <ComponentSource
          name={name}
          code={code}
          hideCopyButton
          hideLineNumbers
        />
      }
    />
  )
}
