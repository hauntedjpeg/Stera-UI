import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"

export default function CheckboxInvalid() {
  return (
    <FieldGroup className="w-56">
      <Field orientation="horizontal" data-invalid="true">
        <Checkbox id="terms-invalid" name="terms-invalid" aria-invalid />
        <FieldLabel htmlFor="terms-invalid">
          Accept terms and conditions
        </FieldLabel>
      </Field>
    </FieldGroup>
  )
}
