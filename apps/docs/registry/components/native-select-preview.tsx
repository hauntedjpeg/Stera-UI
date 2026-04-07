"use client"

import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "@/components/ui/native-select"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import { Preview } from "@/components/preview"

export function NativeSelectDefault() {
  return (
    <Preview>
      <NativeSelect>
        <NativeSelectOption value="">Select an option</NativeSelectOption>
        <NativeSelectOption value="apple">Apple</NativeSelectOption>
        <NativeSelectOption value="banana">Banana</NativeSelectOption>
        <NativeSelectOption value="cherry">Cherry</NativeSelectOption>
      </NativeSelect>
    </Preview>
  )
}

export function NativeSelectWithField() {
  return (
    <Preview>
      <Field className="w-sm">
        <FieldLabel htmlFor="preview-fruit">Fruit</FieldLabel>
        <NativeSelect id="preview-fruit" className="w-full">
          <NativeSelectOption value="">Select a fruit</NativeSelectOption>
          <NativeSelectOption value="apple">Apple</NativeSelectOption>
          <NativeSelectOption value="banana">Banana</NativeSelectOption>
          <NativeSelectOption value="cherry">Cherry</NativeSelectOption>
        </NativeSelect>
        <FieldDescription>Choose your favourite fruit.</FieldDescription>
      </Field>
    </Preview>
  )
}

export function NativeSelectWithOptGroup() {
  return (
    <Preview>
      <Field className="w-sm">
        <FieldLabel htmlFor="preview-country">Country</FieldLabel>
        <NativeSelect id="preview-country" className="w-full">
          <NativeSelectOption value="">Select a country</NativeSelectOption>
          <NativeSelectOptGroup label="North America">
            <NativeSelectOption value="us">United States</NativeSelectOption>
            <NativeSelectOption value="ca">Canada</NativeSelectOption>
            <NativeSelectOption value="mx">Mexico</NativeSelectOption>
          </NativeSelectOptGroup>
          <NativeSelectOptGroup label="Europe">
            <NativeSelectOption value="gb">United Kingdom</NativeSelectOption>
            <NativeSelectOption value="de">Germany</NativeSelectOption>
            <NativeSelectOption value="fr">France</NativeSelectOption>
          </NativeSelectOptGroup>
        </NativeSelect>
      </Field>
    </Preview>
  )
}

export function NativeSelectSizes() {
  return (
    <Preview>
      <div className="flex flex-col gap-4">
        {(["sm", "md", "lg", "xl"] as const).map((size) => (
          <div key={size} className="flex flex-col gap-1">
            <span className="text-text-tertiary text-xs">{size}</span>
            <NativeSelect size={size}>
              <NativeSelectOption value="">Select an option</NativeSelectOption>
              <NativeSelectOption value="a">Option A</NativeSelectOption>
              <NativeSelectOption value="b">Option B</NativeSelectOption>
            </NativeSelect>
          </div>
        ))}
      </div>
    </Preview>
  )
}

export function NativeSelectDisabled() {
  return (
    <Preview>
      <Field data-disabled="true" className="w-sm">
        <FieldLabel htmlFor="preview-disabled-select">Role</FieldLabel>
        <NativeSelect id="preview-disabled-select" disabled defaultValue="admin" className="w-full">
          <NativeSelectOption value="admin">Admin</NativeSelectOption>
          <NativeSelectOption value="editor">Editor</NativeSelectOption>
          <NativeSelectOption value="viewer">Viewer</NativeSelectOption>
        </NativeSelect>
        <FieldDescription>Contact your administrator to change your role.</FieldDescription>
      </Field>
    </Preview>
  )
}
