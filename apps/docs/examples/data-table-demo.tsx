"use client"

import * as React from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  createDataTableColumnHelper,
  createSelectColumn,
  DataTable,
  DataTableBulkActions,
  DataTableColumnHeader,
  DataTableFacetedFilter,
  DataTablePagination,
  DataTableResetFilters,
  DataTableRowActions,
  DataTableSearch,
  DataTableToolbar,
  DataTableViewOptions,
  useDataTable,
} from "@/components/ui/data-table"
import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

type Payment = {
  id: string
  customer: string
  email: string
  status: "paid" | "pending" | "failed" | "refunded"
  amount: number
  date: string
}

const customers = [
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
]
const statusCycle = [
  "paid",
  "paid",
  "pending",
  "paid",
  "failed",
  "refunded",
] as const

const initialPayments: Payment[] = Array.from({ length: 64 }, (_, i) => {
  const customer = customers[i % customers.length]
  return {
    id: `PAY-${1040 + i}`,
    customer,
    email: `${customer.split(" ")[0].toLowerCase()}@example.com`,
    status: statusCycle[(i * 5) % statusCycle.length],
    amount: ((i * 3719) % 90000) / 100 + 25,
    date: new Date(Date.UTC(2026, 9, 30 - (i % 30))).toISOString().slice(0, 10),
  }
})

const statuses = [
  { value: "paid", label: "Paid" },
  { value: "pending", label: "Pending" },
  { value: "failed", label: "Failed" },
  { value: "refunded", label: "Refunded" },
]

const statusBadge = {
  paid: "success",
  pending: "warning",
  failed: "danger",
  refunded: "default",
} as const

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
})
const dateFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  timeZone: "UTC",
})

const columnHelper = createDataTableColumnHelper<Payment>()

function getColumns(onDelete: (id: string) => void) {
  return columnHelper.columns([
    createSelectColumn<Payment>({ getRowLabel: (payment) => payment.id }),
    columnHelper.accessor("id", {
      header: ({ column }) => <DataTableColumnHeader column={column} />,
      meta: { label: "Payment" },
      cell: ({ getValue }) => (
        <span className="st-label-md-medium">{getValue()}</span>
      ),
    }),
    columnHelper.accessor("customer", {
      header: ({ column }) => <DataTableColumnHeader column={column} />,
      meta: { label: "Customer" },
    }),
    columnHelper.accessor("email", {
      header: ({ column }) => <DataTableColumnHeader column={column} />,
      meta: { label: "Email" },
      cell: ({ getValue }) => (
        <span className="text-ink-subtle">{getValue()}</span>
      ),
    }),
    columnHelper.accessor("status", {
      header: ({ column }) => <DataTableColumnHeader column={column} />,
      meta: { label: "Status" },
      filterFn: "arrHas",
      cell: ({ getValue }) => {
        const status = getValue()
        return (
          <Badge variant={statusBadge[status]} className="capitalize">
            {status}
          </Badge>
        )
      },
    }),
    columnHelper.accessor("date", {
      header: ({ column }) => <DataTableColumnHeader column={column} />,
      meta: { label: "Date" },
      sortDescFirst: true,
      cell: ({ getValue }) => dateFormat.format(new Date(getValue())),
    }),
    columnHelper.accessor("amount", {
      header: ({ column }) => <DataTableColumnHeader column={column} />,
      meta: { label: "Amount", align: "end" },
      cell: ({ getValue }) => currency.format(getValue()),
    }),
    columnHelper.display({
      id: "actions",
      header: () => <span className="sr-only">Actions</span>,
      enableHiding: false,
      meta: { className: "w-12" },
      cell: ({ row }) => (
        <DataTableRowActions label={row.original.id}>
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(row.original.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuItem>View customer</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="danger"
            onClick={() => {
              row.toggleSelected(false)
              onDelete(row.id)
            }}
          >
            Delete
          </DropdownMenuItem>
        </DataTableRowActions>
      ),
    }),
  ])
}

export default function DataTableDemo() {
  const [data, setData] = React.useState(initialPayments)
  // Keep columns stable: rebuilding them on every render rebuilds the table
  const columns = React.useMemo(
    () =>
      getColumns((id) =>
        setData((rows) => rows.filter((row) => row.id !== id))
      ),
    []
  )

  const table = useDataTable({
    data,
    columns,
    getRowId: (payment) => payment.id,
    initialState: { columnVisibility: { email: false } },
  })

  return (
    <div className="flex w-full flex-col gap-4">
      <DataTableToolbar>
        <DataTableSearch table={table} placeholder="Search payments…" />
        <DataTableFacetedFilter
          table={table}
          column="status"
          options={statuses}
        />
        <DataTableResetFilters table={table} />
        <div className="ms-auto flex items-center gap-2">
          <DataTableBulkActions table={table}>
            <Button size="sm">Export</Button>
            <Button
              size="sm"
              variant="danger"
              onClick={() => {
                const ids = table.getSelectedRowIds()
                setData((rows) => rows.filter((row) => !ids.includes(row.id)))
                table.resetRowSelection(true)
              }}
            >
              Delete
            </Button>
          </DataTableBulkActions>
          <DataTableViewOptions table={table} />
        </div>
      </DataTableToolbar>
      <DataTable table={table} />
      <DataTablePagination table={table} />
    </div>
  )
}
