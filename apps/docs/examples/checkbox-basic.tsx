import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"

export default function CheckboxBasic() {
  return (
    <FieldGroup className="w-56">
      <Field orientation="horizontal">
        <Checkbox id="terms-basic" name="terms-basic" />
        <FieldLabel htmlFor="terms-basic">
          Accept terms and conditions
        </FieldLabel>
      </Field>
    </FieldGroup>
  )
}
