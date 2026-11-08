import { Switch } from "@/components/ui/switch"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"

export default function SwitchWithDescription() {
  return (
    <Field orientation="horizontal" className="max-w-sm">
      <FieldContent>
        <FieldLabel>Marketing emails</FieldLabel>
        <FieldDescription>
          Receive emails about new products, features, and more.
        </FieldDescription>
      </FieldContent>
      <Switch />
    </Field>
  )
}
