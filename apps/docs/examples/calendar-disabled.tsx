"use client"

import * as React from "react"
import { Calendar } from "@/components/ui/calendar"

export default function CalendarDisabled() {
  const [date, setDate] = React.useState<Date | undefined>()
  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      disabled={[{ before: new Date() }, { dayOfWeek: [0, 6] }]}
      className="rounded-xl inset-ring inset-ring-border"
    />
  )
}
