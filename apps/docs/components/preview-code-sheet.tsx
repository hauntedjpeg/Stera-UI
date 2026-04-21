"use client"

import * as React from "react"
import { SiCheck, SiCopy } from "stera-icons"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { InstallSnippet } from "./install-snippet"

export function PreviewCodeSheet({
  source,
  rawSource,
  caption,
  slug,
}: {
  source: React.ReactNode
  rawSource: string
  caption?: string
  slug?: string
}) {
  const [copied, setCopied] = React.useState(false)

  React.useEffect(() => {
    if (!copied) return
    const id = window.setTimeout(() => setCopied(false), 2000)
    return () => window.clearTimeout(id)
  }, [copied])

  const title = caption ?? slug ?? "Source"

  return (
    <div className="flex items-center justify-between gap-2 border-t border-border bg-bg-surface px-4 py-2">
      <span className="text-sm text-text-secondary">{caption}</span>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon-sm"
          aria-label={copied ? "Copied" : "Copy code"}
          onClick={async () => {
            await navigator.clipboard.writeText(rawSource)
            setCopied(true)
          }}
        >
          {copied ? <SiCheck /> : <SiCopy />}
        </Button>
        <Sheet>
          <SheetTrigger render={<Button variant="outline" size="sm" />}>
            View code
          </SheetTrigger>
          <SheetContent className="sm:max-w-xl">
            <SheetHeader>
              <SheetTitle>{title}</SheetTitle>
            </SheetHeader>
            <div
              className={cn(
                "flex flex-1 flex-col gap-4 overflow-auto px-4 pb-4",
                "[&_figure.st-code-block]:my-0",
              )}
            >
              {slug && <InstallSnippet slug={slug} />}
              <div className="flex flex-col gap-2">
                <h3 className="st-body-md-strong text-text">Source</h3>
                {source}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}
