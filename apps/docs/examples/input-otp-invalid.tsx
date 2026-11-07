import { InputOTP, InputOTPSlot } from "@/components/ui/input-otp"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"

export default function InputOTPInvalid() {
  return (
    <Field data-invalid="true" className="w-fit">
      <FieldLabel htmlFor="otp-invalid">Verification code</FieldLabel>
      <InputOTP
        id="otp-invalid"
        length={6}
        defaultValue="123456"
        aria-invalid="true"
      >
        {Array.from({ length: 6 }, (_, index) => (
          <InputOTPSlot key={index} />
        ))}
      </InputOTP>
      <FieldError>That code didn’t match. Check it and try again.</FieldError>
    </Field>
  )
}
