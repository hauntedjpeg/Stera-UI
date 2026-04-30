import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  PreviewCard,
  PreviewCardContent,
  PreviewCardTrigger,
} from "@/components/ui/preview-card"

export default function PreviewCardDemo() {
  return (
    <PreviewCard>
      <PreviewCardTrigger
        href="https://base-ui.com"
        target="_blank"
        rel="noreferrer noopener"
        className="underline underline-offset-4"
      >
        @base-ui
      </PreviewCardTrigger>
      <PreviewCardContent>
        <div className="flex gap-3">
          <Avatar>
            <AvatarImage src="https://github.com/mui.png" alt="@base-ui" />
            <AvatarFallback>BU</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <p className="st-body-md-strong">Base UI</p>
            <p className="st-body-sm text-text-subtle">
              Unstyled UI components for building accessible web apps.
            </p>
          </div>
        </div>
      </PreviewCardContent>
    </PreviewCard>
  )
}
