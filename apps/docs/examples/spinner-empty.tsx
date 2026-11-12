import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Spinner } from "@/components/ui/spinner"

export default function SpinnerEmpty() {
  return (
    <Empty className="w-96">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Spinner aria-hidden />
        </EmptyMedia>
        <EmptyTitle>Processing your request</EmptyTitle>
        <EmptyDescription>
          This can take a minute. Don&apos;t refresh the page.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" size="sm">
          Cancel
        </Button>
      </EmptyContent>
    </Empty>
  )
}
