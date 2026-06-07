import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetPopup,
  SheetSwipeArea,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export default function SheetSwipeAreaExample() {
  return (
    <Sheet side="right">
      {/* Invisible edge zone — swipe in from the right edge (touch) to open. */}
      <SheetSwipeArea className="fixed inset-y-0 right-0 z-40 w-4" />
      <SheetTrigger render={<Button variant="outline" />}>
        Open (or swipe from the right edge)
      </SheetTrigger>
      <SheetPopup>
        <SheetHeader>
          <SheetTitle>Quick panel</SheetTitle>
          <SheetDescription>
            On touch devices, swipe in from the right edge of the screen to open
            this sheet without tapping the trigger.
          </SheetDescription>
        </SheetHeader>
        <SheetContent className="px-4 text-sm text-text-subtle">
          <p>
            A <code>SheetSwipeArea</code> is an invisible, fixed strip along the
            screen edge. Base UI handles the swipe gesture and sets its own{" "}
            <code>touch-action</code>; you position it.
          </p>
        </SheetContent>
        <SheetFooter>
          <SheetClose render={<Button variant="outline" />}>Close</SheetClose>
        </SheetFooter>
      </SheetPopup>
    </Sheet>
  )
}
