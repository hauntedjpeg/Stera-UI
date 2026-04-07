"use client"

import { Button } from "@/components/ui/button"
import { Kbd } from "@/components/ui/kbd"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Preview } from "@/components/preview"

export function TooltipDefault() {
  return (
    <Preview>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger render={<Button variant="outline" />}>
            Hover
          </TooltipTrigger>
          <TooltipContent>
            <p>Add to library</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </Preview>
  )
}

export function TooltipSides() {
  return (
    <Preview>
      <TooltipProvider>
        <div className="flex items-center gap-4">
          <Tooltip>
            <TooltipTrigger render={<Button variant="outline" />}>
              Top
            </TooltipTrigger>
            <TooltipContent side="top"><p>Top tooltip</p></TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger render={<Button variant="outline" />}>
              Right
            </TooltipTrigger>
            <TooltipContent side="right"><p>Right tooltip</p></TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger render={<Button variant="outline" />}>
              Bottom
            </TooltipTrigger>
            <TooltipContent side="bottom"><p>Bottom tooltip</p></TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger render={<Button variant="outline" />}>
              Left
            </TooltipTrigger>
            <TooltipContent side="left"><p>Left tooltip</p></TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </Preview>
  )
}

export function TooltipWithKbd() {
  return (
    <Preview>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger render={<Button variant="outline" />}>
            Open
          </TooltipTrigger>
          <TooltipContent>
            Open dialog <Kbd size="sm">⌘K</Kbd>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </Preview>
  )
}
