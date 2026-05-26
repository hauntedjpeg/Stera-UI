import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export default function FieldWithError() {
  return (
    <Field data-invalid="true" className="w-full max-w-sm">
      <FieldLabel htmlFor="field-error-email">Email address</FieldLabel>
      <Input
        id="field-error-email"
        type="email"
        aria-invalid="true"
        defaultValue="not-an-email"
      />
      <FieldError>Please enter a valid email address.</FieldError>
    </Field>
  )
}
