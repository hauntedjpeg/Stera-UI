"use client"

import {
  SiCalendar,
  SiFolder,
  SiHome,
  SiInbox,
  SiLayoutGrid,
  SiSettings,
} from "stera-icons"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"

const items = [
  { title: "Home", icon: SiHome, active: true },
  { title: "Inbox", icon: SiInbox },
  { title: "Projects", icon: SiFolder },
  { title: "Calendar", icon: SiCalendar },
]

export default function SidebarIcon() {
  return (
    <div className="flex h-100 w-full transform-[translateZ(0)] overflow-hidden rounded-lg border">
      <SidebarProvider className="min-h-0" defaultOpen={false}>
        <Sidebar collapsible="icon">
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg" tooltip="Acme Inc">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-surface-brand-subtle text-ink-brand">
                    <SiLayoutGrid />
                  </div>
                  <span className="truncate st-label-md-medium">Acme Inc</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Workspace</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        isActive={item.active}
                        tooltip={item.title}
                        render={<a href="#" />}
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Settings" render={<a href="#" />}>
                  <SiSettings />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
          </header>
          <div className="flex flex-1 items-center justify-center p-8 st-body-md text-ink-subtler">
            Main content area
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}
