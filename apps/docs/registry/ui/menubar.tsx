import * as React from "react"
import { Menubar as MenubarPrimitive } from "@base-ui/react/menubar"

import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuItemShortcut,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function Menubar({ className, ...props }: MenubarPrimitive.Props) {
  return (
    <MenubarPrimitive
      data-slot="menubar"
      className={cn(
        // Base
        "flex w-fit items-center gap-1 rounded-xl bg-surface p-1 shadow-xs ring-1 ring-border",
        className
      )}
      {...props}
    />
  )
}

function MenubarMenu({ ...props }: React.ComponentProps<typeof DropdownMenu>) {
  return <DropdownMenu data-slot="menubar-menu" {...props} />
}

function MenubarGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuGroup>) {
  return <DropdownMenuGroup data-slot="menubar-group" {...props} />
}

function MenubarPortal({
  ...props
}: React.ComponentProps<typeof DropdownMenuPortal>) {
  return <DropdownMenuPortal data-slot="menubar-portal" {...props} />
}

function MenubarTrigger({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuTrigger>) {
  return (
    <DropdownMenuTrigger
      data-slot="menubar-trigger"
      className={cn(
        // Base
        "flex items-center rounded-lg px-2.5 py-1 st-body-md-compact text-text outline-hidden select-none",
        // Hover
        "hover:bg-surface-hover",
        // Open
        "data-popup-open:bg-surface-hover data-pressed:bg-surface-hover",
        // Focus
        "focus-visible:ring-3 focus-visible:ring-ring",
        // Disabled
        "data-disabled:pointer-events-none data-disabled:text-text-disabled",
        className
      )}
      {...props}
    />
  )
}

function MenubarContent({
  align = "start",
  alignOffset = -4,
  sideOffset = 8,
  ...props
}: React.ComponentProps<typeof DropdownMenuContent>) {
  return (
    <DropdownMenuContent
      data-slot="menubar-content"
      align={align}
      alignOffset={alignOffset}
      sideOffset={sideOffset}
      {...props}
    />
  )
}

function MenubarItem({
  ...props
}: React.ComponentProps<typeof DropdownMenuItem>) {
  return <DropdownMenuItem data-slot="menubar-item" {...props} />
}

function MenubarCheckboxItem({
  ...props
}: React.ComponentProps<typeof DropdownMenuCheckboxItem>) {
  return <DropdownMenuCheckboxItem data-slot="menubar-checkbox-item" {...props} />
}

function MenubarRadioGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuRadioGroup>) {
  return <DropdownMenuRadioGroup data-slot="menubar-radio-group" {...props} />
}

function MenubarRadioItem({
  ...props
}: React.ComponentProps<typeof DropdownMenuRadioItem>) {
  return <DropdownMenuRadioItem data-slot="menubar-radio-item" {...props} />
}

function MenubarLabel({
  ...props
}: React.ComponentProps<typeof DropdownMenuLabel>) {
  return <DropdownMenuLabel data-slot="menubar-label" {...props} />
}

function MenubarSeparator({
  ...props
}: React.ComponentProps<typeof DropdownMenuSeparator>) {
  return <DropdownMenuSeparator data-slot="menubar-separator" {...props} />
}

function MenubarShortcut({
  ...props
}: React.ComponentProps<typeof DropdownMenuItemShortcut>) {
  return <DropdownMenuItemShortcut data-slot="menubar-shortcut" {...props} />
}

function MenubarSub({
  ...props
}: React.ComponentProps<typeof DropdownMenuSub>) {
  return <DropdownMenuSub data-slot="menubar-sub" {...props} />
}

function MenubarSubTrigger({
  ...props
}: React.ComponentProps<typeof DropdownMenuSubTrigger>) {
  return <DropdownMenuSubTrigger data-slot="menubar-sub-trigger" {...props} />
}

function MenubarSubContent({
  ...props
}: React.ComponentProps<typeof DropdownMenuSubContent>) {
  return <DropdownMenuSubContent data-slot="menubar-sub-content" {...props} />
}

export {
  Menubar,
  MenubarPortal,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarGroup,
  MenubarSeparator,
  MenubarLabel,
  MenubarItem,
  MenubarShortcut,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
}
