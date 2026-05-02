import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

export default function AvatarFallbackOnly() {
  return (
    <Avatar>
      <AvatarImage src="#" alt="User" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  )
}
