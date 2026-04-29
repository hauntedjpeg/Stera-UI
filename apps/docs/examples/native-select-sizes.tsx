import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select"

export default function NativeSelectSizes() {
  return (
    <div className="flex flex-col gap-4">
      {(["sm", "md", "lg", "xl"] as const).map((size) => (
        <div key={size} className="flex flex-col gap-1">
          <span className="text-text-subtlest text-xs">{size}</span>
          <NativeSelect size={size}>
            <NativeSelectOption value="">Select an option</NativeSelectOption>
            <NativeSelectOption value="a">Option A</NativeSelectOption>
            <NativeSelectOption value="b">Option B</NativeSelectOption>
          </NativeSelect>
        </div>
      ))}
    </div>
  )
}
