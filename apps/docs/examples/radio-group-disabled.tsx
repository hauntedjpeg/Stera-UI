import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Field, FieldLabel } from "@/components/ui/field"

export default function RadioGroupDisabled() {
  return (
    <RadioGroup defaultValue="option2" className="w-fit">
      <Field orientation="horizontal" data-disabled>
        <RadioGroupItem value="option1" id="disabled-r1" disabled />
        <FieldLabel htmlFor="disabled-r1" className="font-normal">Disabled</FieldLabel>
      </Field>
      <Field orientation="horizontal">
        <RadioGroupItem value="option2" id="disabled-r2" />
        <FieldLabel htmlFor="disabled-r2" className="font-normal">Option 2</FieldLabel>
      </Field>
      <Field orientation="horizontal">
        <RadioGroupItem value="option3" id="disabled-r3" />
        <FieldLabel htmlFor="disabled-r3" className="font-normal">Option 3</FieldLabel>
      </Field>
    </RadioGroup>
  )
}
