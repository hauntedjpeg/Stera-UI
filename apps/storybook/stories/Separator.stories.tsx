import type { Meta, StoryObj } from "@storybook/react";
import { Separator } from "@arc/ui";

const meta: Meta<typeof Separator> = {
  title: "Arc UI/Separator",
  component: Separator,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Separator>;

export const Horizontal: Story = {
  render: () => (
    <div className="space-y-1">
      <h4 className="text-sm font-medium leading-none">Radix Primitives</h4>
      <p className="text-sm text-muted-foreground">An open-source UI component library.</p>
      <Separator className="my-4" />
      <div className="flex h-5 items-center gap-4 text-sm">
        <div>Blog</div>
        <Separator orientation="vertical" />
        <div>Docs</div>
        <Separator orientation="vertical" />
        <div>Source</div>
      </div>
    </div>
  ),
};
