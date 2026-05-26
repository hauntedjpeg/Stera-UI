import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox"

import { cn } from "@/lib/utils"
import { SiCheckFill, SiMinusFill } from "stera-icons"

function Checkbox({ className, ...props }: CheckboxPrimitive.Root.Props) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        // Base
        "relative flex items-center justify-center rounded-[5px] border border-border-strong transition-shadow outline-none",
        // Position
        "after:absolute after:-inset-x-3 after:-inset-y-2",
        // Sizing
        "size-4 shrink-0",
        //Focus
        "focus-visible:border-border-brand-strong focus-visible:ring-3 focus-visible:ring-ring-brand",
        // Disabled
        "disabled:cursor-not-allowed data-disabled:cursor-not-allowed data-disabled:bg-surface-disabled",
        // Invalid
        "aria-invalid:border-destructive aria-invalid:aria-checked:border-primary aria-invalid:ring-3 aria-invalid:ring-ring-danger",
        // Checked / Indeterminate
        "data-checked:border-surface-brand data-checked:bg-surface-brand data-checked:text-text-onbrand",
        "data-indeterminate:border-surface-brand data-indeterminate:bg-surface-brand data-indeterminate:text-text-onbrand",
        // Variants
        "group-has-disabled/field:text-text-disabled",
        // Other
        "peer group/checkbox",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className={cn(
          "grid place-content-center text-current transition-none [&>svg]:size-3",
          // Show check by default, minus when indeterminate
          "*:data-[slot=check]:block *:data-[slot=minus]:hidden",
          "group-data-indeterminate/checkbox:*:data-[slot=check]:hidden group-data-indeterminate/checkbox:*:data-[slot=minus]:block"
        )}
      >
        <SiCheckFill data-slot="check" />
        <SiMinusFill data-slot="minus" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
