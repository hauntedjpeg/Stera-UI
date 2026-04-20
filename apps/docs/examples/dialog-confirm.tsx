import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function DialogConfirm() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline">Delete Account</Button>} />
      <DialogPopup scroll={false} showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
          <Button variant="danger">Delete</Button>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  )
}
