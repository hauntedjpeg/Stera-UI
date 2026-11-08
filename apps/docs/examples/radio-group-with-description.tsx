import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"

export default function RadioGroupWithDescription() {
  return (
    <RadioGroup defaultValue="comfortable" className="w-fit">
      <Field orientation="horizontal">
        <RadioGroupItem value="default" />
        <FieldContent>
          <FieldLabel>Default</FieldLabel>
          <FieldDescription>
            Standard spacing for most use cases.
          </FieldDescription>
        </FieldContent>
      </Field>
      <Field orientation="horizontal">
        <RadioGroupItem value="comfortable" />
        <FieldContent>
          <FieldLabel>Comfortable</FieldLabel>
          <FieldDescription>More space between elements.</FieldDescription>
        </FieldContent>
      </Field>
      <Field orientation="horizontal">
        <RadioGroupItem value="compact" />
        <FieldContent>
          <FieldLabel>Compact</FieldLabel>
          <FieldDescription>
            Minimal spacing for dense layouts.
          </FieldDescription>
        </FieldContent>
      </Field>
    </RadioGroup>
  )
}
