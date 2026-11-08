import { InputOTP, InputOTPSlot } from "@/components/ui/input-otp"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"

export default function InputOTPInvalid() {
  return (
    <Field invalid className="w-fit">
      <FieldLabel>Verification code</FieldLabel>
      <InputOTP length={6} defaultValue="123456">
        {Array.from({ length: 6 }, (_, index) => (
          <InputOTPSlot key={index} />
        ))}
      </InputOTP>
      <FieldError>That code didn’t match. Check it and try again.</FieldError>
    </Field>
  )
}
