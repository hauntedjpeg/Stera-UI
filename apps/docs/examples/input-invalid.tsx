import { Input } from "@/components/ui/input"
import {
  Field,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"

export default function InputInvalid() {
  return (
    <Field data-invalid="true" className="w-sm">
      <FieldLabel htmlFor="invalid-input">Email</FieldLabel>
      <Input id="invalid-input" aria-invalid="true" defaultValue="not-an-email" />
      <FieldError>Please enter a valid email address.</FieldError>
    </Field>
  )
}
