import type { Meta, StoryObj } from "@storybook/react";
import { Spinner } from "@arc/ui";

const meta: Meta<typeof Spinner> = {
  title: "Arc UI/Spinner",
  component: Spinner,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {};
