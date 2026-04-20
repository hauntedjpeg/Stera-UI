import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export default function PaginationWithRowsPerPage() {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <span className="text-sm text-nowrap">Rows per page</span>
        <NativeSelect defaultValue="10" size="sm">
          <NativeSelectOption value="10">10</NativeSelectOption>
          <NativeSelectOption value="20">20</NativeSelectOption>
          <NativeSelectOption value="50">50</NativeSelectOption>
        </NativeSelect>
      </div>
      <Pagination className="w-auto mx-0">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" text="" />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" text="" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
