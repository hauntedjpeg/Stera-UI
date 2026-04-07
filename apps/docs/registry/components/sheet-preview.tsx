"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Preview } from "@/components/preview"

export function SheetDefault() {
  return (
    <Preview>
      <Sheet>
        <SheetTrigger render={<Button variant="outline" />}>Open</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit profile</SheetTitle>
            <SheetDescription>
              Make changes to your profile here. Click save when you're done.
            </SheetDescription>
          </SheetHeader>
          <div className="grid flex-1 auto-rows-min gap-6 px-4">
            <div className="grid gap-3">
              <Label htmlFor="sheet-name">Name</Label>
              <Input id="sheet-name" defaultValue="Pedro Duarte" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="sheet-username">Username</Label>
              <Input id="sheet-username" defaultValue="@peduarte" />
            </div>
          </div>
          <SheetFooter>
            <Button type="submit">Save changes</Button>
            <SheetClose render={<Button variant="outline" />}>Close</SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </Preview>
  )
}

const SHEET_SIDES = ["top", "right", "bottom", "left"] as const

export function SheetSides() {
  return (
    <Preview>
      <div className="flex flex-wrap gap-2">
        {SHEET_SIDES.map((side) => (
          <Sheet key={side}>
            <SheetTrigger render={<Button variant="outline" className="capitalize" />}>
              {side}
            </SheetTrigger>
            <SheetContent
              side={side}
              className="data-[side=bottom]:max-h-[50vh] data-[side=top]:max-h-[50vh]"
            >
              <SheetHeader>
                <SheetTitle>Edit profile</SheetTitle>
                <SheetDescription>
                  Make changes to your profile here. Click save when you're done.
                </SheetDescription>
              </SheetHeader>
              <SheetFooter>
                <Button type="submit">Save changes</Button>
                <SheetClose render={<Button variant="outline" />}>Cancel</SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        ))}
      </div>
    </Preview>
  )
}

export function SheetNoCloseButton() {
  return (
    <Preview>
      <Sheet>
        <SheetTrigger render={<Button variant="outline" />}>Open Sheet</SheetTrigger>
        <SheetContent showCloseButton={false}>
          <SheetHeader>
            <SheetTitle>No Close Button</SheetTitle>
            <SheetDescription>
              This sheet doesn't have a close button. Click outside to close.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </Preview>
  )
}
