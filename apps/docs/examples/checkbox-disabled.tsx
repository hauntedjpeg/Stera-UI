import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldLabel } from "@/components/ui/field"

export default function CheckboxDisabled() {
  return (
    <Field orientation="horizontal" disabled>
      <Checkbox />
      <FieldLabel>Enable notifications</FieldLabel>
    </Field>
  )
}
