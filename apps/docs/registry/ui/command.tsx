import * as React from "react"
import { Command as CommandPrimitive } from "cmdk"

import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogDescription,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenuItemContent,
  DropdownMenuItemDescription,
  DropdownMenuItemTitle,
} from "@/components/ui/dropdown-menu"
import { InputGroup, InputGroupAddon } from "@/components/ui/input-group"
import { SiCheck, SiSearch } from "stera-icons"

function Command({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn(
        // Base
        "flex flex-col overflow-hidden text-ink",
        // Sizing
        "size-full",
        className
      )}
      {...props}
    />
  )
}

function CommandDialog({ ...props }: React.ComponentProps<typeof Dialog>) {
  return <Dialog data-slot="command-dialog" {...props} />
}

function CommandDialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogTrigger>) {
  return <DialogTrigger data-slot="command-dialog-trigger" {...props} />
}

function CommandDialogPopup({
  title = "Command palette",
  description = "Search for a command to run",
  showCloseButton = false,
  className,
  children,
  ...props
}: Omit<React.ComponentProps<typeof DialogPopup>, "title"> & {
  title?: string
  description?: string
}) {
  return (
    <DialogPopup
      data-slot="command-dialog-popup"
      position="top"
      scroll={false}
      showCloseButton={showCloseButton}
      className={cn(
        // Base
        "overflow-hidden p-0",
        className
      )}
      {...props}
    >
      <DialogTitle className="sr-only">{title}</DialogTitle>
      <DialogDescription className="sr-only">{description}</DialogDescription>
      {children}
    </DialogPopup>
  )
}

function CommandInput({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Input>) {
  return (
    // The input isn't the group's control, so the group draws no focus stroke:
    // the input keeps focus the whole time the list is open.
    <InputGroup
      className={cn(
        // Base
        "rounded-lg bg-surface-subtle",
        // Sizing
        "m-2 mb-0 h-8 w-auto",
        className
      )}
    >
      <InputGroupAddon
        className="pl-2"
        onClick={(e) =>
          e.currentTarget.parentElement
            ?.querySelector<HTMLElement>("[data-slot=command-input]")
            ?.focus()
        }
      >
        <SiSearch />
      </InputGroupAddon>
      <CommandPrimitive.Input
        data-slot="command-input"
        className={cn(
          // Base
          "bg-transparent st-body-md outline-hidden placeholder:text-ink-subtlest",
          // Sizing
          "h-full flex-1 pr-2.5"
        )}
        {...props}
      />
    </InputGroup>
  )
}

function CommandList({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.List>) {
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      className={cn(
        // Base
        "overflow-x-hidden overflow-y-auto overscroll-contain",
        // Sizing
        "max-h-72 scroll-py-1",
        // Other
        "scrollbar-hide",
        className
      )}
      {...props}
    />
  )
}

function CommandEmpty({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      className={cn(
        // Base
        "py-6 text-center st-body-md text-ink-subtler",
        className
      )}
      {...props}
    />
  )
}

function CommandGroup({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cn(
        // Base
        "p-2",
        // Heading
        "**:[[cmdk-group-heading]]:p-2 **:[[cmdk-group-heading]]:st-body-sm **:[[cmdk-group-heading]]:text-ink-subtler",
        className
      )}
      {...props}
    />
  )
}

function CommandSeparator({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Separator>) {
  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      className={cn(
        // Base
        "h-px bg-border",
        // Forced colors force background-color, which would erase the line
        "forced-colors:bg-[CanvasText] forced-colors:forced-color-adjust-none",
        // Inside a group, run to the group's edges
        "in-data-[slot=command-group]:-mx-2 in-data-[slot=command-group]:my-1",
        className
      )}
      {...props}
    />
  )
}

function CommandItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Item> & {
  checked?: boolean
}) {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      data-checked={checked}
      aria-checked={checked}
      className={cn(
        // Group
        "group/command-item",
        // Base
        "flex cursor-default items-start gap-2 overflow-hidden rounded-lg p-2 st-label-md text-ink outline-hidden select-none",
        // Selected
        "data-[selected=true]:bg-surface-hover data-[selected=true]:**:text-ink",
        // Disabled
        "data-[disabled=true]:pointer-events-none data-[disabled=true]:text-ink-subtlest",
        // Other
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      {checked && (
        <SiCheck data-slot="command-item-indicator" className="ml-auto" />
      )}
    </CommandPrimitive.Item>
  )
}

function CommandItemContent({
  ...props
}: React.ComponentProps<typeof DropdownMenuItemContent>) {
  return <DropdownMenuItemContent data-slot="command-item-content" {...props} />
}

function CommandItemTitle({
  ...props
}: React.ComponentProps<typeof DropdownMenuItemTitle>) {
  return <DropdownMenuItemTitle data-slot="command-item-title" {...props} />
}

function CommandItemDescription({
  ...props
}: React.ComponentProps<typeof DropdownMenuItemDescription>) {
  return (
    <DropdownMenuItemDescription
      data-slot="command-item-description"
      {...props}
    />
  )
}

function CommandShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="command-shortcut"
      className={cn(
        // Base
        "text-xs/4 text-ink-subtlest",
        // Other
        "ml-auto tracking-wide group-data-[selected=true]/command-item:text-ink",
        className
      )}
      {...props}
    />
  )
}

export {
  Command,
  CommandDialog,
  CommandDialogTrigger,
  CommandDialogPopup,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandSeparator,
  CommandItem,
  CommandItemContent,
  CommandItemTitle,
  CommandItemDescription,
  CommandShortcut,
}
