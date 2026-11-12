import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  [
    // Group
    "group/badge",
    // Base
    "inline-flex items-center justify-center rounded-full forced-stroke",
    // Sizing
    "w-fit shrink-0 gap-1",
    // Variants
    "has-data-[icon=inline-end]:pr-1 has-data-[icon=inline-start]:pl-1",
    // Other
    "overflow-hidden whitespace-nowrap transition-all [&>svg]:pointer-events-none",
  ],
  {
    variants: {
      variant: {
        default: "bg-surface-muted text-ink",
        outline: "bg-surface text-ink inset-ring inset-ring-border",
        solid: "bg-surface-inverse text-ink-oninverse",
        brand: "bg-surface-brand-subtle text-ink-brand-bold",
        "brand-outline":
          "bg-surface text-ink-brand inset-ring inset-ring-border-brand",
        "brand-solid": "bg-surface-brand text-ink-onbrand",
        accent: "bg-surface-accent-subtle text-ink-accent-bold",
        "accent-outline":
          "bg-surface text-ink-accent inset-ring inset-ring-border-accent",
        "accent-solid": "bg-surface-accent text-ink-onaccent",
        danger: "bg-surface-danger-subtle text-ink-danger-bold",
        "danger-outline":
          "bg-surface text-ink-danger inset-ring inset-ring-border-danger",
        "danger-solid": "bg-surface-danger text-ink-ondanger",
        success: "bg-surface-success-subtle text-ink-success-bold",
        "success-outline":
          "bg-surface text-ink-success inset-ring inset-ring-border-success",
        "success-solid": "bg-surface-success text-ink-onsuccess",
        warning: "bg-surface-warning-subtle text-ink-warning-bold",
        "warning-outline":
          "bg-surface text-ink-warning-subtle inset-ring inset-ring-border-warning",
        "warning-solid": "bg-surface-warning text-ink-onwarning",
      },
      size: {
        sm: "h-4 px-1.5 st-label-sm-medium [&_svg]:size-3",
        md: "h-5 px-2 st-label-sm-medium [&_svg]:size-3",
        lg: "h-6 px-2 st-label-sm-medium [&_svg:not([class*='size-'])]:size-4",
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
