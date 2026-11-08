import { Switch as SwitchPrimitive } from "@base-ui/react/switch"

import { cn } from "@/lib/utils"

function Switch({
  className,
  size = "md",
  ...props
}: SwitchPrimitive.Root.Props & {
  size?: "sm" | "md" | "lg"
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        // Base
        "relative inline-flex h-(--switch-h) w-(--switch-w) shrink-0 items-center rounded-full border-2 border-transparent outline-none",
        "transition-[background-color,border-color,box-shadow,opacity] duration-120 ease-out",
        // Size — track width, track height, thumb width
        "data-[size=sm]:[--switch-h:--spacing(4)] data-[size=sm]:[--switch-w:--spacing(6)] data-[size=sm]:[--thumb-w:--spacing(3)]",
        "data-[size=md]:[--switch-h:--spacing(4)] data-[size=md]:[--switch-w:--spacing(8)] data-[size=md]:[--thumb-w:--spacing(4.5)]",
        "data-[size=lg]:[--switch-h:--spacing(7)] data-[size=lg]:[--switch-w:--spacing(16)] data-[size=lg]:[--thumb-w:--spacing(9.5)]",
        // Hit area
        "after:absolute after:-inset-x-3 after:-inset-y-2",
        // State
        "data-checked:bg-surface-brand data-unchecked:bg-surface-muted",
        // Focus
        "focus-visible:border-border-brand focus-visible:ring-3 focus-visible:ring-ring-brand",
        // Invalid
        "data-invalid:border-border-danger data-invalid:ring-3 data-invalid:ring-ring-danger",
        // Disabled / Read-only
        "data-disabled:cursor-not-allowed data-disabled:opacity-50 data-readonly:cursor-default",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          // Base
          "pointer-events-none block h-full w-(--thumb-w) rounded-full bg-surface",
          "transition-transform duration-120 ease-out motion-reduce:transition-none",
          // Checked — travel the track's inner width (2px border each side)
          "data-checked:translate-x-[calc(var(--switch-w)-var(--thumb-w)-4px)]"
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
