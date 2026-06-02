import { Switch } from "@/components/ui/switch"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field"

export default function SwitchChoiceCard() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <FieldLabel htmlFor="choice-notifications">
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>Push notifications</FieldTitle>
            <FieldDescription>
              Get notified when something needs your attention.
            </FieldDescription>
          </FieldContent>
          <Switch id="choice-notifications" defaultChecked />
        </Field>
      </FieldLabel>
      <FieldLabel htmlFor="choice-newsletter">
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>Weekly newsletter</FieldTitle>
            <FieldDescription>
              A roundup of product news and tips every Monday.
            </FieldDescription>
          </FieldContent>
          <Switch id="choice-newsletter" />
        </Field>
      </FieldLabel>
    </div>
  )
}
