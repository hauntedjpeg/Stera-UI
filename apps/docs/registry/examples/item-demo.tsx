import { SiUser } from "stera-icons"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"

export default function ItemDemo() {
  return (
    <div className="w-96">
      <Item>
        <ItemMedia variant="icon">
          <SiUser />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Jane Appleseed</ItemTitle>
          <ItemDescription>Product designer · San Francisco</ItemDescription>
        </ItemContent>
      </Item>
    </div>
  )
}
