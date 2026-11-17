"use client"

import {
  createDataTableColumnHelper,
  DataTable,
  DataTableColumnHeader,
  useDataTable,
} from "@/components/ui/data-table"

type Invoice = {
  id: string
  customer: string
  issued: string
  amount: number
}

const invoices: Invoice[] = [
  { id: "INV-204", customer: "Northwind", issued: "2026-10-02", amount: 1250 },
  { id: "INV-205", customer: "Acme", issued: "2026-10-05", amount: 320.5 },
  { id: "INV-206", customer: "Globex", issued: "2026-10-09", amount: 4800 },
  { id: "INV-207", customer: "Initech", issued: "2026-10-11", amount: 975 },
  { id: "INV-208", customer: "Acme", issued: "2026-10-14", amount: 2140 },
  { id: "INV-209", customer: "Umbrella", issued: "2026-10-20", amount: 610 },
]

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
})

const columnHelper = createDataTableColumnHelper<Invoice>()

const columns = columnHelper.columns([
  columnHelper.accessor("id", {
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    meta: { label: "Invoice" },
  }),
  columnHelper.accessor("customer", {
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    meta: { label: "Customer" },
  }),
  columnHelper.accessor("issued", {
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    meta: { label: "Issued" },
  }),
  columnHelper.accessor("amount", {
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    meta: { label: "Amount", align: "end" },
    cell: ({ getValue }) => currency.format(getValue()),
  }),
])

export default function DataTableSorting() {
  const table = useDataTable({
    data: invoices,
    columns,
    getRowId: (invoice) => invoice.id,
    initialState: { sorting: [{ id: "amount", desc: true }] },
  })

  return <DataTable table={table} />
}
