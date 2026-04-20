import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function TooltipSides() {
  return (
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
  )
}
