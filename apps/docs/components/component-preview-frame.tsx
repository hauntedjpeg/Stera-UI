import * as React from "react"
import { cn } from "@/lib/utils"
import { PreviewCodeSheet } from "./preview-code-sheet"

export function ComponentPreviewFrame({
  component,
  source,
  code,
  caption,
  slug,
  previewClassName,
  align = "center",
  hideCode = false,
  className,
}: {
  component: React.ReactNode
  source: React.ReactNode
  code: string
  caption?: string
  slug?: string
  previewClassName?: string
  align?: "center" | "start" | "end"
  hideCode?: boolean
  className?: string
}) {
  return (
    <div
      data-slot="component-preview"
      className={cn(
        "not-prose relative my-6 flex flex-col overflow-hidden rounded-xl border border-border",
        className
      )}
    >
      <div
        data-slot="preview"
        data-align={align}
        className={cn(
          "flex min-h-72 w-full justify-center bg-surface p-10",
          "data-[align=center]:items-center data-[align=start]:items-start data-[align=end]:items-end",
          previewClassName
        )}
      >
        {component}
      </div>
      {!hideCode && (
        <PreviewCodeSheet
          source={source}
          code={code}
          caption={caption}
          slug={slug}
        />
      )}
    </div>
  )
}
