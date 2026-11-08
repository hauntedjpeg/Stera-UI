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
    // Focus
    "has-[[data-slot=input-number-control]:focus-visible]:border-border-brand-strong has-[[data-slot=input-number-control]:focus-visible]:ring-3 has-[[data-slot=input-number-control]:focus-visible]:ring-ring-brand",
    // Disabled
    "data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:border-border-strong data-disabled:bg-surface-disabled data-disabled:text-ink-subtlest",
    // Invalid
    "has-[[data-slot=input-number-control][aria-invalid=true]]:border-border-danger-strong has-[[data-slot=input-number-control][aria-invalid=true]]:ring-3 has-[[data-slot=input-number-control][aria-invalid=true]]:ring-ring-danger",
    // Other
    "transition-[color,box-shadow,border-color] outline-none",
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
    // Disabled
    "disabled:cursor-not-allowed",
    // Other
    "outline-none",
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
      aria-invalid={invalid || undefined}
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
