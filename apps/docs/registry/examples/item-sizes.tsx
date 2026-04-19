import { SiFolder } from "stera-icons"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"

export default function ItemSizes() {
  return (
    <div className="w-96">
      <ItemGroup>
        <Item size="default" variant="outline">
          <ItemMedia variant="icon">
            <SiFolder />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Default size</ItemTitle>
            <ItemDescription>Standard padding and spacing.</ItemDescription>
          </ItemContent>
        </Item>
        <Item size="sm" variant="outline">
          <ItemMedia variant="icon">
            <SiFolder />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Small size</ItemTitle>
            <ItemDescription>Reduced padding and spacing.</ItemDescription>
          </ItemContent>
        </Item>
        <Item size="xs" variant="outline">
          <ItemMedia variant="icon">
            <SiFolder />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Extra small size</ItemTitle>
            <ItemDescription>Compact padding and spacing.</ItemDescription>
          </ItemContent>
        </Item>
      </ItemGroup>
    </div>
  )
}
