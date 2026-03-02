import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  [
    // Base
    "inline-flex items-center justify-center rounded-full bg-bg-surface border border-transparent px-2 text-xs font-medium overflow-hidden",
    // Sizing
    "w-fit shrink-0 gap-1",
    // Animation
    "transition-[color,box-shadow]",
    // Other
    "whitespace-nowrap [&>svg]:size-3 [&>svg]:pointer-events-none cursor-default",
  ],
  {
    variants: {
      variant: {
        brand: "bg-bg-brand-tertiary text-text-brand-secondary",
        "brand-outline": "border-border-brand",
        "brand-solid": "bg-bg-brand text-text-onbrand",
        default: "bg-bg-surface-tertiary text-text",
        "default-outline": "border-border text-text-secondary",
        "default-solid": "bg-bg-surface-inverse text-text-oninverse",
        danger: "bg-bg-danger-tertiary text-text-danger-secondary",
        "danger-outline": "border-border-danger text-text-danger",
        "danger-solid": "bg-bg-danger text-text-ondanger",
        success: "bg-bg-success-tertiary text-text-success-secondary",
        "success-outline": "border-border-success text-text-success",
        "success-solid": "bg-bg-success text-text-onsuccess",
        warning: "bg-bg-warning-tertiary text-text-onwarning",
        "warning-outline": "border-border-warning text-text-warning-secondary",
        "warning-solid": "bg-bg-warning text-text-onwarning",
      },
      size: {
        sm: "h-4 px-1.5 text-xs",
        "sm-icon-left": "h-4 pl-1 pr-1.5 text-xs",
        "sm-icon-right": "h-4 pl-1.5 pr-1 text-xs",
        "sm-icon-both": "h-4 px-1.5 text-xs",
        md: "h-5 px-2",
        "md-icon-left": "h-5 pl-1 pr-2",
        "md-icon-right": "h-5 pl-2 pr-1",
        "md-icon-both": "h-5 px-1",
        lg: "h-6 px-2 [&>svg]:size-4",
        "lg-icon-left": "h-6 pl-1 pr-2 [&>svg]:size-4",
        "lg-icon-right": "h-6 pl-2 pr-1 [&>svg]:size-4",
        "lg-icon-both": "h-6 px-2 [&>svg]:size-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "sm",
    },
  }
)

function Badge({
  className,
  variant = "default",
  size = "sm",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      data-size={size}
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
