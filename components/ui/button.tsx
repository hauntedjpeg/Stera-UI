"use client"

import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  [
    // Group
    "group/button",
    // Base
    "inline-flex shrink-0 items-center justify-center rounded-xl bg-clip-padding transition-all outline-none select-none",
    // Text
    "whitespace-nowrap",
    // Focus
    "focus-visible:border-border-tertiary focus-visible:ring-3 focus-visible:ring-ring",
    // Disabled
    "disabled:pointer-events-none disabled:opacity-50",
    // Invalid
    "aria-invalid:border-border-danger-secondary aria-invalid:ring-3 aria-invalid:ring-ring-danger",
    // Other
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ],
  {
    variants: {
      variant: {
        brand:
          "bg-bg-brand text-text-onbrand hover:bg-bg-brand-hover focus-visible:border-border-brand-secondary focus-visible:ring-ring-brand",
        accent:
          "bg-bg-accent text-text-onaccent hover:bg-bg-accent-hover",
        outline:
          "border border-border bg-bg-surface hover:bg-bg-surface-hover aria-expanded:bg-bg-surface-hover aria-expanded:text-text",
        subtle:
          "bg-bg-surface-secondary text-text hover:bg-bg-surface-secondary-hover aria-expanded:bg-bg-surface-tertiary-hover aria-expanded:text-text",
        ghost:
          "hover:bg-bg-surface-hover hover:text-text aria-expanded:bg-bg-surface-hover aria-expanded:text-text dark:hover:bg-bg-surface-hover",
        danger:
          "bg-bg-danger-tertiary text-text-danger hover:bg-bg-danger-tertiary-hover focus-visible:border-border-danger-secondary focus-visible:ring-ring-danger",
        link: "text-text underline-offset-4 hover:underline",
      },
      size: {
        xs:
          "h-6 gap-1.5 rounded-lg px-2 arc-text-body-sm-strong in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm:
          "h-8 gap-2 px-3 arc-text-body-sm-strong has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        md:
          "h-10 gap-2 px-4 arc-text-body-md-strong has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        lg:
          "h-12 gap-3 px-5 arc-text-body-lg-strong has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4",
        icon:
          "size-10 [&_svg:not([class*='size-'])]:size-5",
        "icon-xs":
          "size-6 rounded-lg in-data-[slot=button-group]:rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-8",
        "icon-lg":
          "size-12 [&_svg:not([class*='size-'])]:size-6",
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
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      data-variant={variant}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
