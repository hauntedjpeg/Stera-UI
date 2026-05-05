import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion"

import { cn } from "@/lib/utils"
import {
  SiChevronDown,
  SiChevronUp
} from "stera-icons"

function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn(
        // Base
        "flex flex-col",
        // Sizing
        "w-full",
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
          // Base
          "relative flex flex-1 items-start gap-3 p-3 text-left st-body-md-strong outline-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
          // Focus
          "focus-visible:border-border focus-visible:ring-3 focus-visible:ring-ring",
          // States
          "transition-all aria-disabled:pointer-events-none aria-disabled:opacity-50",
          className
        )}
        {...props}
      >
        {children}
        <SiChevronDown data-slot="accordion-trigger-icon" className="pointer-events-none shrink-0 group-aria-expanded/accordion-trigger:hidden ml-auto" />
        <SiChevronUp data-slot="accordion-trigger-icon" className="pointer-events-none hidden shrink-0 group-aria-expanded/accordion-trigger:inline ml-auto" />
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
      className="overflow-hidden data-open:animate-accordion-down data-closed:animate-accordion-up"
      {...props}
    >
      {/* className is forwarded to the inner box, not the Panel, so consumer styles don't fight the height animation. */}
      <div
        className={cn(
          // Base
          "pt-0 pb-3 pl-3 pr-4 st-body-md text-text-subtle",
          // Sizing
          "h-(--accordion-panel-height)",
          // Other
          "data-ending-style:h-0 data-starting-style:h-0 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-text [&_p:not(:last-child)]:mb-4",
          className
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Panel>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
