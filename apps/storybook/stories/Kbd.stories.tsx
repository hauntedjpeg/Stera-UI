import type { Meta, StoryObj } from "@storybook/react";
import { Kbd, KbdGroup } from "@arc/ui";

const meta: Meta<typeof Kbd> = {
  title: "Arc UI/Kbd",
  component: Kbd,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Kbd>;

export const Default: Story = { args: { children: "⌘" } };

export const Group: Story = {
  render: () => (
    <KbdGroup>
      <Kbd>⌘</Kbd>
      <Kbd>K</Kbd>
    </KbdGroup>
  ),
};
