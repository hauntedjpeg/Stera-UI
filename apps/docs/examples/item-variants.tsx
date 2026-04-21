import { SiArchive } from "stera-icons"
import {
  Item,
  ItemBody,
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
          <ItemBody>
            <ItemMedia variant="icon">
              <SiArchive />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Ghost variant</ItemTitle>
              <ItemDescription>No border, transparent background.</ItemDescription>
            </ItemContent>
          </ItemBody>
        </Item>
        <Item>
          <ItemBody>
            <ItemMedia variant="icon">
              <SiArchive />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Outline variant (Default)</ItemTitle>
              <ItemDescription>Visible border, transparent background.</ItemDescription>
            </ItemContent>
          </ItemBody>
        </Item>
        <Item variant="subtle">
          <ItemBody>
            <ItemMedia variant="icon">
              <SiArchive />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Subtle variant</ItemTitle>
              <ItemDescription>Subtle muted background, no border.</ItemDescription>
            </ItemContent>
          </ItemBody>
        </Item>
      </ItemGroup>
    </div>
  )
}
