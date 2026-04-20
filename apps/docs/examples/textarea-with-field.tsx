import { Textarea } from "@/components/ui/textarea"
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"

export default function TextareaWithField() {
  return (
    <Field className="w-sm">
      <FieldLabel htmlFor="message">Your message</FieldLabel>
      <Textarea id="message" placeholder="Type your message here." />
      <FieldDescription>Your message will be copied to the support team.</FieldDescription>
    </Field>
  )
}
