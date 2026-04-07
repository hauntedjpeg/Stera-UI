"use client"

import {
  SiBell,
  SiCode,
  SiHome,
  SiLayoutGrid,
  SiSettings,
  SiUser,
} from "stera-icons"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export function SidebarDefault() {
  return (
    <div className="rounded-lg border overflow-hidden h-[400px] flex">
      <SidebarProvider>
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Application</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive render={<a href="#" />}>
                    <SiHome /><span>Home</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton render={<a href="#" />}>
                    <SiSettings /><span>Settings</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton render={<a href="#" />}>
                    <SiUser /><span>Profile</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <header className="flex h-14 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <span className="text-sm text-muted-foreground">Main content</span>
          </header>
          <div className="flex flex-1 items-center justify-center p-8 text-muted-foreground text-sm">
            Content area
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}

export function SidebarWithBadge() {
  return (
    <div className="rounded-lg border overflow-hidden h-[400px] flex">
      <SidebarProvider>
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Inbox</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton render={<a href="#" />}>
                    <SiHome /><span>Home</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton render={<a href="#" />}>
                    <SiBell /><span>Notifications</span>
                  </SidebarMenuButton>
                  <SidebarMenuBadge>24</SidebarMenuBadge>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton render={<a href="#" />}>
                    <SiCode /><span>Messages</span>
                  </SidebarMenuButton>
                  <SidebarMenuBadge>3</SidebarMenuBadge>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton render={<a href="#" />}>
                    <SiUser /><span>Profile</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <header className="flex h-14 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
          </header>
          <div className="flex flex-1 items-center justify-center p-8 text-muted-foreground text-sm">
            Content area
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}

export function SidebarVariants() {
  return (
    <div className="flex gap-4">
      <div className="rounded-lg border overflow-hidden h-[300px] flex flex-1">
        <SidebarProvider>
          <Sidebar variant="floating">
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Floating</SidebarGroupLabel>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton isActive render={<a href="#" />}>
                      <SiHome /><span>Home</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton render={<a href="#" />}>
                      <SiSettings /><span>Settings</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <SidebarInset>
            <header className="flex h-14 items-center gap-2 border-b px-4">
              <SidebarTrigger className="-ml-1" />
            </header>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </div>
  )
}

