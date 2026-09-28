import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

export default function DrawerNested() {
  return (
    <Drawer side="bottom">
      <DrawerTrigger render={<Button variant="outline" />}>
        Open account
      </DrawerTrigger>
      <DrawerPopup showCloseButton={false}>
        <DrawerHeader className="text-center">
          <DrawerTitle>Account</DrawerTitle>
          <DrawerDescription>
            Nested drawers stack with a peek behind the frontmost layer. Each
            layer manages its own focus.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Drawer side="bottom">
            <DrawerTrigger render={<Button variant="outline" />}>
              Security settings
            </DrawerTrigger>
            <DrawerPopup showCloseButton={false}>
              <DrawerHeader className="text-center">
                <DrawerTitle>Security</DrawerTitle>
                <DrawerDescription>
                  Review sign-in activity and update your preferences.
                </DrawerDescription>
              </DrawerHeader>
              <DrawerContent className="px-8">
                <ul className="list-disc text-sm text-text-subtle">
                  <li>Passkeys enabled</li>
                  <li>2FA via authenticator app</li>
                  <li>3 signed-in devices</li>
                </ul>
              </DrawerContent>
              <DrawerFooter>
                <DrawerClose render={<Button variant="outline" />}>
                  Done
                </DrawerClose>
              </DrawerFooter>
            </DrawerPopup>
          </Drawer>
          <DrawerClose render={<Button variant="outline" />}>Close</DrawerClose>
        </DrawerFooter>
      </DrawerPopup>
    </Drawer>
  )
}
