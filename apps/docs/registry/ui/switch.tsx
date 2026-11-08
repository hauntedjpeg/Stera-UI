"use client"

import type { TransitionEvent } from "react"
import { Switch as SwitchPrimitive } from "@base-ui/react/switch"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const switchVariants = cva(
  [
    // Base — a 2px border holds the focus and invalid color
    "@container relative inline-flex shrink-0 items-center rounded-full border-2 border-transparent bg-surface-muted outline-none",
    "transition-[background-color,border-color,box-shadow,opacity] duration-200 ease-out",
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

// Flags the thumb with data-moving while it slides between states.
function syncMoving(event: TransitionEvent<HTMLElement>) {
  // React only fills propertyName on transitionend, so read the native event
  if (event.nativeEvent.propertyName !== "translate") return
  const thumb = event.currentTarget
  thumb.toggleAttribute(
    "data-moving",
    thumb
      .getAnimations()
      .some(
        (animation) =>
          animation instanceof CSSTransition &&
          animation.transitionProperty === "translate"
      )
  )
}

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
        onTransitionRun={syncMoving}
        onTransitionEnd={syncMoving}
        onTransitionCancel={syncMoving}
        className={cn(
          // Base
          "pointer-events-none h-full w-(--thumb-w) rounded-full bg-(--white-12)",
          "transition-[translate,scale,background-color,backdrop-filter] duration-200 ease-out motion-reduce:transition-none",
          // Checked — slide across the track's inner width
          "data-checked:translate-x-[calc(100cqw-100%)]",
          // Moving — grows into the Slider's dragging glass
          "data-moving:scale-125 data-moving:bg-alpha-5 data-moving:backdrop-blur-[2px]"
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
