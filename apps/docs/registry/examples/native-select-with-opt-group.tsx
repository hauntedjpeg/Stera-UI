import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "@/components/ui/native-select"
import { Field, FieldLabel } from "@/components/ui/field"

export default function NativeSelectWithOptGroup() {
  return (
    <Field className="w-sm">
      <FieldLabel htmlFor="country">Country</FieldLabel>
      <NativeSelect id="country" className="w-full">
        <NativeSelectOption value="">Select a country</NativeSelectOption>
        <NativeSelectOptGroup label="North America">
          <NativeSelectOption value="us">United States</NativeSelectOption>
          <NativeSelectOption value="ca">Canada</NativeSelectOption>
          <NativeSelectOption value="mx">Mexico</NativeSelectOption>
        </NativeSelectOptGroup>
        <NativeSelectOptGroup label="Europe">
          <NativeSelectOption value="gb">United Kingdom</NativeSelectOption>
          <NativeSelectOption value="de">Germany</NativeSelectOption>
          <NativeSelectOption value="fr">France</NativeSelectOption>
        </NativeSelectOptGroup>
      </NativeSelect>
    </Field>
  )
}
