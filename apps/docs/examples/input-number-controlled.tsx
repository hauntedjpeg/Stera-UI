"use client"

import * as React from "react"

import {
  InputNumber,
  InputNumberControl,
  InputNumberDecrement,
  InputNumberGroup,
  InputNumberIncrement,
} from "@/components/ui/input-number"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"

const pricePerSeat = 12

export default function InputNumberControlled() {
  const [seats, setSeats] = React.useState<number | null>(5)

  return (
    <Field className="w-48">
      <FieldLabel htmlFor="input-number-controlled">Seats</FieldLabel>
      <InputNumber
        id="input-number-controlled"
        min={1}
        max={50}
        value={seats}
        onValueChange={setSeats}
      >
        <InputNumberGroup>
          <InputNumberDecrement />
          <InputNumberControl />
          <InputNumberIncrement />
        </InputNumberGroup>
      </InputNumber>
      <FieldDescription>
        {seats == null
          ? "Enter a number of seats."
          : `$${seats * pricePerSeat} per month`}
      </FieldDescription>
    </Field>
  )
}
