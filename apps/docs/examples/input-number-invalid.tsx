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
    <Field invalid className="w-48">
      <FieldLabel>Quantity</FieldLabel>
      <InputNumber defaultValue={0} min={0}>
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
