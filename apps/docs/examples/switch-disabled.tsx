import { Switch } from "@/components/ui/switch"
import { Field, FieldLabel } from "@/components/ui/field"

export default function SwitchDisabled() {
  return (
    <Field orientation="horizontal" disabled>
      <Switch />
      <FieldLabel>Airplane Mode</FieldLabel>
    </Field>
  )
}
