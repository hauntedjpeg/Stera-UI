"use client"

import { SiHome, SiSettings, SiUser } from "stera-icons"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default function SidebarVariants() {
  return (
    <div className="rounded-lg border overflow-hidden h-[400px] flex transform-[translateZ(0)]">
      <SidebarProvider>
        <Sidebar variant="floating">
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
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
          </header>
          <div className="flex flex-1 items-center justify-center p-8 text-text-secondary">
            Main content area
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}
