import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetPopup,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export default function SheetNestedSide() {
  return (
    <Sheet side="right">
      <SheetTrigger render={<Button variant="outline" />}>
        Open account
      </SheetTrigger>
      <SheetPopup>
        <SheetHeader>
          <SheetTitle>Account</SheetTitle>
          <SheetDescription>
            Manage your profile. Open a nested sheet for security settings.
          </SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <Sheet side="right">
            <SheetTrigger render={<Button variant="outline" />}>
              Security settings
            </SheetTrigger>
            <SheetPopup>
              <SheetHeader>
                <SheetTitle>Security</SheetTitle>
                <SheetDescription>
                  Review sign-in activity and update your preferences.
                </SheetDescription>
              </SheetHeader>
              <SheetContent className="px-8">
                <ul className="list-disc text-sm text-text-subtle">
                  <li>Passkeys enabled</li>
                  <li>2FA via authenticator app</li>
                  <li>3 signed-in devices</li>
                </ul>
              </SheetContent>
              <SheetFooter>
                <SheetClose render={<Button variant="outline" />}>
                  Done
                </SheetClose>
              </SheetFooter>
            </SheetPopup>
          </Sheet>
          <SheetClose render={<Button variant="outline" />}>Close</SheetClose>
        </SheetFooter>
      </SheetPopup>
    </Sheet>
  )
}
