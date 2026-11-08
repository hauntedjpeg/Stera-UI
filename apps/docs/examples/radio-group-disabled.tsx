import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Field, FieldLabel } from "@/components/ui/field"

export default function RadioGroupDisabled() {
  return (
    <RadioGroup defaultValue="option2" className="w-fit">
      <Field orientation="horizontal" disabled>
        <RadioGroupItem value="option1" />
        <FieldLabel className="st-label-md">Disabled</FieldLabel>
      </Field>
      <Field orientation="horizontal">
        <RadioGroupItem value="option2" />
        <FieldLabel className="st-label-md">Option 2</FieldLabel>
      </Field>
      <Field orientation="horizontal">
        <RadioGroupItem value="option3" />
        <FieldLabel className="st-label-md">Option 3</FieldLabel>
      </Field>
    </RadioGroup>
  )
}
