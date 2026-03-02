import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  [
    // Base
    "inline-flex rounded-xl outline-none",
    // Sizing
    "gap-2 shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0",
    // Other
    "items-center justify-center whitespace-nowrap text-sm font-medium text-text transition-all [&_svg]:pointer-events-none",
    // Focus
    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
    // Invalid
    "aria-invalid:ring-border-danger aria-invalid:border-border-danger-secondary",
    // Disabled
    "disabled:pointer-events-none disabled:text-text-disabled",
  ],
  {
    variants: {
      variant: {
        brand: "bg-bg-brand text-text-onbrand hover:bg-bg-brand-hover",
        accent: "bg-bg-accent text-text-onaccent hover:bg-bg-accent-hover",
        outline: "bg-bg-surface border border-border hover:bg-bg-surface-hover",
        subtle: "bg-bg-surface-secondary hover:bg-bg-surface-secondary-hover",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        danger: "bg-bg-danger text-text-ondanger hover:bg-bg-danger-hover focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        md: "h-10 px-4 py-2",
        "md-icon-left": "h-10 pl-3 pr-4 py-2",
        "md-icon-right": "h-10 pl-4 pr-3 py-2",
        "md-icon-both": "h-10 px-3 py-2",
        xs: "h-6 rounded-lg px-2 text-xs [&_svg:not([class*='size-'])]:size-3",
        "xs-icon-left": "h-6 gap-1.5 rounded-lg pl-1.5 pr-2 text-xs [&_svg:not([class*='size-'])]:size-3",
        "xs-icon-right": "h-6 gap-1.5 rounded-lg pl-2 pr-1.5 text-xs [&_svg:not([class*='size-'])]:size-3",
        "xs-icon-both": "h-6 gap-1.5 rounded-lg px-1 text-xs [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 px-3 text-xs",
        "sm-icon-left": "h-8 pl-2 pr-3 text-xs",
        "sm-icon-right": "h-8 pl-3 pr-2 text-xs",
        "sm-icon-both": "h-8 px-2 text-xs",
        lg: "h-12 gap-3 px-5 text-md",
        "lg-icon-left": "h-12 gap-3 pl-4 pr-5 text-md",
        "lg-icon-right": "h-12 gap-3 pl-5 pr-4 text-md",
        "lg-icon-both": "h-12 gap-3 px-4 text-md",
        icon: "size-10 [&_svg:not([class*='size-'])]:size-5",
        "icon-xs": "size-6 rounded-lg [&_svg:not([class*='size-'])]:size-4",
        "icon-sm": "size-8",
        "icon-lg": "size-12 [&_svg:not([class*='size-'])]:size-6",
      },
    },
    defaultVariants: {
      variant: "outline",
      size: "md",
    },
  }
)

function Button({
  className,
  variant = "outline",
  size = "md",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
