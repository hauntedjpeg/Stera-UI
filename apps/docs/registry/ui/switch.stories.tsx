import type { Meta, StoryObj } from "@storybook/react-vite"

import { Switch } from "./switch"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "./field"

const meta: Meta<typeof Switch> = {
  title: "UI/Switch",
  component: Switch,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof Switch>

export const Default: Story = {
  render: () => (
    <Field orientation="horizontal">
      <Switch id="default-switch" />
      <FieldLabel htmlFor="default-switch">Airplane Mode</FieldLabel>
    </Field>
  ),
}

export const Description: Story = {
  parameters: {
    layout: "padded",
  },
  render: () => (
    <Field orientation="horizontal" className="max-w-sm">
      <FieldContent>
        <FieldLabel htmlFor="description-switch">Marketing emails</FieldLabel>
        <FieldDescription>
          Receive emails about new products, features, and more.
        </FieldDescription>
      </FieldContent>
      <Switch id="description-switch" />
    </Field>
  ),
}

export const ChoiceCard: Story = {
  parameters: {
    layout: "padded",
  },
  render: () => (
    <FieldGroup className="max-w-sm">
      <FieldLabel>
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>Marketing emails</FieldTitle>
            <FieldDescription>
              Receive emails about new products, features, and more.
            </FieldDescription>
          </FieldContent>
          <Switch name="choice-marketing" defaultChecked />
        </Field>
      </FieldLabel>
      <FieldLabel>
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>Security emails</FieldTitle>
            <FieldDescription>
              Receive emails about your account security.
            </FieldDescription>
          </FieldContent>
          <Switch name="choice-security" defaultChecked />
        </Field>
      </FieldLabel>
    </FieldGroup>
  ),
}

export const Disabled: Story = {
  render: () => (
    <Field orientation="horizontal" data-disabled="true">
      <Switch id="disabled-switch" disabled />
      <FieldLabel htmlFor="disabled-switch">Airplane Mode</FieldLabel>
    </Field>
  ),
}

export const Invalid: Story = {
  render: () => (
    <Field orientation="horizontal" data-invalid="true">
      <Switch id="invalid-switch" aria-invalid="true" />
      <FieldLabel htmlFor="invalid-switch">Airplane Mode</FieldLabel>
    </Field>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Field orientation="horizontal">
        <Switch id="size-default" size="default" />
        <FieldLabel htmlFor="size-default">Default</FieldLabel>
      </Field>
      <Field orientation="horizontal">
        <Switch id="size-sm" size="sm" />
        <FieldLabel htmlFor="size-sm">Small</FieldLabel>
      </Field>
    </div>
  ),
}
