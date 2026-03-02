import type { Meta, StoryObj } from "@storybook/react";
import {
  SidebarProvider, Sidebar, SidebarContent, SidebarGroup,
  SidebarGroupLabel, SidebarGroupContent, SidebarMenu,
  SidebarMenuItem, SidebarMenuButton, SidebarHeader, SidebarFooter,
} from "@arc/ui";
import { Home, Settings, User } from "lucide-react";

const meta: Meta<typeof Sidebar> = {
  title: "Arc UI/Sidebar",
  component: Sidebar,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {
  render: () => (
    <SidebarProvider>
      <div className="flex min-h-[400px] w-full">
        <Sidebar>
          <SidebarHeader className="p-4 font-semibold">App</SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <Home className="size-4" /> Home
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <User className="size-4" /> Profile
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <Settings className="size-4" /> Settings
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="p-4 text-sm text-muted-foreground">v1.0.0</SidebarFooter>
        </Sidebar>
        <main className="flex-1 p-8">Main content</main>
      </div>
    </SidebarProvider>
  ),
};
