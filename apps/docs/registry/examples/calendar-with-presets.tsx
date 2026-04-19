"use client"

import * as React from "react"
import { addDays } from "date-fns"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"

const PRESETS = [
  { label: "Today", days: 0 },
  { label: "Tomorrow", days: 1 },
  { label: "In 3 days", days: 3 },
  { label: "In a week", days: 7 },
  { label: "In 2 weeks", days: 14 },
]

export default function CalendarWithPresets() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  return (
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
  )
}
