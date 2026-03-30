import { Tabs as TabsPrimitive } from "@base-ui/react/tabs"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

function Tabs({
  className,
  orientation = "horizontal",
  ...props
}: TabsPrimitive.Root.Props) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      className={cn(
        // Base
        "flex",
        // Sizing
        "gap-2",
        // Other
        "group/tabs data-[orientation=horizontal]:flex-col",
        className
      )}
      {...props}
    />
  )
}

const tabsListVariants = cva(
  [
    // Base
    "inline-flex rounded-xl p-0.5 items-center justify-center arc-text-body-md-strong text-text-secondary group-data-[orientation=vertical]/tabs:flex-col",
    // Sizing
    "w-fit group-data-[orientation=vertical]/tabs:h-fit",
    // Variants
    "data-[variant=line]:rounded-none",
    // Other
    "group/tabs-list",
  ],
  {
    variants: {
      variant: {
        default: "bg-bg-surface-secondary",
        line: "gap-1 bg-transparent",
      },
      size: {
        sm: "group-data-[orientation=horizontal]/tabs:h-8",
        md: "group-data-[orientation=horizontal]/tabs:h-9",
        lg: "group-data-[orientation=horizontal]/tabs:h-10 group-data-[variant=line]/tabs:arc-text-body-lg-strong",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "sm",
    },
  }
)

function TabsList({
  className,
  variant = "default",
  size = "sm",
  ...props
}: TabsPrimitive.List.Props & VariantProps<typeof tabsListVariants>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      data-size={size}
      className={cn(tabsListVariants({ variant, size }), className)}
      {...props}
    />
  )
}

function TabsTrigger({ className, ...props }: TabsPrimitive.Tab.Props) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(
        // Base
        "relative inline-flex border border-transparent whitespace-nowrap text-text-secondary items-center justify-center group-data-[orientation=vertical]/tabs:justify-start transition-all after:content-[''] after:bg-text after:opacity-0",
        // Position
        "after:absolute group-data-[orientation=horizontal]/tabs:after:inset-x-0 group-data-[orientation=horizontal]/tabs:after:bottom-[-5px] group-data-[orientation=vertical]/tabs:after:inset-y-0 group-data-[orientation=vertical]/tabs:after:-right-1",
        // Sizing
        "h-[calc(100%-1px)] flex-1 group-data-[orientation=vertical]/tabs:w-full group-data-[orientation=horizontal]/tabs:after:h-0.5 group-data-[orientation=vertical]/tabs:after:w-0.5",
        // SM (Default)
        "group-data-[size=sm]/tabs-list:px-2.5 group-data-[size=sm]/tabs-list:py-1.5 group-data-[size=sm]/tabs-list:gap-1.5 rounded-[10px]  group-data-[size=sm]/tabs-list:[&_svg:not([class*='size-'])]:size-4",
        // MD
        "group-data-[size=md]/tabs-list:px-3 group-data-[size=md]/tabs-list:py-1.5 group-data-[size=md]/tabs-list:gap-2 group-data-[size=md]/tabs-list:arc-text-body-md-strong group-data-[size=md]/tabs-list:[&_svg:not([class*='size-'])]:size-4",
        // LG
        "group-data-[size=lg]/tabs-list:px-4 group-data-[size=lg]/tabs-list:py-2 group-data-[size=lg]/tabs-list:gap-2 group-data-[size=lg]/tabs-list:[&_svg:not([class*='size-'])]:size-4",
        // Animation
        "data-active:bg-bg-surface data-active:text-text",
        // Variants
        "group-data-[variant=default]/tabs-list:data-active:shadow-sm group-data-[variant=line]/tabs-list:data-active:shadow-none group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-active:bg-transparent group-data-[variant=line]/tabs-list:data-active:after:opacity-100",
        // Other
        "after:transition-opacity hover:text-text focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      className={cn(
        // Base
        "text-sm outline-none",
        // Sizing
        "flex-1",
        className
      )}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants }
