import * as React from "react"
import { Field as FieldPrimitive } from "@base-ui/react/field"
import { cva, type VariantProps } from "class-variance-authority"
import { SiChevronDown } from "stera-icons"

import { cn } from "@/lib/utils"

const nativeSelectVariants = cva(
  [
    // Base
    "w-full min-w-0 appearance-none rounded-xl bg-surface inset-ring inset-ring-border forced-focus forced-stroke transition-[color,box-shadow] outline-none select-none",
    // Focus
    "focus-visible:ring-3 focus-visible:ring-ring-brand focus-visible:inset-ring-border-brand",
    // Disabled
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-surface-disabled disabled:text-ink-subtlest disabled:inset-ring-border-subtle",
    // Invalid
    "aria-invalid:ring-3 aria-invalid:ring-ring-danger aria-invalid:inset-ring-border-danger",
  ],
  {
    variants: {
      size: {
        sm: "h-8 pr-8 pl-2.5 st-label-md",
        md: "h-9 pr-8 pl-3 st-label-md",
        lg: "h-10 pr-8 pl-3 st-label-md",
        xl: "h-12 pr-10 pl-4 st-body-lg",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

type NativeSelectProps = Omit<React.ComponentProps<"select">, "size"> &
  VariantProps<typeof nativeSelectVariants>

function NativeSelect({ className, size, ...props }: NativeSelectProps) {
  return (
    <div
      className={cn(
        "group/native-select relative w-fit has-[select:disabled]:opacity-50",
        className
      )}
      data-slot="native-select-wrapper"
      data-size={size}
    >
      {/* Field.Control wires the id, label, description and invalid state from a Field */}
      <FieldPrimitive.Control
        render={<select />}
        data-slot="native-select"
        className={cn(nativeSelectVariants({ size }))}
        // Field.Control is typed for <input>; the handlers it adds also suit a <select>
        {...(props as unknown as FieldPrimitive.Control.Props)}
      />
      <SiChevronDown
        className="pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2 text-ink-subtlest select-none"
        aria-hidden="true"
        data-slot="native-select-icon"
      />
    </div>
  )
}

function NativeSelectOption({ ...props }: React.ComponentProps<"option">) {
  return <option data-slot="native-select-option" {...props} />
}

function NativeSelectOptGroup({
  className,
  ...props
}: React.ComponentProps<"optgroup">) {
  return (
    <optgroup
      data-slot="native-select-optgroup"
      className={cn(className)}
      {...props}
    />
  )
}

export { NativeSelect, NativeSelectOptGroup, NativeSelectOption }
