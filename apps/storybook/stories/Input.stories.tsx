import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "@arc/ui";

const meta: Meta<typeof Input> = {
  title: "Arc UI/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Controls the height and padding of the input",
    },
  },
};
export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = { args: { type: "text", placeholder: "Enter text..." } };
export const Email: Story = { args: { type: "email", placeholder: "Email address" } };
export const Password: Story = { args: { type: "password", placeholder: "Password" } };
export const File: Story = { args: { type: "file" } };
export const Disabled: Story = { args: { placeholder: "Disabled", disabled: true } };

export const Small: Story = { args: { size: "sm", placeholder: "Small input" } };
export const Medium: Story = { args: { size: "md", placeholder: "Medium input" } };
export const Large: Story = { args: { size: "lg", placeholder: "Large input" } };

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3 w-72">
      <Input size="sm" placeholder="Small (sm)" />
      <Input size="md" placeholder="Medium (md)" />
      <Input size="lg" placeholder="Large (lg)" />
    </div>
  ),
};
