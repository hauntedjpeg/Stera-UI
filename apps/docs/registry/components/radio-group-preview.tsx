"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import { Preview } from "@/components/preview"

export function RadioGroupDefault() {
  return (
    <Preview>
      <RadioGroup defaultValue="comfortable" className="w-fit">
        <Field orientation="horizontal">
          <RadioGroupItem value="default" id="preview-r1" />
          <FieldLabel htmlFor="preview-r1">Default</FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <RadioGroupItem value="comfortable" id="preview-r2" />
          <FieldLabel htmlFor="preview-r2">Comfortable</FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <RadioGroupItem value="compact" id="preview-r3" />
          <FieldLabel htmlFor="preview-r3">Compact</FieldLabel>
        </Field>
      </RadioGroup>
    </Preview>
  )
}

export function RadioGroupWithDescription() {
  return (
    <Preview>
      <RadioGroup defaultValue="comfortable" className="w-fit">
        <Field orientation="horizontal">
          <RadioGroupItem value="default" id="preview-desc-r1" />
          <FieldContent>
            <FieldLabel htmlFor="preview-desc-r1">Default</FieldLabel>
            <FieldDescription>Standard spacing for most use cases.</FieldDescription>
          </FieldContent>
        </Field>
        <Field orientation="horizontal">
          <RadioGroupItem value="comfortable" id="preview-desc-r2" />
          <FieldContent>
            <FieldLabel htmlFor="preview-desc-r2">Comfortable</FieldLabel>
            <FieldDescription>More space between elements.</FieldDescription>
          </FieldContent>
        </Field>
        <Field orientation="horizontal">
          <RadioGroupItem value="compact" id="preview-desc-r3" />
          <FieldContent>
            <FieldLabel htmlFor="preview-desc-r3">Compact</FieldLabel>
            <FieldDescription>Minimal spacing for dense layouts.</FieldDescription>
          </FieldContent>
        </Field>
      </RadioGroup>
    </Preview>
  )
}

export function RadioGroupFieldset() {
  return (
    <Preview>
      <FieldSet className="w-full max-w-xs">
        <FieldLegend variant="label">Subscription Plan</FieldLegend>
        <FieldDescription>Yearly and lifetime plans offer significant savings.</FieldDescription>
        <RadioGroup defaultValue="monthly">
          <Field orientation="horizontal">
            <RadioGroupItem value="monthly" id="preview-plan-monthly" />
            <FieldLabel htmlFor="preview-plan-monthly" className="font-normal">
              Monthly ($9.99/month)
            </FieldLabel>
          </Field>
          <Field orientation="horizontal">
            <RadioGroupItem value="yearly" id="preview-plan-yearly" />
            <FieldLabel htmlFor="preview-plan-yearly" className="font-normal">
              Yearly ($99.99/year)
            </FieldLabel>
          </Field>
          <Field orientation="horizontal">
            <RadioGroupItem value="lifetime" id="preview-plan-lifetime" />
            <FieldLabel htmlFor="preview-plan-lifetime" className="font-normal">
              Lifetime ($299.99)
            </FieldLabel>
          </Field>
        </RadioGroup>
      </FieldSet>
    </Preview>
  )
}

export function RadioGroupDisabled() {
  return (
    <Preview>
      <RadioGroup defaultValue="option2" className="w-fit">
        <Field orientation="horizontal" data-disabled>
          <RadioGroupItem value="option1" id="preview-disabled-r1" disabled />
          <FieldLabel htmlFor="preview-disabled-r1" className="font-normal">Disabled</FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <RadioGroupItem value="option2" id="preview-disabled-r2" />
          <FieldLabel htmlFor="preview-disabled-r2" className="font-normal">Option 2</FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <RadioGroupItem value="option3" id="preview-disabled-r3" />
          <FieldLabel htmlFor="preview-disabled-r3" className="font-normal">Option 3</FieldLabel>
        </Field>
      </RadioGroup>
    </Preview>
  )
}
