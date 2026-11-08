import { Switch as SwitchPrimitive } from "@base-ui/react/switch"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const switchVariants = cva(
  [
    // Base — a 2px border holds the focus and invalid color
    "@container relative inline-flex shrink-0 items-center rounded-full border-2 border-transparent bg-surface-muted outline-none",
    "transition-[background-color,border-color,box-shadow,opacity] duration-120 ease-out",
    // Hit area
    "after:absolute after:-inset-x-3 after:-inset-y-2",
    // State
    "data-checked:bg-surface-brand",
    // Focus
    "focus-visible:border-border-brand focus-visible:ring-3 focus-visible:ring-ring-brand",
    // Invalid
    "data-invalid:border-border-danger data-invalid:ring-3 data-invalid:ring-ring-danger",
    // Disabled / Read-only
    "data-disabled:cursor-not-allowed data-disabled:opacity-50 data-readonly:cursor-default",
  ],
  {
    variants: {
      // Track size; the thumb fills the inner height and takes --thumb-w
      size: {
        sm: "h-4 w-6 [--thumb-w:--spacing(3)]",
        md: "h-5 w-9 p-0.5 [--thumb-w:--spacing(4.5)]",
        lg: "h-7 w-16 p-0.5 [--thumb-w:--spacing(9)]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

function Switch({
  className,
  size = "md",
  ...props
}: SwitchPrimitive.Root.Props & VariantProps<typeof switchVariants>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(switchVariants({ size }), className)}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          // Base
          "pointer-events-none h-full w-(--thumb-w) rounded-full bg-(--white-12)",
          "transition-transform duration-120 ease-out motion-reduce:transition-none",
          // Checked
          "data-checked:bg-ink-onbrand data-checked:translate-x-[calc(100cqw-100%)]"
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
