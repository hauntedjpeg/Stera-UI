import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field"
import { Label } from "@/components/ui/label"

export default function CheckboxDemo() {
  return (
    <FieldGroup className="max-w-sm">
      <Field orientation="horizontal">
        <Checkbox id="demo-terms" name="demo-terms" />
        <Label htmlFor="demo-terms">Accept terms and conditions</Label>
      </Field>
      <Field orientation="horizontal">
        <Checkbox id="demo-terms-2" name="demo-terms-2" defaultChecked />
        <FieldContent>
          <FieldLabel htmlFor="demo-terms-2">
            Accept terms and conditions
          </FieldLabel>
          <FieldDescription>
            By clicking this checkbox, you agree to the terms.
          </FieldDescription>
        </FieldContent>
      </Field>
      <Field orientation="horizontal" data-disabled="true">
        <Checkbox id="demo-notifications" name="demo-notifications" disabled />
        <FieldLabel htmlFor="demo-notifications">
          Enable notifications
        </FieldLabel>
      </Field>
      <FieldLabel>
        <Field orientation="horizontal">
          <Checkbox id="demo-notifications-2" name="demo-notifications-2" />
          <FieldContent>
            <FieldTitle>Enable notifications</FieldTitle>
            <FieldDescription>
              You can enable or disable notifications at any time.
            </FieldDescription>
          </FieldContent>
        </Field>
      </FieldLabel>
    </FieldGroup>
  )
}
