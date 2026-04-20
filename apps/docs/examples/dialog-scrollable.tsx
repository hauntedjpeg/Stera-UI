import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const loremParagraph =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris."

export default function DialogScrollable() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline">Open</Button>} />
      <DialogPopup scroll="content">
        <DialogHeader>
          <DialogTitle>Sticky Footer</DialogTitle>
          <DialogDescription>The footer stays visible while the content scrolls.</DialogDescription>
        </DialogHeader>
        <DialogContent scroll>
          {Array.from({ length: 6 }).map((_, i) => (
            <p key={i} className="mb-4 text-sm text-text-secondary">{loremParagraph}</p>
          ))}
        </DialogContent>
        <DialogFooter showCloseButton>
          <Button>Save changes</Button>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  )
}
