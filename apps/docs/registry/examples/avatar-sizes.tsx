import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

export default function AvatarSizes() {
  return (
    <div className="flex items-center gap-4">
      <Avatar size="sm">
        <AvatarImage src="https://github.com/hauntedjpeg.png" alt="@hauntedjpeg" />
        <AvatarFallback>CG</AvatarFallback>
      </Avatar>
      <Avatar size="default">
        <AvatarImage src="https://github.com/hauntedjpeg.png" alt="@hauntedjpeg" />
        <AvatarFallback>CG</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarImage src="https://github.com/hauntedjpeg.png" alt="@hauntedjpeg" />
        <AvatarFallback>CG</AvatarFallback>
      </Avatar>
    </div>
  )
}
