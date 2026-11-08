import {
  InputNumber,
  InputNumberControl,
  InputNumberDecrement,
  InputNumberGroup,
  InputNumberIncrement,
  InputNumberScrubArea,
  InputNumberScrubAreaCursor,
} from "@/components/ui/input-number"
import { Field, FieldLabel } from "@/components/ui/field"

export default function InputNumberScrubAreaDemo() {
  return (
    <Field className="w-48">
      <InputNumber defaultValue={16} min={8} max={96}>
        <InputNumberScrubArea>
          <FieldLabel>Font size</FieldLabel>
          <InputNumberScrubAreaCursor />
        </InputNumberScrubArea>
        <InputNumberGroup>
          <InputNumberDecrement />
          <InputNumberControl />
          <InputNumberIncrement />
        </InputNumberGroup>
      </InputNumber>
    </Field>
  )
}
