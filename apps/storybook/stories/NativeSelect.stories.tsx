import type { Meta, StoryObj } from "@storybook/react";
import { NativeSelect, NativeSelectOption, NativeSelectOptGroup } from "@arc/ui";

const meta: Meta<typeof NativeSelect> = {
  title: "Arc UI/NativeSelect",
  component: NativeSelect,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof NativeSelect>;

export const Default: Story = {
  render: () => (
    <NativeSelect>
      <NativeSelectOption value="">Select a fruit</NativeSelectOption>
      <NativeSelectOption value="apple">Apple</NativeSelectOption>
      <NativeSelectOption value="banana">Banana</NativeSelectOption>
      <NativeSelectOption value="cherry">Cherry</NativeSelectOption>
    </NativeSelect>
  ),
};

export const WithGroups: Story = {
  render: () => (
    <NativeSelect>
      <NativeSelectOptGroup label="Fruits">
        <NativeSelectOption value="apple">Apple</NativeSelectOption>
        <NativeSelectOption value="banana">Banana</NativeSelectOption>
      </NativeSelectOptGroup>
      <NativeSelectOptGroup label="Vegetables">
        <NativeSelectOption value="carrot">Carrot</NativeSelectOption>
        <NativeSelectOption value="broccoli">Broccoli</NativeSelectOption>
      </NativeSelectOptGroup>
    </NativeSelect>
  ),
};
