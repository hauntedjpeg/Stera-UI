"use client"

import * as React from "react"

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
        <SheetContent
          className="gap-0! bg-(--neutral-2) data-[side=right]:sm:w-full! data-[side=right]:sm:max-w-xl! rounded-xl"
          showCloseButton={false}
        >
          <SheetHeader className="flex-row items-center gap-2 p-1 pl-4">
            <SheetTitle className="flex-1 st-body-md-compact">{title}</SheetTitle>
            <CopyButton
              className="border-none bg-surface-secondary hover:bg-surface-secondary-hover"
              value={code}
            />
          </SheetHeader>
          <div className="no-scrollbar flex flex-1 flex-col border border-border -m-px mt-0 -mb rounded-xl overflow-y-auto bg-black [&_figure]:overflow-visible [&_figure]:bg-black! [&_figure]:flex [&_figure]:flex-1 [&_pre]:overflow-visible [&_pre]:flex-1">
            {source}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
