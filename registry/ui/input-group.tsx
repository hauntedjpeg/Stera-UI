import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

function InputGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-group"
      role="group"
      className={cn(
        // Group
        "group/input-group",
        // Base
        "relative flex rounded-xl border border-input shadow-xs outline-none transition-[color,box-shadow] items-center",
        // Sizing
        "h-9 w-full min-w-0 has-[[data-slot=input-group-control][data-size=sm]]:h-8 has-[[data-slot=input-group-control][data-size=lg]]:h-10 has-[[data-slot=input-group-control][data-size=xl]]:h-12",
        // Focus
        "in-data-[slot=combobox-content]:focus-within:border-inherit in-data-[slot=combobox-content]:focus-within:ring-0 has-[[data-slot=input-group-control]:focus-visible]:border-bg-brand has-[[data-slot=input-group-control]:focus-visible]:ring-3 has-[[data-slot=input-group-control]:focus-visible]:ring-ring-brand",
        // Disabled
        "has-[[data-slot=input-group-control]:disabled]:bg-bg-disabled has-[[data-slot=input-group-control]:disabled]:text-text-tertiary has-[[data-slot=input-group-control]:disabled]:border-border-secondary has-[[data-slot=input-group-control]:disabled]:pointer-events-none has-[[data-slot=input-group-control]:disabled]:cursor-not-allowed",
        // Invalid
        "has-[[data-slot][aria-invalid=true]]:border-destructive has-[[data-slot][aria-invalid=true]]:ring-3 has-[[data-slot][aria-invalid=true]]:ring-destructive/20 [aria-invalid=true]:ring-destructive/40",
        // Variants
        "has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>textarea]:h-auto has-[>[data-align=block-end]]:[&>input]:pt-3 has-[>[data-align=block-start]]:[&>input]:pb-3 has-[>[data-align=inline-end]]:[&>input]:pr-2 has-[>[data-align=inline-start]]:[&>input]:pl-2",
        className
      )}
      {...props}
    />
  )
}

const inputGroupAddonVariants = cva(
  [
    // Base
    "flex items-center justify-center py-1.5 arc-text-body-md text-text select-none",
    // Sizing
    "h-auto gap-2",
    // Other
    "cursor-text group-has-[[data-slot=input-group-control]:disabled]/input-group:text-text-tertiary [&>kbd]:rounded-[calc(var(--radius)-5px)] [&>svg:not([class*='size-'])]:size-4 group-has-[[data-slot=input-group-control][data-size=xl]]/input-group:[&>svg:not([class*='size-'])]:size-5",
  ],
  {
    variants: {
      align: {
        "inline-start":
          "order-first pl-3 py-2.5 has-[>button]:-ml-1 has-[>kbd]:ml-[-0.15rem] group-has-[[data-slot=input-group-control][data-size=sm]]/input-group:pl-2.5 group-has-[[data-slot=input-group-control][data-size=sm]]/input-group:py-2 group-has-[[data-slot=input-group-control][data-size=lg]]/input-group:py-3 group-has-[[data-slot=input-group-control][data-size=xl]]/input-group:pl-4 group-has-[[data-slot=input-group-control][data-size=xl]]/input-group:py-3.5",
        "inline-end":
          "order-last pr-3 py-2.5 has-[>button]:-mr-1 has-[>kbd]:mr-[-0.15rem] group-has-[[data-slot=input-group-control][data-size=sm]]/input-group:pr-2.5 group-has-[[data-slot=input-group-control][data-size=sm]]/input-group:py-2 group-has-[[data-slot=input-group-control][data-size=lg]]/input-group:py-3 group-has-[[data-slot=input-group-control][data-size=xl]]/input-group:pr-4 group-has-[[data-slot=input-group-control][data-size=xl]]/input-group:py-3.5",
        "block-start":
          "order-first w-full justify-start px-2.5 pt-2 group-has-[>input]/input-group:pt-2 [.border-b]:pb-2",
        "block-end":
          "order-last w-full justify-start px-2.5 pb-2 group-has-[>input]/input-group:pb-2 [.border-t]:pt-2",
      },
    },
    defaultVariants: {
      align: "inline-start",
    },
  }
)

function InputGroupAddon({
  className,
  align = "inline-start",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof inputGroupAddonVariants>) {
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), className)}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("button")) {
          return
        }
        e.currentTarget.parentElement?.querySelector("input")?.focus()
      }}
      {...props}
    />
  )
}

function InputGroupButton({
  className,
  type = "button",
  variant = "ghost",
  size = "xs",
  ...props
}: React.ComponentProps<typeof Button> & {
  type?: "button" | "submit" | "reset"
}) {
  return (
    <Button
      type={type}
      variant={variant}
      size={size}
      className={cn("shadow-none", className)}
      {...props}
    />
  )
}

function InputGroupText({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        // Base
        "flex items-center arc-text-body-md text-text-tertiary",
        // Sizing
        "gap-2",
        // Other
        "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function InputGroupInput({
  className,
  size = "md",
  ...props
}: React.ComponentProps<typeof Input>) {
  return (
    <Input
      data-slot="input-group-control"
      data-size={size}
      size={size}
      className={cn(
        // Base
        "rounded-none border-0 bg-transparent shadow-none ring-0 focus-visible:ring-0 aria-invalid:ring-0 disabled:bg-transparent",
        // Sizing
        "flex-1",
        className
      )}
      {...props}
    />
  )
}

function InputGroupTextarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <Textarea
      data-slot="input-group-control"
      className={cn(
        // Base
        "resize-none rounded-none border-0 bg-transparent py-2 shadow-none ring-0 focus-visible:ring-0 aria-invalid:ring-0",
        // Sizing
        "flex-1",
        className
      )}
      {...props}
    />
  )
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
}
