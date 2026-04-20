import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldLabel } from "@/components/ui/field"

export default function CheckboxDisabled() {
  return (
    <Field orientation="horizontal" data-disabled="true">
      <Checkbox id="disabled-checkbox" disabled />
      <FieldLabel htmlFor="disabled-checkbox">Enable notifications</FieldLabel>
    </Field>
  )
}
