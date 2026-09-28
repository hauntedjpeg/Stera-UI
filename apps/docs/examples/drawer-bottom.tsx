import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

export default function DrawerBottom() {
  return (
    <Drawer side="bottom">
      <DrawerTrigger render={<Button variant="outline" />}>
        Open bottom drawer
      </DrawerTrigger>
      <DrawerPopup showCloseButton={false}>
        <DrawerHeader className="text-center">
          <DrawerTitle>Notifications</DrawerTitle>
          <DrawerDescription>
            You are all caught up. Swipe down to dismiss.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="items-center">
          <DrawerClose render={<Button variant="outline" />}>Close</DrawerClose>
        </DrawerFooter>
      </DrawerPopup>
    </Drawer>
  )
}
