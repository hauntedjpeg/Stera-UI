import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Field, FieldLabel } from "@/components/ui/field"

export default function RadioGroupDemo() {
  return (
    <RadioGroup defaultValue="comfortable" className="w-fit">
      <Field orientation="horizontal">
        <RadioGroupItem value="default" id="r1" />
        <FieldLabel htmlFor="r1">Default</FieldLabel>
      </Field>
      <Field orientation="horizontal">
        <RadioGroupItem value="comfortable" id="r2" />
        <FieldLabel htmlFor="r2">Comfortable</FieldLabel>
      </Field>
      <Field orientation="horizontal">
        <RadioGroupItem value="compact" id="r3" />
        <FieldLabel htmlFor="r3">Compact</FieldLabel>
      </Field>
    </RadioGroup>
  )
}
