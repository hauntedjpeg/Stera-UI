import * as React from "react"
import { Command as CommandPrimitive } from "cmdk"

import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  InputGroup,
  InputGroupAddon,
} from "@/components/ui/input-group"
import { SiSearch, SiCheck } from "stera-icons"
import {
  DropdownMenuItemContent as CommandItemContent,
  DropdownMenuItemTitle as CommandItemTitle,
  DropdownMenuItemDescription as CommandItemDescription,
} from "@/components/ui/dropdown-menu"

function Command({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn(
        // Base
        "flex flex-col overflow-hidden text-text",
        // Sizing
        "size-full",
        className,
      )}
      {...props}
    />
  )
}

function CommandDialog({
  title = "Command Palette",
  description = "Search for a command to run...",
  children,
  className,
  showCloseButton = false,
  ...props
}: Omit<React.ComponentProps<typeof Dialog>, "children"> & {
  title?: string
  description?: string
  className?: string
  showCloseButton?: boolean
  children: React.ReactNode
}) {
  const childArray = React.Children.toArray(children)
  const trigger = childArray.find(
    (child) => React.isValidElement(child) && child.type === DialogTrigger,
  )
  const rest = childArray.filter((child) => child !== trigger)

  return (
    <Dialog {...props}>
      {trigger}
      <DialogPopup
        position="top"
        scroll={false}
        className={cn(
          // Base
          "overflow-hidden p-0",
          className,
        )}
        showCloseButton={showCloseButton}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {rest}
      </DialogPopup>
    </Dialog>
  )
}

function CommandInput({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Input>) {
  return (
    <div data-slot="command-input-wrapper" className="p-2 pb-0">
      <InputGroup className="h-8! rounded-lg! border-border bg-surface-secondary shadow-none! *:data-[slot=input-group-addon]:pl-2!">
        <CommandPrimitive.Input
          data-slot="command-input"
          className={cn(
            // Base
            "st-body-md-compact outline-hidden",
            // Sizing
            "w-full",
            // Other
            "disabled:cursor-not-allowed disabled:bg-surface-disabled",
            className,
          )}
          {...props}
        />
        <InputGroupAddon>
          <SiSearch className="size-4 shrink-0 opacity-50" />
        </InputGroupAddon>
      </InputGroup>
    </div>
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
        "overflow-x-hidden overflow-y-auto outline-none",
        // Sizing
        "max-h-72 scroll-py-1",
        // Other
        "no-scrollbar",
        className,
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
        "py-6 text-center st-body-md",
        className,
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
        "overflow-hidden p-2 text-text",
        // Other
        "**:[[cmdk-group-heading]]:px-2 **:[[cmdk-group-heading]]:py-1.5 **:[[cmdk-group-heading]]:text-xs **:[[cmdk-group-heading]]:font-medium **:[[cmdk-group-heading]]:text-text-subtle",
        className,
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
        "-mx-2 bg-border",
        // Sizing
        "h-px w-auto",
        className,
      )}
      {...props}
    />
  )
}

function CommandItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cn(
        // Group
        "group/command-item",
        // Base
        "flex relative cursor-default items-start gap-2 overflow-hidden rounded-lg p-2 st-body-md-compact text-text outline-hidden select-none",
        // Selected
        "data-[selected=true]:bg-surface-hover data-[selected=true]:text-text data-[selected=true]:**:text-text",
        // Disabled
        "data-[disabled=true]:text-text-subtlest data-[disabled=true]:pointer-events-none",
        // Other
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      {children}
      <SiCheck className="ml-auto opacity-0 group-has-data-[slot=command-shortcut]/command-item:hidden group-data-[checked=true]/command-item:opacity-100" />
    </CommandPrimitive.Item>
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
        "text-xs/4 text-text-subtlest",
        // Other
        "ml-auto tracking-wide group-data-[selected=true]/command-item:text-text",
        className,
      )}
      {...props}
    />
  )
}

export {
  Command,
  CommandDialog,
  DialogTrigger as CommandDialogTrigger,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandItemContent,
  CommandItemTitle,
  CommandItemDescription,
  CommandShortcut,
  CommandSeparator,
}
