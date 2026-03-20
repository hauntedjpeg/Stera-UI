import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { ChevronDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"

const nativeSelectVariants = cva(
  [
    // Base
    "w-full min-w-0 appearance-none rounded-xl border border-border bg-bg-surface transition-[color,box-shadow] outline-none select-none",
    // Focus
    "focus-visible:border-border-brand-secondary focus-visible:ring-3 focus-visible:ring-ring-brand",
    // Disabled
    "disabled:text-text-tertiary disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-bg-disabled disabled:border-border-secondary",
    // Invalid
    "aria-invalid:border-border-danger-secondary aria-invalid:ring-3 aria-invalid:ring-ring-danger",
  ],
  {
    variants: {
      size: {
        sm: "h-8 pl-2.5 pr-8 arc-text-body-md-compact",
        md: "h-9 pl-3 pr-8 arc-text-body-md-compact",
        lg: "h-10 pl-3 pr-8 arc-text-body-md-compact",
        xl: "h-12 pl-4 pr-10 arc-text-body-lg",
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
      <select
        data-slot="native-select"
        className={cn(nativeSelectVariants({ size }))}
        {...props}
      />
      <ChevronDownIcon
        className="pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2 text-text-tertiary select-none"
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
