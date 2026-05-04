import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const inputVariants = cva(
  [
    // Base
    "rounded-xl border border-border bg-surface px-3 py-1 file:border-0 file:bg-transparent aria-invalid:border-border-danger-strong st-body-md",
    // Sizing
    "w-full min-w-0",
    // Focus
    "focus-visible:border-border-brand-strong focus-visible:ring-3 focus-visible:ring-ring-brand",
    // Disabled
    "disabled:text-text-subtlest disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-surface-disabled disabled:border-border-strong",
    // Invalid
    "aria-invalid:ring-3 aria-invalid:ring-ring-danger",
    // Other
    "transition-[color,box-shadow] file:inline-flex file:font-medium file:text-text placeholder:text-text-subtlest outline-none",
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
