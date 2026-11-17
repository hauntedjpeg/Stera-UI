"use client"

import { Badge } from "@/components/ui/badge"
import {
  createDataTableColumnHelper,
  DataTable,
  DataTableColumnHeader,
  DataTableFacetedFilter,
  DataTablePagination,
  DataTableResetFilters,
  DataTableSearch,
  DataTableToolbar,
  useDataTable,
} from "@/components/ui/data-table"

type Task = {
  id: string
  title: string
  status: "todo" | "in-progress" | "done"
  priority: "low" | "medium" | "high"
}

const titles = [
  "Audit color tokens",
  "Write migration guide",
  "Fix focus ring on Select",
  "Add RTL screenshots",
  "Review Drawer snap points",
  "Profile table re-renders",
  "Update icon names",
  "Document Input OTP",
]
const statusCycle = ["todo", "in-progress", "done"] as const
const priorityCycle = ["low", "medium", "high", "medium"] as const

const tasks: Task[] = Array.from({ length: 32 }, (_, i) => ({
  id: `TASK-${100 + i}`,
  title: titles[i % titles.length],
  status: statusCycle[(i * 2) % statusCycle.length],
  priority: priorityCycle[i % priorityCycle.length],
}))

const statuses = [
  { value: "todo", label: "Todo" },
  { value: "in-progress", label: "In progress" },
  { value: "done", label: "Done" },
]
const priorities = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
]

const columnHelper = createDataTableColumnHelper<Task>()

const columns = columnHelper.columns([
  columnHelper.accessor("id", {
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    meta: { label: "Task", className: "w-28" },
  }),
  columnHelper.accessor("title", {
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    meta: { label: "Title" },
  }),
  columnHelper.accessor("status", {
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    meta: { label: "Status" },
    filterFn: "arrHas",
    cell: ({ getValue }) =>
      statuses.find((status) => status.value === getValue())?.label,
  }),
  columnHelper.accessor("priority", {
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    meta: { label: "Priority" },
    filterFn: "arrHas",
    // Search matches ids and titles, not priority names
    enableGlobalFilter: false,
    cell: ({ getValue }) => (
      <Badge
        variant={getValue() === "high" ? "danger" : "outline"}
        className="capitalize"
      >
        {getValue()}
      </Badge>
    ),
  }),
])

export default function DataTableFiltering() {
  const table = useDataTable({
    data: tasks,
    columns,
    getRowId: (task) => task.id,
  })

  return (
    <div className="flex w-full flex-col gap-4">
      <DataTableToolbar>
        <DataTableSearch table={table} placeholder="Search tasks…" />
        <DataTableFacetedFilter
          table={table}
          column="status"
          options={statuses}
        />
        <DataTableFacetedFilter
          table={table}
          column="priority"
          options={priorities}
        />
        <DataTableResetFilters table={table} />
      </DataTableToolbar>
      <DataTable table={table} />
      <DataTablePagination table={table} />
    </div>
  )
}
