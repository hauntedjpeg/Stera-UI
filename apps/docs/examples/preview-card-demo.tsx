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
            <AvatarImage
              src="https://github.com/hauntedjpeg.png"
              alt="@hauntedjpeg"
            />
            <AvatarFallback>CG</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="st-label-md-medium">bootoo</p>
            <p className="mb-2 st-body-sm text-ink-subtlest">@hauntedjpeg</p>
            <p className="st-label-md">Design for illuminated surfaces</p>
          </div>
        </div>
      </PreviewCardContent>
    </PreviewCard>
  )
}
