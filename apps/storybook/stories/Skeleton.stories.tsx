import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "@arc/ui";

const meta: Meta<typeof Skeleton> = {
  title: "Arc UI/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  ),
};
