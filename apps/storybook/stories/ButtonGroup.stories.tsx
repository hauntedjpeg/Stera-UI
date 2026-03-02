import type { Meta, StoryObj } from "@storybook/react";
import { ButtonGroup, Button } from "@arc/ui";

const meta: Meta<typeof ButtonGroup> = {
  title: "Arc UI/ButtonGroup",
  component: ButtonGroup,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof ButtonGroup>;

export const Default: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline">Left</Button>
      <Button variant="outline">Center</Button>
      <Button variant="outline">Right</Button>
    </ButtonGroup>
  ),
};
