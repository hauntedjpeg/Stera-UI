"use client"

import * as React from "react"
import {
  columnFacetingFeature,
  columnFilteringFeature,
  columnVisibilityFeature,
  createColumnHelper,
  createFacetedRowModel,
  createFacetedUniqueValues,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  filterFn_arrHas,
  filterFn_arrIncludesSome,
  filterFn_equals,
  filterFn_includesString,
  filterFn_inNumberRange,
  globalFilteringFeature,
  metaHelper,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  sortFn_alphanumeric,
  sortFn_basic,
  sortFn_datetime,
  sortFn_text,
  Subscribe,
  tableFeatures,
  useTable,
  type Column,
  type ColumnDef,
  type ReactTable,
  type Row,
  type RowData,
  type TableOptions,
  type TableState,
} from "@tanstack/react-table"
import {
  SiArrowDown,
  SiArrowUp,
  SiChevronDown,
  SiChevronLeft,
  SiChevronOutward,
  SiChevronRight,
  SiChevronsLeft,
  SiChevronsRight,
  SiMore,
  SiSearch,
  SiSliders,
  SiX,
} from "stera-icons"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

/* -------------------------------------------------------------------------- */
/*                                   Setup                                    */
/* -------------------------------------------------------------------------- */

type DataTableColumnMeta = {
  /** Human-readable column name for the header, View menu and filters. */
  label?: string
  /** `end` right-aligns the header and cells and uses tabular numbers. */
  align?: "start" | "end"
  /** Classes for every header and body cell in the column. */
  className?: string
}

/**
 * The TanStack Table features every Data Table part relies on. Unregistered
 * features are tree-shaken, so add one here (grouping, expanding, pinning…)
 * when a table needs it.
 */
const dataTableFeatures = tableFeatures({
  rowSortingFeature,
  sortedRowModel: createSortedRowModel(),
  sortFns: {
    alphanumeric: sortFn_alphanumeric,
    basic: sortFn_basic,
    datetime: sortFn_datetime,
    text: sortFn_text,
  },
  columnFilteringFeature,
  globalFilteringFeature,
  filteredRowModel: createFilteredRowModel(),
  filterFns: {
    // A value that equals any of the chosen ones, for faceted filters
    arrHas: filterFn_arrHas,
    // An array value, such as tags, that holds any of the chosen ones
    arrIncludesSome: filterFn_arrIncludesSome,
    equals: filterFn_equals,
    includesString: filterFn_includesString,
    inNumberRange: filterFn_inNumberRange,
  },
  columnFacetingFeature,
  facetedRowModel: createFacetedRowModel(),
  facetedUniqueValues: createFacetedUniqueValues(),
  rowPaginationFeature,
  paginatedRowModel: createPaginatedRowModel(),
  rowSelectionFeature,
  columnVisibilityFeature,
  columnMeta: metaHelper<DataTableColumnMeta>(),
})

type DataTableFeatures = typeof dataTableFeatures

type DataTableInstance<TData extends RowData> = ReactTable<
  DataTableFeatures,
  TData,
  unknown
>

type DataTableState = TableState<DataTableFeatures>

type DataTableColumnDef<TData extends RowData, TValue = unknown> = ColumnDef<
  DataTableFeatures,
  TData,
  TValue
>

/** A column helper typed for the Data Table features. */
function createDataTableColumnHelper<TData extends RowData>() {
  return createColumnHelper<DataTableFeatures, TData>()
}

type UseDataTableOptions<TData extends RowData> = Omit<
  TableOptions<DataTableFeatures, TData>,
  "features" | "getRowId"
> & {
  /** Stable row ids keep selection on the right rows as data sorts, filters and refetches. */
  getRowId: NonNullable<TableOptions<DataTableFeatures, TData>["getRowId"]>
}

// A constant, so the shallow compare never sees a change
const nothingSelected: Record<string, never> = {}
const selectNothing = () => nothingSelected

/**
 * `useTable` with the Data Table features and a 10-row page.
 *
 * By default the component calling it doesn't re-render on table state
 * changes: each part subscribes to the state it shows. Pass a selector to
 * read state in your component, the same way as `useTable`.
 */
function useDataTable<TData extends RowData, TSelected = Record<string, never>>(
  options: UseDataTableOptions<TData>,
  selector?: (state: DataTableState) => TSelected
) {
  return useTable<DataTableFeatures, TData, TSelected>(
    {
      // Editing or deleting a row shouldn't jump to page 1. The parts reset
      // the page themselves when sorting, search or filters change.
      autoResetPageIndex: false,
      ...options,
      features: dataTableFeatures,
      initialState: {
        ...options.initialState,
        pagination: {
          pageIndex: 0,
          pageSize: 10,
          ...options.initialState?.pagination,
        },
      },
    },
    selector ?? (selectNothing as () => TSelected)
  )
}

/* -------------------------------------------------------------------------- */
/*                                   Table                                    */
/* -------------------------------------------------------------------------- */

const selectRowModelState = (state: DataTableState) => ({
  sorting: state.sorting,
  columnFilters: state.columnFilters,
  globalFilter: state.globalFilter,
  pagination: state.pagination,
  columnVisibility: state.columnVisibility,
})

const selectFilterState = (state: DataTableState) => ({
  columnFilters: state.columnFilters,
  globalFilter: state.globalFilter,
})

function getIsFiltered(state: ReturnType<typeof selectFilterState>) {
  return (
    state.columnFilters.length > 0 ||
    (state.globalFilter != null && state.globalFilter !== "")
  )
}

function clearFilters<TData extends RowData>(table: DataTableInstance<TData>) {
  table.resetColumnFilters(true)
  table.resetGlobalFilter(true)
  table.setPageIndex(0)
}

/** Moves focus to the nearest search, for buttons that disappear once pressed. */
function focusNearestSearch(from: HTMLElement) {
  let node = from.parentElement
  while (node) {
    const input = node.querySelector<HTMLInputElement>(
      '[data-slot="data-table-search"] input'
    )
    if (input) return input.focus()
    node = node.parentElement
  }
}

function alignClass(meta: DataTableColumnMeta | undefined) {
  return meta?.align === "end" ? "text-end tabular-nums" : undefined
}

function getColumnLabel<TData extends RowData, TValue>(
  column: Column<DataTableFeatures, TData, TValue>
) {
  const { meta, header } = column.columnDef
  return meta?.label ?? (typeof header === "string" ? header : column.id)
}

type DataTableProps<TData extends RowData> = Omit<
  React.ComponentProps<typeof Table>,
  "children"
> & {
  table: DataTableInstance<TData>
  /** Shows skeleton rows when there are no rows yet, and dims the rows while they refresh. */
  loading?: boolean
  /** Replaces the state shown when there's no data. */
  empty?: React.ReactNode
  /** Replaces the state shown when filters match no rows. */
  noMatches?: React.ReactNode
}

function DataTable<TData extends RowData>({
  table,
  loading = false,
  empty,
  noMatches,
  className,
  ...props
}: DataTableProps<TData>) {
  return (
    <>
      <Table
        data-slot="data-table"
        aria-busy={loading || undefined}
        className={className}
        {...props}
      >
        <DataTableHeader table={table} />
        <DataTableBody
          table={table}
          loading={loading}
          empty={empty}
          noMatches={noMatches}
        />
      </Table>
      <DataTableAnnouncer table={table} loading={loading} />
    </>
  )
}

function DataTableHeader<TData extends RowData>({
  table,
}: {
  table: DataTableInstance<TData>
}) {
  return (
    <table.Subscribe
      selector={(state) => ({
        sorting: state.sorting,
        columnVisibility: state.columnVisibility,
      })}
    >
      {() => (
        <TableHeader data-slot="data-table-header">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="hover:bg-transparent">
              {headerGroup.headers.map((header) => {
                const meta = header.column.columnDef.meta
                const sorted = header.column.getIsSorted()
                return (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    aria-sort={
                      sorted === "asc"
                        ? "ascending"
                        : sorted === "desc"
                          ? "descending"
                          : undefined
                    }
                    className={cn(alignClass(meta), meta?.className)}
                  >
                    {header.isPlaceholder ? null : (
                      <table.FlexRender header={header} />
                    )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
      )}
    </table.Subscribe>
  )
}

function DataTableBody<TData extends RowData>({
  table,
  loading,
  empty,
  noMatches,
}: {
  table: DataTableInstance<TData>
  loading: boolean
  empty?: React.ReactNode
  noMatches?: React.ReactNode
}) {
  return (
    // Row selection is left out on purpose: each row subscribes to its own.
    <table.Subscribe selector={selectRowModelState}>
      {(state) => {
        const rows = table.getRowModel().rows
        const columns = table.getVisibleLeafColumns()

        if (rows.length === 0 && loading) {
          return (
            <TableBody data-slot="data-table-body">
              {Array.from({ length: state.pagination.pageSize }, (_, i) => (
                <TableRow
                  key={i}
                  aria-hidden="true"
                  className="hover:bg-transparent"
                >
                  {columns.map((column) => (
                    <TableCell key={column.id}>
                      <Skeleton className="h-4 w-full max-w-32" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          )
        }

        // Deleting the last rows, or a shrinking server total, can leave the
        // page index past the end. Step back rather than show an empty page.
        // A negative page count means the total isn't known.
        const pageCount = table.getPageCount()
        const { pageIndex } = state.pagination
        if (
          rows.length === 0 &&
          pageIndex > 0 &&
          (pageCount < 0 || pageIndex >= pageCount)
        ) {
          return (
            <TableBody data-slot="data-table-body">
              <ClampPageIndex
                table={table}
                pageIndex={
                  pageCount < 0 ? pageIndex - 1 : Math.max(pageCount - 1, 0)
                }
              />
            </TableBody>
          )
        }

        if (rows.length === 0) {
          return (
            <TableBody data-slot="data-table-body">
              <TableRow className="hover:bg-transparent">
                <TableCell
                  colSpan={columns.length}
                  className="whitespace-normal"
                >
                  {getIsFiltered(state)
                    ? (noMatches ?? <DataTableNoMatches table={table} />)
                    : (empty ?? <DataTableEmpty />)}
                </TableCell>
              </TableRow>
            </TableBody>
          )
        }

        const columnsKey = columns.map((column) => column.id).join()
        return (
          <TableBody
            data-slot="data-table-body"
            data-loading={loading || undefined}
            className="transition-opacity data-loading:opacity-60"
          >
            {rows.map((row) => (
              <DataTableRow
                key={row.id}
                table={table}
                row={row}
                columnsKey={columnsKey}
              />
            ))}
          </TableBody>
        )
      }}
    </table.Subscribe>
  )
}

function ClampPageIndex<TData extends RowData>({
  table,
  pageIndex,
}: {
  table: DataTableInstance<TData>
  pageIndex: number
}) {
  // Before paint, so the empty page never shows
  React.useLayoutEffect(() => {
    table.setPageIndex(pageIndex)
  }, [table, pageIndex])
  return null
}

type DataTableRowProps<TData extends RowData> = {
  table: DataTableInstance<TData>
  row: Row<DataTableFeatures, TData>
  columnsKey: string
}

/**
 * The table object changes identity whenever the component owning it
 * re-renders, so compare what cells actually read: the row, the visible
 * columns, the column definitions and `meta`.
 */
function rowPropsAreEqual<TData extends RowData>(
  prev: DataTableRowProps<TData>,
  next: DataTableRowProps<TData>
) {
  return (
    prev.row === next.row &&
    prev.columnsKey === next.columnsKey &&
    prev.table.options.columns === next.table.options.columns &&
    prev.table.options.meta === next.table.options.meta
  )
}

/**
 * Memoized so sorting, paging and selection only re-render the rows that
 * change. A row re-renders when its data, its selection, the visible columns,
 * the column definitions or the table's `meta` change. A cell that reads any
 * other table state should subscribe to it with `table.Subscribe`.
 */
const DataTableRow = React.memo(function DataTableRow<TData extends RowData>({
  table,
  row,
}: DataTableRowProps<TData>) {
  return (
    <table.Subscribe
      source={table.atoms.rowSelection}
      selector={(rowSelection) => !!rowSelection?.[row.id]}
    >
      {(selected) => (
        <TableRow
          data-slot="data-table-row"
          data-state={selected ? "selected" : undefined}
        >
          {row.getVisibleCells().map((cell) => {
            const meta = cell.column.columnDef.meta
            return (
              <TableCell
                key={cell.id}
                className={cn(alignClass(meta), meta?.className)}
              >
                <table.FlexRender cell={cell} />
              </TableCell>
            )
          })}
        </TableRow>
      )}
    </table.Subscribe>
  )
}, rowPropsAreEqual) as <TData extends RowData>(
  props: DataTableRowProps<TData>
) => React.ReactElement

function DataTableEmpty() {
  return (
    <Empty className="py-10">
      <EmptyHeader>
        <EmptyTitle>No results</EmptyTitle>
        <EmptyDescription>There&apos;s nothing here yet.</EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}

function DataTableNoMatches<TData extends RowData>({
  table,
}: {
  table: DataTableInstance<TData>
}) {
  return (
    <Empty className="py-10">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <SiSearch />
        </EmptyMedia>
        <EmptyTitle>No matches</EmptyTitle>
        <EmptyDescription>
          Nothing matches the current filters.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button
          size="sm"
          onClick={(event) => {
            focusNearestSearch(event.currentTarget)
            clearFilters(table)
          }}
        >
          Clear filters
        </Button>
      </EmptyContent>
    </Empty>
  )
}

/** Tells screen reader users how many rows match after the filters change. */
function DataTableAnnouncer<TData extends RowData>({
  table,
  loading,
}: {
  table: DataTableInstance<TData>
  loading: boolean
}) {
  return (
    <table.Subscribe selector={selectFilterState}>
      {(state) => (
        <LiveCount
          filtersKey={JSON.stringify(state)}
          count={table.getRowCount()}
          // Without a total, the count would only be the rows on this page
          ready={!loading && table.getPageCount() >= 0}
        />
      )}
    </table.Subscribe>
  )
}

function LiveCount({
  filtersKey,
  count,
  ready,
}: {
  filtersKey: string
  count: number
  ready: boolean
}) {
  const [message, setMessage] = React.useState("")
  const initialKey = React.useRef(filtersKey)
  const touched = React.useRef(false)

  React.useEffect(() => {
    if (!touched.current) {
      if (filtersKey === initialKey.current) return
      touched.current = true
    }
    // Clear it first, so the same count is announced again
    setMessage("")
    // Wait for results and for typing to settle
    if (!ready) return
    const timeout = setTimeout(() => {
      setMessage(
        `${count.toLocaleString()} ${count === 1 ? "result" : "results"}`
      )
    }, 500)
    return () => clearTimeout(timeout)
  }, [filtersKey, count, ready])

  return (
    <div
      data-slot="data-table-announcer"
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"
    >
      {message}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*                                  Columns                                   */
/* -------------------------------------------------------------------------- */

type DataTableColumnHeaderProps<
  TData extends RowData,
  TValue,
> = React.ComponentProps<"span"> & {
  column: Column<DataTableFeatures, TData, TValue>
  /** Defaults to the column's `meta.label`. */
  title?: React.ReactNode
}

/** A header that sorts its column on click. Shift-click adds a secondary sort. */
function DataTableColumnHeader<TData extends RowData, TValue>({
  column,
  title,
  className,
  ...props
}: DataTableColumnHeaderProps<TData, TValue>) {
  const meta = column.columnDef.meta
  const label = title ?? getColumnLabel(column)

  if (!column.getCanSort()) {
    return (
      <span
        data-slot="data-table-column-header"
        className={className}
        {...props}
      >
        {label}
      </span>
    )
  }

  return (
    // Read the direction from state, not `column.getIsSorted()`: the column
    // object never changes, so a compiler could cache that call.
    <Subscribe
      source={column.table.store}
      selector={(state) => {
        const sort = state.sorting.find((item) => item.id === column.id)
        return sort ? (sort.desc ? "desc" : "asc") : false
      }}
    >
      {(sorted) => {
        const Icon =
          sorted === "asc"
            ? SiArrowUp
            : sorted === "desc"
              ? SiArrowDown
              : SiChevronOutward
        return (
          <Button
            data-slot="data-table-column-header"
            variant="ghost"
            size="xs"
            className={cn(
              "st-label-md-medium select-none",
              meta?.align === "end" ? "-me-2" : "-ms-2",
              className
            )}
            onClick={(event) => {
              column.getToggleSortingHandler()?.(event)
              // Manual (server) sorting doesn't reset the page on its own
              column.table.setPageIndex(0)
            }}
          >
            {label}
            <Icon
              data-icon="inline-end"
              aria-hidden="true"
              className={cn(!sorted && "text-ink-subtlest")}
            />
          </Button>
        )
      }}
    </Subscribe>
  )
}

type CreateSelectColumnOptions<TData extends RowData> = {
  /** Names the row in its checkbox label, such as "Select Sarah Chen". */
  getRowLabel?: (row: TData) => string
}

/** A checkbox column for row selection. Shift-click selects a range. */
function createSelectColumn<TData extends RowData>({
  getRowLabel,
}: CreateSelectColumnOptions<TData> = {}): DataTableColumnDef<TData> {
  return {
    id: "select",
    enableSorting: false,
    enableHiding: false,
    enableGlobalFilter: false,
    meta: { className: "w-8" },
    header: ({ table }) => (
      <Subscribe
        source={table.store}
        selector={(state) => ({
          rowSelection: state.rowSelection,
          pagination: state.pagination,
          columnFilters: state.columnFilters,
          globalFilter: state.globalFilter,
        })}
      >
        {() => {
          const all = table.getIsAllPageRowsSelected()
          const selectable = table
            .getRowModel()
            .rows.some((row) => row.getCanSelect())
          return (
            <Checkbox
              checked={all}
              disabled={!selectable}
              indeterminate={!all && table.getIsSomePageRowsSelected()}
              onCheckedChange={(checked) =>
                table.toggleAllPageRowsSelected(checked)
              }
              aria-label="Select all rows on this page"
            />
          )
        }}
      </Subscribe>
    ),
    cell: ({ row, table }) => (
      <Subscribe
        source={table.atoms.rowSelection}
        selector={(rowSelection) => !!rowSelection?.[row.id]}
      >
        {(selected) => (
          <Checkbox
            checked={selected}
            disabled={!row.getCanSelect()}
            // Shift-click selects a range; keep it from selecting text too
            onMouseDown={(event) => {
              if (event.shiftKey) event.preventDefault()
            }}
            onCheckedChange={(checked, details) => {
              const event = details.event as { shiftKey?: boolean }
              // The handler reads `target.checked` and Shift for range selection
              row.getToggleSelectedHandler()({
                target: { checked },
                shiftKey: event.shiftKey,
              })
            }}
            aria-label={
              getRowLabel ? `Select ${getRowLabel(row.original)}` : "Select row"
            }
          />
        )}
      </Subscribe>
    ),
  }
}

type DataTableRowActionsProps = {
  /** Names the row in the trigger's label, such as "Actions for Sarah Chen". */
  label: string
  /** The menu's items. */
  children: React.ReactNode
}

/** A row's actions, grouped in a menu. */
function DataTableRowActions({ label, children }: DataTableRowActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        data-slot="data-table-row-actions"
        render={
          <Button
            variant="ghost"
            size="icon-sm"
            className="-my-1"
            aria-label={`Actions for ${label}`}
          />
        }
      >
        <SiMore />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">{children}</DropdownMenuContent>
    </DropdownMenu>
  )
}

/* -------------------------------------------------------------------------- */
/*                                  Toolbar                                   */
/* -------------------------------------------------------------------------- */

function DataTableToolbar({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="data-table-toolbar"
      className={cn("flex flex-wrap items-center gap-2", className)}
      {...props}
    />
  )
}

type DataTableSearchProps<TData extends RowData> = Omit<
  React.ComponentProps<typeof InputGroupInput>,
  "value" | "defaultValue" | "onChange"
> & {
  table: DataTableInstance<TData>
  /** Searches one column. Leave it out to search every column. */
  column?: string
  /** Milliseconds to wait after typing stops. Raise it when searching hits a server. */
  delay?: number
}

/** Searches every column, or one. Escape clears it. */
function DataTableSearch<TData extends RowData>({
  table,
  column,
  delay = 150,
  placeholder = "Search…",
  className,
  onKeyDown,
  ...props
}: DataTableSearchProps<TData>) {
  return (
    <table.Subscribe
      selector={(state) =>
        column
          ? state.columnFilters.find((filter) => filter.id === column)?.value
          : state.globalFilter
      }
    >
      {(filterValue) => (
        <SearchInput
          value={typeof filterValue === "string" ? filterValue : ""}
          delay={delay}
          onCommit={(value) => {
            const next = value === "" ? undefined : value
            if (column) table.getColumn(column)?.setFilterValue(next)
            else table.setGlobalFilter(next)
            // Manual (server) filtering doesn't reset the page on its own
            table.setPageIndex(0)
          }}
          placeholder={placeholder}
          className={className}
          onKeyDown={onKeyDown}
          {...props}
        />
      )}
    </table.Subscribe>
  )
}

function SearchInput({
  value,
  delay,
  onCommit,
  className,
  onKeyDown,
  ref,
  ...props
}: Omit<React.ComponentProps<typeof InputGroupInput>, "value" | "onChange"> & {
  value: string
  delay: number
  onCommit: (value: string) => void
}) {
  const [draft, setDraft] = React.useState(value)
  // The last value this input sent. A server table's state can lag behind it.
  const [committed, setCommitted] = React.useState(value)
  const [previousValue, setPreviousValue] = React.useState(value)
  const [outsideChanges, setOutsideChanges] = React.useState(0)
  const timeout = React.useRef<ReturnType<typeof setTimeout>>(undefined)
  const inputRef = React.useRef<HTMLInputElement>(null)

  // Follow changes made elsewhere, such as Clear filters. The table catching
  // up with this input's own commit isn't one, so typing is never undone.
  if (value !== previousValue) {
    setPreviousValue(value)
    if (value !== committed) {
      setCommitted(value)
      setDraft(value)
      setOutsideChanges((count) => count + 1)
    }
  }

  // An outside change replaces the typing, so drop its pending commit
  React.useEffect(() => clearTimeout(timeout.current), [outsideChanges])
  React.useEffect(() => () => clearTimeout(timeout.current), [])

  function commit(next: string) {
    clearTimeout(timeout.current)
    if (next === committed) return
    setCommitted(next)
    onCommit(next)
  }

  return (
    <InputGroup
      data-slot="data-table-search"
      className={cn("w-full sm:w-64", className)}
    >
      <InputGroupAddon align="inline-start">
        <SiSearch aria-hidden="true" />
      </InputGroupAddon>
      <InputGroupInput
        type="search"
        aria-label="Search"
        {...props}
        ref={(node) => {
          inputRef.current = node
          if (typeof ref === "function") ref(node)
          else if (ref) ref.current = node
        }}
        value={draft}
        onChange={(event) => {
          const next = event.target.value
          setDraft(next)
          clearTimeout(timeout.current)
          timeout.current = setTimeout(() => commit(next), delay)
        }}
        onKeyDown={(event) => {
          onKeyDown?.(event)
          if (event.key === "Enter") commit(draft)
          if (event.key === "Escape" && draft !== "") {
            event.stopPropagation()
            setDraft("")
            commit("")
          }
        }}
        className="[&::-webkit-search-cancel-button]:hidden"
      />
      {draft !== "" && (
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            variant="ghost"
            size="icon-xs"
            aria-label="Clear search"
            onClick={() => {
              setDraft("")
              commit("")
              // The button goes away, so keep focus in the search
              inputRef.current?.focus()
            }}
          >
            <SiX />
          </InputGroupButton>
        </InputGroupAddon>
      )}
    </InputGroup>
  )
}

type DataTableFacetedFilterOption = {
  label: string
  value: string
  icon?: React.ComponentType<{ className?: string }>
}

type DataTableFacetedFilterProps<TData extends RowData> = {
  table: DataTableInstance<TData>
  /**
   * The column to filter. Give it `filterFn: "arrHas"`, or
   * `"arrIncludesSome"` when its value is an array, such as tags.
   */
  column: string
  /** Defaults to the column's `meta.label`. */
  title?: string
  options: DataTableFacetedFilterOption[]
  /** Counts per value. Leave it out to count the loaded rows; pass server counts when filtering on a server. */
  counts?: Record<string, number>
  className?: string
}

/** Filters a column to one or more values, with a count beside each. */
function DataTableFacetedFilter<TData extends RowData>({
  table,
  column: columnId,
  title,
  options,
  counts,
  className,
}: DataTableFacetedFilterProps<TData>) {
  return (
    <table.Subscribe selector={selectFilterState}>
      {() => {
        const column = table.getColumn(columnId)
        if (!column) return null

        const label = title ?? getColumnLabel(column)
        const filterValue = column.getFilterValue()
        const selected = new Set(
          Array.isArray(filterValue) ? (filterValue as string[]) : []
        )
        const facets = counts ? undefined : column.getFacetedUniqueValues()

        function setSelected(next: Set<string>) {
          column?.setFilterValue(next.size > 0 ? [...next] : undefined)
          table.setPageIndex(0)
        }

        return (
          <DropdownMenu>
            <DropdownMenuTrigger
              data-slot="data-table-faceted-filter"
              render={
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(selected.size > 0 && "pr-2", className)}
                />
              }
            >
              {label}
              {selected.size > 0 && (
                <Badge size="sm" variant="solid">
                  {selected.size}
                  <span className="sr-only"> selected</span>
                </Badge>
              )}
              <SiChevronDown data-icon="inline-end" aria-hidden="true" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-48">
              <DropdownMenuGroup>
                <DropdownMenuLabel>{label}</DropdownMenuLabel>
                {options.map((option) => {
                  const count = counts
                    ? counts[option.value]
                    : facets?.get(option.value)
                  const Icon = option.icon
                  return (
                    <DropdownMenuCheckboxItem
                      key={option.value}
                      checked={selected.has(option.value)}
                      onCheckedChange={(checked) => {
                        const next = new Set(selected)
                        if (checked) next.add(option.value)
                        else next.delete(option.value)
                        setSelected(next)
                      }}
                    >
                      {Icon && <Icon className="mt-0.5 text-ink-subtle" />}
                      {option.label}
                      <span className="ml-auto text-ink-subtlest tabular-nums">
                        {count ?? 0}
                      </span>
                    </DropdownMenuCheckboxItem>
                  )
                })}
              </DropdownMenuGroup>
              {selected.size > 0 && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setSelected(new Set())}>
                    Clear filter
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )
      }}
    </table.Subscribe>
  )
}

/** Clears search and filters. Renders only while one is active. */
function DataTableResetFilters<TData extends RowData>({
  table,
  className,
  ...props
}: Omit<React.ComponentProps<typeof Button>, "onClick"> & {
  table: DataTableInstance<TData>
}) {
  return (
    <table.Subscribe selector={selectFilterState}>
      {(state) =>
        getIsFiltered(state) ? (
          <Button
            data-slot="data-table-reset-filters"
            variant="ghost"
            size="sm"
            className={className}
            onClick={(event) => {
              // The button goes away, so keep focus in the toolbar
              focusNearestSearch(event.currentTarget)
              clearFilters(table)
            }}
            {...props}
          >
            Reset
            <SiX data-icon="inline-end" aria-hidden="true" />
          </Button>
        ) : null
      }
    </table.Subscribe>
  )
}

/** Shows and hides columns. Lists every column that can hide, by its `meta.label`. */
function DataTableViewOptions<TData extends RowData>({
  table,
  className,
}: {
  table: DataTableInstance<TData>
  className?: string
}) {
  return (
    <table.Subscribe selector={(state) => state.columnVisibility}>
      {() => {
        const columns = table
          .getAllLeafColumns()
          .filter((column) => column.accessorFn && column.getCanHide())

        return (
          <DropdownMenu>
            <DropdownMenuTrigger
              data-slot="data-table-view-options"
              render={
                <Button variant="outline" size="sm" className={className} />
              }
            >
              <SiSliders data-icon="inline-start" aria-hidden="true" />
              View
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuGroup>
                <DropdownMenuLabel>Columns</DropdownMenuLabel>
                {columns.map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    checked={column.getIsVisible()}
                    onCheckedChange={(checked) =>
                      column.toggleVisibility(checked)
                    }
                  >
                    {getColumnLabel(column)}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => table.resetColumnVisibility()}>
                Reset
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      }}
    </table.Subscribe>
  )
}

/* -------------------------------------------------------------------------- */
/*                                  Footer                                    */
/* -------------------------------------------------------------------------- */

type DataTablePaginationProps<TData extends RowData> =
  React.ComponentProps<"div"> & {
    table: DataTableInstance<TData>
    pageSizeOptions?: number[]
  }

/** The row count, a rows-per-page choice and page navigation. */
function DataTablePagination<TData extends RowData>({
  table,
  pageSizeOptions = [10, 20, 50],
  className,
  ...props
}: DataTablePaginationProps<TData>) {
  const pageSizeId = React.useId()

  return (
    <table.Subscribe
      selector={(state) => ({
        pagination: state.pagination,
        columnFilters: state.columnFilters,
        globalFilter: state.globalFilter,
      })}
    >
      {({ pagination: { pageIndex, pageSize } }) => {
        const pageCount = table.getPageCount()
        // A negative page count means the total isn't known
        const totalKnown = pageCount >= 0
        const rowCount = table.getRowCount()
        const pageRows = table.getRowModel().rows.length
        const start = pageRows === 0 ? 0 : pageIndex * pageSize + 1
        const end = pageIndex * pageSize + pageRows

        return (
          <div
            data-slot="data-table-pagination"
            className={cn(
              "flex flex-wrap items-center justify-between gap-x-6 gap-y-3 st-label-sm text-ink-subtle",
              className
            )}
            {...props}
          >
            <p className="tabular-nums">
              {pageRows === 0
                ? "No rows"
                : totalKnown
                  ? `Showing ${start.toLocaleString()}–${end.toLocaleString()} of ${rowCount.toLocaleString()}`
                  : `Showing ${start.toLocaleString()}–${end.toLocaleString()}`}
            </p>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <label htmlFor={pageSizeId} className="hidden sm:block">
                  Rows per page
                </label>
                <NativeSelect
                  id={pageSizeId}
                  size="sm"
                  aria-label="Rows per page"
                  value={String(pageSize)}
                  onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                    table.setPageSize(Number(event.target.value))
                  }
                >
                  {(pageSizeOptions.includes(pageSize)
                    ? pageSizeOptions
                    : [...pageSizeOptions, pageSize].sort((a, b) => a - b)
                  ).map((option) => (
                    <NativeSelectOption key={option} value={option}>
                      {option}
                    </NativeSelectOption>
                  ))}
                </NativeSelect>
              </div>
              <nav aria-label="Pagination" className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="icon-sm"
                  focusableWhenDisabled
                  className="hidden sm:inline-flex"
                  aria-label="First page"
                  disabled={!table.getCanPreviousPage()}
                  onClick={() => table.firstPage()}
                >
                  <SiChevronsLeft />
                </Button>
                <Button
                  variant="outline"
                  size="icon-sm"
                  focusableWhenDisabled
                  aria-label="Previous page"
                  disabled={!table.getCanPreviousPage()}
                  onClick={() => table.previousPage()}
                >
                  <SiChevronLeft />
                </Button>
                <Button
                  variant="outline"
                  size="icon-sm"
                  focusableWhenDisabled
                  aria-label="Next page"
                  disabled={!table.getCanNextPage()}
                  onClick={() => table.nextPage()}
                >
                  <SiChevronRight />
                </Button>
                {totalKnown && (
                  <Button
                    variant="outline"
                    size="icon-sm"
                    focusableWhenDisabled
                    className="hidden sm:inline-flex"
                    aria-label="Last page"
                    disabled={!table.getCanNextPage()}
                    onClick={() => table.lastPage()}
                  >
                    <SiChevronsRight />
                  </Button>
                )}
              </nav>
            </div>
          </div>
        )
      }}
    </table.Subscribe>
  )
}

const selectSelectionState = (state: DataTableState) => ({
  rowSelection: state.rowSelection,
  columnFilters: state.columnFilters,
  globalFilter: state.globalFilter,
})

/**
 * The selection count, your bulk actions and a Clear button. Renders only
 * while rows are selected. Selection lasts through filtering, so it also says
 * how many selected rows the filters hide.
 */
function DataTableBulkActions<TData extends RowData>({
  table,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & { table: DataTableInstance<TData> }) {
  return (
    <table.Subscribe selector={selectSelectionState}>
      {({ rowSelection }) => {
        // Rows on other server pages aren't loaded, so count the ids there.
        // In the browser, count rows, which leaves out deleted ones.
        const server = table.options.manualPagination
        const count = server
          ? Object.values(rowSelection ?? {}).filter(Boolean).length
          : table.getSelectedRowModel().flatRows.length
        if (count === 0) return null
        const hidden = server
          ? 0
          : count - table.getFilteredSelectedRowModel().flatRows.length

        return (
          <div
            data-slot="data-table-bulk-actions"
            className={cn("flex flex-wrap items-center gap-2", className)}
            {...props}
          >
            <span className="st-label-sm-medium text-ink-subtle tabular-nums">
              {count.toLocaleString()} selected
              {hidden > 0 && (
                <span className="text-ink-subtlest">
                  {`, ${hidden.toLocaleString()} hidden by filters`}
                </span>
              )}
            </span>
            {children}
            <Button
              variant="ghost"
              size="sm"
              onClick={(event) => {
                focusNearestSearch(event.currentTarget)
                table.resetRowSelection(true)
              }}
            >
              Clear
            </Button>
          </div>
        )
      }}
    </table.Subscribe>
  )
}

export {
  dataTableFeatures,
  useDataTable,
  createDataTableColumnHelper,
  createSelectColumn,
  DataTable,
  DataTableColumnHeader,
  DataTableRowActions,
  DataTableToolbar,
  DataTableSearch,
  DataTableFacetedFilter,
  DataTableResetFilters,
  DataTableViewOptions,
  DataTablePagination,
  DataTableBulkActions,
  type DataTableFeatures,
  type DataTableInstance,
  type DataTableState,
  type DataTableColumnDef,
  type DataTableColumnMeta,
  type DataTableFacetedFilterOption,
  type UseDataTableOptions,
}
