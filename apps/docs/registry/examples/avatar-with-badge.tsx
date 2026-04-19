import { SiPlusFill } from "stera-icons"
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

export default function AvatarWithBadge() {
  return (
    <div className="flex items-center gap-4">
      <Avatar>
        <AvatarImage src="https://github.com/hauntedjpeg.png" alt="@hauntedjpeg" />
        <AvatarFallback>CG</AvatarFallback>
        <AvatarBadge variant="subtle" />
      </Avatar>
      <Avatar>
        <AvatarImage src="https://github.com/hauntedjpeg.png" alt="@hauntedjpeg" />
        <AvatarFallback>CG</AvatarFallback>
        <AvatarBadge variant="success" />
      </Avatar>
      <Avatar>
        <AvatarImage src="https://github.com/hauntedjpeg.png" alt="@hauntedjpeg" />
        <AvatarFallback>CG</AvatarFallback>
        <AvatarBadge variant="danger" />
      </Avatar>
      <Avatar>
        <AvatarImage src="https://github.com/hauntedjpeg.png" alt="@hauntedjpeg" />
        <AvatarFallback>CG</AvatarFallback>
        <AvatarBadge variant="warning" />
      </Avatar>
      <Avatar>
        <AvatarImage src="https://github.com/hauntedjpeg.png" alt="@hauntedjpeg" />
        <AvatarFallback>CG</AvatarFallback>
        <AvatarBadge variant="icon">
          <SiPlusFill />
        </AvatarBadge>
      </Avatar>
    </div>
  )
}
