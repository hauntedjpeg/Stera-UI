import {
  InputNumber,
  InputNumberControl,
  InputNumberDecrement,
  InputNumberGroup,
  InputNumberIncrement,
} from "@/components/ui/input-number"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"

export default function InputNumberInvalid() {
  return (
    <Field data-invalid="true" className="w-48">
      <FieldLabel htmlFor="input-number-invalid">Quantity</FieldLabel>
      <InputNumber
        id="input-number-invalid"
        defaultValue={0}
        min={0}
        aria-invalid="true"
      >
        <InputNumberGroup>
          <InputNumberDecrement />
          <InputNumberControl />
          <InputNumberIncrement />
        </InputNumberGroup>
      </InputNumber>
      <FieldError>Add at least one item to continue.</FieldError>
    </Field>
  )
}
