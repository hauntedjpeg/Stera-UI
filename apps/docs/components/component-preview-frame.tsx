import * as React from "react"
import { cn } from "@/lib/utils"
import { PreviewCode } from "./preview-code"

export function ComponentPreviewFrame({
  component,
  source,
  code,
  previewClassName,
  align = "center",
  hideCode = false,
  className,
}: {
  component: React.ReactNode
  source: React.ReactNode
  code: string
  previewClassName?: string
  align?: "center" | "start" | "end"
  hideCode?: boolean
  className?: string
}) {
  return (
    <div
      data-slot="component-preview"
      className={cn(
        // overflow-clip, not overflow-hidden: it rounds the corners without
        // becoming a scroll container, so the sticky "Hide code" pill works.
        "not-prose relative my-6 flex flex-col overflow-clip rounded-xl border border-border",
        className
      )}
    >
      <div
        data-slot="preview"
        data-align={align}
        className={cn(
          "flex min-h-72 w-full justify-center bg-surface p-10",
          "data-[align=center]:items-center data-[align=end]:items-end data-[align=start]:items-start",
          previewClassName
        )}
      >
        {component}
      </div>
      {!hideCode && <PreviewCode code={code}>{source}</PreviewCode>}
    </div>
  )
}
