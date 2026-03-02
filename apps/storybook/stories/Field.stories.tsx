import type { Meta, StoryObj } from "@storybook/react";
import { Field, FieldLabel, FieldDescription, FieldError, Input } from "@arc/ui";

const meta: Meta<typeof Field> = {
  title: "Arc UI/Field",
  component: Field,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Field>;

export const Default: Story = {
  render: () => (
    <Field>
      <FieldLabel>Email</FieldLabel>
      <Input type="email" placeholder="Enter your email" />
      <FieldDescription>We'll never share your email.</FieldDescription>
    </Field>
  ),
};

export const WithError: Story = {
  render: () => (
    <Field>
      <FieldLabel>Email</FieldLabel>
      <Input type="email" placeholder="Enter your email" aria-invalid />
      <FieldError>Please enter a valid email address.</FieldError>
    </Field>
  ),
};
