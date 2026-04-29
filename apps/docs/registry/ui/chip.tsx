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
    "whitespace-nowrap st-body-md-strong",
    // Focus
    "focus-visible:border-border-strongest focus-visible:ring-3 focus-visible:ring-ring",
    // Disabled
    "disabled:pointer-events-none disabled:opacity-50",
    // Icons
    "gap-1 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    // Other
    "overflow-hidden",
  ],
  {
    variants: {
      variant: {
        subtle:
          "bg-surface-tertiary text-text hover:bg-surface-tertiary-hover data-[active]:bg-surface-tertiary data-[active]:border-[1.5px] data-[active]:border-border-strongest",
        outline:
          "bg-surface text-text border-border hover:bg-surface-hover data-[active]:bg-surface-secondary data-[active]:border-[1.5px] data-[active]:border-border-strongest",
        solid:
          "bg-surface-inverse text-text-oninverse hover:bg-surface-inverse-hover data-[active]:border-[1.5px] data-[active]:border-border-strong",
      },
      size: {
        xs:
          "px-2 h-6 has-data-[icon=inline-end]:pr-1 has-data-[icon=inline-start]:pl-1",
        sm:
          "px-3 h-8 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        md:
          "px-3.5 h-9 has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5",
        lg:
          "px-4 h-10 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
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
