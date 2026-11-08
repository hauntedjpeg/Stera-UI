import { Input } from "@/components/ui/input"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"

export default function InputWithField() {
  return (
    <Field className="w-sm">
      <FieldLabel>Username</FieldLabel>
      <Input placeholder="johndoe" />
      <FieldDescription>
        Choose a unique username for your account.
      </FieldDescription>
    </Field>
  )
}
