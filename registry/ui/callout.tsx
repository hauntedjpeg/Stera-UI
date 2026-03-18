import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const calloutVariants = cva(
  [
    // Base
    "flex items-start rounded-xl border border-border p-4 text-left",
    // Sizing
    "w-full gap-x-3",
    // Icon
    "[&>svg]:[svg:not([class*='size-'])]:size-4 [&>svg]:[svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        default:
          "bg-bg-surface text-text [&>svg]:text-current",
        brand:
          "bg-bg-brand-tertiary border-border-brand [&>svg]:text-text-brand",
        accent:
          "bg-bg-accent-tertiary border-border-accent [&>svg]:text-text-accent",
        danger:
          "bg-bg-danger-tertiary border-border-danger [&>svg]:text-text-danger",
        success:
          "bg-bg-success-tertiary border-border-success [&>svg]:text-text-success",
        warning:
          "bg-bg-warning-tertiary border-border-warning [&>svg]:text-text-warning-secondary"
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Callout({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof calloutVariants>) {
  return (
    <div
      data-slot="callout"
      role="note"
      className={cn(calloutVariants({ variant }), className)}
      {...props}
    />
  )
}

function CalloutContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="callout-content"
      className={cn("flex flex-col flex-1 gap-1", className)}
      {...props}
    />
  )
}

function CalloutTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="callout-title"
      className={cn(
        "arc-text-body-md-strong [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-text-brand",
        className
      )}
      {...props}
    />
  )
}

function CalloutDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="callout-description"
      className={cn(
        "arc-text-body-md text-text-secondary text-balance md:text-pretty [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-text-brand",
        className
      )}
      {...props}
    />
  )
}

function CalloutAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="callout-action"
      className={cn("mt-2", className)}
      {...props}
    />
  )
}

function CalloutClose({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="callout-close"
      className={cn("inline-flex items-center justify-center shrink-0 size-4", className)}
      {...props}
    />
  )
}

export {
  Callout,
  CalloutContent,
  CalloutTitle,
  CalloutDescription,
  CalloutAction,
  CalloutClose,
}
