import {
  PreviewCard,
  PreviewCardContent,
  PreviewCardTrigger,
} from "@/components/ui/preview-card"

export default function PreviewCardDelay() {
  return (
    <div className="flex items-center gap-6">
      <PreviewCard>
        <PreviewCardTrigger className="underline underline-offset-4">
          Default
        </PreviewCardTrigger>
        <PreviewCardContent>
          <p>Opens after 600ms, closes after 300ms.</p>
        </PreviewCardContent>
      </PreviewCard>
      <PreviewCard>
        <PreviewCardTrigger
          delay={100}
          closeDelay={500}
          className="underline underline-offset-4"
        >
          Fast open, slow close
        </PreviewCardTrigger>
        <PreviewCardContent>
          <p>Opens after 100ms, closes after 500ms.</p>
        </PreviewCardContent>
      </PreviewCard>
    </div>
  )
}
