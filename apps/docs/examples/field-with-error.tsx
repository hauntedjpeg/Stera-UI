import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export default function FieldWithError() {
  return (
    <Field invalid className="w-full max-w-sm">
      <FieldLabel>Email address</FieldLabel>
      <Input type="email" defaultValue="not-an-email" />
      <FieldError>Please enter a valid email address.</FieldError>
    </Field>
  )
}
