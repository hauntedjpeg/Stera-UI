"use client"

import {
  SiFolder,
  SiMore,
  SiPencil,
  SiPlus,
  SiShare,
  SiTrash,
} from "stera-icons"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

const projects = ["Design system", "Marketing site", "Mobile app"]

export default function SidebarActions() {
  return (
    <div className="flex h-100 w-full transform-[translateZ(0)] overflow-hidden rounded-lg border">
      <SidebarProvider className="min-h-0">
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Projects</SidebarGroupLabel>
              <SidebarGroupAction title="Add project">
                <SiPlus />
                <span className="sr-only">Add project</span>
              </SidebarGroupAction>
              <SidebarGroupContent>
                <SidebarMenu>
                  {projects.map((project) => (
                    <SidebarMenuItem key={project}>
                      <SidebarMenuButton render={<a href="#" />}>
                        <SiFolder />
                        <span>{project}</span>
                      </SidebarMenuButton>
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          render={<SidebarMenuAction showOnHover />}
                        >
                          <SiMore />
                          <span className="sr-only">More</span>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent side="right" align="start">
                          <DropdownMenuItem>
                            <SiPencil />
                            Rename
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <SiShare />
                            Share
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem variant="danger">
                            <SiTrash />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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
