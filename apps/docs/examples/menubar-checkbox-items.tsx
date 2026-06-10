"use client"

import * as React from "react"
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarLabel,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"

export default function MenubarCheckboxItems() {
  const [showToolbar, setShowToolbar] = React.useState(true)
  const [showStatusBar, setShowStatusBar] = React.useState(false)
  const [showSidebar, setShowSidebar] = React.useState(true)

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarGroup>
            <MenubarLabel>Appearance</MenubarLabel>
            <MenubarCheckboxItem
              checked={showToolbar}
              onCheckedChange={setShowToolbar}
            >
              Show Toolbar
            </MenubarCheckboxItem>
            <MenubarCheckboxItem
              checked={showStatusBar}
              onCheckedChange={setShowStatusBar}
            >
              Show Status Bar
            </MenubarCheckboxItem>
            <MenubarCheckboxItem
              checked={showSidebar}
              onCheckedChange={setShowSidebar}
              disabled
            >
              Show Sidebar
            </MenubarCheckboxItem>
          </MenubarGroup>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
