"use client"

import * as React from "react"
import {
  DateLib,
  defaultDateLib,
  type DateRange,
  type DayPickerLocale,
  type PropsBase,
} from "react-day-picker"
import { SiCalendar } from "stera-icons"

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type DatePickerValue = Date | DateRange | undefined

type DatePickerContextValue = {
  mode: "single" | "range"
  value: DatePickerValue
  select: (value: DatePickerValue) => void
  disabled: boolean
  locale: DayPickerLocale | undefined
  dateLib: DateLib
}

const DatePickerContext = React.createContext<DatePickerContextValue | null>(
  null
)

function useDatePicker() {
  const context = React.useContext(DatePickerContext)
  if (!context) {
    throw new Error("DatePicker parts must be used within a <DatePicker>.")
  }
  return context
}

type DatePickerSharedProps = {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  disabled?: boolean
  /** A react-day-picker locale, used by the calendar and the trigger's text. */
  locale?: DayPickerLocale
  children?: React.ReactNode
}

type DatePickerProps =
  | (DatePickerSharedProps & {
      mode?: "single"
      value?: Date | undefined
      defaultValue?: Date
      onValueChange?: (value: Date | undefined) => void
    })
  | (DatePickerSharedProps & {
      mode: "range"
      value?: DateRange | undefined
      defaultValue?: DateRange
      onValueChange?: (value: DateRange | undefined) => void
    })

function DatePicker(props: DatePickerProps) {
  const {
    mode = "single",
    open: openProp,
    defaultOpen = false,
    onOpenChange,
    disabled = false,
    locale,
    children,
  } = props

  const isControlled = "value" in props
  const [uncontrolledValue, setUncontrolledValue] =
    React.useState<DatePickerValue>(props.defaultValue)
  const value = isControlled ? props.value : uncontrolledValue

  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
  const open = openProp ?? uncontrolledOpen

  // Picks since the popover opened. A range closes after its second pick.
  const picks = React.useRef(0)

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (next) picks.current = 0
      setUncontrolledOpen(next)
      onOpenChange?.(next)
    },
    [onOpenChange]
  )

  const onValueChange = props.onValueChange as
    | ((value: DatePickerValue) => void)
    | undefined

  const select = React.useCallback(
    (next: DatePickerValue) => {
      if (!isControlled) setUncontrolledValue(next)
      onValueChange?.(next)
      picks.current += 1
      if (mode === "single" || picks.current >= 2) setOpen(false)
    },
    [isControlled, onValueChange, mode, setOpen]
  )

  const dateLib = React.useMemo(
    () => (locale ? new DateLib({ locale }) : defaultDateLib),
    [locale]
  )

  const context = React.useMemo(
    () => ({ mode, value, select, disabled, locale, dateLib }),
    [mode, value, select, disabled, locale, dateLib]
  )

  return (
    <DatePickerContext.Provider value={context}>
      <Popover open={open} onOpenChange={setOpen}>
        {children}
      </Popover>
    </DatePickerContext.Provider>
  )
}

function formatDatePickerValue(value: DatePickerValue, dateLib: DateLib) {
  if (!value) return null
  if (value instanceof Date) return dateLib.format(value, "PP")

  const { from, to } = value
  if (!from) return null
  if (!to) return `${dateLib.format(from, "PP")} –`
  if (dateLib.isSameDay(from, to)) return dateLib.format(from, "PP")
  if (dateLib.isSameYear(from, to)) {
    return `${dateLib.format(from, "MMM d")} – ${dateLib.format(to, "PP")}`
  }
  return `${dateLib.format(from, "PP")} – ${dateLib.format(to, "PP")}`
}

function DatePickerTrigger({
  className,
  size = "md",
  placeholder = "Pick a date",
  formatValue,
  ...props
}: Omit<React.ComponentProps<typeof PopoverTrigger>, "children"> & {
  size?: "sm" | "md" | "lg"
  placeholder?: string
  /** Replaces the default "Nov 17, 2026" formatting. */
  formatValue?: (value: Date | DateRange) => React.ReactNode
}) {
  const { value, disabled, dateLib } = useDatePicker()
  const text = value
    ? formatValue
      ? formatValue(value)
      : formatDatePickerValue(value, dateLib)
    : null
  const isEmpty = text === null || text === undefined

  return (
    <PopoverTrigger
      data-slot="date-picker-trigger"
      data-size={size}
      data-placeholder={isEmpty || undefined}
      disabled={disabled}
      className={cn(
        // Base
        "flex h-9 w-fit items-center gap-2 rounded-xl bg-surface py-2.5 pr-3 pl-2.5 st-label-md whitespace-nowrap text-ink inset-ring inset-ring-border forced-focus forced-stroke transition-[color,box-shadow] outline-none",
        // Focus
        "focus-visible:inset-ring-[1.5px] focus-visible:inset-ring-border-brand-bold",
        // Disabled
        "disabled:cursor-not-allowed disabled:opacity-50",
        // Invalid, on its own or inside an invalid Field
        "group-data-invalid/field:inset-ring-border-danger-bold aria-invalid:inset-ring-border-danger-bold",
        // Placeholder
        "data-placeholder:text-ink-subtlest",
        // SM
        "data-[size=sm]:h-8 data-[size=sm]:py-2 data-[size=sm]:pr-2.5 data-[size=sm]:pl-2",
        // LG
        "data-[size=lg]:h-11 data-[size=lg]:py-3.5 data-[size=lg]:pr-4 data-[size=lg]:pl-3.5",
        className
      )}
      {...props}
    >
      <SiCalendar
        aria-hidden
        className="pointer-events-none size-4 shrink-0 text-ink-subtler"
      />
      <span data-slot="date-picker-value" className="truncate">
        {isEmpty ? placeholder : text}
      </span>
    </PopoverTrigger>
  )
}

type DatePickerContentProps = Omit<
  PropsBase,
  "mode" | "required" | "className" | "locale"
> &
  Pick<
    React.ComponentProps<typeof PopoverContent>,
    "align" | "alignOffset" | "side" | "sideOffset" | "className"
  > & {
    buttonVariant?: React.ComponentProps<typeof Calendar>["buttonVariant"]
  }

function DatePickerContent({
  className,
  align = "start",
  alignOffset,
  side,
  sideOffset,
  defaultMonth,
  // Focus the selected day (or today) on open, not the month buttons
  autoFocus = true,
  ...calendarProps
}: DatePickerContentProps) {
  const { mode, value, select, locale } = useDatePicker()
  const month = value instanceof Date ? value : value?.from

  return (
    <PopoverContent
      align={align}
      alignOffset={alignOffset}
      side={side}
      sideOffset={sideOffset}
      className={cn("w-auto p-0", className)}
    >
      {mode === "range" ? (
        <Calendar
          {...calendarProps}
          mode="range"
          required
          resetOnSelect
          autoFocus={autoFocus}
          locale={locale}
          defaultMonth={defaultMonth ?? month}
          selected={value instanceof Date ? undefined : value}
          onSelect={select}
        />
      ) : (
        <Calendar
          {...calendarProps}
          mode="single"
          required
          autoFocus={autoFocus}
          locale={locale}
          defaultMonth={defaultMonth ?? month}
          selected={value instanceof Date ? value : undefined}
          onSelect={select}
        />
      )}
    </PopoverContent>
  )
}

export {
  DatePicker,
  DatePickerContent,
  DatePickerTrigger,
  type DatePickerProps,
}
