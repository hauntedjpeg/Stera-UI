import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

export default function SpinnerButton() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button disabled>
          <Spinner data-icon="inline-start" aria-hidden />
          Saving
        </Button>
        <Button variant="outline" disabled>
          Please wait
          <Spinner data-icon="inline-end" aria-hidden />
        </Button>
        <Button variant="brand" disabled>
          <Spinner data-icon="inline-start" aria-hidden />
          Processing
        </Button>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button size="xs" variant="outline" disabled>
          <Spinner data-icon="inline-start" aria-hidden />
          Syncing
        </Button>
        <Button size="icon" variant="outline" disabled>
          <Spinner aria-label="Refreshing" />
        </Button>
        <Button size="icon-lg" variant="outline" disabled>
          <Spinner aria-label="Refreshing" />
        </Button>
      </div>
    </div>
  )
}
