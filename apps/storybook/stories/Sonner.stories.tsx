import type { Meta, StoryObj } from "@storybook/react";
import { Toaster, Button } from "@arc/ui";
import { toast } from "sonner";

const meta: Meta<typeof Toaster> = {
  title: "Arc UI/Sonner",
  component: Toaster,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Toaster>;

export const Default: Story = {
  render: () => (
    <div>
      <Toaster />
      <Button
        variant="outline"
        onClick={() =>
          toast("Event has been created", {
            description: "Sunday, December 03, 2023 at 9:00 AM",
          })
        }
      >
        Show Toast
      </Button>
    </div>
  ),
};
