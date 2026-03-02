import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@arc/ui";
import { Mail } from "lucide-react";

const meta: Meta<typeof Button> = {
  title: "Arc UI/Button",
  component: Button,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = { args: { children: "Button" } };
export const Secondary: Story = { args: { variant: "secondary", children: "Secondary" } };
export const Destructive: Story = { args: { variant: "destructive", children: "Destructive" } };
export const Outline: Story = { args: { variant: "outline", children: "Outline" } };
export const Ghost: Story = { args: { variant: "ghost", children: "Ghost" } };
export const Link: Story = { args: { variant: "link", children: "Link" } };

export const WithIcon: Story = {
  render: () => (
    <Button>
      <Mail /> Login with Email
    </Button>
  ),
};

export const Small: Story = { args: { size: "sm", children: "Small" } };
export const Large: Story = { args: { size: "lg", children: "Large" } };
export const Disabled: Story = { args: { disabled: true, children: "Disabled" } };
