import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

export default function AvatarDemo() {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/hauntedjpeg.png" alt="@hauntedjpeg" />
      <AvatarFallback>CG</AvatarFallback>
    </Avatar>
  )
}
