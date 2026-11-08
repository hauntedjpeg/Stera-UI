import {
  InputNumber,
  InputNumberControl,
  InputNumberDecrement,
  InputNumberGroup,
  InputNumberIncrement,
} from "@/components/ui/input-number"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"

export default function InputNumberDemo() {
  return (
    <Field className="w-48">
      <FieldLabel htmlFor="input-number-demo">Quantity</FieldLabel>
      <InputNumber id="input-number-demo" defaultValue={1} min={1} max={99}>
        <InputNumberGroup>
          <InputNumberDecrement />
          <InputNumberControl />
          <InputNumberIncrement />
        </InputNumberGroup>
      </InputNumber>
      <FieldDescription>Up to 99 per order.</FieldDescription>
    </Field>
  )
}
