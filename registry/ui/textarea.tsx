import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        // Base
        "flex rounded-lg border border-border bg-transparent px-2.5 py-2 shadow-xs",
        // Sizing
        "min-h-16 w-full",
        // Variants
        "md:text-sm",
        // Other
        "field-sizing-content text-base transition-[color,box-shadow] outline-none placeholder:text-text-secondary focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-ring-danger",
        className,
      )}
      {...props}
    />
  )
}

export { Textarea }