import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"

export default function FieldFormExample() {
  return (
    <FieldGroup className="w-full max-w-lg">
      <Field>
        <FieldLabel>Full name</FieldLabel>
        <Input placeholder="Jane Doe" />
      </Field>
      <Field invalid>
        <FieldLabel>Email address</FieldLabel>
        <Input type="email" defaultValue="invalid-email" />
        <FieldError>Please enter a valid email address.</FieldError>
      </Field>
      <Field>
        <FieldLabel nativeLabel={false}>Role</FieldLabel>
        <Select defaultValue="Editor">
          <SelectTrigger>
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="Admin">Admin</SelectItem>
              <SelectItem value="Editor">Editor</SelectItem>
              <SelectItem value="Viewer">Viewer</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>
      <Field>
        <FieldLabel>Bio</FieldLabel>
        <Textarea placeholder="Tell us about yourself..." />
        <FieldDescription>Brief description for your profile.</FieldDescription>
      </Field>
      <FieldSeparator />
      <Field orientation="horizontal">
        <FieldContent>
          <FieldLabel>Marketing emails</FieldLabel>
          <FieldDescription>
            Receive emails about new products and features.
          </FieldDescription>
        </FieldContent>
        <Switch />
      </Field>
    </FieldGroup>
  )
}
