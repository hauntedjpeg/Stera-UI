"use client"

import * as React from "react"
import {
  DatePicker,
  DatePickerContent,
  DatePickerTrigger,
} from "@/components/ui/date-picker"

export default function DatePickerDemo() {
  const [date, setDate] = React.useState<Date | undefined>()
  return (
    <DatePicker value={date} onValueChange={setDate}>
      <DatePickerTrigger className="w-60" />
      <DatePickerContent />
    </DatePicker>
  )
}
