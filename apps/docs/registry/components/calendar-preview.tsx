"use client"

import * as React from "react"
import { addDays } from "date-fns"
import type { DateRange } from "react-day-picker"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Preview } from "@/components/preview"

export function CalendarDefault() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  return (
    <Preview>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-lg border"
      />
    </Preview>
  )
}

export function CalendarRange() {
  const [range, setRange] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 6),
  })
  return (
    <Preview>
      <Calendar
        mode="range"
        selected={range}
        onSelect={setRange}
        className="rounded-lg border"
      />
    </Preview>
  )
}

export function CalendarDropdown() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  return (
    <Preview>
      <Calendar
        mode="single"
        captionLayout="dropdown"
        selected={date}
        onSelect={setDate}
        className="rounded-lg border"
      />
    </Preview>
  )
}

const PRESETS = [
  { label: "Today", days: 0 },
  { label: "Tomorrow", days: 1 },
  { label: "In 3 days", days: 3 },
  { label: "In a week", days: 7 },
  { label: "In 2 weeks", days: 14 },
]

export function CalendarWithPresets() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  return (
    <Preview>
      <div className="flex gap-2 rounded-lg border p-3">
        <div className="flex flex-col gap-1 border-r pr-3">
          {PRESETS.map(({ label, days }) => {
            const preset = addDays(new Date(), days)
            const isSelected = date?.toDateString() === preset.toDateString()
            return (
              <Button
                key={label}
                size="sm"
                variant={isSelected ? "outline" : "ghost"}
                className="justify-start"
                onClick={() => setDate(preset)}
              >
                {label}
              </Button>
            )
          })}
        </div>
        <Calendar mode="single" selected={date} onSelect={setDate} />
      </div>
    </Preview>
  )
}

export function CalendarWeekNumbers() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  return (
    <Preview>
      <Calendar
        mode="single"
        showWeekNumber
        selected={date}
        onSelect={setDate}
        className="rounded-lg border"
      />
    </Preview>
  )
}
