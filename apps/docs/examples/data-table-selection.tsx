"use client"

import { Button } from "@/components/ui/button"
import {
  createDataTableColumnHelper,
  createSelectColumn,
  DataTable,
  DataTableBulkActions,
  DataTablePagination,
  useDataTable,
} from "@/components/ui/data-table"

type Member = {
  id: string
  name: string
  email: string
  team: string
}

const names = [
  "Sarah Chen",
  "Marcus Rodriguez",
  "Priya Patel",
  "David Kim",
  "Amara Okafor",
  "Lukas Weber",
  "Sofia Rossi",
  "Kenji Tanaka",
  "Elena Petrova",
  "Omar Haddad",
  "Grace Liu",
  "Mateo García",
  "Hana Novak",
  "Yusuf Demir",
]
const teams = ["Design", "Engineering", "Support", "Sales"]

const members: Member[] = names.map((name, i) => ({
  id: String(i + 1),
  name,
  email: `${name.split(" ")[0].toLowerCase()}@example.com`,
  team: teams[i % teams.length],
}))

const columnHelper = createDataTableColumnHelper<Member>()

const columns = columnHelper.columns([
  createSelectColumn<Member>({ getRowLabel: (member) => member.name }),
  columnHelper.accessor("name", { header: "Name" }),
  columnHelper.accessor("email", { header: "Email" }),
  columnHelper.accessor("team", { header: "Team" }),
])

export default function DataTableSelection() {
  const table = useDataTable({
    data: members,
    columns,
    getRowId: (member) => member.id,
  })

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex min-h-8 items-center">
        <DataTableBulkActions table={table}>
          <Button size="sm">Move to team</Button>
          <Button size="sm" variant="danger">
            Remove
          </Button>
        </DataTableBulkActions>
      </div>
      <DataTable table={table} />
      <DataTablePagination table={table} />
    </div>
  )
}
