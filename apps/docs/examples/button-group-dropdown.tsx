"use client"

import {
  SiAlertTriangle,
  SiCheck,
  SiChevronDown,
  SiCopy,
  SiShare,
  SiSpeakerOff,
  SiTrash,
  SiUserX,
} from "stera-icons"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function ButtonGroupDropdown() {
  return (
    <ButtonGroup>
      <Button variant="outline">Follow</Button>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button variant="outline" size="icon" aria-label="More Options" />
          }
        >
          <SiChevronDown />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-52">
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <SiSpeakerOff />
              Mute Conversation
            </DropdownMenuItem>
            <DropdownMenuItem>
              <SiCheck />
              Mark as Read
            </DropdownMenuItem>
            <DropdownMenuItem>
              <SiAlertTriangle />
              Report Conversation
            </DropdownMenuItem>
            <DropdownMenuItem>
              <SiUserX />
              Block User
            </DropdownMenuItem>
            <DropdownMenuItem>
              <SiShare />
              Share Conversation
            </DropdownMenuItem>
            <DropdownMenuItem>
              <SiCopy />
              Copy Conversation
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem variant="danger">
              <SiTrash />
              Delete Conversation
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  )
}
