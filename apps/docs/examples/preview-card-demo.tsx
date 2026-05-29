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
        href="#"
        rel="noreferrer noopener"
        className="underline underline-offset-4"
      >
        @hauntedjpeg
      </PreviewCardTrigger>
      <PreviewCardContent>
        <div className="flex gap-3">
          <Avatar>
            <AvatarImage src="https://github.com/hauntedjpeg.png" alt="@hauntedjpeg" />
            <AvatarFallback>CG</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="st-body-md-strong">bootoo</p>
            <p className="st-body-sm text-text-subtlest mb-2">@hauntedjpeg</p>
            <p className="st-body-md-compact">
              Design for illuminated surfaces
            </p>
          </div>
        </div>
      </PreviewCardContent>
    </PreviewCard>
  )
}
