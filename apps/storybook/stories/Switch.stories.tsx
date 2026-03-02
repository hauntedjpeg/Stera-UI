import type { Meta, StoryObj } from "@storybook/react";
import { Switch, Label } from "@arc/ui";

const meta: Meta<typeof Switch> = {
  title: "Arc UI/Switch",
  component: Switch,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Switch id="airplane" />
      <Label htmlFor="airplane">Airplane Mode</Label>
    </div>
  ),
};
