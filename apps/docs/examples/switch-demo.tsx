import { Switch } from "@/components/ui/switch"
import { Field, FieldLabel } from "@/components/ui/field"

export default function SwitchDemo() {
  return (
    <Field orientation="horizontal" className="w-auto">
      <Switch id="airplane-mode" />
      <FieldLabel htmlFor="airplane-mode">Airplane Mode</FieldLabel>
    </Field>
  )
}
