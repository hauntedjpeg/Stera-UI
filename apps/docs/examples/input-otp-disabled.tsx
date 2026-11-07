import { InputOTP, InputOTPSlot } from "@/components/ui/input-otp"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"

export default function InputOTPDisabled() {
  return (
    <Field data-disabled="true" className="w-fit">
      <FieldLabel htmlFor="otp-disabled">Verification code</FieldLabel>
      <InputOTP id="otp-disabled" length={6} defaultValue="482" disabled>
        {Array.from({ length: 6 }, (_, index) => (
          <InputOTPSlot key={index} />
        ))}
      </InputOTP>
      <FieldDescription>
        You can request a new code in 30 seconds.
      </FieldDescription>
    </Field>
  )
}
