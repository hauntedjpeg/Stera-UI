import { SiBell, SiUser, SiX } from "stera-icons"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"

export default function ItemWithActions() {
  return (
    <div className="w-96">
      <ItemGroup>
        <Item variant="outline">
          <ItemMedia variant="icon">
            <SiBell />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Notifications</ItemTitle>
            <ItemDescription>You have new activity.</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Badge variant="danger">4</Badge>
            <Button size="sm" variant="outline">
              View
            </Button>
          </ItemActions>
        </Item>
        <Item variant="outline">
          <ItemMedia variant="icon">
            <SiUser />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Team member request</ItemTitle>
          </ItemContent>
          <ItemActions>
            <Button size="sm" variant="brand">
              Accept
            </Button>
            <Button size="sm" variant="outline">
              <SiX />
            </Button>
          </ItemActions>
        </Item>
      </ItemGroup>
    </div>
  )
}
