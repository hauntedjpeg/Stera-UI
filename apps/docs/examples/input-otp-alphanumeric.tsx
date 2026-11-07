"use client"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"

export default function InputOTPAlphanumeric() {
  return (
    <Field className="w-fit">
      <FieldLabel htmlFor="otp-recovery">Recovery code</FieldLabel>
      <InputOTP
        id="otp-recovery"
        length={8}
        validationType="alphanumeric"
        normalizeValue={(value) => value.toUpperCase()}
      >
        <InputOTPGroup>
          <InputOTPSlot />
          <InputOTPSlot />
          <InputOTPSlot />
          <InputOTPSlot />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot />
          <InputOTPSlot />
          <InputOTPSlot />
          <InputOTPSlot />
        </InputOTPGroup>
      </InputOTP>
      <FieldDescription>
        Use one of the recovery codes you saved when you set up two-factor
        authentication.
      </FieldDescription>
    </Field>
  )
}
