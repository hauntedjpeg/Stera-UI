import { Radio as RadioPrimitive } from "@base-ui/react/radio"
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group"

import { cn } from "@/lib/utils"

function RadioGroup({ className, ...props }: RadioGroupPrimitive.Props) {
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      className={cn("grid w-full gap-2", className)}
      {...props}
    />
  )
}

function RadioGroupItem({ className, ...props }: RadioPrimitive.Root.Props) {
  return (
    <RadioPrimitive.Root
      data-slot="radio-group-item"
      className={cn(
        // Base
        "group/radio-group-item relative flex items-center justify-center rounded-full border border-border-secondary outline-none transition-shadow",
        // Position / hit area
        "after:absolute after:-inset-x-3 after:-inset-y-2",
        // Sizing
        "size-4 shrink-0",
        // Focus
        "focus-visible:border-border-brand-secondary focus-visible:ring-3 focus-visible:ring-ring-brand",
        // Disabled
        "disabled:cursor-not-allowed data-disabled:cursor-not-allowed data-disabled:bg-surface-disabled",
        // Invalid
        "aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-ring-danger aria-invalid:aria-checked:border-primary",
        // Checked
        "data-checked:border-border-brand-secondary data-checked:bg-surface-brand data-checked:text-text-onbrand",
        // Variants
        "group-has-disabled/field:text-text-disabled",
        // Other
        "peer",
        className,
      )}
      {...props}
    >
      <RadioPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="flex size-4 items-center justify-center"
      >
        <span className="absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-current" />
      </RadioPrimitive.Indicator>
    </RadioPrimitive.Root>
  )
}

export { RadioGroup, RadioGroupItem }
