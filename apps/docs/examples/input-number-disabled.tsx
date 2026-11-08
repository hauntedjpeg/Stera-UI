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
    <Field disabled className="w-48">
      <FieldLabel>Quantity</FieldLabel>
      <InputNumber defaultValue={3}>
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
