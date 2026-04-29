import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox"

import { cn } from "@/lib/utils"
import { SiCheckFill } from "stera-icons"

function Checkbox({ className, ...props }: CheckboxPrimitive.Root.Props) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        // Base
        "relative flex items-center justify-center rounded-[5px] border border-border-strong outline-none transition-shadow",
        // Position
        "after:absolute after:-inset-x-3 after:-inset-y-2",
        // Sizing
        "size-4 shrink-0",
        //Focus
        "focus-visible:border-border-brand-strong focus-visible:ring-3 focus-visible:ring-ring-brand",
        // Disabled
        "disabled:cursor-not-allowed data-disabled:cursor-not-allowed data-disabled:bg-surface-disabled",
        // Invalid
        "aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-ring-danger aria-invalid:aria-checked:border-primary",
        // Checked
        "data-checked:border-bg-brand data-checked:bg-surface-brand data-checked:text-text-onbrand",
        // Variants
        "group-has-disabled/field:text-text-disabled",
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
