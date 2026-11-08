import { Input } from "@/components/ui/input"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"

export default function InputInvalid() {
  return (
    <Field invalid className="w-sm">
      <FieldLabel>Email</FieldLabel>
      <Input defaultValue="not-an-email" />
      <FieldError>Please enter a valid email address.</FieldError>
    </Field>
  )
}
