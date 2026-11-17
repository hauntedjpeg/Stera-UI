"use client"

import {
  createDataTableColumnHelper,
  DataTable,
  DataTableToolbar,
  DataTableViewOptions,
  useDataTable,
} from "@/components/ui/data-table"

type Order = {
  id: string
  customer: string
  email: string
  items: number
  carrier: string
  total: number
}

const orders: Order[] = [
  {
    id: "ORD-3101",
    customer: "Sarah Chen",
    email: "sarah@example.com",
    items: 3,
    carrier: "UPS",
    total: 129,
  },
  {
    id: "ORD-3102",
    customer: "David Kim",
    email: "david@example.com",
    items: 1,
    carrier: "DHL",
    total: 42.5,
  },
  {
    id: "ORD-3103",
    customer: "Amara Okafor",
    email: "amara@example.com",
    items: 6,
    carrier: "FedEx",
    total: 318.2,
  },
  {
    id: "ORD-3104",
    customer: "Lukas Weber",
    email: "lukas@example.com",
    items: 2,
    carrier: "UPS",
    total: 76,
  },
  {
    id: "ORD-3105",
    customer: "Grace Liu",
    email: "grace@example.com",
    items: 4,
    carrier: "USPS",
    total: 154.9,
  },
]

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
})

const columnHelper = createDataTableColumnHelper<Order>()

const columns = columnHelper.columns([
  columnHelper.accessor("id", {
    header: "Order",
    // The identifying column stays visible
    enableHiding: false,
  }),
  columnHelper.accessor("customer", {
    header: "Customer",
    meta: { label: "Customer" },
  }),
  columnHelper.accessor("email", { header: "Email", meta: { label: "Email" } }),
  columnHelper.accessor("items", {
    header: "Items",
    meta: { label: "Items", align: "end" },
  }),
  columnHelper.accessor("carrier", {
    header: "Carrier",
    meta: { label: "Carrier" },
  }),
  columnHelper.accessor("total", {
    header: "Total",
    meta: { label: "Total", align: "end" },
    cell: ({ getValue }) => currency.format(getValue()),
  }),
])

export default function DataTableColumnVisibility() {
  const table = useDataTable({
    data: orders,
    columns,
    getRowId: (order) => order.id,
    initialState: { columnVisibility: { email: false, carrier: false } },
  })

  return (
    <div className="flex w-full flex-col gap-4">
      <DataTableToolbar>
        <DataTableViewOptions table={table} className="ms-auto" />
      </DataTableToolbar>
      <DataTable table={table} />
    </div>
  )
}
