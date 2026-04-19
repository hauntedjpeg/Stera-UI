import { Switch } from "@/components/ui/switch"
import { Field, FieldLabel } from "@/components/ui/field"

export default function SwitchDisabled() {
  return (
    <Field orientation="horizontal" data-disabled="true">
      <Switch id="disabled-switch" disabled />
      <FieldLabel htmlFor="disabled-switch">Airplane Mode</FieldLabel>
    </Field>
  )
}
