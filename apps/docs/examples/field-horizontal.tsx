import {
  Field,
  FieldContent,
  FieldDescription,
  FieldTitle,
} from "@/components/ui/field"
import { Switch } from "@/components/ui/switch"

export default function FieldHorizontal() {
  return (
    <Field orientation="horizontal" className="max-w-md w-full">
      <FieldContent>
        <FieldTitle>Marketing emails</FieldTitle>
        <FieldDescription>Receive emails about new products, features, and more.</FieldDescription>
      </FieldContent>
      <Switch />
    </Field>
  )
}
