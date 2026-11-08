import {
  InputNumber,
  InputNumberControl,
  InputNumberDecrement,
  InputNumberGroup,
  InputNumberIncrement,
  InputNumberScrubArea,
  InputNumberScrubAreaCursor,
} from "@/components/ui/input-number"
import { FieldLabel } from "@/components/ui/field"

export default function InputNumberScrubAreaDemo() {
  return (
    <InputNumber
      id="input-number-scrub"
      defaultValue={16}
      min={8}
      max={96}
      className="w-48"
    >
      <InputNumberScrubArea>
        <FieldLabel htmlFor="input-number-scrub">Font size</FieldLabel>
        <InputNumberScrubAreaCursor />
      </InputNumberScrubArea>
      <InputNumberGroup>
        <InputNumberDecrement />
        <InputNumberControl />
        <InputNumberIncrement />
      </InputNumberGroup>
    </InputNumber>
  )
}
