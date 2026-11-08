import {
  InputNumber,
  InputNumberControl,
  InputNumberDecrement,
  InputNumberGroup,
  InputNumberIncrement,
} from "@/components/ui/input-number"

const sizes = ["sm", "md", "lg"] as const

export default function InputNumberSizes() {
  return (
    <div className="flex w-48 flex-col gap-4">
      {sizes.map((size) => (
        <div key={size} className="flex flex-col gap-1">
          <label
            htmlFor={`input-number-size-${size}`}
            className="text-xs text-ink-subtlest"
          >
            {size}
          </label>
          <InputNumber
            id={`input-number-size-${size}`}
            size={size}
            defaultValue={12}
          >
            <InputNumberGroup>
              <InputNumberDecrement />
              <InputNumberControl />
              <InputNumberIncrement />
            </InputNumberGroup>
          </InputNumber>
        </div>
      ))}
    </div>
  )
}
