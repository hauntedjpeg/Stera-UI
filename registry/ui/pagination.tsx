import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { SiChevronLeft, SiChevronRight, SiMore } from "stera-icons"

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  )
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex items-center gap-1", className)}
      {...props}
    />
  )
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />
}

type PaginationLinkProps = {
  isActive?: boolean
} & Pick<React.ComponentProps<typeof Button>, "size"> &
  React.ComponentProps<"a">

function PaginationLink({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) {
  return (
    <Button
      variant={isActive ? "outline" : "ghost"}
      size={size}
      className={cn(className)}
      nativeButton={false}
      render={
        <a
          aria-current={isActive ? "page" : undefined}
          data-slot="pagination-link"
          data-active={isActive}
          {...props}
        />
      }
    />
  )
}

function PaginationPrevious({
  className,
  text = "Previous",
  ...props
}: React.ComponentProps<typeof PaginationLink> & { text?: string }) {
  const hasLabel = Boolean(text)

  if (!hasLabel) {
    return (
      <PaginationLink
        aria-label="Go to previous page"
        size="icon"
        className={className}
        {...props}
      >
        <SiChevronLeft />
      </PaginationLink>
    )
  }

  return (
    <>
      <PaginationLink
        aria-label="Go to previous page"
        size="icon"
        className={cn("sm:hidden", className)}
        {...props}
      >
        <SiChevronLeft />
      </PaginationLink>
      <PaginationLink
        aria-label="Go to previous page"
        size="md"
        className={cn("hidden sm:inline-flex", className)}
        {...props}
      >
        <SiChevronLeft data-icon="inline-start" />
        {text}
      </PaginationLink>
    </>
  )
}

function PaginationNext({
  className,
  text = "Next",
  ...props
}: React.ComponentProps<typeof PaginationLink> & { text?: string }) {
  const hasLabel = Boolean(text)

  if (!hasLabel) {
    return (
      <PaginationLink
        aria-label="Go to next page"
        size="icon"
        className={className}
        {...props}
      >
        <SiChevronRight />
      </PaginationLink>
    )
  }

  return (
    <>
      <PaginationLink
        aria-label="Go to next page"
        size="icon"
        className={cn("sm:hidden", className)}
        {...props}
      >
        <SiChevronRight />
      </PaginationLink>
      <PaginationLink
        aria-label="Go to next page"
        size="md"
        className={cn("hidden sm:inline-flex", className)}
        {...props}
      >
        {text}
        <SiChevronRight data-icon="inline-end" />
      </PaginationLink>
    </>
  )
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn(
        "flex size-9 items-center justify-center [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <SiMore
      />
      <span className="sr-only">More pages</span>
    </span>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}
