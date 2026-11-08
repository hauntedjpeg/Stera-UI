import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"

export default function FieldCheckboxGroup() {
  return (
    <FieldSet className="w-full max-w-sm">
      <FieldLegend variant="label">Notifications</FieldLegend>
      <FieldDescription>
        Select which notifications you would like to receive.
      </FieldDescription>
      <FieldGroup className="gap-3">
        <Field orientation="horizontal">
          <Checkbox name="fp-notif-email" defaultChecked />
          <FieldLabel className="st-label-md">Email notifications</FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <Checkbox name="fp-notif-sms" />
          <FieldLabel className="st-label-md">SMS notifications</FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <Checkbox name="fp-notif-push" defaultChecked />
          <FieldLabel className="st-label-md">Push notifications</FieldLabel>
        </Field>
      </FieldGroup>
    </FieldSet>
  )
}
