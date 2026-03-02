import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@arc/ui";
import { SiSquareDashed } from "stera-icons";

const meta: Meta<typeof Button> = {
  title: "Arc UI/Button",
  component: Button,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Button>;

export const Brand: Story = { args: { variant: "brand", children: "Button" } };
export const Secondary: Story = { args: { variant: "secondary", children: "Secondary" } };
export const Destructive: Story = { args: { variant: "destructive", children: "Destructive" } };
export const Outline: Story = { args: { variant: "outline", children: "Outline" } };
export const Ghost: Story = { args: { variant: "ghost", children: "Ghost" } };
export const Link: Story = { args: { variant: "link", children: "Link" } };

export const WithIconDefault: Story = {
  render: () => (
    <Button variant="outline" size="default-icon-left">
      <SiSquareDashed /> Login with Email
    </Button>
  ),
};

export const Small: Story = { args: { variant: "outline", size: "sm", children: "Small" } };
export const WithIconSmall: Story = {
  render: () => (
    <Button variant="outline" size="sm-icon-left">
      <SiSquareDashed /> Login with Email
    </Button>
  ),
};

export const ExtraSmall: Story = { args: { variant: "outline", size: "xs", children: "XSmall" } };
export const WithIconExtraSmall: Story = {
  render: () => (
    <Button variant="outline" size="xs-icon-left">
      <SiSquareDashed /> Login with Email
    </Button>
  ),
};

export const Large: Story = { args: { size: "lg", children: "Large" } };
export const WithIconLarge: Story = {
  render: () => (
    <Button variant="outline" size="lg-icon-left">
      <SiSquareDashed /> Login with Email
    </Button>
  ),
};

export const Disabled: Story = { args: { disabled: true, children: "Disabled" } };
