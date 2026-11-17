"use client"

import * as React from "react"
import {
  DatePicker,
  DatePickerContent,
  DatePickerTrigger,
} from "@/components/ui/date-picker"
import { Field, FieldLabel } from "@/components/ui/field"

export default function DatePickerDob() {
  const [date, setDate] = React.useState<Date | undefined>()
  return (
    <Field className="w-60">
      <FieldLabel htmlFor="birthday">Date of birth</FieldLabel>
      <DatePicker value={date} onValueChange={setDate}>
        <DatePickerTrigger
          id="birthday"
          placeholder="Select your birthday"
          className="w-full"
        />
        <DatePickerContent
          captionLayout="dropdown"
          endMonth={new Date()}
          disabled={{ after: new Date() }}
        />
      </DatePicker>
    </Field>
  )
}
