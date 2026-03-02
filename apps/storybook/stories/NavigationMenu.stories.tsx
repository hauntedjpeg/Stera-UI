import type { Meta, StoryObj } from "@storybook/react";
import {
  NavigationMenu, NavigationMenuList, NavigationMenuItem,
  NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink,
} from "@arc/ui";

const meta: Meta<typeof NavigationMenu> = {
  title: "Arc UI/NavigationMenu",
  component: NavigationMenu,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof NavigationMenu>;

export const Default: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-3 p-6 w-[400px]">
              <NavigationMenuLink href="#">Introduction</NavigationMenuLink>
              <NavigationMenuLink href="#">Installation</NavigationMenuLink>
              <NavigationMenuLink href="#">Typography</NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-3 p-6 w-[400px]">
              <NavigationMenuLink href="#">Alert Dialog</NavigationMenuLink>
              <NavigationMenuLink href="#">Hover Card</NavigationMenuLink>
              <NavigationMenuLink href="#">Progress</NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};
