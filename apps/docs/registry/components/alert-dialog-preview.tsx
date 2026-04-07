"use client"

import { SiDelete } from "stera-icons"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Preview } from "@/components/preview"

export function AlertDialogDefault() {
  return (
    <Preview>
      <AlertDialog>
        <AlertDialogTrigger render={<Button variant="outline">Open dialog</Button>} />
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. Please confirm you want to proceed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Preview>
  )
}

export function AlertDialogWithMedia() {
  return (
    <Preview>
      <AlertDialog>
        <AlertDialogTrigger render={<Button variant="outline">Delete file</Button>} />
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogMedia>
              <SiDelete />
            </AlertDialogMedia>
            <AlertDialogTitle>Delete file</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the file. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Preview>
  )
}

export function AlertDialogSmall() {
  return (
    <Preview>
      <AlertDialog>
        <AlertDialogTrigger render={<Button variant="outline">Save changes?</Button>} />
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogTitle>Save changes?</AlertDialogTitle>
            <AlertDialogDescription>
              You have unsaved changes. Would you like to save before leaving?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Discard</AlertDialogCancel>
            <AlertDialogAction>Save</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Preview>
  )
}

export function AlertDialogDestructive() {
  return (
    <Preview>
      <AlertDialog>
        <AlertDialogTrigger render={<Button variant="danger">Delete account</Button>} />
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete account</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete your account and all associated data. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction variant="danger">Delete account</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Preview>
  )
}
