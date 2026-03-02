import type { Meta, StoryObj } from "@storybook/react";
import {
  ContextMenu, ContextMenuContent, ContextMenuItem,
  ContextMenuTrigger, ContextMenuSeparator, ContextMenuShortcut,
  ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger,
} from "@arc/ui";

const meta: Meta<typeof ContextMenu> = {
  title: "Arc UI/ContextMenu",
  component: ContextMenu,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof ContextMenu>;

export const Default: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
        Right click here
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem>Back <ContextMenuShortcut>⌘[</ContextMenuShortcut></ContextMenuItem>
        <ContextMenuItem>Forward <ContextMenuShortcut>⌘]</ContextMenuShortcut></ContextMenuItem>
        <ContextMenuItem>Reload <ContextMenuShortcut>⌘R</ContextMenuShortcut></ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuSub>
          <ContextMenuSubTrigger>More Tools</ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            <ContextMenuItem>Save Page As... <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut></ContextMenuItem>
            <ContextMenuItem>Create Shortcut...</ContextMenuItem>
            <ContextMenuItem>Developer Tools</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
      </ContextMenuContent>
    </ContextMenu>
  ),
};
