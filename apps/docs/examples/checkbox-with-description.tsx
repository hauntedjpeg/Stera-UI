import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"

export default function CheckboxWithDescription() {
  return (
    <Field orientation="horizontal">
      <Checkbox />
      <FieldContent>
        <FieldLabel>Accept terms and conditions</FieldLabel>
        <FieldDescription>
          By clicking this checkbox, you agree to the terms and conditions.
        </FieldDescription>
      </FieldContent>
    </Field>
  )
}
