import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const inputVariants = cva(
  [
    // Base
    "rounded-xl border border-border bg-bg-surface px-3 py-1 file:border-0 file:bg-transparent aria-invalid:border-border-danger-secondary",
    // Sizing
    "w-full min-w-0",
    // Focus
    "focus-visible:border-border-brand-secondary focus-visible:ring-3 focus-visible:ring-ring-brand",
    // Disabled
    "disabled:text-text-tertiary disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-bg-disabled disabled:border-border-secondary",
    // Invalid
    "aria-invalid:ring-3 aria-invalid:ring-ring-danger",
    // Other
    "transition-[color,box-shadow] outline-none file:inline-flex file:font-medium file:text-text placeholder:text-text-tertiary",
  ],
  {
    variants: {
      size: {
        sm: "h-8 px-2.5 st-body-md-compact",
        md: "h-9 st-body-md-compact",
        lg: "h-10 st-body-md-compact",
        xl: "h-12 px-4 st-body-lg",
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
}: Omit<React.ComponentProps<"input">, "size"> & VariantProps<typeof inputVariants>) {
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
