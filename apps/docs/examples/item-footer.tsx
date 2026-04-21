import {
  SiGlobe,
  SiDotFill
} from "stera-icons"
import {
  Item,
  ItemBody,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemMedia,
  ItemSeparator,
  ItemTitle
} from "@/components/ui/item"
import { Button } from "@/components/ui/button"
import {
  Avatar,
  AvatarIconFallback
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function ItemDemo() {
  return (
    <div className="flex flex-col w-96 gap-4">
      <Item>
        <ItemBody>
          <ItemMedia variant="icon">
            <Avatar size="lg" shape="square">
              <AvatarIconFallback className="bg-bg-brand-tertiary text-text-brand">
                <SiGlobe />
              </AvatarIconFallback>
            </Avatar>
          </ItemMedia>
          <ItemContent>
            <ItemTitle>http://localhost:3000</ItemTitle>
            <ItemDescription>http://192.168.86.24:3000</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button variant="ghost">Open</Button>
          </ItemActions>
        </ItemBody>
        <ItemSeparator />
        <ItemFooter>
          <span>Dev Server</span>
          <Badge variant="success"><SiDotFill data-icon="inline-start" />Running</Badge>
        </ItemFooter>
      </Item>
    </div>
  )
}
