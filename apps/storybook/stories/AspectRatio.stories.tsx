import type { Meta, StoryObj } from "@storybook/react";
import { AspectRatio } from "@arc/ui";

const meta: Meta<typeof AspectRatio> = {
  title: "Arc UI/AspectRatio",
  component: AspectRatio,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof AspectRatio>;

export const Default: Story = {
  render: () => (
    <div className="w-[450px]">
      <AspectRatio ratio={16 / 9} className="bg-muted rounded-md flex items-center justify-center">
        <span className="text-muted-foreground text-sm">16:9</span>
      </AspectRatio>
    </div>
  ),
};
