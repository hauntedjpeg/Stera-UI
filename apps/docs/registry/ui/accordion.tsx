import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion"

import { cn } from "@/lib/utils"
import { SiChevronDown, SiChevronUp } from "stera-icons"

function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn(
        // Layout
        "flex flex-col",
        // Box
        "w-full gap-2",
        className
      )}
      {...props}
    />
  )
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("bg-transparent", className)}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: AccordionPrimitive.Trigger.Props) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          // Group
          "group/accordion-trigger",
          // Layout
          "relative flex flex-1 items-start",
          // Box
          "gap-3 p-3",
          // Typography
          "text-left st-body-md-strong",
          // Surface
          "bg-surface-secondary rounded-xl",
          // Child selectors
          "[&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
          // Transition
          "transition-all",
          // Hover
          "hover:bg-surface-secondary-hover",
          // Focus
          "outline-none focus-visible:border-border focus-visible:ring-3 focus-visible:ring-ring",
          // Disabled
          "aria-disabled:pointer-events-none aria-disabled:opacity-50",
          className
        )}
        {...props}
      >
        {children}
        <SiChevronDown
          data-slot="accordion-trigger-icon"
          className={cn(
            // Layout
            "ml-auto",
            // Box
            "shrink-0",
            // Interaction
            "pointer-events-none",
            // Visibility — shown by default, hidden when trigger is expanded
            "group-aria-expanded/accordion-trigger:hidden"
          )}
        />
        <SiChevronUp
          data-slot="accordion-trigger-icon"
          className={cn(
            // Layout
            "ml-auto",
            // Box
            "shrink-0",
            // Interaction
            "pointer-events-none",
            // Visibility — hidden by default, shown when trigger is expanded
            "hidden group-aria-expanded/accordion-trigger:inline"
          )}
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className={cn(
        // Box — Base UI populates --accordion-panel-height with the measured panel height while open
        "h-(--accordion-panel-height) overflow-hidden",
        // Transition
        "transition-[height] duration-200 ease-out",
        // Data state — Base UI sets these on enter/exit so the transition has a 0 end-point
        "data-starting-style:h-0 data-ending-style:h-0"
      )}
      {...props}
    >
      <div
        className={cn(
          // Box
          "p-3",
          // Typography
          "st-body-md text-text-subtle",
          // Child selectors
          "[&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-text [&_p:not(:last-child)]:mb-4",
          className
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Panel>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
