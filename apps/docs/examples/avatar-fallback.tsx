import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

export default function AvatarFallbackOnly() {
  return (
    <Avatar>
      <AvatarImage src="/broken-image.png" alt="User" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  )
}
