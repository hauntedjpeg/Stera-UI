import type { Meta, StoryObj } from "@storybook/react";
import { Empty, EmptyTitle, EmptyDescription } from "@arc/ui";
import { Inbox } from "lucide-react";

const meta: Meta<typeof Empty> = {
  title: "Arc UI/Empty",
  component: Empty,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Empty>;

export const Default: Story = {
  render: () => (
    <Empty>
      <Inbox className="size-12 text-muted-foreground" />
      <EmptyTitle>No results</EmptyTitle>
      <EmptyDescription>There are no items to display.</EmptyDescription>
    </Empty>
  ),
};
