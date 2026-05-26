import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar"

export default function AvatarGroupDemo() {
  return (
    <AvatarGroup>
      <Avatar>
        <AvatarImage
          src="https://github.com/hauntedjpeg.png"
          alt="@hauntedjpeg"
        />
        <AvatarFallback>RG</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>LF</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>CG</AvatarFallback>
      </Avatar>
      <AvatarGroupCount>+4</AvatarGroupCount>
    </AvatarGroup>
  )
}
