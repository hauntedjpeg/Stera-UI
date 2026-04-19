import { Switch } from "@/components/ui/switch"
import { Field, FieldLabel } from "@/components/ui/field"

export default function SwitchSizes() {
  return (
    <div className="flex flex-col gap-4">
      <Field orientation="horizontal">
        <Switch id="size-default" size="default" />
        <FieldLabel htmlFor="size-default">Default</FieldLabel>
      </Field>
      <Field orientation="horizontal">
        <Switch id="size-sm" size="sm" />
        <FieldLabel htmlFor="size-sm">Small</FieldLabel>
      </Field>
    </div>
  )
}
