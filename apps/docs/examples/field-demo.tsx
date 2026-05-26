import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export default function FieldDemo() {
  return (
    <Field className="w-full max-w-sm">
      <FieldLabel htmlFor="field-email">Email address</FieldLabel>
      <Input id="field-email" type="email" placeholder="you@example.com" />
      <FieldDescription>We will never share your email.</FieldDescription>
    </Field>
  )
}
