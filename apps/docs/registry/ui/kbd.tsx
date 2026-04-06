import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const kbdVariants = cva(
  [
    // Base
    "inline-flex items-center justify-center rounded-md bg-bg-surface-tertiary px-1 w-fit gap-1",
    // Variants
    "in-data-[slot=tooltip-content]:bg-bg-surface-tertiary in-data-[slot=tooltip-content]:text-text",
    // Other
    "pointer-events-none font-sans text-xs/4 text-text-secondary select-none",
  ],
  {
    variants: {
      size: {
        sm: "h-4 min-w-4 px-0.5 rounded-sm [&_svg:not([class*='size-'])]:size-2.5",
        md: "h-5 min-w-5 [&_svg:not([class*='size-'])]:size-3",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

function Kbd({
  className,
  size = "md",
  ...props
}: React.ComponentProps<"kbd"> & VariantProps<typeof kbdVariants>) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(kbdVariants({ size }), className)}
      {...props}
    />
  )
}

function KbdGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <kbd
      data-slot="kbd-group"
      className={cn(
        // Base
        "inline-flex items-center",
        // Sizing
        "gap-1",
        className,
      )}
      {...props}
    />
  )
}

export { Kbd, KbdGroup, kbdVariants }
