import {
  InputNumber,
  InputNumberControl,
  InputNumberDecrement,
  InputNumberGroup,
  InputNumberIncrement,
} from "@/components/ui/input-number"
import { Field, FieldLabel } from "@/components/ui/field"

const fields: {
  id: string
  label: string
  defaultValue: number
  step: number
  min: number
  max?: number
  format: Intl.NumberFormatOptions
}[] = [
  {
    id: "input-number-price",
    label: "Price",
    defaultValue: 24.5,
    step: 0.5,
    min: 0,
    format: { style: "currency", currency: "USD" },
  },
  {
    id: "input-number-discount",
    label: "Discount",
    defaultValue: 0.15,
    step: 0.05,
    min: 0,
    max: 1,
    format: { style: "percent" },
  },
  {
    id: "input-number-weight",
    label: "Weight",
    defaultValue: 2.5,
    step: 0.1,
    min: 0,
    format: { style: "unit", unit: "kilogram", maximumFractionDigits: 1 },
  },
]

export default function InputNumberFormat() {
  return (
    <div className="flex w-48 flex-col gap-4">
      {fields.map(({ id, label, ...props }) => (
        <Field key={id}>
          <FieldLabel htmlFor={id}>{label}</FieldLabel>
          <InputNumber id={id} {...props}>
            <InputNumberGroup>
              <InputNumberDecrement />
              <InputNumberControl />
              <InputNumberIncrement />
            </InputNumberGroup>
          </InputNumber>
        </Field>
      ))}
    </div>
  )
}
