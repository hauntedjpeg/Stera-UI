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
        // Group hooks
        "peer group/switch",
        // Base
        "relative inline-flex shrink-0 items-center rounded-full border-2 border-transparent shadow-xs transition-all outline-none after:absolute after:-inset-x-3 after:-inset-y-2",
        // Focus
        "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring",
        // Invalid
        "data-invalid:border-border-danger-strong data-invalid:ring-3 data-invalid:ring-ring-danger",
        // State
        "data-checked:bg-surface-brand data-unchecked:bg-surface-muted data-disabled:cursor-not-allowed",
        // Size
        "data-[size=sm]:h-4 data-[size=sm]:w-6",
        "data-[size=md]:h-4 data-[size=md]:w-8",
        "data-[size=lg]:h-7 data-[size=lg]:w-16",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          // Base
          "pointer-events-none block rounded-full bg-surface ring-0 transition-transform",
          // Disabled
          "data-disabled:bg-text-disabled",
          // Size — sm
          "group-data-[size=sm]/switch:size-3 group-data-[size=sm]/switch:data-unchecked:translate-x-0 group-data-[size=sm]/switch:data-checked:translate-x-2",
          // Size — md
          "group-data-[size=md]/switch:w-4.5 group-data-[size=md]/switch:h-3 group-data-[size=md]/switch:data-unchecked:translate-x-0 group-data-[size=md]/switch:data-checked:translate-x-2.5",
          // Size — lg
          "group-data-[size=lg]/switch:w-9.5 group-data-[size=lg]/switch:h-6  group-data-[size=lg]/switch:data-unchecked:translate-x-0 group-data-[size=lg]/switch:data-checked:translate-x-5.5"
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
