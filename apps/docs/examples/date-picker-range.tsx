"use client"

import * as React from "react"
import type { DateRange } from "react-day-picker"
import {
  DatePicker,
  DatePickerContent,
  DatePickerTrigger,
} from "@/components/ui/date-picker"

export default function DatePickerRange() {
  const [range, setRange] = React.useState<DateRange | undefined>()
  return (
    <DatePicker mode="range" value={range} onValueChange={setRange}>
      <DatePickerTrigger placeholder="Pick dates" className="w-72" />
      <DatePickerContent numberOfMonths={2} showOutsideDays={false} />
    </DatePicker>
  )
}
