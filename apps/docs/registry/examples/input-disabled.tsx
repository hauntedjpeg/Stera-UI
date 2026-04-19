import { Input } from "@/components/ui/input"
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"

export default function InputDisabled() {
  return (
    <Field data-disabled="true" className="w-sm">
      <FieldLabel htmlFor="email">Email</FieldLabel>
      <Input id="email" type="email" disabled defaultValue="jane@example.com" />
      <FieldDescription>This field is currently disabled.</FieldDescription>
    </Field>
  )
}
