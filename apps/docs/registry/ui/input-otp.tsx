"use client"

import * as React from "react"
import { OTPField as OTPFieldPrimitive } from "@base-ui/react/otp-field"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { SiMinus } from "stera-icons"

type InputOTPSize = "sm" | "md" | "lg"

const InputOTPContext = React.createContext<{
  size: InputOTPSize
  invalid: boolean
}>({ size: "md", invalid: false })

const inputOTPGapVariants = cva("flex items-center", {
  variants: {
    size: {
      sm: "gap-1.5",
      md: "gap-2",
      lg: "gap-2.5",
    },
  },
  defaultVariants: { size: "md" },
})

const inputOTPSlotVariants = cva(
  [
    // Base
    "rounded-xl bg-surface text-center text-ink tabular-nums caret-ink inset-ring inset-ring-border forced-focus forced-stroke",
    // Sizing
    "shrink-0 p-0",
    // Focus
    "focus-visible:ring-3 focus-visible:ring-ring-brand focus-visible:inset-ring-border-brand",
    // Disabled
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-surface-disabled disabled:text-ink-subtlest disabled:inset-ring-border-subtle",
    // Invalid
    "aria-invalid:ring-3 aria-invalid:ring-ring-danger aria-invalid:inset-ring-border-danger",
    // Other
    "transition-[color,box-shadow] outline-none",
  ],
  {
    variants: {
      size: {
        sm: "size-8 st-body-md",
        md: "size-9 st-body-md",
        lg: "size-11 st-body-lg",
      },
    },
    defaultVariants: { size: "md" },
  }
)

function InputOTP({
  className,
  size = "md",
  "aria-invalid": ariaInvalid,
  ...props
}: OTPFieldPrimitive.Root.Props &
  VariantProps<typeof inputOTPSlotVariants> & {
    "aria-invalid"?: React.AriaAttributes["aria-invalid"]
  }) {
  const resolvedSize = size ?? "md"
  const invalid = ariaInvalid === true || ariaInvalid === "true"
  const context = React.useMemo(
    () => ({ size: resolvedSize, invalid }),
    [resolvedSize, invalid]
  )

  return (
    <InputOTPContext.Provider value={context}>
      <OTPFieldPrimitive.Root
        data-slot="input-otp"
        data-size={resolvedSize}
        className={cn(inputOTPGapVariants({ size: resolvedSize }), className)}
        {...props}
      />
    </InputOTPContext.Provider>
  )
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  const { size } = React.useContext(InputOTPContext)

  return (
    <div
      data-slot="input-otp-group"
      className={cn(inputOTPGapVariants({ size }), className)}
      {...props}
    />
  )
}

function InputOTPSlot({
  className,
  render,
  ...props
}: OTPFieldPrimitive.Input.Props) {
  const { size, invalid } = React.useContext(InputOTPContext)

  return (
    <OTPFieldPrimitive.Input
      data-slot="input-otp-slot"
      data-size={size}
      // A Field sets aria-invalid too; an undefined here would overwrite it
      {...(invalid && { "aria-invalid": true })}
      className={cn(inputOTPSlotVariants({ size }), className)}
      render={
        render ??
        ((inputProps, state) => {
          // Base UI names the first slot through its label. Every slot after
          // it needs its own name, so give each one its position.
          if (state.index === 0 || inputProps["aria-label"] != null) {
            return <input {...inputProps} />
          }
          return (
            <input
              {...inputProps}
              aria-labelledby={undefined}
              aria-label={`Character ${state.index + 1} of ${state.length}`}
            />
          )
        })
      }
      {...props}
    />
  )
}

function InputOTPSeparator({
  className,
  children,
  ...props
}: OTPFieldPrimitive.Separator.Props) {
  return (
    <OTPFieldPrimitive.Separator
      data-slot="input-otp-separator"
      className={cn(
        "flex items-center text-ink-subtler [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children ?? <SiMinus />}
    </OTPFieldPrimitive.Separator>
  )
}

export {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
  inputOTPSlotVariants,
}
