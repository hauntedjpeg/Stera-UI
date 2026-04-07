"use client"

import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Preview } from "@/components/preview"

export function FieldDefault() {
  return (
    <Preview>
      <Field className="max-w-sm w-full">
        <FieldLabel htmlFor="field-email">Email address</FieldLabel>
        <Input id="field-email" type="email" placeholder="you@example.com" />
        <FieldDescription>We will never share your email.</FieldDescription>
      </Field>
    </Preview>
  )
}

export function FieldHorizontal() {
  return (
    <Preview>
      <Field orientation="horizontal" className="max-w-md w-full">
        <FieldContent>
          <FieldTitle>Marketing emails</FieldTitle>
          <FieldDescription>Receive emails about new products, features, and more.</FieldDescription>
        </FieldContent>
        <Switch />
      </Field>
    </Preview>
  )
}

export function FieldWithError() {
  return (
    <Preview>
      <Field data-invalid="true" className="max-w-sm w-full">
        <FieldLabel htmlFor="field-error-email">Email address</FieldLabel>
        <Input id="field-error-email" type="email" aria-invalid="true" defaultValue="not-an-email" />
        <FieldError>Please enter a valid email address.</FieldError>
      </Field>
    </Preview>
  )
}

export function FieldMultipleErrors() {
  return (
    <Preview>
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
    </Preview>
  )
}

export function FieldDisabled() {
  return (
    <Preview>
      <Field data-disabled="true" className="max-w-sm w-full">
        <FieldLabel htmlFor="field-disabled-email">Email address</FieldLabel>
        <Input id="field-disabled-email" type="email" disabled defaultValue="disabled@example.com" />
        <FieldDescription>This field cannot be edited.</FieldDescription>
      </Field>
    </Preview>
  )
}

export function FieldCheckboxGroup() {
  return (
    <Preview>
      <FieldSet className="max-w-sm w-full">
        <FieldLegend variant="label">Notifications</FieldLegend>
        <FieldDescription>Select which notifications you would like to receive.</FieldDescription>
        <FieldGroup className="gap-3">
          <Field orientation="horizontal">
            <Checkbox id="fp-notif-email" name="fp-notif-email" defaultChecked />
            <FieldLabel htmlFor="fp-notif-email" className="font-normal">Email notifications</FieldLabel>
          </Field>
          <Field orientation="horizontal">
            <Checkbox id="fp-notif-sms" name="fp-notif-sms" />
            <FieldLabel htmlFor="fp-notif-sms" className="font-normal">SMS notifications</FieldLabel>
          </Field>
          <Field orientation="horizontal">
            <Checkbox id="fp-notif-push" name="fp-notif-push" defaultChecked />
            <FieldLabel htmlFor="fp-notif-push" className="font-normal">Push notifications</FieldLabel>
          </Field>
        </FieldGroup>
      </FieldSet>
    </Preview>
  )
}

export function FieldFormExample() {
  return (
    <Preview>
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
          <Select defaultValue="editor">
            <SelectTrigger id="fp-form-role" className="w-full">
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="editor">Editor</SelectItem>
              <SelectItem value="viewer">Viewer</SelectItem>
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
    </Preview>
  )
}
