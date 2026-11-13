import { Toggle as TogglePrimitive } from "@base-ui/react/toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const defaults = { variant: "outline", size: "md" } as const

const toggleVariants = cva(
  [
    // Group — lets children style themselves with group-data-pressed/toggle
    "group/toggle",
    // Base
    "inline-flex shrink-0 items-center justify-center rounded-xl text-ink transition outline-none select-none",
    // Text
    "st-label-md-medium whitespace-nowrap",
    // Focus — halo only; the outline variant recolors its own stroke
    "forced-focus focus-visible:ring-3 focus-visible:ring-ring",
    // Disabled
    "data-disabled:pointer-events-none data-disabled:opacity-50",
    // Other
    "forced-stroke [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ],
  {
    variants: {
      variant: {
        ghost: [
          "hover:bg-surface-hover active:bg-surface-pressed",
          "data-pressed:bg-surface-muted data-pressed:hover:bg-surface-muted-hover data-pressed:active:bg-surface-muted-pressed",
        ],
        outline: [
          "bg-surface inset-ring inset-ring-border focus-visible:inset-ring-border-bold",
          "hover:bg-surface-hover active:bg-surface-pressed",
          "data-pressed:bg-surface-muted data-pressed:hover:bg-surface-muted-hover data-pressed:active:bg-surface-muted-pressed",
        ],
      },
      size: {
        xs: "h-6 gap-1.5 rounded-lg px-2 st-label-sm-medium has-data-[icon=inline-end]:pr-1 has-data-[icon=inline-start]:pl-1 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-2 px-3 st-label-sm-medium has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        md: "h-9 gap-2 px-3 has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5",
        lg: "h-11 gap-2 px-5 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        icon: "size-9",
        "icon-xs": "size-6 rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-11 [&_svg:not([class*='size-'])]:size-5",
      },
    },
    defaultVariants: defaults,
  }
)

function Toggle({
  className,
  variant = defaults.variant,
  size = defaults.size,
  ...props
}: TogglePrimitive.Props & VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive
      className={cn(toggleVariants({ variant, size, className }))}
      data-slot="toggle"
      data-variant={variant}
      data-size={size}
      {...props}
    />
  )
}

export { Toggle, toggleVariants }
