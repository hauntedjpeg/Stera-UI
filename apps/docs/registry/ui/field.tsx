"use client"

import * as React from "react"
import { Field as FieldPrimitive } from "@base-ui/react/field"
import { Fieldset as FieldsetPrimitive } from "@base-ui/react/fieldset"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

// Base UI's Field parts throw outside Field.Root, so labels, descriptions and
// errors fall back to plain elements when no Field is above them
const FieldScopeContext = React.createContext(false)

function FieldSet({ className, ...props }: FieldsetPrimitive.Root.Props) {
  return (
    <FieldsetPrimitive.Root
      data-slot="field-set"
      className={cn(
        // Base
        "flex flex-col",
        // Sizing
        "gap-6 has-[>[data-slot=radio-group]]:gap-3",
        className
      )}
      {...props}
    />
  )
}

function FieldLegend({
  className,
  variant = "legend",
  ...props
}: FieldsetPrimitive.Legend.Props & { variant?: "legend" | "label" }) {
  return (
    <FieldsetPrimitive.Legend
      // A native legend sits outside the fieldset's flex layout
      render={<legend />}
      data-slot="field-legend"
      data-variant={variant}
      className={cn(
        // Base
        "mb-3",
        // Variants
        "data-[variant=label]:st-label-md-medium data-[variant=legend]:st-label-lg-medium",
        className
      )}
      {...props}
    />
  )
}

function FieldGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-group"
      className={cn(
        // Base
        "@container/field-group flex flex-col",
        // Sizing
        "w-full gap-7",
        // Nested groups
        "*:data-[slot=field-group]:gap-4",
        className
      )}
      {...props}
    />
  )
}

const fieldVariants = cva(
  [
    // Base
    "group/field flex",
    // Sizing
    "w-full gap-3",
    // Invalid
    "data-invalid:text-ink-danger",
  ],
  {
    variants: {
      orientation: {
        vertical: "flex-col *:w-full [&>.sr-only]:w-auto",
        horizontal:
          "flex-row items-center has-[>[data-slot=field-content]]:items-start *:data-[slot=field-label]:flex-auto *:data-[slot=field-title]:flex-auto",
        responsive:
          "flex-col *:w-full @md/field-group:flex-row @md/field-group:items-center @md/field-group:*:w-auto @md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:*:data-[slot=field-label]:flex-auto @md/field-group:*:data-[slot=field-title]:flex-auto [&>.sr-only]:w-auto",
      },
    },
    defaultVariants: {
      orientation: "vertical",
    },
  }
)

function Field({
  className,
  orientation = "vertical",
  ...props
}: FieldPrimitive.Root.Props & VariantProps<typeof fieldVariants>) {
  return (
    <FieldScopeContext.Provider value={true}>
      <FieldPrimitive.Root
        data-slot="field"
        data-orientation={orientation}
        className={cn(fieldVariants({ orientation }), className)}
        {...props}
      />
    </FieldScopeContext.Provider>
  )
}

function FieldContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-content"
      className={cn(
        // Base
        "flex flex-col",
        // Sizing
        "flex-1 gap-1",
        className
      )}
      {...props}
    />
  )
}

function FieldLabel({
  className,
  nativeLabel,
  ...props
}: React.ComponentProps<"label"> & {
  /** Set to `false` when the control is a button, like a Select trigger. */
  nativeLabel?: boolean
}) {
  const inField = React.useContext(FieldScopeContext)
  const classes = cn(
    // Base
    "flex w-fit items-center gap-2 st-label-md-medium select-none",
    // Disabled
    "group-data-disabled/field:opacity-50",
    // Choice card: a FieldLabel that wraps a Field
    "has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col has-[>[data-slot=field]]:rounded-xl has-[>[data-slot=field]]:inset-ring has-[>[data-slot=field]]:inset-ring-border has-[>[data-slot=field]]:forced-stroke has-[>[data-slot=field]]:transition-[background-color,box-shadow] *:data-[slot=field]:p-3",
    // Choice card: checked
    "has-[>[data-slot=field]]:has-data-checked:bg-surface-brand-subtle has-[>[data-slot=field]]:has-data-checked:inset-ring-border-brand-subtle",
    // Choice card: focus
    "has-[>[data-slot=field]]:has-focus-visible:inset-ring-[1.5px] has-[>[data-slot=field]]:has-focus-visible:inset-ring-border-brand-bold has-[>[data-slot=field]]:has-focus-visible:[--forced-stroke-width:2px] has-[>[data-slot=field]]:has-data-checked:has-focus-visible:inset-ring-border-brand-bold",
    // Choice card: disabled
    "has-[>[data-slot=field][data-disabled]]:cursor-not-allowed has-[>[data-slot=field][data-disabled]]:bg-surface-disabled has-[>[data-slot=field][data-disabled]]:inset-ring-border-subtle",
    className
  )

  if (!inField) {
    return <label data-slot="field-label" className={classes} {...props} />
  }

  return (
    <FieldPrimitive.Label
      data-slot="field-label"
      nativeLabel={nativeLabel}
      render={nativeLabel === false ? <div /> : undefined}
      className={classes}
      {...props}
    />
  )
}

function FieldTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-title"
      className={cn(
        // Base
        "flex w-fit items-center gap-2 st-label-md-medium",
        // Disabled
        "group-data-disabled/field:opacity-50",
        className
      )}
      {...props}
    />
  )
}

function FieldDescription({ className, ...props }: React.ComponentProps<"p">) {
  const inField = React.useContext(FieldScopeContext)
  const classes = cn(
    // Base
    "st-body-sm text-ink-subtler",
    // Position: tuck up under a legend
    "[[data-variant=legend]+&]:-mt-1.5",
    // Links
    "[&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-ink-brand",
    className
  )

  if (!inField) {
    return <p data-slot="field-description" className={classes} {...props} />
  }

  return (
    <FieldPrimitive.Description
      data-slot="field-description"
      className={classes}
      {...props}
    />
  )
}

function FieldSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-separator"
      className={cn(
        // Base
        "flex items-center gap-2 st-body-sm text-ink-subtler",
        // Sizing
        "-my-2 h-4",
        className
      )}
      {...props}
    >
      <Separator className="flex-1" />
      {children && (
        <>
          <span data-slot="field-separator-content" className="shrink-0">
            {children}
          </span>
          <Separator className="flex-1" aria-hidden />
        </>
      )}
    </div>
  )
}

function FieldError({
  className,
  children,
  errors,
  match,
  ...props
}: React.ComponentProps<"div"> & {
  /** Messages to show. Accepts strings or `{ message }` objects from form libraries. */
  errors?: Array<string | { message?: string } | undefined>
  /** When to show the error. Defaults to always when there's content, otherwise on native validity. */
  match?: FieldPrimitive.Error.Props["match"]
}) {
  const inField = React.useContext(FieldScopeContext)

  const messages = [
    ...new Set(
      (errors ?? [])
        .map((error) => (typeof error === "string" ? error : error?.message))
        .filter((message): message is string => Boolean(message))
    ),
  ]

  const content =
    children ??
    (messages.length > 1 ? (
      <ul className="ml-4 flex list-disc flex-col gap-1">
        {messages.map((message) => (
          <li key={message}>{message}</li>
        ))}
      </ul>
    ) : (
      messages[0]
    ))

  const classes = cn("st-body-sm text-ink-danger", className)

  if (!inField) {
    if (!content) {
      return null
    }

    return (
      <div role="alert" data-slot="field-error" className={classes} {...props}>
        {content}
      </div>
    )
  }

  return (
    <FieldPrimitive.Error
      role="alert"
      data-slot="field-error"
      match={match ?? (content ? true : undefined)}
      className={classes}
      {...props}
      // Without content, Base UI shows the native validation message
      {...(content ? { children: content } : {})}
    />
  )
}

export {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldContent,
  FieldTitle,
}
