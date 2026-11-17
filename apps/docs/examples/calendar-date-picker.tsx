"use client"

import * as React from "react"
import { format } from "date-fns"
import { SiCalendar } from "stera-icons"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function CalendarDatePicker() {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>()
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={<Button variant="outline" className="w-60 justify-start" />}
      >
        <SiCalendar data-icon="inline-start" />
        {date ? (
          format(date, "PPP")
        ) : (
          <span className="text-ink-subtler">Pick a date</span>
        )}
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          defaultMonth={date}
          onSelect={(value) => {
            setDate(value)
            setOpen(false)
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
