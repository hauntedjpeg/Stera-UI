"use client"

import { SiArrowUpRight, SiFolderOpen, SiSearch, SiUsers } from "stera-icons"
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Preview } from "@/components/preview"

export function EmptyDefault() {
  return (
    <Preview>
      <Empty className="w-96">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <SiFolderOpen />
          </EmptyMedia>
          <EmptyTitle>No projects found</EmptyTitle>
          <EmptyDescription>
            You don't have any projects yet. Create your first project to get started.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button>Create project</Button>
        </EmptyContent>
        <Button variant="link" size="sm" className="text-text-secondary">
          Learn more<SiArrowUpRight />
        </Button>
      </Empty>
    </Preview>
  )
}

export function EmptyWithAvatarGroup() {
  return (
    <Preview>
      <Empty className="w-96">
        <EmptyHeader>
          <EmptyMedia>
            <AvatarGroup>
              <Avatar>
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback>AB</AvatarFallback>
              </Avatar>
            </AvatarGroup>
          </EmptyMedia>
          <EmptyTitle>No team members</EmptyTitle>
          <EmptyDescription>
            Your team doesn't have any members yet. Invite people to collaborate.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button>
            <SiUsers />
            Invite members
          </Button>
        </EmptyContent>
      </Empty>
    </Preview>
  )
}

export function EmptyNoResults() {
  return (
    <Preview>
      <Empty className="w-96">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <SiSearch />
          </EmptyMedia>
          <EmptyTitle>No results found</EmptyTitle>
          <EmptyDescription>
            We couldn't find anything matching your search. Try different keywords.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    </Preview>
  )
}
