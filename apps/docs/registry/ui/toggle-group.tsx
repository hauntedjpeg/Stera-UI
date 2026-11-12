"use client"

import * as React from "react"
import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group"

import { cn } from "@/lib/utils"
import { Toggle } from "@/components/ui/toggle"

type ToggleGroupContextValue = Pick<
  React.ComponentProps<typeof Toggle>,
  "variant" | "size"
>

const ToggleGroupContext = React.createContext<ToggleGroupContextValue>({})

function ToggleGroup({
  className,
  variant,
  size,
  spacing = 0,
  style,
  ...props
}: ToggleGroupPrimitive.Props &
  ToggleGroupContextValue & {
    spacing?: number
  }) {
  return (
    <ToggleGroupContext.Provider value={{ variant, size }}>
      <ToggleGroupPrimitive
        className={cn(
          // Group
          "group/toggle-group",
          // Base
          "flex w-fit items-center gap-[--spacing(var(--toggle-group-gap))]",
          // Vertical
          "data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch",
          // Attached, horizontal — square the inner corners; outline strokes share one seam
          "data-[spacing=0]:data-[orientation=horizontal]:*:not-first:rounded-l-none data-[spacing=0]:data-[orientation=horizontal]:*:not-last:rounded-r-none",
          "data-[spacing=0]:data-[orientation=horizontal]:[&>[data-variant=outline]+[data-variant=outline]]:-ms-px",
          // Attached, vertical
          "data-[spacing=0]:data-[orientation=vertical]:*:not-first:rounded-t-none data-[spacing=0]:data-[orientation=vertical]:*:not-last:rounded-b-none",
          "data-[spacing=0]:data-[orientation=vertical]:[&>[data-variant=outline]+[data-variant=outline]]:-mt-px",
          // Focus — keep the focused item's halo above its neighbors
          "*:focus-visible:z-10",
          className
        )}
        data-slot="toggle-group"
        data-variant={variant}
        data-size={size}
        data-spacing={spacing}
        style={(state) => ({
          "--toggle-group-gap": spacing,
          ...(typeof style === "function" ? style(state) : style),
        })}
        {...props}
      />
    </ToggleGroupContext.Provider>
  )
}

function ToggleGroupItem({
  variant,
  size,
  ...props
}: React.ComponentProps<typeof Toggle>) {
  const context = React.useContext(ToggleGroupContext)

  return (
    <Toggle
      data-slot="toggle-group-item"
      variant={variant ?? context.variant}
      size={size ?? context.size}
      {...props}
    />
  )
}

export { ToggleGroup, ToggleGroupItem }
