"use client"

import { Slider as SliderPrimitive } from "@base-ui/react/slider"

import { cn } from "@/lib/utils"

function Slider<Value extends number | readonly number[]>({
  className,
  defaultValue,
  value,
  "aria-label": ariaLabel,
  getAriaLabel,
  ...props
}: SliderPrimitive.Root.Props<Value> &
  Pick<SliderPrimitive.Thumb.Props, "getAriaLabel">) {
  // One thumb per value. Base UI defaults to a single value (`min`).
  const values = value ?? defaultValue
  const thumbCount = Array.isArray(values) ? values.length : 1

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      className={className}
      defaultValue={defaultValue}
      value={value}
      {...props}
    >
      <SliderPrimitive.Control
        data-slot="slider-control"
        className={cn(
          // Base
          "relative flex w-full touch-none items-center select-none",
          // Orientation
          "data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-40 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
          // Disabled
          "data-disabled:cursor-not-allowed data-disabled:opacity-50"
        )}
      >
        <SliderPrimitive.Track
          data-slot="slider-track"
          className={cn(
            // Base
            "relative grow overflow-hidden rounded-full bg-surface-muted",
            // Orientation
            "data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5"
          )}
        >
          <SliderPrimitive.Indicator
            data-slot="slider-range"
            className={cn(
              // Base
              "bg-surface-brand",
              // Orientation
              "data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
            )}
          />
        </SliderPrimitive.Track>
        {Array.from({ length: thumbCount }, (_, index) => (
          <SliderPrimitive.Thumb
            data-slot="slider-thumb"
            key={index}
            index={index}
            aria-label={ariaLabel}
            getAriaLabel={getAriaLabel}
            className={cn(
              // Base
              "block size-4 shrink-0 rounded-full border border-border-subtle bg-surface shadow-sm transition-shadow outline-none",
              // Hit area (24px)
              "after:absolute after:-inset-1",
              // Hover / Drag
              "ring-ring hover:ring-3 data-dragging:ring-3",
              // Focus — keyboard focus lands on the nested <input>
              "has-focus-visible:border-border-brand has-focus-visible:ring-3 has-focus-visible:ring-ring-brand",
              // Invalid
              "data-invalid:border-border-danger data-invalid:ring-3 data-invalid:ring-ring-danger"
            )}
          />
        ))}
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  )
}

export { Slider }
