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
    <FieldSet className="max-w-sm w-full">
      <FieldLegend variant="label">Notifications</FieldLegend>
      <FieldDescription>Select which notifications you would like to receive.</FieldDescription>
      <FieldGroup className="gap-3">
        <Field orientation="horizontal">
          <Checkbox id="fp-notif-email" name="fp-notif-email" defaultChecked />
          <FieldLabel htmlFor="fp-notif-email" className="font-normal">Email notifications</FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <Checkbox id="fp-notif-sms" name="fp-notif-sms" />
          <FieldLabel htmlFor="fp-notif-sms" className="font-normal">SMS notifications</FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <Checkbox id="fp-notif-push" name="fp-notif-push" defaultChecked />
          <FieldLabel htmlFor="fp-notif-push" className="font-normal">Push notifications</FieldLabel>
        </Field>
      </FieldGroup>
    </FieldSet>
  )
}
