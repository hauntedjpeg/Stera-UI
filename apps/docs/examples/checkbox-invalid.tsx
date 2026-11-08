import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"

export default function CheckboxInvalid() {
  return (
    <FieldGroup className="w-56">
      <Field orientation="horizontal" invalid>
        <Checkbox name="terms-invalid" />
        <FieldLabel>Accept terms and conditions</FieldLabel>
      </Field>
    </FieldGroup>
  )
}
