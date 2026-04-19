import dynamic from "next/dynamic"
import type { ComponentType } from "react"

type RegistryEntry = {
  component: ComponentType
  path: string
}

const examples: Record<string, RegistryEntry> = {
  "accordion-demo": {
    component: dynamic(() => import("@/registry/examples/accordion-demo")),
    path: "examples/accordion-demo.tsx",
  },
  "accordion-multiple": {
    component: dynamic(() => import("@/registry/examples/accordion-multiple")),
    path: "examples/accordion-multiple.tsx",
  },
  "accordion-default-open": {
    component: dynamic(() => import("@/registry/examples/accordion-default-open")),
    path: "examples/accordion-default-open.tsx",
  },
  "badge-demo": {
    component: dynamic(() => import("@/registry/examples/badge-demo")),
    path: "examples/badge-demo.tsx",
  },
  "badge-colors": {
    component: dynamic(() => import("@/registry/examples/badge-colors")),
    path: "examples/badge-colors.tsx",
  },
  "badge-with-icon": {
    component: dynamic(() => import("@/registry/examples/badge-with-icon")),
    path: "examples/badge-with-icon.tsx",
  },
  "badge-with-spinner": {
    component: dynamic(() => import("@/registry/examples/badge-with-spinner")),
    path: "examples/badge-with-spinner.tsx",
  },
  "badge-sizes": {
    component: dynamic(() => import("@/registry/examples/badge-sizes")),
    path: "examples/badge-sizes.tsx",
  },
  "separator-demo": {
    component: dynamic(() => import("@/registry/examples/separator-demo")),
    path: "examples/separator-demo.tsx",
  },
  "separator-vertical": {
    component: dynamic(() => import("@/registry/examples/separator-vertical")),
    path: "examples/separator-vertical.tsx",
  },
  "kbd-demo": {
    component: dynamic(() => import("@/registry/examples/kbd-demo")),
    path: "examples/kbd-demo.tsx",
  },
  "kbd-sizes": {
    component: dynamic(() => import("@/registry/examples/kbd-sizes")),
    path: "examples/kbd-sizes.tsx",
  },
  "kbd-key-combination": {
    component: dynamic(() => import("@/registry/examples/kbd-key-combination")),
    path: "examples/kbd-key-combination.tsx",
  },
  "kbd-with-button": {
    component: dynamic(() => import("@/registry/examples/kbd-with-button")),
    path: "examples/kbd-with-button.tsx",
  },
  "kbd-with-input": {
    component: dynamic(() => import("@/registry/examples/kbd-with-input")),
    path: "examples/kbd-with-input.tsx",
  },
  "label-demo": {
    component: dynamic(() => import("@/registry/examples/label-demo")),
    path: "examples/label-demo.tsx",
  },
  "label-with-checkbox": {
    component: dynamic(() => import("@/registry/examples/label-with-checkbox")),
    path: "examples/label-with-checkbox.tsx",
  },
  "label-disabled": {
    component: dynamic(() => import("@/registry/examples/label-disabled")),
    path: "examples/label-disabled.tsx",
  },
  "skeleton-demo": {
    component: dynamic(() => import("@/registry/examples/skeleton-demo")),
    path: "examples/skeleton-demo.tsx",
  },
  "skeleton-card": {
    component: dynamic(() => import("@/registry/examples/skeleton-card")),
    path: "examples/skeleton-card.tsx",
  },
  "skeleton-text": {
    component: dynamic(() => import("@/registry/examples/skeleton-text")),
    path: "examples/skeleton-text.tsx",
  },
  "progress-demo": {
    component: dynamic(() => import("@/registry/examples/progress-demo")),
    path: "examples/progress-demo.tsx",
  },
  "progress-with-label": {
    component: dynamic(() => import("@/registry/examples/progress-with-label")),
    path: "examples/progress-with-label.tsx",
  },
  "chip-demo": {
    component: dynamic(() => import("@/registry/examples/chip-demo")),
    path: "examples/chip-demo.tsx",
  },
  "chip-sizes": {
    component: dynamic(() => import("@/registry/examples/chip-sizes")),
    path: "examples/chip-sizes.tsx",
  },
  "chip-with-icons": {
    component: dynamic(() => import("@/registry/examples/chip-with-icons")),
    path: "examples/chip-with-icons.tsx",
  },
  "chip-active": {
    component: dynamic(() => import("@/registry/examples/chip-active")),
    path: "examples/chip-active.tsx",
  },
  "button-demo": {
    component: dynamic(() => import("@/registry/examples/button-demo")),
    path: "examples/button-demo.tsx",
  },
  "button-sizes": {
    component: dynamic(() => import("@/registry/examples/button-sizes")),
    path: "examples/button-sizes.tsx",
  },
  "button-with-icon": {
    component: dynamic(() => import("@/registry/examples/button-with-icon")),
    path: "examples/button-with-icon.tsx",
  },
  "button-disabled": {
    component: dynamic(() => import("@/registry/examples/button-disabled")),
    path: "examples/button-disabled.tsx",
  },
  "button-group-demo": {
    component: dynamic(() => import("@/registry/examples/button-group-demo")),
    path: "examples/button-group-demo.tsx",
  },
  "button-group-orientation": {
    component: dynamic(() => import("@/registry/examples/button-group-orientation")),
    path: "examples/button-group-orientation.tsx",
  },
  "button-group-with-separator": {
    component: dynamic(() => import("@/registry/examples/button-group-with-separator")),
    path: "examples/button-group-with-separator.tsx",
  },
  "button-group-variants": {
    component: dynamic(() => import("@/registry/examples/button-group-variants")),
    path: "examples/button-group-variants.tsx",
  },
  "button-group-split": {
    component: dynamic(() => import("@/registry/examples/button-group-split")),
    path: "examples/button-group-split.tsx",
  },
  "toggle-demo": {
    component: dynamic(() => import("@/registry/examples/toggle-demo")),
    path: "examples/toggle-demo.tsx",
  },
  "toggle-outline": {
    component: dynamic(() => import("@/registry/examples/toggle-outline")),
    path: "examples/toggle-outline.tsx",
  },
  "toggle-with-text": {
    component: dynamic(() => import("@/registry/examples/toggle-with-text")),
    path: "examples/toggle-with-text.tsx",
  },
  "toggle-sizes": {
    component: dynamic(() => import("@/registry/examples/toggle-sizes")),
    path: "examples/toggle-sizes.tsx",
  },
  "toggle-disabled": {
    component: dynamic(() => import("@/registry/examples/toggle-disabled")),
    path: "examples/toggle-disabled.tsx",
  },
  "avatar-demo": {
    component: dynamic(() => import("@/registry/examples/avatar-demo")),
    path: "examples/avatar-demo.tsx",
  },
  "avatar-fallback": {
    component: dynamic(() => import("@/registry/examples/avatar-fallback")),
    path: "examples/avatar-fallback.tsx",
  },
  "avatar-sizes": {
    component: dynamic(() => import("@/registry/examples/avatar-sizes")),
    path: "examples/avatar-sizes.tsx",
  },
  "avatar-shapes": {
    component: dynamic(() => import("@/registry/examples/avatar-shapes")),
    path: "examples/avatar-shapes.tsx",
  },
  "avatar-with-badge": {
    component: dynamic(() => import("@/registry/examples/avatar-with-badge")),
    path: "examples/avatar-with-badge.tsx",
  },
  "avatar-icon-fallback": {
    component: dynamic(() => import("@/registry/examples/avatar-icon-fallback")),
    path: "examples/avatar-icon-fallback.tsx",
  },
  "avatar-group": {
    component: dynamic(() => import("@/registry/examples/avatar-group")),
    path: "examples/avatar-group.tsx",
  },
  "card-demo": {
    component: dynamic(() => import("@/registry/examples/card-demo")),
    path: "examples/card-demo.tsx",
  },
  "card-with-action": {
    component: dynamic(() => import("@/registry/examples/card-with-action")),
    path: "examples/card-with-action.tsx",
  },
  "card-sizes": {
    component: dynamic(() => import("@/registry/examples/card-sizes")),
    path: "examples/card-sizes.tsx",
  },
  "callout-demo": {
    component: dynamic(() => import("@/registry/examples/callout-demo")),
    path: "examples/callout-demo.tsx",
  },
  "callout-with-icon": {
    component: dynamic(() => import("@/registry/examples/callout-with-icon")),
    path: "examples/callout-with-icon.tsx",
  },
  "callout-with-action": {
    component: dynamic(() => import("@/registry/examples/callout-with-action")),
    path: "examples/callout-with-action.tsx",
  },
  "callout-with-close": {
    component: dynamic(() => import("@/registry/examples/callout-with-close")),
    path: "examples/callout-with-close.tsx",
  },
  "callout-variants": {
    component: dynamic(() => import("@/registry/examples/callout-variants")),
    path: "examples/callout-variants.tsx",
  },
  "notice-demo": {
    component: dynamic(() => import("@/registry/examples/notice-demo")),
    path: "examples/notice-demo.tsx",
  },
  "notice-types": {
    component: dynamic(() => import("@/registry/examples/notice-types")),
    path: "examples/notice-types.tsx",
  },
  "empty-demo": {
    component: dynamic(() => import("@/registry/examples/empty-demo")),
    path: "examples/empty-demo.tsx",
  },
  "empty-with-avatar-group": {
    component: dynamic(() => import("@/registry/examples/empty-with-avatar-group")),
    path: "examples/empty-with-avatar-group.tsx",
  },
  "empty-no-results": {
    component: dynamic(() => import("@/registry/examples/empty-no-results")),
    path: "examples/empty-no-results.tsx",
  },
  "breadcrumb-demo": {
    component: dynamic(() => import("@/registry/examples/breadcrumb-demo")),
    path: "examples/breadcrumb-demo.tsx",
  },
  "breadcrumb-custom-separator": {
    component: dynamic(() => import("@/registry/examples/breadcrumb-custom-separator")),
    path: "examples/breadcrumb-custom-separator.tsx",
  },
  "breadcrumb-collapsed": {
    component: dynamic(() => import("@/registry/examples/breadcrumb-collapsed")),
    path: "examples/breadcrumb-collapsed.tsx",
  },
  "item-demo": {
    component: dynamic(() => import("@/registry/examples/item-demo")),
    path: "examples/item-demo.tsx",
  },
  "item-variants": {
    component: dynamic(() => import("@/registry/examples/item-variants")),
    path: "examples/item-variants.tsx",
  },
  "item-sizes": {
    component: dynamic(() => import("@/registry/examples/item-sizes")),
    path: "examples/item-sizes.tsx",
  },
  "item-with-actions": {
    component: dynamic(() => import("@/registry/examples/item-with-actions")),
    path: "examples/item-with-actions.tsx",
  },
  "item-notification-list": {
    component: dynamic(() => import("@/registry/examples/item-notification-list")),
    path: "examples/item-notification-list.tsx",
  },
  "pagination-demo": {
    component: dynamic(() => import("@/registry/examples/pagination-demo")),
    path: "examples/pagination-demo.tsx",
  },
  "pagination-simple": {
    component: dynamic(() => import("@/registry/examples/pagination-simple")),
    path: "examples/pagination-simple.tsx",
  },
  "pagination-with-rows-per-page": {
    component: dynamic(() => import("@/registry/examples/pagination-with-rows-per-page")),
    path: "examples/pagination-with-rows-per-page.tsx",
  },
  "toggle-group-demo": {
    component: dynamic(() => import("@/registry/examples/toggle-group-demo")),
    path: "examples/toggle-group-demo.tsx",
  },
  "toggle-group-outline": {
    component: dynamic(() => import("@/registry/examples/toggle-group-outline")),
    path: "examples/toggle-group-outline.tsx",
  },
  "toggle-group-sizes": {
    component: dynamic(() => import("@/registry/examples/toggle-group-sizes")),
    path: "examples/toggle-group-sizes.tsx",
  },
  "toggle-group-vertical": {
    component: dynamic(() => import("@/registry/examples/toggle-group-vertical")),
    path: "examples/toggle-group-vertical.tsx",
  },
  "toggle-group-disabled": {
    component: dynamic(() => import("@/registry/examples/toggle-group-disabled")),
    path: "examples/toggle-group-disabled.tsx",
  },
  "toggle-group-custom": {
    component: dynamic(() => import("@/registry/examples/toggle-group-custom")),
    path: "examples/toggle-group-custom.tsx",
  },
  "table-demo": {
    component: dynamic(() => import("@/registry/examples/table-demo")),
    path: "examples/table-demo.tsx",
  },
  "table-with-footer": {
    component: dynamic(() => import("@/registry/examples/table-with-footer")),
    path: "examples/table-with-footer.tsx",
  },
}

export function getRegistryComponent(name: string): ComponentType | null {
  return examples[name]?.component ?? null
}

export function getRegistrySourcePath(name: string): string | null {
  return examples[name]?.path ?? null
}
