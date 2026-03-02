import type { Meta, StoryObj } from "@storybook/react";
import { Label, Input } from "@arc/ui";

const meta: Meta<typeof Label> = {
  title: "Arc UI/Label",
  component: Label,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = { args: { children: "Email" } };

export const WithInput: Story = {
  render: () => (
    <div className="grid w-full max-w-sm gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="Email" />
    </div>
  ),
};
