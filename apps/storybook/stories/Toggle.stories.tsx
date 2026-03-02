import type { Meta, StoryObj } from "@storybook/react";
import { Toggle } from "@arc/ui";
import { Bold } from "lucide-react";

const meta: Meta<typeof Toggle> = {
  title: "Arc UI/Toggle",
  component: Toggle,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  render: () => (
    <Toggle aria-label="Toggle bold">
      <Bold className="size-4" />
    </Toggle>
  ),
};

export const WithText: Story = {
  render: () => (
    <Toggle aria-label="Toggle italic">
      <Bold className="size-4" />
      Bold
    </Toggle>
  ),
};

export const Outline: Story = {
  render: () => (
    <Toggle variant="outline" aria-label="Toggle bold">
      <Bold className="size-4" />
    </Toggle>
  ),
};
