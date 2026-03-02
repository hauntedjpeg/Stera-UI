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

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      <Button variant="brand">Brand</Button>
      <Button variant="accent">Accent</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="subtle">Subtle</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
      <Button disabled>Disabeld</Button>
    </div>
  ),
};

export const Size: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      <Button size="xs">Button</Button>
      <Button size="sm">Button</Button>
      <Button size="md">Button</Button>
      <Button size="lg">Button</Button>
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      <Button size="xs-icon-left"><SiSquareDashed />Button</Button>
      <Button size="sm-icon-left"><SiSquareDashed />Button</Button>
      <Button size="md-icon-left"><SiSquareDashed />Button</Button>
      <Button size="lg-icon-left"><SiSquareDashed />Button</Button>
    </div>
  ),
};

export const Icon: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      <Button size="icon-xs"><SiSquareDashed /></Button>
      <Button size="icon-sm"><SiSquareDashed /></Button>
      <Button size="icon"><SiSquareDashed /></Button>
      <Button size="icon-lg"><SiSquareDashed /></Button>
    </div>
  ),
};
