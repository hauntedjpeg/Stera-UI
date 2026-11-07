import { SiAlertTriangle, SiCheckCircle } from "stera-icons"

import { IconTile } from "@/components/ui/icon-tile"
import {
  Item,
  ItemBody,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"

export default function IconTileWithItem() {
  return (
    <div className="flex w-96 flex-col gap-4">
      <Item>
        <ItemBody>
          <ItemMedia>
            <IconTile variant="success">
              <SiCheckCircle />
            </IconTile>
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Deployment succeeded</ItemTitle>
            <ItemDescription>
              Production is running version 2.4.1
            </ItemDescription>
          </ItemContent>
        </ItemBody>
      </Item>
      <Item>
        <ItemBody>
          <ItemMedia>
            <IconTile variant="warning">
              <SiAlertTriangle />
            </IconTile>
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Storage almost full</ItemTitle>
            <ItemDescription>92% of your plan is in use</ItemDescription>
          </ItemContent>
        </ItemBody>
      </Item>
    </div>
  )
}
