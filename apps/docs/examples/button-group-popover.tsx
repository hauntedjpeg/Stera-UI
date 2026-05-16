"use client"

import { SiSliders } from "stera-icons"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function ButtonGroupPopover() {
  return (
    <ButtonGroup>
      <Button variant="outline">Filter</Button>
      <Popover>
        <PopoverTrigger
          render={
            <Button variant="outline" size="icon" aria-label="Filter options">
              <SiSliders />
            </Button>
          }
        />
        <PopoverContent align="end">
          <PopoverHeader>
            <PopoverTitle>Filter</PopoverTitle>
            <PopoverDescription>
              Refine the list by applying filters.
            </PopoverDescription>
          </PopoverHeader>
        </PopoverContent>
      </Popover>
    </ButtonGroup>
  )
}
