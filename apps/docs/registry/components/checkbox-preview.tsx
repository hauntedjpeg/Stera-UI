"use client"

import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import { Preview } from "@/components/preview"

export function CheckboxDefault() {
  return (
    <Preview>
      <FieldLabel>
        <Checkbox />
        Accept terms and conditions
      </FieldLabel>
    </Preview>
  )
}

export function CheckboxWithDescription() {
  return (
    <Preview>
      <Field orientation="horizontal">
        <Checkbox id="preview-terms-checkbox" />
        <FieldContent>
          <FieldLabel htmlFor="preview-terms-checkbox">Accept terms and conditions</FieldLabel>
          <FieldDescription>
            By clicking this checkbox, you agree to the terms and conditions.
          </FieldDescription>
        </FieldContent>
      </Field>
    </Preview>
  )
}

export function CheckboxGroup() {
  return (
    <Preview>
      <FieldSet>
        <FieldLegend variant="label">Show these items on the desktop:</FieldLegend>
        <FieldGroup className="gap-3">
          <Field orientation="horizontal">
            <Checkbox id="preview-hard-disks" defaultChecked />
            <FieldLabel htmlFor="preview-hard-disks" className="font-normal">Hard disks</FieldLabel>
          </Field>
          <Field orientation="horizontal">
            <Checkbox id="preview-external-disks" defaultChecked />
            <FieldLabel htmlFor="preview-external-disks" className="font-normal">External disks</FieldLabel>
          </Field>
          <Field orientation="horizontal">
            <Checkbox id="preview-cds" />
            <FieldLabel htmlFor="preview-cds" className="font-normal">CDs, DVDs, and iPods</FieldLabel>
          </Field>
          <Field orientation="horizontal">
            <Checkbox id="preview-servers" />
            <FieldLabel htmlFor="preview-servers" className="font-normal">Connected servers</FieldLabel>
          </Field>
        </FieldGroup>
      </FieldSet>
    </Preview>
  )
}

export function CheckboxDisabled() {
  return (
    <Preview>
      <Field orientation="horizontal" data-disabled="true">
        <Checkbox id="preview-disabled-checkbox" disabled />
        <FieldLabel htmlFor="preview-disabled-checkbox">Enable notifications</FieldLabel>
      </Field>
    </Preview>
  )
}
