import type { Meta, StoryObj } from "@storybook/react-vite"

import { Button } from "./button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "./field"
import { Textarea } from "./textarea"

const meta: Meta<typeof Textarea> = {
  title: "UI/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof Textarea>

export const Default: Story = {
  render: () => <Textarea placeholder="Type your message here." />,
}

export const WithField: Story = {
  render: () => (
    <Field className="w-sm">
      <FieldLabel htmlFor="message">Your message</FieldLabel>
      <Textarea id="message" placeholder="Type your message here." />
      <FieldDescription>
        Your message will be copied to the support team.
      </FieldDescription>
    </Field>
  ),
}

export const Disabled: Story = {
  render: () => (
    <Field data-disabled="true" className="w-sm">
      <FieldLabel htmlFor="disabled-message">Your message</FieldLabel>
      <Textarea
        id="disabled-message"
        placeholder="Type your message here."
        disabled
      />
      <FieldDescription>
        Your message will be copied to the support team.
      </FieldDescription>
    </Field>
  ),
}

export const Invalid: Story = {
  render: () => (
    <Field data-invalid="true" className="w-sm">
      <FieldLabel htmlFor="invalid-message">Your message</FieldLabel>
      <Textarea
        id="invalid-message"
        aria-invalid="true"
        placeholder="Type your message here."
      />
      <FieldError>Your message must be at least 10 characters.</FieldError>
    </Field>
  ),
}

export const WithButton: Story = {
  render: () => (
    <div className="flex w-sm flex-col gap-2">
      <Textarea placeholder="Type your message here." />
      <Button variant="brand" className="self-end">
        Send message
      </Button>
    </div>
  ),
}
