import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export default function FieldMultipleErrors() {
  return (
    <Field invalid className="w-full max-w-sm">
      <FieldLabel>Password</FieldLabel>
      <Input type="password" defaultValue="abc" />
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
