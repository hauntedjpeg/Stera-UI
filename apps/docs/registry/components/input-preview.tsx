"use client"

import { Input } from "@/components/ui/input"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import { Preview } from "@/components/preview"

export function InputDefault() {
  return (
    <Preview>
      <Input placeholder="Email" className="w-64" />
    </Preview>
  )
}

export function InputWithField() {
  return (
    <Preview>
      <Field className="w-sm">
        <FieldLabel htmlFor="preview-username">Username</FieldLabel>
        <Input id="preview-username" placeholder="johndoe" />
        <FieldDescription>Choose a unique username for your account.</FieldDescription>
      </Field>
    </Preview>
  )
}

export function InputAllSizes() {
  return (
    <Preview>
      <div className="flex flex-col gap-4 w-64">
        <div className="flex flex-col gap-1">
          <span className="text-text-tertiary text-xs">sm</span>
          <Input size="sm" placeholder="Small" />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-text-tertiary text-xs">md</span>
          <Input size="md" placeholder="Medium (default)" />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-text-tertiary text-xs">lg</span>
          <Input size="lg" placeholder="Large" />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-text-tertiary text-xs">xl</span>
          <Input size="xl" placeholder="Extra Large" />
        </div>
      </div>
    </Preview>
  )
}

export function InputDisabled() {
  return (
    <Preview>
      <Field data-disabled="true" className="w-sm">
        <FieldLabel htmlFor="preview-disabled-email">Email</FieldLabel>
        <Input id="preview-disabled-email" type="email" disabled defaultValue="jane@example.com" />
        <FieldDescription>This field is currently disabled.</FieldDescription>
      </Field>
    </Preview>
  )
}

export function InputInvalid() {
  return (
    <Preview>
      <Field data-invalid="true" className="w-sm">
        <FieldLabel htmlFor="preview-invalid-input">Email</FieldLabel>
        <Input id="preview-invalid-input" aria-invalid="true" defaultValue="not-an-email" />
        <FieldError>Please enter a valid email address.</FieldError>
      </Field>
    </Preview>
  )
}
