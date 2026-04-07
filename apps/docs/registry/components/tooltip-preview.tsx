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
          <TooltipTrigger asChild>
            <Button variant="outline">Hover</Button>
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
            <TooltipTrigger asChild>
              <Button variant="outline">Top</Button>
            </TooltipTrigger>
            <TooltipContent side="top"><p>Top tooltip</p></TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">Right</Button>
            </TooltipTrigger>
            <TooltipContent side="right"><p>Right tooltip</p></TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">Bottom</Button>
            </TooltipTrigger>
            <TooltipContent side="bottom"><p>Bottom tooltip</p></TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">Left</Button>
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
          <TooltipTrigger asChild>
            <Button variant="outline">Open</Button>
          </TooltipTrigger>
          <TooltipContent>
            Open dialog <Kbd size="sm">⌘K</Kbd>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </Preview>
  )
}
