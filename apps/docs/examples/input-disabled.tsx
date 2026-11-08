import { Input } from "@/components/ui/input"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"

export default function InputDisabled() {
  return (
    <Field disabled className="w-sm">
      <FieldLabel>Email</FieldLabel>
      <Input type="email" defaultValue="jane@example.com" />
      <FieldDescription>This field is currently disabled.</FieldDescription>
    </Field>
  )
}
