"use client"

import * as React from "react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  createDataTableColumnHelper,
  DataTable,
  DataTableRowActions,
  useDataTable,
} from "@/components/ui/data-table"
import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

type Project = {
  id: string
  name: string
  owner: string
  updated: string
}

const initialProjects: Project[] = [
  {
    id: "p1",
    name: "Website refresh",
    owner: "Sarah Chen",
    updated: "2 hours ago",
  },
  { id: "p2", name: "Billing v2", owner: "David Kim", updated: "Yesterday" },
  {
    id: "p3",
    name: "Mobile onboarding",
    owner: "Priya Patel",
    updated: "3 days ago",
  },
  {
    id: "p4",
    name: "Design tokens",
    owner: "Lukas Weber",
    updated: "Last week",
  },
]

const columnHelper = createDataTableColumnHelper<Project>()

function getColumns(onDelete: (project: Project) => void) {
  return columnHelper.columns([
    columnHelper.accessor("name", { header: "Project" }),
    columnHelper.accessor("owner", { header: "Owner" }),
    columnHelper.accessor("updated", { header: "Updated" }),
    columnHelper.display({
      id: "actions",
      header: () => <span className="sr-only">Actions</span>,
      meta: { className: "w-12" },
      cell: ({ row }) => (
        <DataTableRowActions label={row.original.name}>
          <DropdownMenuGroup>
            <DropdownMenuItem>Open</DropdownMenuItem>
            <DropdownMenuItem>Rename</DropdownMenuItem>
            <DropdownMenuItem>Duplicate</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="danger"
            onClick={() => onDelete(row.original)}
          >
            Delete
          </DropdownMenuItem>
        </DataTableRowActions>
      ),
    }),
  ])
}

export default function DataTableRowActionsExample() {
  const [projects, setProjects] = React.useState(initialProjects)
  const [pendingDelete, setPendingDelete] = React.useState<Project | null>(null)
  // Columns need the delete handler, so memoize them to keep them stable
  const columns = React.useMemo(() => getColumns(setPendingDelete), [])

  const table = useDataTable({
    data: projects,
    columns,
    getRowId: (project) => project.id,
  })

  return (
    <>
      <DataTable table={table} />
      <AlertDialog
        open={pendingDelete !== null}
        onOpenChange={(open) => {
          if (!open) setPendingDelete(null)
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {pendingDelete?.name}?</AlertDialogTitle>
            <AlertDialogDescription>
              The project and its files will be deleted. This can&apos;t be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant="danger"
              onClick={() => {
                setProjects((rows) =>
                  rows.filter((row) => row.id !== pendingDelete?.id)
                )
                setPendingDelete(null)
              }}
            >
              Delete project
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
