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

export default function SheetNested() {
  return (
    <Sheet side="bottom">
      <SheetTrigger render={<Button variant="outline" />}>
        Open account
      </SheetTrigger>
      <SheetPopup showCloseButton={false}>
        <SheetHeader className="text-center">
          <SheetTitle>Account</SheetTitle>
          <SheetDescription>
            Nested sheets stack with a peek behind the frontmost layer. Each
            layer manages its own focus.
          </SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <Sheet side="bottom">
            <SheetTrigger render={<Button variant="outline" />}>
              Security settings
            </SheetTrigger>
            <SheetPopup showCloseButton={false}>
              <SheetHeader className="text-center">
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
