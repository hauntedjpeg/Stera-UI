import { InputOTP, InputOTPSlot } from "@/components/ui/input-otp"
import { Field, FieldLabel } from "@/components/ui/field"

export default function InputOTPMasked() {
  return (
    <Field className="w-fit">
      <FieldLabel htmlFor="otp-pin">PIN</FieldLabel>
      <InputOTP id="otp-pin" length={4} mask>
        <InputOTPSlot />
        <InputOTPSlot />
        <InputOTPSlot />
        <InputOTPSlot />
      </InputOTP>
    </Field>
  )
}
