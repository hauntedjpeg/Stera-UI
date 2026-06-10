"use client"

import * as React from "react"
import {
  Menubar,
  MenubarContent,
  MenubarGroup,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarTrigger,
} from "@/components/ui/menubar"

export default function MenubarRadioItems() {
  const [position, setPosition] = React.useState("bottom")

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Window</MenubarTrigger>
        <MenubarContent>
          <MenubarGroup>
            <MenubarLabel>Panel Position</MenubarLabel>
            <MenubarRadioGroup value={position} onValueChange={setPosition}>
              <MenubarRadioItem value="left">Left</MenubarRadioItem>
              <MenubarRadioItem value="bottom">Bottom</MenubarRadioItem>
              <MenubarRadioItem value="right">Right</MenubarRadioItem>
            </MenubarRadioGroup>
          </MenubarGroup>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
