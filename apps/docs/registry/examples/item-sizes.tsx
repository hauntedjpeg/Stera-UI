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
        <Item size="lg">
          <ItemMedia variant="icon">
            <SiFolder />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Large size</ItemTitle>
            <ItemDescription>Increased padding and spacing.</ItemDescription>
          </ItemContent>
        </Item>
        <Item size="md">
          <ItemMedia variant="icon">
            <SiFolder />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Medium size (Default)</ItemTitle>
            <ItemDescription>Standard padding and spacing.</ItemDescription>
          </ItemContent>
        </Item>
        <Item size="sm">
          <ItemMedia variant="icon">
            <SiFolder />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Small size</ItemTitle>
            <ItemDescription>Reduced padding and spacing.</ItemDescription>
          </ItemContent>
        </Item>
      </ItemGroup>
    </div>
  )
}
