import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "@arc/ui";

const meta: Meta<typeof Textarea> = {
  title: "Arc UI/Textarea",
  component: Textarea,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = { args: { placeholder: "Type your message here." } };
export const Disabled: Story = { args: { placeholder: "Disabled", disabled: true } };
