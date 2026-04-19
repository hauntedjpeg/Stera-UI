import { SiArchive } from "stera-icons"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"

export default function ItemVariants() {
  return (
    <div className="w-96">
      <ItemGroup>
        <Item variant="default">
          <ItemMedia variant="icon">
            <SiArchive />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Default variant</ItemTitle>
            <ItemDescription>No border, transparent background.</ItemDescription>
          </ItemContent>
        </Item>
        <Item variant="outline">
          <ItemMedia variant="icon">
            <SiArchive />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Outline variant</ItemTitle>
            <ItemDescription>Visible border, transparent background.</ItemDescription>
          </ItemContent>
        </Item>
        <Item variant="muted">
          <ItemMedia variant="icon">
            <SiArchive />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Muted variant</ItemTitle>
            <ItemDescription>Subtle muted background, no border.</ItemDescription>
          </ItemContent>
        </Item>
      </ItemGroup>
    </div>
  )
}
