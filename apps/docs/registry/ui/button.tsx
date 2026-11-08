"use client"

import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const defaults = { variant: "outline", size: "md" } as const

const buttonVariants = cva(
  [
    // Group
    "group/button",
    // Base. Every variant keeps a transparent border so all variants share
    // one box size; only `outline` gives it a color.
    "inline-flex shrink-0 items-center justify-center rounded-xl border border-transparent transition outline-none select-none",
    // Text
    "st-label-md-medium whitespace-nowrap",
    // Focus
    "focus-visible:ring-3 focus-visible:ring-ring",
    // Disabled
    "data-disabled:pointer-events-none data-disabled:opacity-50",
    // Invalid
    "aria-invalid:ring-3 aria-invalid:ring-ring-danger",
    // Other
    "active:translate-y-px [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ],
  {
    variants: {
      variant: {
        outline: [
          "border-border bg-surface text-ink",
          "hover:bg-surface-hover active:bg-surface-pressed aria-expanded:bg-surface-hover",
          "focus-visible:border-border-bold aria-invalid:border-border-danger",
        ],
        brand: [
          "bg-surface-brand text-ink-onbrand",
          "hover:bg-surface-brand-hover active:bg-surface-brand-pressed aria-expanded:bg-surface-brand-hover",
          "focus-visible:ring-ring-brand",
        ],
        accent: [
          "bg-surface-accent text-ink-onaccent",
          "hover:bg-surface-accent-hover active:bg-surface-accent-pressed aria-expanded:bg-surface-accent-hover",
        ],
        subtle: [
          "bg-surface-subtle text-ink",
          "hover:bg-surface-subtle-hover active:bg-surface-subtle-pressed aria-expanded:bg-surface-subtle-hover",
        ],
        ghost: [
          "text-ink",
          "hover:bg-surface-hover active:bg-surface-pressed aria-expanded:bg-surface-hover",
        ],
        danger: [
          "bg-surface-danger-subtle text-ink-danger",
          "hover:bg-surface-danger-subtle-hover active:bg-surface-danger-subtle-pressed aria-expanded:bg-surface-danger-subtle-hover",
          "focus-visible:ring-ring-danger",
        ],
        link: "text-ink underline-offset-4 hover:underline",
      },
      size: {
        xs: "h-6 gap-1.5 rounded-lg px-2 st-label-sm-medium has-data-[icon=inline-end]:pr-1 has-data-[icon=inline-start]:pl-1 has-data-[kbd=inline-end]:pr-1 has-data-[kbd=inline-start]:pl-1 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-2 px-3 st-label-sm-medium has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 has-data-[kbd=inline-end]:pr-1.5 has-data-[kbd=inline-start]:pl-1.5",
        md: "h-9 gap-2 px-3 has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5 has-data-[kbd=inline-end]:pr-2.5 has-data-[kbd=inline-start]:pl-2.5",
        lg: "h-11 gap-2 px-5 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3 has-data-[kbd=inline-end]:pr-3 has-data-[kbd=inline-start]:pl-3",
        icon: "size-9",
        "icon-xs": "size-6 rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-11 [&_svg:not([class*='size-'])]:size-5",
      },
    },
    compoundVariants: [
      // Comes after the size classes, so it wins over each size's gap.
      { variant: "link", class: "gap-1" },
    ],
    defaultVariants: defaults,
  }
)

function Button({
  className,
  variant = defaults.variant,
  size = defaults.size,
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      className={cn(buttonVariants({ variant, size, className }))}
      data-slot="button"
      data-variant={variant}
      data-size={size}
      {...props}
    />
  )
}

export { Button, buttonVariants }
