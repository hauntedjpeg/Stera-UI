"use client"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function PopoverAlign() {
  return (
    <div className="flex items-center gap-4">
      <Popover>
        <PopoverTrigger render={<Button variant="outline" />}>
          Start
        </PopoverTrigger>
        <PopoverContent align="start">
          <p>Aligned to the start of the trigger</p>
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger render={<Button variant="outline" />}>
          Center
        </PopoverTrigger>
        <PopoverContent align="center">
          <p>Aligned to the center of the trigger</p>
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger render={<Button variant="outline" />}>
          End
        </PopoverTrigger>
        <PopoverContent align="end">
          <p>Aligned to the end of the trigger</p>
        </PopoverContent>
      </Popover>
    </div>
  )
}
