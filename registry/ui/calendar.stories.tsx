import * as React from "react"
import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { addDays } from "date-fns"
import type { DateRange } from "react-day-picker"

import { Button } from "./button"
import { Calendar, CalendarDayButton } from "./calendar"
import { Card, CardContent } from "./card"
import { Input } from "./input"

const meta: Meta<typeof Calendar> = {
  title: "UI/Calendar",
  component: Calendar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof Calendar>

export const Default: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date())
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-lg border"
      />
    )
  },
}

export const Range: Story = {
  render: () => {
    const [range, setRange] = useState<DateRange | undefined>({
      from: new Date(),
      to: addDays(new Date(), 6),
    })
    return (
      <Calendar
        mode="range"
        selected={range}
        onSelect={setRange}
        className="rounded-lg border"
      />
    )
  },
}

export const MonthYearSelector: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date())
    return (
      <Calendar
        mode="single"
        captionLayout="dropdown"
        selected={date}
        onSelect={setDate}
        className="rounded-lg border"
      />
    )
  },
}

const PRESETS = [
  { label: "Today", days: 0 },
  { label: "Tomorrow", days: 1 },
  { label: "In 3 days", days: 3 },
  { label: "In a week", days: 7 },
  { label: "In 2 weeks", days: 14 },
]

export const Presets: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date())
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
  },
}

export const DateTimePicker: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date())
    const [startTime, setStartTime] = useState("09:00")
    const [endTime, setEndTime] = useState("17:00")
    return (
      <div className="flex flex-col gap-4 rounded-lg border p-4">
        <Calendar mode="single" selected={date} onSelect={setDate} />
        <div className="flex gap-4 border-t pt-4">
          <div className="flex flex-1 flex-col gap-1.5">
            <label className="text-sm font-medium">Start Time</label>
            <Input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>
          <div className="flex flex-1 flex-col gap-1.5">
            <label className="text-sm font-medium">End Time</label>
            <Input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>
        </div>
      </div>
    )
  },
}

const bookedDates = [
  new Date(2026, 2, 3),
  new Date(2026, 2, 7),
  new Date(2026, 2, 12),
  new Date(2026, 2, 18),
  new Date(2026, 2, 21),
  new Date(2026, 2, 25),
]

export const BookedDates: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>()
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        disabled={bookedDates}
        className="rounded-lg border"
      />
    )
  },
}

export const CustomCellSize: Story = {
  render: () => {
    const year = new Date().getFullYear()
    const [range, setRange] = useState<DateRange | undefined>({
      from: new Date(year, 11, 8),
      to: addDays(new Date(year, 11, 8), 10),
    })
    return (
      <Card className="mx-auto w-fit p-0">
        <CardContent className="p-0">
          <Calendar
            mode="range"
            defaultMonth={range?.from}
            selected={range}
            onSelect={setRange}
            captionLayout="dropdown"
            className="[--cell-size:--spacing(10)] md:[--cell-size:--spacing(12)]"
            formatters={{
              formatMonthDropdown: (date) =>
                date.toLocaleString("default", { month: "long" }),
            }}
            components={{
              DayButton: ({ children, modifiers, day, ...props }) => {
                const isWeekend =
                  day.date.getDay() === 0 || day.date.getDay() === 6
                return (
                  <CalendarDayButton day={day} modifiers={modifiers} {...props}>
                    {children}
                    {!modifiers.outside && (
                      <span className="text-text-onbrand-secondary">{isWeekend ? "$120" : "$100"}</span>
                    )}
                  </CalendarDayButton>
                )
              },
            }}
          />
        </CardContent>
      </Card>
    )
  },
}

export const WeekNumbers: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date())
    return (
      <Calendar
        mode="single"
        showWeekNumber
        selected={date}
        onSelect={setDate}
        className="rounded-lg border"
      />
    )
  },
}
