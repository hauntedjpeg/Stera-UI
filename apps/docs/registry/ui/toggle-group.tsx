"use client"

import * as React from "react"
import { Toggle as TogglePrimitive } from "@base-ui/react/toggle"
import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const toggleGroupVariants = cva(
  [
    // Group — lets items style themselves with group-data-*/toggle-group
    "group/toggle-group",
    // Base — a muted track; pressed items sit on it as surface pills
    "flex w-fit items-center bg-surface-muted p-0.5",
    // Vertical
    "data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch",
    // Other
    "forced-stroke",
  ],
  {
    variants: {
      size: {
        xs: "rounded-lg",
        sm: "rounded-[10px]",
        md: "rounded-xl",
        lg: "rounded-xl",
        icon: "rounded-xl",
        "icon-xs": "rounded-lg",
        "icon-sm": "rounded-[10px]",
        "icon-lg": "rounded-xl",
      },
    },
    defaultVariants: { size: "md" },
  }
)

const toggleGroupItemVariants = cva(
  [
    // Base
    "inline-flex shrink-0 items-center justify-center whitespace-nowrap text-ink-subtler transition outline-none select-none hover:text-ink",
    // Pressed
    "data-pressed:bg-surface data-pressed:text-ink",
    // Merge — adjacent pressed items read as one pill, so square the corners they share
    "group-data-[orientation=horizontal]/toggle-group:data-pressed:has-[+[data-pressed]]:rounded-e-none group-data-[orientation=horizontal]/toggle-group:[[data-pressed]+&]:data-pressed:rounded-s-none",
    "group-data-[orientation=vertical]/toggle-group:data-pressed:has-[+[data-pressed]]:rounded-b-none group-data-[orientation=vertical]/toggle-group:[[data-pressed]+&]:data-pressed:rounded-t-none",
    // Focus — keep the halo above neighboring items
    "forced-focus focus-visible:z-10 focus-visible:ring-3 focus-visible:ring-ring",
    // Disabled
    "data-disabled:pointer-events-none data-disabled:opacity-50",
    // Other — forced colors drop the pressed fill, so outline it instead
    "data-pressed:forced-stroke data-pressed:[--forced-stroke-width:2px] [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ],
  {
    variants: {
      size: {
        xs: "gap-1 rounded-md px-1.5 py-0.5 st-label-sm-medium has-data-[icon=inline-end]:pr-1 has-data-[icon=inline-start]:pl-1 [&_svg:not([class*='size-'])]:size-3",
        sm: "gap-1.5 rounded-lg px-2.5 py-1.5 st-label-sm-medium has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5",
        md: "gap-2 rounded-[10px] px-3 py-2 st-label-md-medium has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        lg: "gap-2 rounded-[10px] px-4 py-3 st-label-md-medium has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        icon: "rounded-[10px] p-2",
        "icon-xs": "rounded-md p-1 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "rounded-lg p-1.5",
        "icon-lg": "rounded-[10px] p-3",
      },
    },
    defaultVariants: { size: "md" },
  }
)

type ToggleGroupContextValue = VariantProps<typeof toggleGroupItemVariants>

const ToggleGroupContext = React.createContext<ToggleGroupContextValue>({})

function ToggleGroup({
  className,
  size = "md",
  ...props
}: ToggleGroupPrimitive.Props & VariantProps<typeof toggleGroupVariants>) {
  return (
    <ToggleGroupContext.Provider value={{ size }}>
      <ToggleGroupPrimitive
        className={cn(toggleGroupVariants({ size, className }))}
        data-slot="toggle-group"
        data-size={size}
        {...props}
      />
    </ToggleGroupContext.Provider>
  )
}

function ToggleGroupItem({
  className,
  size,
  ...props
}: TogglePrimitive.Props & VariantProps<typeof toggleGroupItemVariants>) {
  const context = React.useContext(ToggleGroupContext)
  const itemSize = size ?? context.size ?? "md"

  return (
    <TogglePrimitive
      className={cn(toggleGroupItemVariants({ size: itemSize, className }))}
      data-slot="toggle-group-item"
      data-size={itemSize}
      {...props}
    />
  )
}

export {
  ToggleGroup,
  ToggleGroupItem,
  toggleGroupVariants,
  toggleGroupItemVariants,
}
