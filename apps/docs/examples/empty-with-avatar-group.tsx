import { SiUsers } from "stera-icons"
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
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

export default function EmptyWithAvatarGroup() {
  return (
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
  )
}
