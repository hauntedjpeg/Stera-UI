import * as React from "react"
import { Field as FieldPrimitive } from "@base-ui/react/field"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    // Field.Control wires the id, label, description and invalid state from a Field
    <FieldPrimitive.Control
      render={<textarea />}
      data-slot="textarea"
      className={cn(
        // Base
        "flex rounded-xl bg-transparent px-3 py-2.5 st-body-md inset-ring inset-ring-border forced-focus forced-stroke",
        // Sizing
        "min-h-16 w-full",
        // Focus
        "focus-visible:inset-ring-[1.5px] focus-visible:inset-ring-border-brand-bold",
        // Disabled
        "disabled:cursor-not-allowed disabled:bg-surface-disabled disabled:text-ink-subtlest disabled:inset-ring-border-subtle",
        // Invalid
        "aria-invalid:inset-ring-border-danger-bold",
        // Other
        "field-sizing-content transition-[color,box-shadow] outline-none placeholder:text-ink-subtlest",
        className
      )}
      // Field.Control is typed for <input>; the handlers it adds also suit a <textarea>
      {...(props as unknown as FieldPrimitive.Control.Props)}
    />
  )
}

export { Textarea }
