"use client"

import * as React from "react"
import {
  DayPicker,
  defaultDateLib,
  type ChevronProps,
  type ClassNames,
  type DayButtonProps,
} from "react-day-picker"
import { SiChevronDown, SiChevronLeft, SiChevronRight } from "stera-icons"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"

type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  /** Variant of the previous and next month buttons. */
  buttonVariant?: React.ComponentProps<typeof Button>["variant"]
}

// The cell behind a selected range. Rounds at the range's ends and wherever
// a week row starts or ends.
const rangeTrack =
  "bg-surface-muted first-of-type:rounded-l-(--cell-radius) last-of-type:rounded-r-(--cell-radius)"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  formatters,
  components,
  ...props
}: CalendarProps) {
  const navButton = cn(
    buttonVariants({ variant: buttonVariant, size: "icon" }),
    "size-(--cell-size) aria-disabled:pointer-events-none aria-disabled:opacity-50"
  )

  const baseClassNames: Partial<ClassNames> = {
    root: "w-fit",
    months: "relative flex flex-col gap-4 md:flex-row",
    month: "flex w-full flex-col gap-4",
    nav: "absolute inset-x-0 top-0 flex items-center justify-between gap-1",
    button_previous: navButton,
    button_next: navButton,
    month_caption:
      "flex h-(--cell-size) w-full items-center justify-center px-(--cell-size) st-label-sm-medium",
    dropdowns:
      "flex h-(--cell-size) w-full items-center justify-center gap-1.5 st-label-sm-medium",
    dropdown_root: cn(
      buttonVariants({ variant: "outline", size: "sm" }),
      "relative pr-2 has-focus-visible:inset-ring-[1.5px] has-focus-visible:inset-ring-border-brand-bold"
    ),
    dropdown: "absolute inset-0 bg-surface opacity-0",
    caption_label: cn(
      "select-none",
      captionLayout !== "label" &&
        "pointer-events-none flex items-center gap-1.5"
    ),
    weekdays: "flex",
    weekday:
      "min-w-(--cell-size) flex-1 st-label-md-medium text-ink-subtler select-none",
    week: "mt-2 flex w-full",
    week_number_header: "w-(--cell-size) select-none",
    week_number:
      "flex w-(--cell-size) items-center justify-center st-label-md text-ink-subtler select-none",
    day: "aspect-square min-w-(--cell-size) flex-1 select-none",
    range_start: cn(rangeTrack, "rounded-l-(--cell-radius)"),
    range_middle: rangeTrack,
    range_end: cn(rangeTrack, "rounded-r-(--cell-radius)"),
    hidden: "invisible",
  }

  // Merge per slot, so `classNames={{ day: "…" }}` adds to the Stera styles
  // instead of replacing them.
  const mergedClassNames = { ...baseClassNames }
  for (const [key, value] of Object.entries(classNames ?? {})) {
    const slot = key as keyof ClassNames
    mergedClassNames[slot] = cn(mergedClassNames[slot], value)
  }

  return (
    <DayPicker
      data-slot="calendar"
      showOutsideDays={showOutsideDays}
      captionLayout={captionLayout}
      className={cn(
        "bg-surface p-3 [--cell-radius:var(--radius-md)] [--cell-size:--spacing(8)] in-data-[slot=card-content]:bg-transparent in-data-[slot=popover-content]:bg-transparent",
        className
      )}
      classNames={mergedClassNames}
      formatters={{
        formatMonthDropdown: (month, dateLib = defaultDateLib) =>
          dateLib.format(month, "LLL"),
        ...formatters,
      }}
      components={{
        Chevron: CalendarChevron,
        DayButton: CalendarDayButton,
        ...components,
      }}
      {...props}
    />
  )
}

function CalendarChevron({ className, orientation }: ChevronProps) {
  if (orientation === "left" || orientation === "right") {
    const Icon = orientation === "left" ? SiChevronLeft : SiChevronRight
    // DayPicker's default nav doesn't swap the chevrons for right-to-left
    return <Icon className={cn("size-4 rtl:rotate-180", className)} />
  }
  return (
    <SiChevronDown
      className={cn("size-4", orientation === "up" && "rotate-180", className)}
    />
  )
}

function CalendarDayButton({
  className,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- keeps it off the DOM
  day,
  modifiers,
  ...props
}: DayButtonProps) {
  const ref = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  // A single selected date, or either end of a range
  const isEndpoint = modifiers.selected && !modifiers.range_middle

  return (
    <Button
      ref={ref}
      variant={isEndpoint ? "brand" : "ghost"}
      size="icon"
      className={cn(
        "relative size-full rounded-(--cell-radius) st-label-md focus-visible:z-10 aria-disabled:opacity-50",
        modifiers.today &&
          !modifiers.selected &&
          "bg-surface-brand-subtle text-ink-brand hover:bg-surface-brand-subtle-hover active:bg-surface-brand-subtle-pressed",
        modifiers.outside && !isEndpoint && "text-ink-subtlest",
        modifiers.range_middle &&
          "hover:bg-surface-muted-hover active:bg-surface-muted-pressed",
        className
      )}
      {...props}
    />
  )
}

export { Calendar, CalendarDayButton, type CalendarProps }
