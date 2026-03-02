import type { Meta, StoryObj } from "@storybook/react";
import { Progress } from "@arc/ui";

const meta: Meta<typeof Progress> = {
  title: "Arc UI/Progress",
  component: Progress,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Progress>;

export const Default: Story = { args: { value: 60 } };
export const Empty: Story = { args: { value: 0 } };
export const Full: Story = { args: { value: 100 } };
