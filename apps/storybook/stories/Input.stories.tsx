import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "@arc/ui";

const meta: Meta<typeof Input> = {
  title: "Arc UI/Input",
  component: Input,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = { args: { type: "text", placeholder: "Enter text..." } };
export const Email: Story = { args: { type: "email", placeholder: "Email address" } };
export const Password: Story = { args: { type: "password", placeholder: "Password" } };
export const File: Story = { args: { type: "file" } };
export const Disabled: Story = { args: { placeholder: "Disabled", disabled: true } };
