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
        <Item variant="ghost">
          <ItemMedia variant="icon">
            <SiArchive />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Ghost variant</ItemTitle>
            <ItemDescription>No border, transparent background.</ItemDescription>
          </ItemContent>
        </Item>
        <Item>
          <ItemMedia variant="icon">
            <SiArchive />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Outline variant (Default)</ItemTitle>
            <ItemDescription>Visible border, transparent background.</ItemDescription>
          </ItemContent>
        </Item>
        <Item variant="subtle">
          <ItemMedia variant="icon">
            <SiArchive />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Subtle variant</ItemTitle>
            <ItemDescription>Subtle muted background, no border.</ItemDescription>
          </ItemContent>
        </Item>
      </ItemGroup>
    </div>
  )
}
