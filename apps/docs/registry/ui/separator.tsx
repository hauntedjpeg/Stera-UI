import { Separator as SeparatorPrimitive } from "@base-ui/react/separator"

import { cn } from "@/lib/utils"

function Separator({ className, ...props }: SeparatorPrimitive.Props) {
  return (
    <SeparatorPrimitive
      data-slot="separator"
      className={cn(
        // Base
        "shrink-0 bg-border",
        // Forced colors force background-color, which would erase the line
        "forced-colors:bg-[CanvasText]! forced-colors:forced-color-adjust-none",
        // Horizontal
        "data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full",
        // Vertical
        "data-[orientation=vertical]:w-px data-[orientation=vertical]:self-stretch",
        className
      )}
      {...props}
    />
  )
}

export { Separator }
