"use client"

import * as React from "react"

import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"

export default function CheckboxControlled() {
  const [checked, setChecked] = React.useState(false)

  return (
    <FieldGroup className="w-56">
      <Field orientation="horizontal">
        <Checkbox
          id="controlled-checkbox"
          checked={checked}
          onCheckedChange={setChecked}
        />
        <FieldLabel htmlFor="controlled-checkbox">
          {checked ? "Subscribed" : "Subscribe to updates"}
        </FieldLabel>
      </Field>
    </FieldGroup>
  )
}
