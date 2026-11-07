import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"

export default function InputOTPDemo() {
  return (
    <Field className="w-fit">
      <FieldLabel htmlFor="otp-demo">Verification code</FieldLabel>
      <InputOTP id="otp-demo" length={6}>
        <InputOTPGroup>
          <InputOTPSlot />
          <InputOTPSlot />
          <InputOTPSlot />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot />
          <InputOTPSlot />
          <InputOTPSlot />
        </InputOTPGroup>
      </InputOTP>
      <FieldDescription>
        Enter the 6-digit code we sent to your phone.
      </FieldDescription>
    </Field>
  )
}
