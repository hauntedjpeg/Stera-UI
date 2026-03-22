import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const chipVariants = cva(
  [
    // Group
    "group/chip",
    // Base
    "inline-flex shrink-0 items-center justify-center rounded-full border border-transparent transition-all outline-none select-none",
    // Text
    "whitespace-nowrap arc-text-body-md-strong",
    // Focus
    "focus-visible:border-border-tertiary focus-visible:ring-3 focus-visible:ring-ring",
    // Disabled
    "disabled:pointer-events-none disabled:opacity-50",
    // Icons
    "gap-0.5 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    // Other
    "overflow-hidden",
  ],
  {
    variants: {
      variant: {
        subtle:
          "bg-bg-surface-tertiary text-text hover:bg-bg-surface-tertiary-hover data-[active]:bg-bg-surface-tertiary data-[active]:border-[1.5px] data-[active]:border-border-tertiary",
        outline:
          "bg-bg-surface text-text border-border hover:bg-bg-surface-hover data-[active]:bg-bg-surface-secondary data-[active]:border-[1.5px] data-[active]:border-border-tertiary",
        solid:
          "bg-bg-surface-inverse text-text-oninverse data-[active]:border-[1.5px] data-[active]:border-border-secondary",
      },
      size: {
        xs:
          "p-1 has-data-[icon=inline-end]:pr-0.5 has-data-[icon=inline-start]:pl-0.5",
        sm:
          "p-2 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5",
        md:
          "px-3 py-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        lg:
          "p-3 has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5",
      },
    },
    defaultVariants: {
      variant: "subtle",
      size: "xs",
    },
  }
)

function Chip({
  className,
  variant = "subtle",
  size = "xs",
  active,
  ...props
}: ButtonPrimitive.Props &
  VariantProps<typeof chipVariants> & {
    active?: boolean
  }) {
  return (
    <ButtonPrimitive
      data-slot="chip"
      data-variant={variant}
      data-active={active || undefined}
      className={cn(chipVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Chip, chipVariants }
