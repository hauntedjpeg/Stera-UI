import type { Meta, StoryObj } from "@storybook/react";
import { Slider } from "@arc/ui";

const meta: Meta<typeof Slider> = {
  title: "Arc UI/Slider",
  component: Slider,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  args: { defaultValue: [50], max: 100, step: 1, className: "w-[60%]" },
};
