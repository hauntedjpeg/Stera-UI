"use client"

import { SiPlus, SiUsers } from "stera-icons"

import { Button } from "@/components/ui/button"
import {
  createDataTableColumnHelper,
  DataTable,
  DataTableSearch,
  DataTableToolbar,
  useDataTable,
} from "@/components/ui/data-table"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

type Member = {
  id: string
  name: string
  email: string
}

const members: Member[] = [
  { id: "1", name: "Sarah Chen", email: "sarah@example.com" },
  { id: "2", name: "Marcus Rodriguez", email: "marcus@example.com" },
  { id: "3", name: "Priya Patel", email: "priya@example.com" },
]
const noMembers: Member[] = []

const columnHelper = createDataTableColumnHelper<Member>()

const columns = columnHelper.columns([
  columnHelper.accessor("name", { header: "Name" }),
  columnHelper.accessor("email", { header: "Email" }),
])

export default function DataTableEmpty() {
  const emptyTable = useDataTable({
    data: noMembers,
    columns,
    getRowId: (member) => member.id,
  })
  const filteredTable = useDataTable({
    data: members,
    columns,
    getRowId: (member) => member.id,
    initialState: { globalFilter: "zoe" },
  })

  return (
    <div className="grid w-full gap-8 lg:grid-cols-2">
      <DataTable
        table={emptyTable}
        empty={
          <Empty className="py-10">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <SiUsers />
              </EmptyMedia>
              <EmptyTitle>No members yet</EmptyTitle>
              <EmptyDescription>
                Invite people to work on this project.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button size="sm">
                <SiPlus data-icon="inline-start" />
                Invite
              </Button>
            </EmptyContent>
          </Empty>
        }
      />
      <div className="flex flex-col gap-4">
        <DataTableToolbar>
          <DataTableSearch
            table={filteredTable}
            placeholder="Search members…"
          />
        </DataTableToolbar>
        <DataTable table={filteredTable} />
      </div>
    </div>
  )
}
