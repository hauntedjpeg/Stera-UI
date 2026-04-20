import { SiCheckCircleFill, SiChevronRight } from "stera-icons"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { Button } from "@/components/ui/button"

export default function ItemDemo() {
  return (
    <div className="flex flex-col w-96 gap-4">
      <Item>
        <ItemContent>
          <ItemTitle>Title</ItemTitle>
          <ItemDescription>Description</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button size="sm">Action</Button>
        </ItemActions>
      </Item>

      <Item render={<a href="#">
        <ItemMedia variant="icon">
          <SiCheckCircleFill />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Upload successful</ItemTitle>
        </ItemContent>
        <ItemActions><SiChevronRight /></ItemActions>
      </a>} />
    </div>
  )
}
