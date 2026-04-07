"use client"

import {
  SiArchive,
  SiChevronDown,
  SiCopy,
  SiDelete,
  SiForward,
  SiPlus,
  SiReply,
  SiShare,
} from "stera-icons"
import { Button } from "@/components/ui/button"
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/components/ui/button-group"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Preview } from "@/components/preview"

export function ButtonGroupDefault() {
  return (
    <Preview>
      <ButtonGroup>
        <Button variant="outline">
          <SiReply data-icon="inline-start" />
          Reply
        </Button>
        <Button variant="outline">
          <SiForward data-icon="inline-start" />
          Forward
        </Button>
        <Button variant="outline">
          <SiArchive data-icon="inline-start" />
          Archive
        </Button>
      </ButtonGroup>
    </Preview>
  )
}

export function ButtonGroupOrientation() {
  return (
    <Preview>
      <div className="flex items-start gap-12">
        <div className="flex flex-col items-center gap-3">
          <span className="text-sm text-text-secondary">Horizontal</span>
          <ButtonGroup orientation="horizontal">
            <Button variant="outline">
              <SiReply data-icon="inline-start" />
              Reply
            </Button>
            <Button variant="outline">
              <SiForward data-icon="inline-start" />
              Forward
            </Button>
            <Button variant="outline">
              <SiArchive data-icon="inline-start" />
              Archive
            </Button>
          </ButtonGroup>
        </div>
        <div className="flex flex-col items-center gap-3">
          <span className="text-sm text-text-secondary">Vertical</span>
          <ButtonGroup orientation="vertical">
            <Button variant="outline">
              <SiReply data-icon="inline-start" />
              Reply
            </Button>
            <Button variant="outline">
              <SiForward data-icon="inline-start" />
              Forward
            </Button>
            <Button variant="outline">
              <SiArchive data-icon="inline-start" />
              Archive
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </Preview>
  )
}

export function ButtonGroupWithSeparator() {
  return (
    <Preview>
      <ButtonGroup>
        <Button variant="ghost" size="icon" aria-label="Reply">
          <SiReply />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Forward">
          <SiForward />
        </Button>
        <ButtonGroupSeparator />
        <Button variant="ghost" size="icon" aria-label="Copy">
          <SiCopy />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Share">
          <SiShare />
        </Button>
        <ButtonGroupSeparator />
        <Button variant="ghost" size="icon" aria-label="Delete">
          <SiDelete />
        </Button>
      </ButtonGroup>
    </Preview>
  )
}

export function ButtonGroupAllVariants() {
  return (
    <Preview>
      <div className="flex flex-col items-start gap-4">
        <ButtonGroup>
          <Button variant="outline">Reply</Button>
          <Button variant="outline">Forward</Button>
          <Button variant="outline">Archive</Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button variant="subtle">Reply</Button>
          <ButtonGroupSeparator />
          <Button variant="subtle">Forward</Button>
          <ButtonGroupSeparator />
          <Button variant="subtle">Archive</Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button variant="brand">Reply</Button>
          <ButtonGroupSeparator />
          <Button variant="brand">Forward</Button>
          <ButtonGroupSeparator />
          <Button variant="brand">Archive</Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button variant="ghost">Reply</Button>
          <ButtonGroupSeparator />
          <Button variant="ghost">Forward</Button>
          <ButtonGroupSeparator />
          <Button variant="ghost">Archive</Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button variant="danger">Reply</Button>
          <ButtonGroupSeparator />
          <Button variant="danger">Forward</Button>
          <ButtonGroupSeparator />
          <Button variant="danger">Archive</Button>
        </ButtonGroup>
      </div>
    </Preview>
  )
}

export function ButtonGroupSplit() {
  return (
    <Preview>
      <ButtonGroup>
        <Button variant="brand">
          <SiPlus data-icon="inline-start" />
          New message
        </Button>
        <ButtonGroupSeparator />
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="brand" size="icon" aria-label="More options">
                <SiChevronDown />
              </Button>
            }
          />
          <DropdownMenuContent align="end">
            <DropdownMenuItem>New draft</DropdownMenuItem>
            <DropdownMenuItem>Schedule send</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </ButtonGroup>
    </Preview>
  )
}
