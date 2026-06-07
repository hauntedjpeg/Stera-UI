import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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

export default function SheetDemo() {
  return (
    <Sheet side="right">
      <SheetTrigger render={<Button variant="outline" />}>Open</SheetTrigger>
      <SheetPopup showCloseButton={false}>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Swipe right or click save when
            you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <SheetContent className="grid auto-rows-min gap-6 px-4">
          <div className="grid gap-3">
            <Label htmlFor="sheet-name">Name</Label>
            <Input id="sheet-name" defaultValue="Chaz Giese" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="sheet-username">Username</Label>
            <Input id="sheet-username" defaultValue="@hauntedjpeg" />
          </div>
        </SheetContent>
        <SheetFooter>
          <SheetClose render={<Button variant="outline" />}>Cancel</SheetClose>
          <Button variant="brand" type="submit">Save changes</Button>
        </SheetFooter>
      </SheetPopup>
    </Sheet>
  )
}
