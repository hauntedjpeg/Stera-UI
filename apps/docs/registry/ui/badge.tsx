import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  [
    // Group
    "group/badge",
    // Base
    "inline-flex items-center justify-center rounded-full border border-transparent",
    // Sizing
    "w-fit shrink-0 gap-1",
    // Variants
    "has-data-[icon=inline-start]:pl-1 has-data-[icon=inline-end]:pr-1",
    // Other
    "overflow-hidden whitespace-nowrap transition-all [&>svg]:pointer-events-none",
  ],
  {
    variants: {
      variant: {
        default:
          "bg-surface-tertiary text-text",
        "outline":
          "bg-surface text-text border-border",
        "solid":
          "bg-surface-inverse text-text-oninverse",
        brand:
          "bg-surface-brand-tertiary text-text-brand",
        "brand-outline":
          "bg-surface text-text-brand border-border-brand",
        "brand-solid":
          "bg-surface-brand text-text-onbrand",
        accent:
          "bg-surface-accent-tertiary text-text-accent",
        "accent-outline":
          "bg-surface text-text-accent border-border-accent",
        "accent-solid":
          "bg-surface-accent text-text-onaccent",
        danger:
          "bg-surface-danger-tertiary text-text-danger-secondary",
        "danger-outline":
          "bg-surface text-text-danger border-border-danger",
        "danger-solid":
          "bg-surface-danger text-text-ondanger",
        success:
          "bg-surface-success-tertiary text-text-success-secondary",
        "success-outline":
          "bg-surface text-text-success border-border-success",
        "success-solid":
          "bg-surface-success text-text-onsuccess",
        warning:
          "bg-surface-warning-tertiary text-text-warning-secondary",
        "warning-outline":
          "bg-surface text-text-warning-secondary border-border-warning",
        "warning-solid":
          "bg-surface-warning text-text-onwarning",
      },
      size: {
        sm:
          "h-4 px-1.5 st-body-sm-strong [&_svg]:size-3",
        md:
          "h-5 px-2 st-body-sm-strong [&_svg]:size-3",
        lg:
          "h-6 px-2 st-body-sm-strong [&_svg:not([class*='size-'])]:size-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

function Badge({
  className,
  variant = "default",
  size = "md",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant, size }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
      size,
    },
  })
}

export { Badge, badgeVariants }
