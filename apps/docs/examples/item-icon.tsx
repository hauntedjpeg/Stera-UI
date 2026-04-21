import { SiShieldAlert } from "stera-icons"
import {
  Item,
  ItemBody,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { Button } from "@/components/ui/button"

export default function ItemDemo() {
  return (
    <div className="flex flex-col w-96 gap-4">
      <Item>
        <ItemBody>
          <ItemMedia variant="icon">
            <SiShieldAlert />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Security Alert</ItemTitle>
            <ItemDescription>New login detected from unknown device.</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button size="sm">Review</Button>
          </ItemActions>
        </ItemBody>
      </Item>
    </div>
  )
}
