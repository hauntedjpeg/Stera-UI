"use client"

import * as React from "react"
import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

const snapPoints: DrawerPrimitive.Root.SnapPoint[] = ["164px", 1]

export default function DrawerSnapPoints() {
  const [snapPoint, setSnapPoint] = React.useState<
    DrawerPrimitive.Root.SnapPoint | null
  >(snapPoints[0])

  return (
    <Drawer
      side="bottom"
      snapPoints={snapPoints}
      snapPoint={snapPoint}
      onSnapPointChange={setSnapPoint}
    >
      <DrawerTrigger render={<Button variant="outline" />}>
        Open snap drawer
      </DrawerTrigger>
      <DrawerPopup showCloseButton={false}>
        <DrawerHeader className="text-center">
          <DrawerTitle>Snap points</DrawerTitle>
          <DrawerDescription>
            Drag the handle to snap between a peek and a full-height view.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerContent className="grid auto-rows-min gap-2 px-4 pb-4" aria-hidden>
          {Array.from({ length: 16 }).map((_, i) => (
            <div
              key={i}
              className="h-10 rounded-md bg-surface-subtle"
            />
          ))}
        </DrawerContent>
        <DrawerFooter className="items-center">
          <DrawerClose render={<Button variant="outline" />}>Close</DrawerClose>
        </DrawerFooter>
      </DrawerPopup>
    </Drawer>
  )
}
