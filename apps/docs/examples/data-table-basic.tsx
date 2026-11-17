"use client"

import {
  createDataTableColumnHelper,
  DataTable,
  useDataTable,
} from "@/components/ui/data-table"

type Member = {
  id: string
  name: string
  email: string
  role: string
}

const members: Member[] = [
  { id: "1", name: "Sarah Chen", email: "sarah@example.com", role: "Admin" },
  {
    id: "2",
    name: "Marcus Rodriguez",
    email: "marcus@example.com",
    role: "Editor",
  },
  { id: "3", name: "Priya Patel", email: "priya@example.com", role: "Viewer" },
  { id: "4", name: "David Kim", email: "david@example.com", role: "Editor" },
  { id: "5", name: "Amara Okafor", email: "amara@example.com", role: "Viewer" },
]

const columnHelper = createDataTableColumnHelper<Member>()

// Module scope keeps the columns' reference stable
const columns = columnHelper.columns([
  columnHelper.accessor("name", { header: "Name" }),
  columnHelper.accessor("email", { header: "Email" }),
  columnHelper.accessor("role", { header: "Role" }),
])

export default function DataTableBasic() {
  const table = useDataTable({
    data: members,
    columns,
    getRowId: (member) => member.id,
  })

  return <DataTable table={table} />
}
