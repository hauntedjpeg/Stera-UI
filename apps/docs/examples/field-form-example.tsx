import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldTitle,
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
    <FieldGroup className="max-w-lg w-full">
      <Field>
        <FieldLabel htmlFor="fp-form-name">Full name</FieldLabel>
        <Input id="fp-form-name" placeholder="Jane Doe" />
      </Field>
      <Field data-invalid="true">
        <FieldLabel htmlFor="fp-form-email">Email address</FieldLabel>
        <Input id="fp-form-email" type="email" aria-invalid="true" defaultValue="invalid-email" />
        <FieldError>Please enter a valid email address.</FieldError>
      </Field>
      <Field>
        <FieldLabel htmlFor="fp-form-role">Role</FieldLabel>
        <Select defaultValue="Editor">
          <SelectTrigger id="fp-form-role" className="w-full">
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
        <FieldLabel htmlFor="fp-form-bio">Bio</FieldLabel>
        <Textarea id="fp-form-bio" placeholder="Tell us about yourself..." />
        <FieldDescription>Brief description for your profile.</FieldDescription>
      </Field>
      <FieldSeparator />
      <Field orientation="horizontal">
        <FieldContent>
          <FieldTitle>Marketing emails</FieldTitle>
          <FieldDescription>Receive emails about new products and features.</FieldDescription>
        </FieldContent>
        <Switch />
      </Field>
    </FieldGroup>
  )
}
