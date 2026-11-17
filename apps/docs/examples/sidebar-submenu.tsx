"use client"

import { SiBookOpen, SiCode, SiHome } from "stera-icons"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

const items = [
  { title: "Overview", icon: SiHome },
  {
    title: "Guides",
    icon: SiBookOpen,
    children: [
      { title: "Installation" },
      { title: "Theming", active: true },
      { title: "Dark mode" },
    ],
  },
  {
    title: "API",
    icon: SiCode,
    children: [{ title: "Authentication" }, { title: "Webhooks" }],
  },
]

export default function SidebarSubmenu() {
  return (
    <div className="flex h-100 w-full transform-[translateZ(0)] overflow-hidden rounded-lg border">
      <SidebarProvider className="min-h-0">
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton render={<a href="#" />}>
                        <item.icon />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                      {item.children && (
                        <SidebarMenuSub>
                          {item.children.map((child) => (
                            <SidebarMenuSubItem key={child.title}>
                              <SidebarMenuSubButton
                                href="#"
                                isActive={child.active}
                              >
                                <span>{child.title}</span>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      )}
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
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
