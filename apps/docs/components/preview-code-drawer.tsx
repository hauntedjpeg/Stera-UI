"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { CopyButton } from "@/components/copy-button"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

export function PreviewCodeDrawer({
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
      <Drawer>
        <DrawerTrigger
          render={(props) => (
            <Button variant="outline" size="sm" {...props}>
              View code
            </Button>
          )}
        />
        <DrawerPopup
          className="w-[75vw] bg-(--neutral-2) sm:w-xl"
          showCloseButton={false}
        >
          <DrawerHeader className="flex-row items-center gap-2 p-1 pl-4">
            <DrawerTitle className="flex-1 st-body-md-compact">{title}</DrawerTitle>
            <CopyButton
              className="border-none bg-surface-subtle hover:bg-surface-subtle-hover"
              value={code}
            />
          </DrawerHeader>
          <DrawerContent className="no-scrollbar flex flex-col border border-border -m-px mt-0 -mb rounded-xl [&_figure]:overflow-visible [&_figure]:bg-(--bw-12) [&_figure]:flex [&_figure]:flex-1 [&_pre]:overflow-visible [&_pre]:flex-1">
            {source}
          </DrawerContent>
        </DrawerPopup>
      </Drawer>
    </div>
  )
}
