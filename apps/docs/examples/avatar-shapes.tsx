import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

export default function AvatarShapes() {
  return (
    <div className="flex items-center gap-4">
      <Avatar shape="circle">
        <AvatarImage src="https://github.com/hauntedjpeg.png" alt="@hauntedjpeg" />
        <AvatarFallback>CG</AvatarFallback>
      </Avatar>
      <Avatar shape="square">
        <AvatarImage src="https://github.com/hauntedjpeg.png" alt="@hauntedjpeg" />
        <AvatarFallback>CG</AvatarFallback>
      </Avatar>
    </div>
  )
}
