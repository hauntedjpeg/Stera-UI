import { SiFolder } from "stera-icons"
import {
  Item,
  ItemBody,
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
          <ItemBody>
            <ItemMedia variant="icon">
              <SiFolder />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Large size</ItemTitle>
              <ItemDescription>Increased padding and spacing.</ItemDescription>
            </ItemContent>
          </ItemBody>
        </Item>
        <Item size="md">
          <ItemBody>
            <ItemMedia variant="icon">
              <SiFolder />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Medium size (Default)</ItemTitle>
              <ItemDescription>Standard padding and spacing.</ItemDescription>
            </ItemContent>
          </ItemBody>
        </Item>
        <Item size="sm">
          <ItemBody>
            <ItemMedia variant="icon">
              <SiFolder />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Small size</ItemTitle>
              <ItemDescription>Reduced padding and spacing.</ItemDescription>
            </ItemContent>
          </ItemBody>
        </Item>
      </ItemGroup>
    </div>
  )
}
