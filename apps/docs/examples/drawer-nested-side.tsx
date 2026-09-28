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

export default function DrawerNestedSide() {
  return (
    <Drawer side="right">
      <DrawerTrigger render={<Button variant="outline" />}>
        Open account
      </DrawerTrigger>
      <DrawerPopup>
        <DrawerHeader>
          <DrawerTitle>Account</DrawerTitle>
          <DrawerDescription>
            Manage your profile. Open a nested drawer for security settings.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Drawer side="right">
            <DrawerTrigger render={<Button variant="outline" />}>
              Security settings
            </DrawerTrigger>
            <DrawerPopup>
              <DrawerHeader>
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
