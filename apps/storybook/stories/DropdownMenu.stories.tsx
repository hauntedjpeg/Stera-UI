import type { Meta, StoryObj } from "@storybook/react";
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuShortcut, Button,
} from "@arc/ui";
import { Cloud, CreditCard, Keyboard, LifeBuoy, LogOut, Settings, User } from "lucide-react";

const meta: Meta<typeof DropdownMenu> = {
  title: "Arc UI/DropdownMenu",
  component: DropdownMenu,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof DropdownMenu>;

export const Default: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem><User className="mr-2 size-4" /> Profile <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut></DropdownMenuItem>
          <DropdownMenuItem><CreditCard className="mr-2 size-4" /> Billing <DropdownMenuShortcut>⌘B</DropdownMenuShortcut></DropdownMenuItem>
          <DropdownMenuItem><Settings className="mr-2 size-4" /> Settings <DropdownMenuShortcut>⌘S</DropdownMenuShortcut></DropdownMenuItem>
          <DropdownMenuItem><Keyboard className="mr-2 size-4" /> Keyboard shortcuts <DropdownMenuShortcut>⌘K</DropdownMenuShortcut></DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem><LifeBuoy className="mr-2 size-4" /> Support</DropdownMenuItem>
        <DropdownMenuItem><Cloud className="mr-2 size-4" /> API</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem><LogOut className="mr-2 size-4" /> Log out <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut></DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};
