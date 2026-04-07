"use client"

import { SiPlusFill, SiUser } from "stera-icons"
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarIconFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Preview } from "@/components/preview"

export function AvatarDefault() {
  return (
    <Preview>
      <Avatar>
        <AvatarImage src="https://github.com/hauntedjpeg.png" alt="@hauntedjpeg" />
        <AvatarFallback>CG</AvatarFallback>
      </Avatar>
    </Preview>
  )
}

export function AvatarFallbackOnly() {
  return (
    <Preview>
      <Avatar>
        <AvatarImage src="/broken-image.png" alt="User" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    </Preview>
  )
}

export function AvatarAllSizes() {
  return (
    <Preview>
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
    </Preview>
  )
}

export function AvatarShapes() {
  return (
    <Preview>
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
    </Preview>
  )
}

export function AvatarWithBadge() {
  return (
    <Preview>
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
          <AvatarBadge variant="icon"><SiPlusFill /></AvatarBadge>
        </Avatar>
      </div>
    </Preview>
  )
}

export function AvatarIconFallbackPreview() {
  return (
    <Preview>
      <div className="flex items-center gap-4">
        <Avatar size="sm">
          <AvatarIconFallback><SiUser /></AvatarIconFallback>
        </Avatar>
        <Avatar size="default">
          <AvatarIconFallback><SiUser /></AvatarIconFallback>
        </Avatar>
        <Avatar size="lg">
          <AvatarIconFallback><SiUser /></AvatarIconFallback>
        </Avatar>
      </div>
    </Preview>
  )
}

export function AvatarGroupPreview() {
  return (
    <Preview>
      <AvatarGroup>
        <Avatar>
          <AvatarImage src="https://github.com/hauntedjpeg.png" alt="@hauntedjpeg" />
          <AvatarFallback>CG</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>LR</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <AvatarGroupCount>+4</AvatarGroupCount>
      </AvatarGroup>
    </Preview>
  )
}
