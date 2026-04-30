import {
  PreviewCard,
  PreviewCardContent,
  PreviewCardTrigger,
} from "@/components/ui/preview-card"

export default function PreviewCardSides() {
  return (
    <div className="flex items-center gap-4">
      <PreviewCard>
        <PreviewCardTrigger className="underline underline-offset-4">
          Top
        </PreviewCardTrigger>
        <PreviewCardContent side="top">
          <p>Top preview card</p>
        </PreviewCardContent>
      </PreviewCard>
      <PreviewCard>
        <PreviewCardTrigger className="underline underline-offset-4">
          Right
        </PreviewCardTrigger>
        <PreviewCardContent side="right">
          <p>Right preview card</p>
        </PreviewCardContent>
      </PreviewCard>
      <PreviewCard>
        <PreviewCardTrigger className="underline underline-offset-4">
          Bottom
        </PreviewCardTrigger>
        <PreviewCardContent side="bottom">
          <p>Bottom preview card</p>
        </PreviewCardContent>
      </PreviewCard>
      <PreviewCard>
        <PreviewCardTrigger className="underline underline-offset-4">
          Left
        </PreviewCardTrigger>
        <PreviewCardContent side="left">
          <p>Left preview card</p>
        </PreviewCardContent>
      </PreviewCard>
    </div>
  )
}
