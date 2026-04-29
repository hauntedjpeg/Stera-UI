"use client"

import * as React from "react"

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
  caption,
  slug,
}: {
  source: React.ReactNode
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
        <SheetContent className="data-[side=right]:sm:max-w-3xl">
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
  )
}
