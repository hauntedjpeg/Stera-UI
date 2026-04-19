import { SiBell, SiCheckCircle, SiUser } from "stera-icons"
import { Badge } from "@/components/ui/badge"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item"

export default function ItemNotificationList() {
  return (
    <div className="w-[420px]">
      <ItemGroup>
        <Item variant="outline">
          <ItemMedia variant="icon">
            <SiCheckCircle />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Deployment successful</ItemTitle>
            <ItemDescription>Production build v2.4.1 deployed without errors.</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Badge variant="success" size="sm">
              Done
            </Badge>
          </ItemActions>
        </Item>
        <ItemSeparator />
        <Item variant="outline" size="sm">
          <ItemMedia variant="icon">
            <SiBell />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>3 new mentions</ItemTitle>
            <ItemDescription>You were mentioned in the #design channel.</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Badge variant="accent" size="sm">
              3
            </Badge>
          </ItemActions>
        </Item>
        <Item variant="outline" size="sm">
          <ItemMedia variant="icon">
            <SiUser />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Team invite accepted</ItemTitle>
            <ItemDescription>Jordan joined the workspace.</ItemDescription>
          </ItemContent>
        </Item>
      </ItemGroup>
    </div>
  )
}
