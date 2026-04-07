"use client"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
import { Preview } from "@/components/preview"

export function TextareaDefault() {
  return (
    <Preview>
      <Textarea placeholder="Type your message here." className="w-sm" />
    </Preview>
  )
}

export function TextareaWithField() {
  return (
    <Preview>
      <Field className="w-sm">
        <FieldLabel htmlFor="preview-message">Your message</FieldLabel>
        <Textarea id="preview-message" placeholder="Type your message here." />
        <FieldDescription>Your message will be copied to the support team.</FieldDescription>
      </Field>
    </Preview>
  )
}

export function TextareaDisabled() {
  return (
    <Preview>
      <Field data-disabled="true" className="w-sm">
        <FieldLabel htmlFor="preview-disabled-message">Your message</FieldLabel>
        <Textarea id="preview-disabled-message" placeholder="Type your message here." disabled />
        <FieldDescription>Your message will be copied to the support team.</FieldDescription>
      </Field>
    </Preview>
  )
}

export function TextareaInvalid() {
  return (
    <Preview>
      <Field data-invalid="true" className="w-sm">
        <FieldLabel htmlFor="preview-invalid-message">Your message</FieldLabel>
        <Textarea id="preview-invalid-message" aria-invalid="true" placeholder="Type your message here." />
        <FieldError>Your message must be at least 10 characters.</FieldError>
      </Field>
    </Preview>
  )
}

export function TextareaWithButton() {
  return (
    <Preview>
      <div className="flex w-sm flex-col gap-2">
        <Textarea placeholder="Type your message here." />
        <Button variant="brand" className="self-end">
          Send message
        </Button>
      </div>
    </Preview>
  )
}
