"use client"

import * as React from "react"
import { addDays } from "date-fns"
import type { DateRange } from "react-day-picker"
import { Calendar } from "@/components/ui/calendar"

export default function CalendarMultipleMonths() {
  const [range, setRange] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 12),
  })
  return (
    <Calendar
      mode="range"
      numberOfMonths={2}
      showOutsideDays={false}
      selected={range}
      onSelect={setRange}
      className="rounded-xl inset-ring inset-ring-border"
    />
  )
}
