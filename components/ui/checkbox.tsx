"use client"

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox"

import { cn } from "@/lib/utils"
import { SiCheckFill } from "stera-icons"

function Checkbox({ className, ...props }: CheckboxPrimitive.Root.Props) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        // Base
        "relative flex items-center justify-center rounded-[5px] border border-border-secondary outline-none transition-shadow",
        // Position
        "after:absolute after:-inset-x-3 after:-inset-y-2",
        // Sizing
        "size-4 shrink-0",
        //Focus
        "focus-visible:border-border-brand-secondary focus-visible:ring-3 focus-visible:ring-ring",
        // Disabled
        "disabled:cursor-not-allowed disabled:opacity-50",
        // Invalid
        "aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary",
        // Checked
        "data-checked:border-bg-brand data-checked:bg-bg-brand data-checked:text-text-onbrand",
        // Variants
        "group-has-disabled/field:opacity-50",
        // Other
        "peer",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current transition-none [&>svg]:size-3"
      >
        <SiCheckFill
        />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
