"use client"

import {
  DatePicker,
  DatePickerContent,
  DatePickerTrigger,
} from "@/components/ui/date-picker"

const SIZES = ["sm", "md", "lg"] as const

export default function DatePickerSizes() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      {SIZES.map((size) => (
        <DatePicker key={size} defaultValue={new Date()}>
          <DatePickerTrigger size={size} />
          <DatePickerContent />
        </DatePicker>
      ))}
    </div>
  )
}
