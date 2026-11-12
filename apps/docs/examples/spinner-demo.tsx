import { Spinner } from "@/components/ui/spinner"
import {
  Item,
  ItemActions,
  ItemBody,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"

export default function SpinnerDemo() {
  return (
    <div className="flex w-80 flex-col gap-4">
      <Item variant="subtle">
        <ItemBody>
          <ItemMedia variant="icon">
            <Spinner aria-hidden />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Processing payment…</ItemTitle>
          </ItemContent>
          <ItemActions className="st-label-sm-medium tabular-nums">
            $100.00
          </ItemActions>
        </ItemBody>
      </Item>
    </div>
  )
}
