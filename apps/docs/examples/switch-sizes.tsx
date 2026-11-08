import { Switch } from "@/components/ui/switch"
import { Field, FieldLabel } from "@/components/ui/field"

export default function SwitchSizes() {
  return (
    <div className="flex flex-col gap-4">
      <Field orientation="horizontal">
        <Switch size="sm" />
        <FieldLabel>Small</FieldLabel>
      </Field>
      <Field orientation="horizontal">
        <Switch size="md" />
        <FieldLabel>Medium</FieldLabel>
      </Field>
      <Field orientation="horizontal">
        <Switch size="lg" />
        <FieldLabel>Large</FieldLabel>
      </Field>
    </div>
  )
}
