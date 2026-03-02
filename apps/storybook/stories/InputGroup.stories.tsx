import type { Meta, StoryObj } from "@storybook/react";
import { InputGroup, InputGroupInput, InputGroupText } from "@arc/ui";

const meta: Meta<typeof InputGroup> = {
  title: "Arc UI/InputGroup",
  component: InputGroup,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof InputGroup>;

export const Default: Story = {
  render: () => (
    <InputGroup>
      <InputGroupText>https://</InputGroupText>
      <InputGroupInput placeholder="example.com" />
    </InputGroup>
  ),
};
