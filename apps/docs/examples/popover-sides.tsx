"use client"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function PopoverSides() {
  return (
    <div className="flex items-center gap-4">
      <Popover>
        <PopoverTrigger render={<Button variant="outline" />}>
          Top
        </PopoverTrigger>
        <PopoverContent side="top">
          <p>Top popover</p>
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger render={<Button variant="outline" />}>
          Right
        </PopoverTrigger>
        <PopoverContent side="right">
          <p>Right popover</p>
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger render={<Button variant="outline" />}>
          Bottom
        </PopoverTrigger>
        <PopoverContent side="bottom">
          <p>Bottom popover</p>
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger render={<Button variant="outline" />}>
          Left
        </PopoverTrigger>
        <PopoverContent side="left">
          <p>Left popover</p>
        </PopoverContent>
      </Popover>
    </div>
  )
}
