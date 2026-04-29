"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { CopyButton } from "@/components/copy-button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export function PreviewCodeSheet({
  source,
  code,
  caption,
  slug,
}: {
  source: React.ReactNode
  code: string
  caption?: string
  slug?: string
}) {
  const title = caption ?? slug ?? "Source"

  return (
    <div className="flex items-center justify-between gap-2 border-t border-border bg-surface px-4 py-2">
      <span className="text-sm text-text-subtle">{caption}</span>
      <Sheet>
        <SheetTrigger
          render={(props) => (
            <Button variant="outline" size="sm" {...props}>
              View code
            </Button>
          )}
        />
        <SheetContent className="data-[side=right]:sm:max-w-xl! data-[side=right]:sm:w-full! bg-(--neutral-2) gap-0!" showCloseButton={false}>
          <SheetHeader className="flex-row items-center gap-2">
            <SheetTitle className="flex-1">{title}</SheetTitle>
            <CopyButton className="border-none bg-surface-secondary hover:bg-surface-secondary-hover" value={code} />
          </SheetHeader>
          <div className="flex flex-col no-scrollbar overflow-y-auto p-1 pt-0 flex-1">
            <div
              className={cn(
                "overflow-auto flex-1 bg-surface rounded-xl border border-border",
                "[&_figure.st-code-block]:my-0",
              )}
            >
              {source}
            </div>
          </div>

        </SheetContent>
      </Sheet>
    </div>
  )
}
