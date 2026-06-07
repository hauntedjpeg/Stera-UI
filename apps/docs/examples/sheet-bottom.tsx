import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetPopup,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export default function SheetBottom() {
  return (
    <Sheet side="bottom">
      <SheetTrigger render={<Button variant="outline" />}>
        Open bottom sheet
      </SheetTrigger>
      <SheetPopup showCloseButton={false}>
        <SheetHeader className="text-center">
          <SheetTitle>Notifications</SheetTitle>
          <SheetDescription>
            You are all caught up. Swipe down to dismiss.
          </SheetDescription>
        </SheetHeader>
        <SheetFooter className="items-center">
          <SheetClose render={<Button variant="outline" />}>Close</SheetClose>
        </SheetFooter>
      </SheetPopup>
    </Sheet>
  )
}
