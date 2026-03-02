import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox, Label } from "@arc/ui";

const meta: Meta<typeof Checkbox> = {
  title: "Arc UI/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="disabled" disabled />
      <Label htmlFor="disabled">Disabled</Label>
    </div>
  ),
};
