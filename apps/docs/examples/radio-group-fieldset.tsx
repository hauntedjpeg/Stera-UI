import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Field,
  FieldDescription,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"

export default function RadioGroupFieldset() {
  return (
    <FieldSet className="w-full max-w-xs">
      <FieldLegend variant="label">Subscription Plan</FieldLegend>
      <FieldDescription>
        Yearly and lifetime plans offer significant savings.
      </FieldDescription>
      <RadioGroup defaultValue="monthly">
        <Field orientation="horizontal">
          <RadioGroupItem value="monthly" />
          <FieldLabel className="st-label-md">Monthly ($9.99/month)</FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <RadioGroupItem value="yearly" />
          <FieldLabel className="st-label-md">Yearly ($99.99/year)</FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <RadioGroupItem value="lifetime" />
          <FieldLabel className="st-label-md">Lifetime ($299.99)</FieldLabel>
        </Field>
      </RadioGroup>
    </FieldSet>
  )
}
