"use client"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import { Preview } from "@/components/preview"

export function PaginationDefault() {
  return (
    <Preview>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </Preview>
  )
}

export function PaginationSimple() {
  return (
    <Preview>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">4</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">5</PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </Preview>
  )
}

export function PaginationWithRowsPerPage() {
  return (
    <Preview>
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
    </Preview>
  )
}
