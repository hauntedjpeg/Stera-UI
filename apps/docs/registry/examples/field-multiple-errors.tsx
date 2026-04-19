import {
  Field,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export default function FieldMultipleErrors() {
  return (
    <Field data-invalid="true" className="max-w-sm w-full">
      <FieldLabel htmlFor="field-multi-error-password">Password</FieldLabel>
      <Input id="field-multi-error-password" type="password" aria-invalid="true" defaultValue="abc" />
      <FieldError
        errors={[
          { message: "Password must be at least 8 characters." },
          { message: "Password must contain a number." },
          { message: "Password must contain a special character." },
        ]}
      />
    </Field>
  )
}
