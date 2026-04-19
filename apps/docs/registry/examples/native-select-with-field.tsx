import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select"
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"

export default function NativeSelectWithField() {
  return (
    <Field className="w-sm">
      <FieldLabel htmlFor="fruit">Fruit</FieldLabel>
      <NativeSelect id="fruit" className="w-full">
        <NativeSelectOption value="">Select a fruit</NativeSelectOption>
        <NativeSelectOption value="apple">Apple</NativeSelectOption>
        <NativeSelectOption value="banana">Banana</NativeSelectOption>
        <NativeSelectOption value="cherry">Cherry</NativeSelectOption>
      </NativeSelect>
      <FieldDescription>Choose your favourite fruit.</FieldDescription>
    </Field>
  )
}
