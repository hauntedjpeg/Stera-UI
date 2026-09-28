import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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

export default function DrawerDemo() {
  return (
    <Drawer side="right">
      <DrawerTrigger render={<Button variant="outline" />}>Open</DrawerTrigger>
      <DrawerPopup showCloseButton={false}>
        <DrawerHeader>
          <DrawerTitle>Edit profile</DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here. Swipe right or click save when
            you&apos;re done.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerContent className="grid auto-rows-min gap-6 px-4">
          <div className="grid gap-3">
            <Label htmlFor="drawer-name">Name</Label>
            <Input id="drawer-name" defaultValue="Chaz Giese" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="drawer-username">Username</Label>
            <Input id="drawer-username" defaultValue="@hauntedjpeg" />
          </div>
        </DrawerContent>
        <DrawerFooter>
          <DrawerClose render={<Button variant="outline" />}>Cancel</DrawerClose>
          <Button variant="brand" type="submit">Save changes</Button>
        </DrawerFooter>
      </DrawerPopup>
    </Drawer>
  )
}
