import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select"
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"

export default function NativeSelectDisabled() {
  return (
    <Field data-disabled="true" className="w-sm">
      <FieldLabel htmlFor="role">Role</FieldLabel>
      <NativeSelect id="role" disabled defaultValue="admin" className="w-full">
        <NativeSelectOption value="admin">Admin</NativeSelectOption>
        <NativeSelectOption value="editor">Editor</NativeSelectOption>
        <NativeSelectOption value="viewer">Viewer</NativeSelectOption>
      </NativeSelect>
      <FieldDescription>Contact your administrator to change your role.</FieldDescription>
    </Field>
  )
}
