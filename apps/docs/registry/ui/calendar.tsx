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

  const navButtonClass = cn(
    buttonVariants({ variant: buttonVariant }),
    "size-(--cell-size) p-0 select-none aria-disabled:opacity-50",
  )

  const rangeEdgeClass =
    "relative isolate z-0 bg-surface-tertiary after:absolute after:inset-y-0 after:w-4 after:bg-surface-tertiary"

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "bg-surface p-3 group/calendar [--cell-radius:var(--radius-md)] [--cell-size:--spacing(8)] in-data-[slot=card-content]:bg-transparent in-data-[slot=popover-content]:bg-transparent",
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
        root: cn("w-fit", defaultClassNames.root),
        months: cn("relative flex flex-col gap-4 md:flex-row", defaultClassNames.months),
        month: cn("flex w-full flex-col gap-4", defaultClassNames.month),
        nav: cn(
          "absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1",
          defaultClassNames.nav,
        ),
        button_previous: cn(navButtonClass, defaultClassNames.button_previous),
        button_next: cn(navButtonClass, defaultClassNames.button_next),
        month_caption: cn(
          "flex h-(--cell-size) w-full items-center justify-center px-(--cell-size) st-body-sm-strong",
          defaultClassNames.month_caption,
        ),
        dropdowns: cn(
          "flex h-(--cell-size) w-full items-center justify-center gap-1.5 st-body-md-compact font-medium",
          defaultClassNames.dropdowns,
        ),
        dropdown_root: cn(
          buttonVariants({ variant: "outline", size: "sm" }),
          "relative pr-2",
          defaultClassNames.dropdown_root,
        ),
        dropdown: cn(
          "absolute inset-0 bg-surface opacity-0",
          defaultClassNames.dropdown,
        ),
        caption_label: cn(
          "select-none",
          captionLayout === "label"
            ? ""
            : "flex items-center gap-1.5 pointer-events-none [&>svg]:size-4",
          defaultClassNames.caption_label,
        ),
        table: "w-full border-collapse",
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn(
          "flex-1 min-w-(--cell-size) rounded-(--cell-radius) st-body-md-strong text-text-subtle select-none",
          defaultClassNames.weekday,
        ),
        week: cn("mt-2 flex w-full", defaultClassNames.week),
        week_number_header: cn(
          "w-(--cell-size) select-none",
          defaultClassNames.week_number_header,
        ),
        week_number: cn(
          "st-body-md-compact text-text-subtle select-none",
          defaultClassNames.week_number,
        ),
        day: cn(
          "group/day relative flex-1 aspect-square min-w-(--cell-size) rounded-(--cell-radius) p-0 text-center select-none",
          "[&:last-child[data-selected=true]_button]:rounded-r-(--cell-radius)",
          // Week-number column shifts the first day cell to nth-child(2)
          props.showWeekNumber
            ? "[&:nth-child(2)[data-selected=true]_button]:rounded-l-(--cell-radius)"
            : "[&:first-child[data-selected=true]_button]:rounded-l-(--cell-radius)",
          defaultClassNames.day,
        ),
        range_start: cn(
          rangeEdgeClass,
          "rounded-l-(--cell-radius) after:right-0",
          defaultClassNames.range_start,
        ),
        range_middle: cn("rounded-none", defaultClassNames.range_middle),
        range_end: cn(
          rangeEdgeClass,
          "rounded-r-(--cell-radius) after:left-0",
          defaultClassNames.range_end,
        ),
        today: cn(
          "rounded-(--cell-radius) bg-surface-brand-subtle text-text-brand",
          defaultClassNames.today,
        ),
        outside: cn(
          "text-text-subtlest aria-selected:text-text-subtlest",
          defaultClassNames.outside,
        ),
        disabled: cn("text-text-subtlest", defaultClassNames.disabled),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => (
          <div
            data-slot="calendar"
            ref={rootRef}
            className={cn(className)}
            {...props}
          />
        ),
        Chevron: ({ className, orientation, ...props }) => {
          const Icon =
            orientation === "left"
              ? SiChevronLeft
              : orientation === "right"
                ? SiChevronRight
                : SiChevronDown
          return <Icon className={cn("size-4", className)} {...props} />
        },
        DayButton: ({ ...props }) => (
          <CalendarDayButton locale={locale} {...props} />
        ),
        WeekNumber: ({ children, ...props }) => (
          <td {...props}>
            <div className="flex size-(--cell-size) items-center justify-center text-center">
              {children}
            </div>
          </td>
        ),
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
        "relative isolate z-10 flex size-full flex-col items-center justify-center gap-1 border-0 p-0 rounded-(--cell-radius) st-body-md-compact",
        "group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10",
        "[&>span]:st-body-sm [&>span]:text-text-subtlest",
        // Single selection
        "data-[selected-single=true]:bg-surface-brand data-[selected-single=true]:hover:bg-surface-brand-strong! data-[selected-single=true]:text-text-onbrand data-[selected-single=true]:hover:text-text-onbrand! data-[selected-single=true]:[&>span]:text-text-onbrand-subtle",
        // Range middle
        "data-[range-middle=true]:rounded-none data-[range-middle=true]:bg-surface-tertiary data-[range-middle=true]:text-text",
        // Range endpoints (start/end share everything except which side rounds)
        "data-[range-start=true]:bg-surface-brand data-[range-end=true]:bg-surface-brand",
        "data-[range-start=true]:hover:bg-surface-brand-strong! data-[range-end=true]:hover:bg-surface-brand-strong!",
        "data-[range-start=true]:text-text-onbrand data-[range-end=true]:text-text-onbrand",
        "data-[range-start=true]:hover:text-text-onbrand! data-[range-end=true]:hover:text-text-onbrand!",
        "data-[range-start=true]:[&>span]:text-text-onbrand-subtle data-[range-end=true]:[&>span]:text-text-onbrand-subtle",
        "data-[range-start=true]:rounded-l-(--cell-radius) data-[range-end=true]:rounded-r-(--cell-radius)",
        defaultClassNames.day_button,
        className,
      )}
      {...props}
    />
  )
}

export { Calendar, CalendarDayButton }
