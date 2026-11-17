"use client"

import {
  SiCalendar,
  SiChartBar,
  SiDocument,
  SiFolder,
  SiHome,
  SiInbox,
  SiLayoutGrid,
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

const workspace = [
  { title: "Home", icon: SiHome, active: true },
  { title: "Inbox", icon: SiInbox },
  { title: "Projects", icon: SiFolder },
  { title: "Calendar", icon: SiCalendar },
]

const reports = [
  { title: "Analytics", icon: SiChartBar },
  { title: "Documents", icon: SiDocument },
]

export default function SidebarDemo() {
  return (
    <div className="flex h-100 w-full transform-[translateZ(0)] overflow-hidden rounded-lg border">
      <SidebarProvider className="min-h-0">
        <Sidebar>
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-surface-brand-subtle text-ink-brand">
                    <SiLayoutGrid />
                  </div>
                  <div className="grid flex-1">
                    <span className="truncate st-label-md-medium">
                      Acme Inc
                    </span>
                    <span className="truncate st-label-sm text-ink-subtler">
                      Enterprise
                    </span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Workspace</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {workspace.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        isActive={item.active}
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
            <SidebarGroup>
              <SidebarGroupLabel>Reports</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {reports.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton render={<a href="#" />}>
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
                <SidebarMenuButton size="lg">
                  <div className="flex size-8 items-center justify-center rounded-full bg-surface-muted st-label-sm-medium">
                    JD
                  </div>
                  <div className="grid flex-1">
                    <span className="truncate st-label-md-medium">
                      Jamie Doe
                    </span>
                    <span className="truncate st-label-sm text-ink-subtler">
                      jamie@acme.com
                    </span>
                  </div>
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
