"use client"

import {
  DatePicker,
  DatePickerContent,
  DatePickerTrigger,
} from "@/components/ui/date-picker"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"

export default function DatePickerInvalid() {
  return (
    <Field invalid className="w-60">
      <FieldLabel htmlFor="trip-start">Start date</FieldLabel>
      <DatePicker>
        <DatePickerTrigger id="trip-start" className="w-full" />
        <DatePickerContent disabled={{ before: new Date() }} />
      </DatePicker>
      <FieldError>Please pick a start date.</FieldError>
    </Field>
  )
}
