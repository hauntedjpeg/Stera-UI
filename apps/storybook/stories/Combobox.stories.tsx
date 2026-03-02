import type { Meta, StoryObj } from "@storybook/react";
import {
  Combobox, ComboboxTrigger, ComboboxContent,
  ComboboxInput, ComboboxList, ComboboxItem, ComboboxEmpty,
} from "@arc/ui";

const meta: Meta<typeof Combobox> = {
  title: "Arc UI/Combobox",
  component: Combobox,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Combobox>;

export const Default: Story = {
  render: () => (
    <Combobox>
      <ComboboxTrigger>
        <ComboboxInput placeholder="Select framework..." />
      </ComboboxTrigger>
      <ComboboxContent>
        <ComboboxList>
          <ComboboxEmpty>No framework found.</ComboboxEmpty>
          <ComboboxItem value="next">Next.js</ComboboxItem>
          <ComboboxItem value="remix">Remix</ComboboxItem>
          <ComboboxItem value="astro">Astro</ComboboxItem>
          <ComboboxItem value="nuxt">Nuxt</ComboboxItem>
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  ),
};
