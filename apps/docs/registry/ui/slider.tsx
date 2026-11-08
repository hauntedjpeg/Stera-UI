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
              "rounded-full bg-surface-brand",
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
              "block shrink-0 rounded-full border-[0.5px] border-alpha-4 bg-(--white-12) shadow-md backdrop-blur-[2px] outline-none",
              "transition-[width,height,background-color,border-color,box-shadow] duration-120 ease-out",
              // Size — 24×16, swapped when vertical
              "data-[orientation=horizontal]:h-4 data-[orientation=horizontal]:w-6 data-[orientation=vertical]:h-6 data-[orientation=vertical]:w-4",
              // Hit area
              "after:absolute after:-inset-1",
              // Drag — grows to 32×20, swapped when vertical
              "data-dragging:border-alpha-3 data-dragging:bg-alpha-5",
              "data-dragging:data-[orientation=horizontal]:h-5 data-dragging:data-[orientation=horizontal]:w-8 data-dragging:data-[orientation=vertical]:h-8 data-dragging:data-[orientation=vertical]:w-5",
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
