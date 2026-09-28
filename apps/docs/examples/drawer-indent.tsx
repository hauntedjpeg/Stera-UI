"use client"

import * as React from "react"
import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerBackdrop,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHandle,
  DrawerHeader,
  DrawerIndent,
  DrawerIndentBackground,
  DrawerPortal,
  DrawerProvider,
  DrawerTitle,
  DrawerTrigger,
  DrawerViewport,
} from "@/components/ui/drawer"

// The indent / parallax effect is app-level: wrap your real app once in
// `DrawerProvider` with a `DrawerIndentBackground` behind `DrawerIndent`, and the
// indented content scales back to reveal the background whenever any drawer
// inside the provider opens. Here we scope it to a phone-style mockup so the
// effect is self-contained — the drawer is portaled into the mockup and its
// backdrop/viewport are positioned `absolute` so everything stays in the box.
export default function DrawerIndentExample() {
  const [container, setContainer] = React.useState<HTMLElement | null>(null)

  return (
    <DrawerProvider>
      <div
        ref={setContainer}
        className="relative aspect-9/16 w-full max-w-70 overflow-hidden rounded-3xl bg-surface-inverse ring-1 ring-border"
      >
        {/* Background layer revealed as the content scales back */}
        <DrawerIndentBackground className="absolute inset-0 bg-surface-inverse" />

        {/* The "app" content — scales + rounds when a drawer opens */}
        <DrawerIndent
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
                className="flex items-center rounded-xl bg-surface-subtle px-4 py-3 text-sm text-text"
              >
                {label}
              </div>
            ))}
          </div>
          <div className="p-5">
            <Drawer side="bottom">
              <DrawerTrigger render={<Button variant="brand" className="w-full" />}>
                Open drawer
              </DrawerTrigger>
              <DrawerPortal container={container}>
                <DrawerBackdrop className="absolute" />
                <DrawerViewport className="absolute">
                  <DrawerPrimitive.Popup
                    data-slot="drawer-popup"
                    data-side="bottom"
                    className={cn(
                      // Invisible container — carries the gutter and slides
                      "group/drawer pointer-events-none flex max-h-[85%] w-full flex-col p-2 outline-none",
                      "will-change-transform",
                      "transform-[translateY(var(--drawer-swipe-movement-y,0px))]",
                      "transition-[transform,opacity] duration-450 ease-[cubic-bezier(0.32,0.72,0,1)]",
                      "data-swiping:duration-0 data-swiping:select-none",
                      "data-starting-style:transform-[translateY(100%)] data-ending-style:transform-[translateY(100%)]"
                    )}
                  >
                    <div
                      data-slot="drawer-panel"
                      data-side="bottom"
                      className="relative flex min-h-0 grow flex-col overflow-hidden rounded-xl bg-surface text-sm text-text shadow-lg ring-1 ring-border group-data-open/drawer:pointer-events-auto"
                    >
                      <DrawerHandle />
                      <DrawerHeader className="text-center">
                        <DrawerTitle>Compose</DrawerTitle>
                        <DrawerDescription>
                          The screen behind scales back while this drawer is
                          open.
                        </DrawerDescription>
                      </DrawerHeader>
                      <DrawerContent className="px-4" />
                      <DrawerFooter>
                        <DrawerClose render={<Button variant="outline" />}>
                          Close
                        </DrawerClose>
                      </DrawerFooter>
                    </div>
                  </DrawerPrimitive.Popup>
                </DrawerViewport>
              </DrawerPortal>
            </Drawer>
          </div>
        </DrawerIndent>
      </div>
    </DrawerProvider>
  )
}
