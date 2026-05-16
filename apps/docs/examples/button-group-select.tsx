"use client"

import { SiPlus } from "stera-icons"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function ButtonGroupSelect() {
  return (
    <ButtonGroup>
      <Button variant="outline">
        <SiPlus data-icon="inline-start" />
        New
      </Button>
      <Select defaultValue="public">
        <SelectTrigger className="w-32">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="public">Public</SelectItem>
          <SelectItem value="private">Private</SelectItem>
          <SelectItem value="draft">Draft</SelectItem>
        </SelectContent>
      </Select>
    </ButtonGroup>
  )
}
