import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Field, FieldLabel } from "@/components/ui/field"

export default function RadioGroupDemo() {
  return (
    <RadioGroup defaultValue="comfortable" className="w-fit">
      <Field orientation="horizontal">
        <RadioGroupItem value="default" />
        <FieldLabel>Default</FieldLabel>
      </Field>
      <Field orientation="horizontal">
        <RadioGroupItem value="comfortable" />
        <FieldLabel>Comfortable</FieldLabel>
      </Field>
      <Field orientation="horizontal">
        <RadioGroupItem value="compact" />
        <FieldLabel>Compact</FieldLabel>
      </Field>
    </RadioGroup>
  )
}
