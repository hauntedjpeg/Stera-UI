"use client"

import * as React from "react"
import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetPopup,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const snapPoints: DrawerPrimitive.Root.SnapPoint[] = ["148px", 1]

export default function SheetSnapPoints() {
  const [snapPoint, setSnapPoint] = React.useState<
    DrawerPrimitive.Root.SnapPoint | null
  >(snapPoints[0])

  return (
    <Sheet
      side="bottom"
      snapPoints={snapPoints}
      snapPoint={snapPoint}
      onSnapPointChange={setSnapPoint}
    >
      <SheetTrigger render={<Button variant="outline" />}>
        Open snap sheet
      </SheetTrigger>
      <SheetPopup showCloseButton={false}>
        <SheetHeader className="text-center">
          <SheetTitle>Snap points</SheetTitle>
          <SheetDescription>
            Drag the handle to snap between a peek and a full-height view.
          </SheetDescription>
        </SheetHeader>
        <SheetContent className="grid auto-rows-min gap-2 px-4 pb-4" aria-hidden>
          {Array.from({ length: 16 }).map((_, i) => (
            <div
              key={i}
              className="h-10 rounded-md bg-surface-subtle"
            />
          ))}
        </SheetContent>
        <SheetFooter className="items-center">
          <SheetClose render={<Button variant="outline" />}>Close</SheetClose>
        </SheetFooter>
      </SheetPopup>
    </Sheet>
  )
}
