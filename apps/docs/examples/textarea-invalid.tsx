import { Textarea } from "@/components/ui/textarea"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"

export default function TextareaInvalid() {
  return (
    <Field invalid className="w-sm">
      <FieldLabel>Your message</FieldLabel>
      <Textarea placeholder="Type your message here." />
      <FieldError>Your message must be at least 10 characters.</FieldError>
    </Field>
  )
}
