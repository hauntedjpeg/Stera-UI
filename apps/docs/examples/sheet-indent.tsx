"use client"

import * as React from "react"
import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetBackdrop,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHandle,
  SheetHeader,
  SheetIndent,
  SheetIndentBackground,
  SheetPortal,
  SheetProvider,
  SheetTitle,
  SheetTrigger,
  SheetViewport,
} from "@/components/ui/sheet"

// The indent / parallax effect is app-level: wrap your real app once in
// `SheetProvider` with a `SheetIndentBackground` behind `SheetIndent`, and the
// indented content scales back to reveal the background whenever any sheet
// inside the provider opens. Here we scope it to a phone-style mockup so the
// effect is self-contained — the sheet is portaled into the mockup and its
// backdrop/viewport are positioned `absolute` so everything stays in the box.
export default function SheetIndentExample() {
  const [container, setContainer] = React.useState<HTMLElement | null>(null)

  return (
    <SheetProvider>
      <div
        ref={setContainer}
        className="relative aspect-9/16 w-full max-w-70 overflow-hidden rounded-3xl bg-surface-inverse ring-1 ring-border"
      >
        {/* Background layer revealed as the content scales back */}
        <SheetIndentBackground className="absolute inset-0 bg-surface-inverse" />

        {/* The "app" content — scales + rounds when a sheet opens */}
        <SheetIndent
          className={cn(
            "absolute inset-0 flex flex-col bg-surface",
            "origin-top overflow-hidden",
            "transition-[scale,border-radius] duration-450 ease-[cubic-bezier(0.32,0.72,0,1)] will-change-transform",
            "data-active:scale-[0.92] data-active:rounded-2xl"
          )}
        >
          <div className="flex flex-col gap-1 p-5 pt-8">
            <span className="st-heading-md text-text">Today</span>
            <span className="text-sm text-text-subtle">Wednesday, June 5</span>
          </div>
          <div className="flex flex-1 flex-col gap-2 px-5">
            {["Inbox", "Drafts", "Archive", "Trash"].map((label) => (
              <div
                key={label}
                className="flex items-center rounded-xl bg-surface-secondary px-4 py-3 text-sm text-text"
              >
                {label}
              </div>
            ))}
          </div>
          <div className="p-5">
            <Sheet side="bottom">
              <SheetTrigger render={<Button variant="brand" className="w-full" />}>
                Open sheet
              </SheetTrigger>
              <SheetPortal container={container}>
                <SheetBackdrop className="absolute" />
                <SheetViewport className="absolute">
                  <DrawerPrimitive.Popup
                    data-slot="sheet-popup"
                    data-side="bottom"
                    className={cn(
                      "group/sheet relative flex max-h-[85%] w-full flex-col overflow-hidden rounded-xl bg-surface text-sm text-text ring-1 ring-border shadow-lg outline-none",
                      "origin-bottom will-change-transform",
                      "transform-[translateY(var(--drawer-swipe-movement-y,0px))]",
                      "transition-[transform,opacity] duration-450 ease-[cubic-bezier(0.32,0.72,0,1)]",
                      "data-swiping:duration-0 data-swiping:select-none",
                      "data-starting-style:transform-[translateY(110%)] data-ending-style:transform-[translateY(110%)]"
                    )}
                  >
                    <SheetHandle />
                    <SheetHeader className="text-center">
                      <SheetTitle>Compose</SheetTitle>
                      <SheetDescription>
                        The screen behind scales back while this sheet is open.
                      </SheetDescription>
                    </SheetHeader>
                    <SheetContent className="px-4" />
                    <SheetFooter>
                      <SheetClose render={<Button variant="outline" />}>
                        Close
                      </SheetClose>
                    </SheetFooter>
                  </DrawerPrimitive.Popup>
                </SheetViewport>
              </SheetPortal>
            </Sheet>
          </div>
        </SheetIndent>
      </div>
    </SheetProvider>
  )
}
