import * as React from "react"
import {
  DayPicker,
  getDefaultClassNames,
  type DayButton,
  type Locale,
} from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { SiChevronLeft, SiChevronRight, SiChevronDown } from "stera-icons"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  locale,
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"]
}) {
  const defaultClassNames = getDefaultClassNames()

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        // Base
        "bg-bg-surface p-3",
        // Other
        "group/calendar [--cell-radius:var(--radius-md)] [--cell-size:--spacing(8)] in-data-[slot=card-content]:bg-transparent in-data-[slot=popover-content]:bg-transparent",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className,
      )}
      captionLayout={captionLayout}
      locale={locale}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString(locale?.code, { month: "short" }),
        ...formatters,
      }}
      classNames={{
        root: cn(
          // Sizing
          "w-fit",
          defaultClassNames.root,
        ),
        months: cn(
          // Base
          "flex flex-col",
          // Position
          "relative",
          // Sizing
          "gap-4",
          // Other
          "md:flex-row",
          defaultClassNames.months,
        ),
        month: cn(
          // Base
          "flex flex-col",
          // Sizing
          "w-full gap-4",
          defaultClassNames.month,
        ),
        nav: cn(
          // Base
          "flex items-center justify-between",
          // Position
          "absolute inset-x-0 top-0",
          // Sizing
          "w-full gap-1",
          defaultClassNames.nav,
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          // Base
          "p-0",
          // Sizing
          "size-(--cell-size)",
          // Other
          "select-none aria-disabled:opacity-50",
          defaultClassNames.button_previous,
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          // Base
          "p-0",
          // Sizing
          "size-(--cell-size)",
          // Other
          "select-none aria-disabled:opacity-50",
          defaultClassNames.button_next,
        ),
        month_caption: cn(
          // Base
          "flex items-center arc-text-body-sm-strong justify-center px-(--cell-size)",
          // Sizing
          "h-(--cell-size) w-full",
          defaultClassNames.month_caption,
        ),
        dropdowns: cn(
          // Base
          "flex items-center justify-center arc-text-body-md-compact font-medium",
          // Sizing
          "h-(--cell-size) w-full gap-1.5",
          defaultClassNames.dropdowns,
        ),
        dropdown_root: cn(
          buttonVariants({ variant: "outline", size: "sm" }),
          // Position
          "relative pr-2",
          defaultClassNames.dropdown_root,
        ),
        dropdown: cn(
          // Base
          "bg-bg-surface",
          // Position
          "absolute inset-0",
          // Other
          "opacity-0",
          defaultClassNames.dropdown,
        ),
        caption_label: cn(
          // Base
          "select-none",
          captionLayout === "label"
            ? ""
            : "flex items-center gap-1.5 pointer-events-none [&>svg]:size-4",
          defaultClassNames.caption_label
        ),
        table: "w-full border-collapse",
        weekdays: cn(
          // Base
          "flex",
          defaultClassNames.weekdays,
        ),
        weekday: cn(
          // Base
          "rounded-(--cell-radius)",
          // Sizing
          "flex-1",
          // Other
          "arc-text-body-md-strong text-text-secondary select-none",
          defaultClassNames.weekday,
        ),
        week: cn(
          // Base
          "flex",
          // Sizing
          "w-full",
          // Other
          "mt-2",
          defaultClassNames.week,
        ),
        week_number_header: cn(
          // Sizing
          "w-(--cell-size)",
          // Other
          "select-none",
          defaultClassNames.week_number_header,
        ),
        week_number: cn(
          // Other
          "arc-text-body-md-compact text-text-secondary select-none",
          defaultClassNames.week_number,
        ),
        day: cn(
          // Base
          "rounded-(--cell-radius) p-0",
          // Position
          "relative",
          // Sizing
          "aspect-square h-full w-full",
          // Animation
          "[&:last-child[data-selected=true]_button]:rounded-r-(--cell-radius)",
          // Other
          "group/day text-center select-none",
          props.showWeekNumber
            ? "[&:nth-child(2)[data-selected=true]_button]:rounded-l-(--cell-radius)"
            : "[&:first-child[data-selected=true]_button]:rounded-l-(--cell-radius)",
          defaultClassNames.day,
        ),
        range_start: cn(
          // Base
          "rounded-l-(--cell-radius) bg-bg-surface-tertiary",
          // Position
          "relative after:absolute after:inset-y-0 after:right-0",
          // Other
          "isolate z-0 after:w-4 after:bg-bg-surface-tertiary",
          defaultClassNames.range_start,
        ),
        range_middle: cn(
          // Base
          "rounded-none",
          defaultClassNames.range_middle,
        ),
        range_end: cn(
          // Base
          "rounded-r-(--cell-radius) bg-bg-surface-tertiary",
          // Position
          "relative after:absolute after:inset-y-0 after:left-0",
          // Other
          "isolate z-0 after:w-4 after:bg-bg-surface-tertiary",
          defaultClassNames.range_end,
        ),
        today: cn(
          // Base
          "rounded-(--cell-radius) bg-bg-brand-tertiary text-text-brand",
          defaultClassNames.today,
        ),
        outside: cn(
          // Other
          "text-text-tertiary aria-selected:text-text-tertiary",
          defaultClassNames.outside,
        ),
        disabled: cn(
          // Other
          "text-text-tertiary",
          defaultClassNames.disabled,
        ),
        hidden: cn(
          // Other
          "invisible",
          defaultClassNames.hidden,
        ),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef}
              className={cn(className)}
              {...props}
            />
          )
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left") {
            return (
              <SiChevronLeft
                className={cn(
                  // Sizing
                  "size-4",
                  className,
                )}
                {...props}
              />
            )
          }

          if (orientation === "right") {
            return (
              <SiChevronRight
                className={cn(
                  // Sizing
                  "size-4",
                  className,
                )}
                {...props}
              />
            )
          }

          return (
            <SiChevronDown
                className={cn(
                  // Sizing
                  "size-4",
                  className,
                )}
                {...props}
              />
          )
        },
        DayButton: ({ ...props }) => (
          <CalendarDayButton locale={locale} {...props} />
        ),
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex size-(--cell-size) items-center justify-center text-center">
                {children}
              </div>
            </td>
          )
        },
        ...components,
      }}
      {...props}
    />
  )
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  locale,
  ...props
}: React.ComponentProps<typeof DayButton> & { locale?: Partial<Locale> }) {
  const defaultClassNames = getDefaultClassNames()

  const ref = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  return (
    <Button
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString(locale?.code)}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        // Base
        "flex flex-col border-0 arc-text-body-md-compact rounded-xl",
        // Position
        "relative",
        // Sizing
        "aspect-square size-auto w-full min-w-(--cell-size) gap-1",
        // Focus
        "group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10",
        // Range End
        "data-[range-end=true]:rounded-(--cell-radius) data-[range-end=true]:rounded-r-(--cell-radius) data-[range-end=true]:bg-bg-brand data-[range-end=true]:text-text-onbrand data-[range-end=true]:[&>span]:text-text-onbrand-secondary",
        // Range Middle
        "data-[range-middle=true]:rounded-none data-[range-middle=true]:bg-bg-surface-tertiary data-[range-middle=true]:text-text",
        // Range Start
        "data-[range-start=true]:rounded-(--cell-radius) data-[range-start=true]:rounded-l-(--cell-radius) data-[range-start=true]:bg-bg-brand data-[range-start=true]:text-text-onbrand data-[range-start=true]:[&>span]:text-text-onbrand-secondary",
        // Selected
        "data-[selected-single=true]:bg-bg-brand data-[selected-single=true]:text-text-onbrand",
        // Other
        "isolate z-10 dark:hover:text-text [&>span]:arc-text-body-sm [&>span]:text-text-tertiary data-[selected-single=true]:[&>span]:text-text-onbrand-secondary",
        defaultClassNames.day,
        className,
      )}
      {...props}
    />
  )
}

export { Calendar, CalendarDayButton }
