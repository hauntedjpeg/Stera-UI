import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerPopup,
  DrawerSwipeArea,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

export default function DrawerSwipeAreaExample() {
  return (
    <Drawer side="right">
      {/* Invisible edge zone — swipe in from the right edge (touch) to open. */}
      <DrawerSwipeArea className="fixed inset-y-0 right-0 z-40 w-4" />
      <DrawerTrigger render={<Button variant="outline" />}>
        Open (or swipe from the right edge)
      </DrawerTrigger>
      <DrawerPopup>
        <DrawerHeader>
          <DrawerTitle>Quick panel</DrawerTitle>
          <DrawerDescription>
            On touch devices, swipe in from the right edge of the screen to open
            this drawer without tapping the trigger.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerContent className="px-4 text-sm text-text-subtle">
          <p>
            A <code>DrawerSwipeArea</code> is an invisible, fixed strip along the
            screen edge. Base UI handles the swipe gesture and sets its own{" "}
            <code>touch-action</code>; you position it.
          </p>
        </DrawerContent>
        <DrawerFooter>
          <DrawerClose render={<Button variant="outline" />}>Close</DrawerClose>
        </DrawerFooter>
      </DrawerPopup>
    </Drawer>
  )
}
