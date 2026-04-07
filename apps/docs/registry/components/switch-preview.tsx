"use client"

import { Switch } from "@/components/ui/switch"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"
import { Preview } from "@/components/preview"

export function SwitchDefault() {
  return (
    <Preview>
      <Field orientation="horizontal">
        <Switch id="preview-switch" />
        <FieldLabel htmlFor="preview-switch">Airplane Mode</FieldLabel>
      </Field>
    </Preview>
  )
}

export function SwitchWithDescription() {
  return (
    <Preview>
      <Field orientation="horizontal" className="max-w-sm">
        <FieldContent>
          <FieldLabel htmlFor="preview-marketing-switch">Marketing emails</FieldLabel>
          <FieldDescription>
            Receive emails about new products, features, and more.
          </FieldDescription>
        </FieldContent>
        <Switch id="preview-marketing-switch" />
      </Field>
    </Preview>
  )
}

export function SwitchSizes() {
  return (
    <Preview>
      <div className="flex flex-col gap-4">
        <Field orientation="horizontal">
          <Switch id="preview-size-default" size="default" />
          <FieldLabel htmlFor="preview-size-default">Default</FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <Switch id="preview-size-sm" size="sm" />
          <FieldLabel htmlFor="preview-size-sm">Small</FieldLabel>
        </Field>
      </div>
    </Preview>
  )
}

export function SwitchDisabled() {
  return (
    <Preview>
      <Field orientation="horizontal" data-disabled="true">
        <Switch id="preview-disabled-switch" disabled />
        <FieldLabel htmlFor="preview-disabled-switch">Airplane Mode</FieldLabel>
      </Field>
    </Preview>
  )
}
