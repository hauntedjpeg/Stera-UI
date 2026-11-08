"use client"

import * as React from "react"

import { InputOTP, InputOTPSlot } from "@/components/ui/input-otp"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"

export default function InputOTPControlled() {
  const [value, setValue] = React.useState("")
  const [completed, setCompleted] = React.useState<string | null>(null)

  return (
    <Field className="w-fit">
      <FieldLabel>Verification code</FieldLabel>
      <InputOTP
        length={6}
        value={value}
        onValueChange={(next) => {
          setValue(next)
          if (next.length < 6) setCompleted(null)
        }}
        onValueComplete={(next) => setCompleted(next)}
      >
        {Array.from({ length: 6 }, (_, index) => (
          <InputOTPSlot key={index} />
        ))}
      </InputOTP>
      <FieldDescription>
        {completed
          ? `Verifying ${completed}…`
          : value
            ? `Entered: ${value}`
            : "Enter the code to continue."}
      </FieldDescription>
    </Field>
  )
}
