import {
  InputNumber,
  InputNumberControl,
  InputNumberDecrement,
  InputNumberGroup,
  InputNumberIncrement,
} from "@/components/ui/input-number"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"

export default function InputNumberRange() {
  return (
    <Field className="w-48">
      <FieldLabel htmlFor="input-number-range">Guests</FieldLabel>
      <InputNumber
        id="input-number-range"
        defaultValue={2}
        min={1}
        max={12}
        step={1}
        largeStep={4}
      >
        <InputNumberGroup>
          <InputNumberDecrement />
          <InputNumberControl />
          <InputNumberIncrement />
        </InputNumberGroup>
      </InputNumber>
      <FieldDescription>Tables seat up to 12.</FieldDescription>
    </Field>
  )
}
