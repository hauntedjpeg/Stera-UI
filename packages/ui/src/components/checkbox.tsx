"use client"

import * as React from "react"
import { SiCheckFill } from "stera-icons"
import { Checkbox as CheckboxPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        // Base
        "flex justify-center items-center border border-border-secondary rounded-sm shadow-xs dark:bg-input/30",
        // Sizing
        "size-4 shrink-0",
        // Animation
        "data-[state=checked]:bg-bg-brand data-[state=checked]:text-text-onbrand dark:data-[state=checked]:bg-bg-brand data-[state=checked]:border-bg-brand",
        // Other
        "peer outline-none transition-shadow focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="size-3 text-current transition-none"
      >
        <SiCheckFill className="size-3" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
