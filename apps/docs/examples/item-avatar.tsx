import { SiPlus } from "stera-icons"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle
} from "@/components/ui/item"
import { Button } from "@/components/ui/button"
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@/components/ui/avatar"

export default function ItemDemo() {
  return (
    <div className="flex flex-col w-96 gap-4">
      <Item>
        <ItemMedia variant="icon">
          <Avatar size="lg">
            <AvatarImage src="https://github.com/hauntedjpeg.png" alt="@hauntedjpeg" />
            <AvatarFallback>B</AvatarFallback>
          </Avatar>
        </ItemMedia>
        <ItemContent>
          <ItemTitle>@hauntedjpeg</ItemTitle>
          <ItemDescription>Last active 2 min ago</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="ghost" size="icon-sm"><SiPlus /></Button>
        </ItemActions>
      </Item>

      <Item>
        <ItemMedia variant="icon">
          <Avatar shape="square" size="lg">
            <AvatarImage src="https://github.com/hauntedjpeg.png" alt="@hauntedjpeg" />
            <AvatarFallback>B</AvatarFallback>
          </Avatar>
        </ItemMedia>
        <ItemContent>
          <ItemTitle>@hauntedjpeg</ItemTitle>
          <ItemDescription>Last active 2 min ago</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="ghost" size="icon-sm"><SiPlus /></Button>
        </ItemActions>
      </Item>
    </div>
  )
}
