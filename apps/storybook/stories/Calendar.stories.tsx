import type { Meta, StoryObj } from "@storybook/react";
import { Calendar } from "@arc/ui";

const meta: Meta<typeof Calendar> = {
  title: "Arc UI/Calendar",
  component: Calendar,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Calendar>;

export const Default: Story = {
  args: { className: "rounded-md border" },
};
