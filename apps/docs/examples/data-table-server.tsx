"use client"

import * as React from "react"

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
import type {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table"

type User = {
  id: string
  name: string
  email: string
  plan: "free" | "pro" | "team"
  seats: number
}

/* --------------------------- A pretend server ---------------------------- */

const firstNames = [
  "Sarah",
  "Marcus",
  "Priya",
  "David",
  "Amara",
  "Lukas",
  "Sofia",
  "Kenji",
  "Elena",
  "Omar",
  "Grace",
  "Mateo",
]
const lastNames = [
  "Chen",
  "Rodriguez",
  "Patel",
  "Kim",
  "Okafor",
  "Weber",
  "Rossi",
  "Tanaka",
]
const planCycle = ["free", "pro", "free", "team", "pro"] as const

const database: User[] = Array.from({ length: 240 }, (_, i) => {
  const first = firstNames[i % firstNames.length]
  const last = lastNames[(i * 5) % lastNames.length]
  const plan = planCycle[(i * 3) % planCycle.length]
  return {
    id: `u${i + 1}`,
    name: `${first} ${last}`,
    email: `${first}.${last}${i}@example.com`.toLowerCase(),
    plan,
    seats: plan === "team" ? 5 + ((i * 7) % 40) : 1,
  }
})

type Query = {
  pagination: PaginationState
  sorting: SortingState
  columnFilters: ColumnFiltersState
  globalFilter: string | undefined
}

type Page = {
  rows: User[]
  total: number
  planCounts: Record<string, number>
}

function fetchUsers(query: Query, signal: AbortSignal): Promise<Page> {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      const search = query.globalFilter?.toLowerCase() ?? ""
      const plans = query.columnFilters.find((f) => f.id === "plan")?.value as
        | string[]
        | undefined

      const searched = database.filter(
        (user) =>
          !search ||
          user.name.toLowerCase().includes(search) ||
          user.email.includes(search)
      )
      const planCounts: Record<string, number> = {}
      for (const user of searched) {
        planCounts[user.plan] = (planCounts[user.plan] ?? 0) + 1
      }

      const rows = searched.filter(
        (user) => !plans || plans.includes(user.plan)
      )
      const [sort] = query.sorting
      if (sort) {
        const key = sort.id as keyof User
        rows.sort((a, b) => {
          const order = a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0
          return sort.desc ? -order : order
        })
      }

      const { pageIndex, pageSize } = query.pagination
      resolve({
        rows: rows.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize),
        total: rows.length,
        planCounts,
      })
    }, 600)
    signal.addEventListener("abort", () => {
      clearTimeout(timeout)
      reject(signal.reason)
    })
  })
}

/* -------------------------------- The table ------------------------------ */

const plans = [
  { value: "free", label: "Free" },
  { value: "pro", label: "Pro" },
  { value: "team", label: "Team" },
]

const columnHelper = createDataTableColumnHelper<User>()

const columns = columnHelper.columns([
  columnHelper.accessor("name", {
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    meta: { label: "Name" },
  }),
  columnHelper.accessor("email", {
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    meta: { label: "Email" },
    cell: ({ getValue }) => (
      <span className="text-ink-subtle">{getValue()}</span>
    ),
  }),
  columnHelper.accessor("plan", {
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    meta: { label: "Plan" },
    cell: ({ getValue }) => (
      <Badge
        variant={getValue() === "free" ? "outline" : "brand"}
        className="capitalize"
      >
        {getValue()}
      </Badge>
    ),
  }),
  columnHelper.accessor("seats", {
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    meta: { label: "Seats", align: "end" },
    sortDescFirst: true,
  }),
])

const noRows: User[] = []

export default function DataTableServer() {
  // The server does the work, so this component owns the state it sends
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [globalFilter, setGlobalFilter] = React.useState<string>()

  const query = React.useMemo(
    () => ({ pagination, sorting, columnFilters, globalFilter }),
    [pagination, sorting, columnFilters, globalFilter]
  )
  const [result, setResult] = React.useState<{ query: Query; page: Page }>()

  React.useEffect(() => {
    const controller = new AbortController()
    fetchUsers(query, controller.signal).then(
      (page) => setResult({ query, page }),
      () => {}
    )
    return () => controller.abort()
  }, [query])

  const table = useDataTable({
    data: result?.page.rows ?? noRows,
    columns,
    getRowId: (user) => user.id,
    rowCount: result?.page.total,
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    // This pretend API sorts by one column
    enableMultiSort: false,
    state: { pagination, sorting, columnFilters, globalFilter },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
  })

  return (
    <div className="flex w-full flex-col gap-4">
      <DataTableToolbar>
        <DataTableSearch
          table={table}
          placeholder="Search users…"
          delay={300}
        />
        <DataTableFacetedFilter
          table={table}
          column="plan"
          options={plans}
          counts={result?.page.planCounts}
        />
        <DataTableResetFilters table={table} />
      </DataTableToolbar>
      <DataTable table={table} loading={result?.query !== query} />
      <DataTablePagination table={table} />
    </div>
  )
}
