import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const iconTileVariants = cva(
  [
    // Group
    "group/icon-tile",
    // Base
    "inline-flex items-center justify-center forced-stroke",
    // Sizing
    "shrink-0",
    // Other
    "select-none [&_svg]:pointer-events-none [&_svg]:shrink-0",
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
        xs: "size-4 rounded-sm [&_svg:not([class*='size-'])]:size-3",
        sm: "size-6 rounded-lg [&_svg:not([class*='size-'])]:size-4",
        md: "size-8 rounded-lg [&_svg:not([class*='size-'])]:size-5",
        lg: "size-10 rounded-lg [&_svg:not([class*='size-'])]:size-6",
      },
      shape: {
        square: "",
        circle: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "lg",
      shape: "square",
    },
  }
)

function IconTile({
  className,
  variant = "default",
  size = "lg",
  shape = "square",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof iconTileVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(iconTileVariants({ variant, size, shape }), className),
      },
      props
    ),
    render,
    state: {
      slot: "icon-tile",
      variant,
      size,
      shape,
    },
  })
}

export { IconTile, iconTileVariants }
