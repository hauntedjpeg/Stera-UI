import { SiUser } from "stera-icons"
import { Avatar, AvatarIconFallback } from "@/components/ui/avatar"

export default function AvatarIconFallbackDemo() {
  return (
    <div className="flex items-center gap-4">
      <Avatar size="sm">
        <AvatarIconFallback>
          <SiUser />
        </AvatarIconFallback>
      </Avatar>
      <Avatar size="default">
        <AvatarIconFallback>
          <SiUser />
        </AvatarIconFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarIconFallback>
          <SiUser />
        </AvatarIconFallback>
      </Avatar>
    </div>
  )
}
