import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        // Base
        "flex rounded-xl border border-border bg-transparent px-3 py-2.5 st-body-md",
        // Sizing
        "min-h-16 w-full",
        // Focus
        "focus-visible:border-border-brand-strong focus-visible:ring-3 focus-visible:ring-ring-brand",
        // Disabled
        "disabled:cursor-not-allowed disabled:border-border-strong disabled:bg-surface-disabled disabled:text-text-subtlest",
        // Invalid
        "aria-invalid:border-border-danger-strong aria-invalid:ring-3 aria-invalid:ring-ring-danger",
        // Other
        "field-sizing-content transition-[color,box-shadow] outline-none placeholder:text-text-subtlest",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
