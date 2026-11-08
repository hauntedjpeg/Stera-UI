"use client"

import * as React from "react"
import { NumberField as NumberFieldPrimitive } from "@base-ui/react/number-field"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { SiArrowsLeftRight, SiMinus, SiPlus } from "stera-icons"

type InputNumberSize = "sm" | "md" | "lg"

const InputNumberContext = React.createContext<{
  size: InputNumberSize
  invalid: boolean
}>({ size: "md", invalid: false })

const inputNumberGroupVariants = cva(
  [
    // Base
    "flex items-stretch overflow-hidden rounded-xl border border-border bg-surface text-ink",
    // Sizing
    "w-full min-w-0",
    // Disabled
    "data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:border-border-subtle data-disabled:bg-surface-disabled data-disabled:text-ink-subtlest",
    // Other
    "transition-[color,border-color] outline-none",
  ],
  {
    variants: {
      size: {
        sm: "h-8",
        md: "h-9",
        lg: "h-11",
      },
    },
    defaultVariants: { size: "md" },
  }
)

const inputNumberControlVariants = cva(
  [
    // Base
    "bg-transparent text-center st-body-md text-inherit tabular-nums placeholder:text-ink-subtlest",
    // Sizing
    "w-full min-w-0 flex-1",
    // Without a stepper beside it, follow the group's inner corner so the inset ring isn't clipped
    "first:rounded-l-[calc(var(--radius-xl)-1px)] last:rounded-r-[calc(var(--radius-xl)-1px)]",
    // Focus: a 1px border with the ring inside it, kept within the editable area
    "focus-visible:inset-shadow-[0_0_0_1px_var(--color-border-brand)] focus-visible:inset-ring-4 focus-visible:inset-ring-ring-brand",
    // Disabled
    "disabled:cursor-not-allowed",
    // Invalid
    "aria-invalid:inset-shadow-[0_0_0_1px_var(--color-border-danger)] aria-invalid:inset-ring-4 aria-invalid:inset-ring-ring-danger",
    // Other
    "transition-[box-shadow] outline-none",
  ],
  {
    variants: {
      size: {
        sm: "px-2",
        md: "px-2.5",
        lg: "px-3",
      },
    },
    defaultVariants: { size: "md" },
  }
)

const inputNumberStepperVariants = cva(
  [
    // Base
    "flex shrink-0 items-center justify-center border-border text-ink-subtler select-none",
    // Sizing
    "aspect-square h-full",
    // Hover
    "hover:bg-surface-hover hover:text-ink",
    // Disabled
    "disabled:pointer-events-none disabled:text-ink-subtlest data-disabled:pointer-events-none data-disabled:text-ink-subtlest",
    // Other
    "transition-colors outline-none active:bg-surface-hover [&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  {
    variants: {
      size: {
        sm: "[&_svg:not([class*='size-'])]:size-4",
        md: "[&_svg:not([class*='size-'])]:size-4",
        lg: "[&_svg:not([class*='size-'])]:size-5",
      },
    },
    defaultVariants: { size: "md" },
  }
)

function InputNumber({
  className,
  size = "md",
  "aria-invalid": ariaInvalid,
  ...props
}: NumberFieldPrimitive.Root.Props &
  VariantProps<typeof inputNumberGroupVariants> & {
    "aria-invalid"?: React.AriaAttributes["aria-invalid"]
  }) {
  const resolvedSize = size ?? "md"
  const invalid = ariaInvalid === true || ariaInvalid === "true"
  const context = React.useMemo(
    () => ({ size: resolvedSize, invalid }),
    [resolvedSize, invalid]
  )

  return (
    <InputNumberContext.Provider value={context}>
      <NumberFieldPrimitive.Root
        data-slot="input-number"
        data-size={resolvedSize}
        className={cn("flex flex-col gap-1", className)}
        {...props}
      />
    </InputNumberContext.Provider>
  )
}

function InputNumberGroup({
  className,
  ...props
}: NumberFieldPrimitive.Group.Props) {
  const { size } = React.useContext(InputNumberContext)

  return (
    <NumberFieldPrimitive.Group
      data-slot="input-number-group"
      className={cn(inputNumberGroupVariants({ size }), className)}
      {...props}
    />
  )
}

function InputNumberControl({
  className,
  ...props
}: NumberFieldPrimitive.Input.Props) {
  const { size, invalid } = React.useContext(InputNumberContext)

  return (
    <NumberFieldPrimitive.Input
      data-slot="input-number-control"
      data-size={size}
      // A Field sets aria-invalid too; an undefined here would overwrite it
      {...(invalid && { "aria-invalid": true })}
      className={cn(inputNumberControlVariants({ size }), className)}
      {...props}
    />
  )
}

function InputNumberDecrement({
  className,
  children,
  ...props
}: NumberFieldPrimitive.Decrement.Props) {
  const { size } = React.useContext(InputNumberContext)

  return (
    <NumberFieldPrimitive.Decrement
      data-slot="input-number-decrement"
      className={cn(
        inputNumberStepperVariants({ size }),
        "border-r",
        className
      )}
      {...props}
    >
      {children ?? <SiMinus />}
    </NumberFieldPrimitive.Decrement>
  )
}

function InputNumberIncrement({
  className,
  children,
  ...props
}: NumberFieldPrimitive.Increment.Props) {
  const { size } = React.useContext(InputNumberContext)

  return (
    <NumberFieldPrimitive.Increment
      data-slot="input-number-increment"
      className={cn(
        inputNumberStepperVariants({ size }),
        "border-l",
        className
      )}
      {...props}
    >
      {children ?? <SiPlus />}
    </NumberFieldPrimitive.Increment>
  )
}

function InputNumberScrubArea({
  className,
  ...props
}: NumberFieldPrimitive.ScrubArea.Props) {
  return (
    <NumberFieldPrimitive.ScrubArea
      data-slot="input-number-scrub-area"
      className={cn(
        "inline-flex w-fit cursor-ew-resize items-center select-none data-disabled:cursor-not-allowed [&_label]:cursor-ew-resize",
        className
      )}
      {...props}
    />
  )
}

function InputNumberScrubAreaCursor({
  className,
  children,
  ...props
}: NumberFieldPrimitive.ScrubAreaCursor.Props) {
  return (
    <NumberFieldPrimitive.ScrubAreaCursor
      data-slot="input-number-scrub-area-cursor"
      className={cn(
        "text-ink drop-shadow-sm [&_svg:not([class*='size-'])]:size-5",
        className
      )}
      {...props}
    >
      {children ?? <SiArrowsLeftRight />}
    </NumberFieldPrimitive.ScrubAreaCursor>
  )
}

export {
  InputNumber,
  InputNumberGroup,
  InputNumberControl,
  InputNumberDecrement,
  InputNumberIncrement,
  InputNumberScrubArea,
  InputNumberScrubAreaCursor,
  inputNumberGroupVariants,
}
