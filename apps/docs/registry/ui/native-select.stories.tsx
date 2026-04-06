import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "./field"
import { Button } from "./button"
import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "./native-select"

const meta: Meta<typeof NativeSelect> = {
  title: "UI/NativeSelect",
  component: NativeSelect,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
    },
  },
}

export default meta
type Story = StoryObj<typeof NativeSelect>

export const Default: Story = {
  render: () => (
    <NativeSelect>
      <NativeSelectOption value="">Select an option</NativeSelectOption>
      <NativeSelectOption value="apple">Apple</NativeSelectOption>
      <NativeSelectOption value="banana">Banana</NativeSelectOption>
      <NativeSelectOption value="cherry">Cherry</NativeSelectOption>
    </NativeSelect>
  ),
}

export const WithField: Story = {
  render: () => (
    <Field className="w-sm">
      <FieldLabel htmlFor="fruit">Fruit</FieldLabel>
      <NativeSelect id="fruit">
        <NativeSelectOption value="">Select a fruit</NativeSelectOption>
        <NativeSelectOption value="apple">Apple</NativeSelectOption>
        <NativeSelectOption value="banana">Banana</NativeSelectOption>
        <NativeSelectOption value="cherry">Cherry</NativeSelectOption>
      </NativeSelect>
      <FieldDescription>Choose your favourite fruit.</FieldDescription>
    </Field>
  ),
}

export const WithOptGroup: Story = {
  render: () => (
    <Field className="w-sm">
      <FieldLabel htmlFor="country">Country</FieldLabel>
      <NativeSelect id="country">
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
  ),
}

export const Sizes: Story = {
  render: () => (
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
  ),
}

export const Disabled: Story = {
  render: () => (
    <Field data-disabled="true" className="w-sm">
      <FieldLabel htmlFor="disabled-select">Role</FieldLabel>
      <NativeSelect id="disabled-select" disabled defaultValue="admin">
        <NativeSelectOption value="admin">Admin</NativeSelectOption>
        <NativeSelectOption value="editor">Editor</NativeSelectOption>
        <NativeSelectOption value="viewer">Viewer</NativeSelectOption>
      </NativeSelect>
      <FieldDescription>Contact your administrator to change your role.</FieldDescription>
    </Field>
  ),
}

export const Invalid: Story = {
  render: () => (
    <Field data-invalid="true" className="w-sm">
      <FieldLabel htmlFor="invalid-select">Department</FieldLabel>
      <NativeSelect id="invalid-select" aria-invalid="true" defaultValue="">
        <NativeSelectOption value="">Select a department</NativeSelectOption>
        <NativeSelectOption value="eng">Engineering</NativeSelectOption>
        <NativeSelectOption value="design">Design</NativeSelectOption>
        <NativeSelectOption value="pm">Product</NativeSelectOption>
      </NativeSelect>
      <FieldError>Please select a department.</FieldError>
    </Field>
  ),
}

export const Form: Story = {
  parameters: {
    layout: "padded",
  },
  render: () => (
    <FieldGroup className="w-sm">
      <Field>
        <FieldLabel htmlFor="form-role">Role</FieldLabel>
        <NativeSelect id="form-role" className="w-full">
          <NativeSelectOption value="">Select a role</NativeSelectOption>
          <NativeSelectOption value="admin">Admin</NativeSelectOption>
          <NativeSelectOption value="editor">Editor</NativeSelectOption>
          <NativeSelectOption value="viewer">Viewer</NativeSelectOption>
        </NativeSelect>
      </Field>
      <Field>
        <FieldLabel htmlFor="form-country">Country</FieldLabel>
        <NativeSelect id="form-country" className="w-full">
          <NativeSelectOption value="">Select a country</NativeSelectOption>
          <NativeSelectOptGroup label="North America">
            <NativeSelectOption value="us">United States</NativeSelectOption>
            <NativeSelectOption value="ca">Canada</NativeSelectOption>
          </NativeSelectOptGroup>
          <NativeSelectOptGroup label="Europe">
            <NativeSelectOption value="gb">United Kingdom</NativeSelectOption>
            <NativeSelectOption value="de">Germany</NativeSelectOption>
          </NativeSelectOptGroup>
        </NativeSelect>
        <FieldDescription>We'll use this to localise your experience.</FieldDescription>
      </Field>
      <div className="flex justify-end gap-2">
        <Button variant="outline" type="reset">Cancel</Button>
        <Button variant="brand" type="submit">Save</Button>
      </div>
    </FieldGroup>
  ),
}
