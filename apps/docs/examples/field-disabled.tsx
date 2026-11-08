import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export default function FieldDisabled() {
  return (
    <Field disabled className="w-full max-w-sm">
      <FieldLabel>Email address</FieldLabel>
      <Input type="email" defaultValue="disabled@example.com" />
      <FieldDescription>This field cannot be edited.</FieldDescription>
    </Field>
  )
}
