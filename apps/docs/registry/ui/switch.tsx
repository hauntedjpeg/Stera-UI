import { Switch as SwitchPrimitive } from "@base-ui/react/switch"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const switchVariants = cva(
  [
    // Base — a 2px border holds the focus and invalid color
    "group/switch @container relative inline-flex shrink-0 items-center rounded-full border-2 border-transparent bg-surface-muted outline-none",
    "transition-[background-color,border-color,box-shadow,opacity] duration-120 ease-out",
    // Press — the thumb's leading edge reaches 30% of the way across
    "[--press:1] active:not-data-disabled:not-data-readonly:[--press:0.7]",
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
      // Track size; the thumb fills the inner height and takes --thumb-w.
      // --thumb-bounce is the trailing edge's overshoot; md and lg use a
      // gentler curve because their thumbs travel farther.
      size: {
        sm: "h-4 w-6 [--thumb-bounce:cubic-bezier(0.34,1.85,0.64,1)] [--thumb-w:--spacing(3)]",
        md: "h-5 w-9 p-0.5 [--thumb-bounce:cubic-bezier(0.34,1.5,0.64,1)] [--thumb-w:--spacing(4.5)]",
        lg: "h-7 w-16 p-0.5 [--thumb-bounce:cubic-bezier(0.34,1.35,0.64,1)] [--thumb-w:--spacing(9)]",
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
          // Base — the margins place each edge, so the thumb can stretch.
          // At rest it is --thumb-w wide; --travel is the distance it moves.
          "pointer-events-none h-full min-w-0 flex-1 rounded-full bg-(--white-12)",
          "[--travel:calc(100cqw-var(--thumb-w))]",
          "ms-0 me-[calc(var(--travel)*var(--press))]",
          // Motion — the leading edge moves first, the trailing edge follows
          // and overshoots slightly before settling
          "[transition:margin-inline-start_110ms_cubic-bezier(0.25,1,0.5,1),margin-inline-end_250ms_var(--thumb-bounce)_50ms,background-color_120ms_ease-out]",
          "data-checked:[transition:margin-inline-end_110ms_cubic-bezier(0.25,1,0.5,1),margin-inline-start_250ms_var(--thumb-bounce)_50ms,background-color_120ms_ease-out]",
          "group-active/switch:[transition:margin_110ms_cubic-bezier(0.25,1,0.5,1),background-color_120ms_ease-out]!",
          "motion-reduce:transition-none!",
          // Checked
          "data-checked:ms-[calc(var(--travel)*var(--press))] data-checked:me-0 data-checked:bg-ink-onbrand"
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
