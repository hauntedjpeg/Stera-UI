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
    "[&>svg]:[svg]:shrink-0 [&>svg]:[svg:not([class*='size-'])]:size-4",
  ],
  {
    variants: {
      variant: {
        default: "bg-surface text-text [&>svg]:text-current",
        brand:
          "border-border-brand bg-surface-brand-subtle [&>svg]:text-text-brand",
        accent:
          "border-border-accent bg-surface-accent-subtle [&>svg]:text-text-accent",
        danger:
          "border-border-danger bg-surface-danger-subtle [&>svg]:text-text-danger",
        success:
          "border-border-success bg-surface-success-subtle [&>svg]:text-text-success",
        warning:
          "border-border-warning bg-surface-warning-subtle [&>svg]:text-text-warning-subtle",
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
      className={cn("flex flex-1 flex-col gap-1", className)}
      {...props}
    />
  )
}

function CalloutTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="callout-title"
      className={cn(
        "st-body-md-strong [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-text-brand",
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
        "st-body-md text-balance text-text-subtle md:text-pretty [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-text-brand",
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
      className={cn(
        "inline-flex size-4 shrink-0 items-center justify-center",
        className
      )}
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
