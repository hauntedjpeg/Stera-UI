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
      <FieldLabel>
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>Push notifications</FieldTitle>
            <FieldDescription>
              Get notified when something needs your attention.
            </FieldDescription>
          </FieldContent>
          <Switch defaultChecked />
        </Field>
      </FieldLabel>
      <FieldLabel>
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>Weekly newsletter</FieldTitle>
            <FieldDescription>
              A roundup of product news and tips every Monday.
            </FieldDescription>
          </FieldContent>
          <Switch />
        </Field>
      </FieldLabel>
    </div>
  )
}
