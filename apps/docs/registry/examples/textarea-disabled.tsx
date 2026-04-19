import { Textarea } from "@/components/ui/textarea"
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"

export default function TextareaDisabled() {
  return (
    <Field data-disabled="true" className="w-sm">
      <FieldLabel htmlFor="disabled-message">Your message</FieldLabel>
      <Textarea id="disabled-message" placeholder="Type your message here." disabled />
      <FieldDescription>Your message will be copied to the support team.</FieldDescription>
    </Field>
  )
}
