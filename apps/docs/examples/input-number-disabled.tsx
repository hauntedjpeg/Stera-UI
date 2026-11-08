import {
  InputNumber,
  InputNumberControl,
  InputNumberDecrement,
  InputNumberGroup,
  InputNumberIncrement,
} from "@/components/ui/input-number"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"

export default function InputNumberDisabled() {
  return (
    <Field data-disabled="true" className="w-48">
      <FieldLabel htmlFor="input-number-disabled">Quantity</FieldLabel>
      <InputNumber id="input-number-disabled" defaultValue={3} disabled>
        <InputNumberGroup>
          <InputNumberDecrement />
          <InputNumberControl />
          <InputNumberIncrement />
        </InputNumberGroup>
      </InputNumber>
      <FieldDescription>This item is out of stock.</FieldDescription>
    </Field>
  )
}
