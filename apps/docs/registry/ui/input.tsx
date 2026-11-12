import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const inputVariants = cva(
  [
    // Base
    "rounded-xl bg-surface px-3 py-1 st-body-md inset-ring inset-ring-border forced-focus forced-stroke file:border-0 file:bg-transparent",
    // Sizing
    "w-full min-w-0",
    // Focus
    "focus-visible:inset-ring-[1.5px] focus-visible:inset-ring-border-brand-bold",
    // Disabled
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-surface-disabled disabled:text-ink-subtlest disabled:inset-ring-border-subtle",
    // Invalid
    "aria-invalid:inset-ring-border-danger-bold",
    // Other
    "transition-[color,box-shadow] outline-none file:inline-flex file:font-medium file:text-ink placeholder:text-ink-subtlest",
  ],
  {
    variants: {
      size: {
        sm: "h-8 px-2.5 py-1.5",
        md: "h-9 px-3 py-2",
        lg: "h-11 px-4 py-3",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

function Input({
  className,
  type,
  size = "md",
  ...props
}: Omit<React.ComponentProps<"input">, "size"> &
  VariantProps<typeof inputVariants>) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(inputVariants({ size, className }))}
      {...props}
    />
  )
}

export { Input, inputVariants }
