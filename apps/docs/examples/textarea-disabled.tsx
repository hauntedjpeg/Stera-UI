import { Textarea } from "@/components/ui/textarea"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"

export default function TextareaDisabled() {
  return (
    <Field disabled className="w-sm">
      <FieldLabel>Your message</FieldLabel>
      <Textarea placeholder="Type your message here." />
      <FieldDescription>
        Your message will be copied to the support team.
      </FieldDescription>
    </Field>
  )
}
