import { Textarea } from "@/components/ui/textarea"
import {
  Field,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"

export default function TextareaInvalid() {
  return (
    <Field data-invalid="true" className="w-sm">
      <FieldLabel htmlFor="invalid-message">Your message</FieldLabel>
      <Textarea id="invalid-message" aria-invalid="true" placeholder="Type your message here." />
      <FieldError>Your message must be at least 10 characters.</FieldError>
    </Field>
  )
}
