import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export default function FieldDisabled() {
  return (
    <Field data-disabled="true" className="max-w-sm w-full">
      <FieldLabel htmlFor="field-disabled-email">Email address</FieldLabel>
      <Input id="field-disabled-email" type="email" disabled defaultValue="disabled@example.com" />
      <FieldDescription>This field cannot be edited.</FieldDescription>
    </Field>
  )
}
