import type { Meta, StoryObj } from "@storybook/react";
import { Item, ItemContent, ItemTitle, ItemDescription, ItemGroup } from "@arc/ui";

const meta: Meta<typeof Item> = {
  title: "Arc UI/Item",
  component: Item,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Item>;

export const Default: Story = {
  render: () => (
    <ItemGroup>
      <Item>
        <ItemContent>
          <ItemTitle>Item One</ItemTitle>
          <ItemDescription>Description for item one.</ItemDescription>
        </ItemContent>
      </Item>
      <Item>
        <ItemContent>
          <ItemTitle>Item Two</ItemTitle>
          <ItemDescription>Description for item two.</ItemDescription>
        </ItemContent>
      </Item>
    </ItemGroup>
  ),
};
