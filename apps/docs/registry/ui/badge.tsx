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
          "bg-bg-surface-tertiary text-text",
        "outline":
          "bg-bg-surface text-text border-border",
        "solid":
          "bg-bg-surface-inverse text-text-oninverse",
        brand:
          "bg-bg-brand-tertiary text-text-brand-secondary",
        "brand-outline":
          "bg-bg-surface text-text-brand border-border-brand",
        "brand-solid":
          "bg-bg-brand text-text-onbrand",
        accent:
          "bg-bg-accent-tertiary text-text-accent-secondary",
        "accent-outline":
          "bg-bg-surface text-text-accent border-border-accent",
        "accent-solid":
          "bg-bg-accent text-text-onaccent",
        danger:
          "bg-bg-danger-tertiary text-text-danger-secondary",
        "danger-outline":
          "bg-bg-surface text-text-danger border-border-danger",
        "danger-solid":
          "bg-bg-danger text-text-ondanger",
        success:
          "bg-bg-success-tertiary text-text-success-secondary",
        "success-outline":
          "bg-bg-surface text-text-success border-border-success",
        "success-solid":
          "bg-bg-success text-text-onsuccess",
        warning:
          "bg-bg-warning-tertiary text-text-warning-secondary",
        "warning-outline":
          "bg-bg-surface text-text-warning-secondary border-border-warning",
        "warning-solid":
          "bg-bg-warning text-text-onwarning",
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
