import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "@arc/ui";
import { SiSquareDashed } from "stera-icons";

const meta: Meta<typeof Badge> = {
  title: "Arc UI/Badge",
  component: Badge,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Badge>;


export const Size: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      <Badge size="sm">Badge</Badge>
      <Badge size="md">Badge</Badge>
      <Badge size="lg">Badge</Badge>
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      <Badge size="sm-icon-left"><SiSquareDashed />Badge</Badge>
      <Badge size="md-icon-left"><SiSquareDashed />Badge</Badge>
      <Badge size="lg-icon-left"><SiSquareDashed />Badge</Badge>
    </div>
  ),
};

export const Default: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      <Badge variant="default">Badge</Badge>
      <Badge variant="brand">Badge</Badge>
      <Badge variant="danger">Badge</Badge>
      <Badge variant="success">Badge</Badge>
      <Badge variant="warning">Badge</Badge>
    </div>
  ),
};

export const Outline: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      <Badge variant="default-outline">Badge</Badge>
      <Badge variant="brand-outline">Badge</Badge>
      <Badge variant="danger-outline">Badge</Badge>
      <Badge variant="success-outline">Badge</Badge>
      <Badge variant="warning-outline">Badge</Badge>
    </div>
  ),
};

export const Solid: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      <Badge variant="default-solid">Badge</Badge>
      <Badge variant="brand-solid">Badge</Badge>
      <Badge variant="danger-solid">Badge</Badge>
      <Badge variant="success-solid">Badge</Badge>
      <Badge variant="warning-solid">Badge</Badge>
    </div>
  ),
};


