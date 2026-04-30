import dynamic from "next/dynamic"
import type { ComponentType } from "react"

type RegistryEntry = {
  component: ComponentType
  path: string
  slug: string
}

const examples: Record<string, RegistryEntry> = {
  "accordion-demo": {
    component: dynamic(() => import("@/examples/accordion-demo")),
    path: "examples/accordion-demo.tsx",
    slug: "accordion",
  },
  "accordion-multiple": {
    component: dynamic(() => import("@/examples/accordion-multiple")),
    path: "examples/accordion-multiple.tsx",
    slug: "accordion",
  },
  "accordion-default-open": {
    component: dynamic(() => import("@/examples/accordion-default-open")),
    path: "examples/accordion-default-open.tsx",
    slug: "accordion",
  },
  "badge-demo": {
    component: dynamic(() => import("@/examples/badge-demo")),
    path: "examples/badge-demo.tsx",
    slug: "badge",
  },
  "badge-colors": {
    component: dynamic(() => import("@/examples/badge-colors")),
    path: "examples/badge-colors.tsx",
    slug: "badge",
  },
  "badge-with-icon": {
    component: dynamic(() => import("@/examples/badge-with-icon")),
    path: "examples/badge-with-icon.tsx",
    slug: "badge",
  },
  "badge-with-spinner": {
    component: dynamic(() => import("@/examples/badge-with-spinner")),
    path: "examples/badge-with-spinner.tsx",
    slug: "badge",
  },
  "badge-sizes": {
    component: dynamic(() => import("@/examples/badge-sizes")),
    path: "examples/badge-sizes.tsx",
    slug: "badge",
  },
  "separator-demo": {
    component: dynamic(() => import("@/examples/separator-demo")),
    path: "examples/separator-demo.tsx",
    slug: "separator",
  },
  "separator-vertical": {
    component: dynamic(() => import("@/examples/separator-vertical")),
    path: "examples/separator-vertical.tsx",
    slug: "separator",
  },
  "kbd-demo": {
    component: dynamic(() => import("@/examples/kbd-demo")),
    path: "examples/kbd-demo.tsx",
    slug: "kbd",
  },
  "kbd-sizes": {
    component: dynamic(() => import("@/examples/kbd-sizes")),
    path: "examples/kbd-sizes.tsx",
    slug: "kbd",
  },
  "kbd-key-combination": {
    component: dynamic(() => import("@/examples/kbd-key-combination")),
    path: "examples/kbd-key-combination.tsx",
    slug: "kbd",
  },
  "kbd-with-button": {
    component: dynamic(() => import("@/examples/kbd-with-button")),
    path: "examples/kbd-with-button.tsx",
    slug: "kbd",
  },
  "kbd-with-input": {
    component: dynamic(() => import("@/examples/kbd-with-input")),
    path: "examples/kbd-with-input.tsx",
    slug: "kbd",
  },
  "label-demo": {
    component: dynamic(() => import("@/examples/label-demo")),
    path: "examples/label-demo.tsx",
    slug: "label",
  },
  "label-with-checkbox": {
    component: dynamic(() => import("@/examples/label-with-checkbox")),
    path: "examples/label-with-checkbox.tsx",
    slug: "label",
  },
  "label-disabled": {
    component: dynamic(() => import("@/examples/label-disabled")),
    path: "examples/label-disabled.tsx",
    slug: "label",
  },
  "skeleton-demo": {
    component: dynamic(() => import("@/examples/skeleton-demo")),
    path: "examples/skeleton-demo.tsx",
    slug: "skeleton",
  },
  "skeleton-card": {
    component: dynamic(() => import("@/examples/skeleton-card")),
    path: "examples/skeleton-card.tsx",
    slug: "skeleton",
  },
  "skeleton-text": {
    component: dynamic(() => import("@/examples/skeleton-text")),
    path: "examples/skeleton-text.tsx",
    slug: "skeleton",
  },
  "progress-demo": {
    component: dynamic(() => import("@/examples/progress-demo")),
    path: "examples/progress-demo.tsx",
    slug: "progress",
  },
  "progress-with-label": {
    component: dynamic(() => import("@/examples/progress-with-label")),
    path: "examples/progress-with-label.tsx",
    slug: "progress",
  },
  "chip-demo": {
    component: dynamic(() => import("@/examples/chip-demo")),
    path: "examples/chip-demo.tsx",
    slug: "chip",
  },
  "chip-sizes": {
    component: dynamic(() => import("@/examples/chip-sizes")),
    path: "examples/chip-sizes.tsx",
    slug: "chip",
  },
  "chip-with-icons": {
    component: dynamic(() => import("@/examples/chip-with-icons")),
    path: "examples/chip-with-icons.tsx",
    slug: "chip",
  },
  "chip-active": {
    component: dynamic(() => import("@/examples/chip-active")),
    path: "examples/chip-active.tsx",
    slug: "chip",
  },
  "button-demo": {
    component: dynamic(() => import("@/examples/button-demo")),
    path: "examples/button-demo.tsx",
    slug: "button",
  },
  "button-sizes": {
    component: dynamic(() => import("@/examples/button-sizes")),
    path: "examples/button-sizes.tsx",
    slug: "button",
  },
  "button-with-icon": {
    component: dynamic(() => import("@/examples/button-with-icon")),
    path: "examples/button-with-icon.tsx",
    slug: "button",
  },
  "button-disabled": {
    component: dynamic(() => import("@/examples/button-disabled")),
    path: "examples/button-disabled.tsx",
    slug: "button",
  },
  "button-group-demo": {
    component: dynamic(() => import("@/examples/button-group-demo")),
    path: "examples/button-group-demo.tsx",
    slug: "button-group",
  },
  "button-group-orientation": {
    component: dynamic(() => import("@/examples/button-group-orientation")),
    path: "examples/button-group-orientation.tsx",
    slug: "button-group",
  },
  "button-group-with-separator": {
    component: dynamic(() => import("@/examples/button-group-with-separator")),
    path: "examples/button-group-with-separator.tsx",
    slug: "button-group",
  },
  "button-group-variants": {
    component: dynamic(() => import("@/examples/button-group-variants")),
    path: "examples/button-group-variants.tsx",
    slug: "button-group",
  },
  "button-group-split": {
    component: dynamic(() => import("@/examples/button-group-split")),
    path: "examples/button-group-split.tsx",
    slug: "button-group",
  },
  "toggle-demo": {
    component: dynamic(() => import("@/examples/toggle-demo")),
    path: "examples/toggle-demo.tsx",
    slug: "toggle",
  },
  "toggle-outline": {
    component: dynamic(() => import("@/examples/toggle-outline")),
    path: "examples/toggle-outline.tsx",
    slug: "toggle",
  },
  "toggle-with-text": {
    component: dynamic(() => import("@/examples/toggle-with-text")),
    path: "examples/toggle-with-text.tsx",
    slug: "toggle",
  },
  "toggle-sizes": {
    component: dynamic(() => import("@/examples/toggle-sizes")),
    path: "examples/toggle-sizes.tsx",
    slug: "toggle",
  },
  "toggle-disabled": {
    component: dynamic(() => import("@/examples/toggle-disabled")),
    path: "examples/toggle-disabled.tsx",
    slug: "toggle",
  },
  "avatar-demo": {
    component: dynamic(() => import("@/examples/avatar-demo")),
    path: "examples/avatar-demo.tsx",
    slug: "avatar",
  },
  "avatar-fallback": {
    component: dynamic(() => import("@/examples/avatar-fallback")),
    path: "examples/avatar-fallback.tsx",
    slug: "avatar",
  },
  "avatar-sizes": {
    component: dynamic(() => import("@/examples/avatar-sizes")),
    path: "examples/avatar-sizes.tsx",
    slug: "avatar",
  },
  "avatar-shapes": {
    component: dynamic(() => import("@/examples/avatar-shapes")),
    path: "examples/avatar-shapes.tsx",
    slug: "avatar",
  },
  "avatar-with-badge": {
    component: dynamic(() => import("@/examples/avatar-with-badge")),
    path: "examples/avatar-with-badge.tsx",
    slug: "avatar",
  },
  "avatar-icon-fallback": {
    component: dynamic(() => import("@/examples/avatar-icon-fallback")),
    path: "examples/avatar-icon-fallback.tsx",
    slug: "avatar",
  },
  "avatar-group": {
    component: dynamic(() => import("@/examples/avatar-group")),
    path: "examples/avatar-group.tsx",
    slug: "avatar",
  },
  "card-demo": {
    component: dynamic(() => import("@/examples/card-demo")),
    path: "examples/card-demo.tsx",
    slug: "card",
  },
  "card-with-action": {
    component: dynamic(() => import("@/examples/card-with-action")),
    path: "examples/card-with-action.tsx",
    slug: "card",
  },
  "card-sizes": {
    component: dynamic(() => import("@/examples/card-sizes")),
    path: "examples/card-sizes.tsx",
    slug: "card",
  },
  "callout-demo": {
    component: dynamic(() => import("@/examples/callout-demo")),
    path: "examples/callout-demo.tsx",
    slug: "callout",
  },
  "callout-with-icon": {
    component: dynamic(() => import("@/examples/callout-with-icon")),
    path: "examples/callout-with-icon.tsx",
    slug: "callout",
  },
  "callout-with-action": {
    component: dynamic(() => import("@/examples/callout-with-action")),
    path: "examples/callout-with-action.tsx",
    slug: "callout",
  },
  "callout-with-close": {
    component: dynamic(() => import("@/examples/callout-with-close")),
    path: "examples/callout-with-close.tsx",
    slug: "callout",
  },
  "callout-variants": {
    component: dynamic(() => import("@/examples/callout-variants")),
    path: "examples/callout-variants.tsx",
    slug: "callout",
  },
  "notice-demo": {
    component: dynamic(() => import("@/examples/notice-demo")),
    path: "examples/notice-demo.tsx",
    slug: "notice",
  },
  "notice-types": {
    component: dynamic(() => import("@/examples/notice-types")),
    path: "examples/notice-types.tsx",
    slug: "notice",
  },
  "empty-demo": {
    component: dynamic(() => import("@/examples/empty-demo")),
    path: "examples/empty-demo.tsx",
    slug: "empty",
  },
  "empty-with-avatar-group": {
    component: dynamic(() => import("@/examples/empty-with-avatar-group")),
    path: "examples/empty-with-avatar-group.tsx",
    slug: "empty",
  },
  "empty-no-results": {
    component: dynamic(() => import("@/examples/empty-no-results")),
    path: "examples/empty-no-results.tsx",
    slug: "empty",
  },
  "breadcrumb-demo": {
    component: dynamic(() => import("@/examples/breadcrumb-demo")),
    path: "examples/breadcrumb-demo.tsx",
    slug: "breadcrumb",
  },
  "breadcrumb-custom-separator": {
    component: dynamic(() => import("@/examples/breadcrumb-custom-separator")),
    path: "examples/breadcrumb-custom-separator.tsx",
    slug: "breadcrumb",
  },
  "breadcrumb-collapsed": {
    component: dynamic(() => import("@/examples/breadcrumb-collapsed")),
    path: "examples/breadcrumb-collapsed.tsx",
    slug: "breadcrumb",
  },
  "item-demo": {
    component: dynamic(() => import("@/examples/item-demo")),
    path: "examples/item-demo.tsx",
    slug: "item",
  },
  "item-variants": {
    component: dynamic(() => import("@/examples/item-variants")),
    path: "examples/item-variants.tsx",
    slug: "item",
  },
  "item-sizes": {
    component: dynamic(() => import("@/examples/item-sizes")),
    path: "examples/item-sizes.tsx",
    slug: "item",
  },
  "item-icon": {
    component: dynamic(() => import("@/examples/item-icon")),
    path: "examples/item-icon.tsx",
    slug: "item",
  },
  "item-avatar": {
    component: dynamic(() => import("@/examples/item-avatar")),
    path: "examples/item-avatar.tsx",
    slug: "item",
  },
  "item-header": {
    component: dynamic(() => import("@/examples/item-header")),
    path: "examples/item-header.tsx",
    slug: "item",
  },
  "item-footer": {
    component: dynamic(() => import("@/examples/item-footer")),
    path: "examples/item-footer.tsx",
    slug: "item",
  },
  "pagination-demo": {
    component: dynamic(() => import("@/examples/pagination-demo")),
    path: "examples/pagination-demo.tsx",
    slug: "pagination",
  },
  "pagination-simple": {
    component: dynamic(() => import("@/examples/pagination-simple")),
    path: "examples/pagination-simple.tsx",
    slug: "pagination",
  },
  "pagination-with-rows-per-page": {
    component: dynamic(() => import("@/examples/pagination-with-rows-per-page")),
    path: "examples/pagination-with-rows-per-page.tsx",
    slug: "pagination",
  },
  "toggle-group-demo": {
    component: dynamic(() => import("@/examples/toggle-group-demo")),
    path: "examples/toggle-group-demo.tsx",
    slug: "toggle-group",
  },
  "toggle-group-outline": {
    component: dynamic(() => import("@/examples/toggle-group-outline")),
    path: "examples/toggle-group-outline.tsx",
    slug: "toggle-group",
  },
  "toggle-group-sizes": {
    component: dynamic(() => import("@/examples/toggle-group-sizes")),
    path: "examples/toggle-group-sizes.tsx",
    slug: "toggle-group",
  },
  "toggle-group-vertical": {
    component: dynamic(() => import("@/examples/toggle-group-vertical")),
    path: "examples/toggle-group-vertical.tsx",
    slug: "toggle-group",
  },
  "toggle-group-disabled": {
    component: dynamic(() => import("@/examples/toggle-group-disabled")),
    path: "examples/toggle-group-disabled.tsx",
    slug: "toggle-group",
  },
  "toggle-group-custom": {
    component: dynamic(() => import("@/examples/toggle-group-custom")),
    path: "examples/toggle-group-custom.tsx",
    slug: "toggle-group",
  },
  "table-demo": {
    component: dynamic(() => import("@/examples/table-demo")),
    path: "examples/table-demo.tsx",
    slug: "table",
  },
  "table-with-footer": {
    component: dynamic(() => import("@/examples/table-with-footer")),
    path: "examples/table-with-footer.tsx",
    slug: "table",
  },
  "input-demo": {
    component: dynamic(() => import("@/examples/input-demo")),
    path: "examples/input-demo.tsx",
    slug: "input",
  },
  "input-with-field": {
    component: dynamic(() => import("@/examples/input-with-field")),
    path: "examples/input-with-field.tsx",
    slug: "input",
  },
  "input-all-sizes": {
    component: dynamic(() => import("@/examples/input-all-sizes")),
    path: "examples/input-all-sizes.tsx",
    slug: "input",
  },
  "input-disabled": {
    component: dynamic(() => import("@/examples/input-disabled")),
    path: "examples/input-disabled.tsx",
    slug: "input",
  },
  "input-invalid": {
    component: dynamic(() => import("@/examples/input-invalid")),
    path: "examples/input-invalid.tsx",
    slug: "input",
  },
  "textarea-demo": {
    component: dynamic(() => import("@/examples/textarea-demo")),
    path: "examples/textarea-demo.tsx",
    slug: "textarea",
  },
  "textarea-with-field": {
    component: dynamic(() => import("@/examples/textarea-with-field")),
    path: "examples/textarea-with-field.tsx",
    slug: "textarea",
  },
  "textarea-disabled": {
    component: dynamic(() => import("@/examples/textarea-disabled")),
    path: "examples/textarea-disabled.tsx",
    slug: "textarea",
  },
  "textarea-invalid": {
    component: dynamic(() => import("@/examples/textarea-invalid")),
    path: "examples/textarea-invalid.tsx",
    slug: "textarea",
  },
  "textarea-with-button": {
    component: dynamic(() => import("@/examples/textarea-with-button")),
    path: "examples/textarea-with-button.tsx",
    slug: "textarea",
  },
  "switch-demo": {
    component: dynamic(() => import("@/examples/switch-demo")),
    path: "examples/switch-demo.tsx",
    slug: "switch",
  },
  "switch-with-description": {
    component: dynamic(() => import("@/examples/switch-with-description")),
    path: "examples/switch-with-description.tsx",
    slug: "switch",
  },
  "switch-sizes": {
    component: dynamic(() => import("@/examples/switch-sizes")),
    path: "examples/switch-sizes.tsx",
    slug: "switch",
  },
  "switch-disabled": {
    component: dynamic(() => import("@/examples/switch-disabled")),
    path: "examples/switch-disabled.tsx",
    slug: "switch",
  },
  "checkbox-demo": {
    component: dynamic(() => import("@/examples/checkbox-demo")),
    path: "examples/checkbox-demo.tsx",
    slug: "checkbox",
  },
  "checkbox-with-description": {
    component: dynamic(() => import("@/examples/checkbox-with-description")),
    path: "examples/checkbox-with-description.tsx",
    slug: "checkbox",
  },
  "checkbox-group": {
    component: dynamic(() => import("@/examples/checkbox-group")),
    path: "examples/checkbox-group.tsx",
    slug: "checkbox",
  },
  "checkbox-disabled": {
    component: dynamic(() => import("@/examples/checkbox-disabled")),
    path: "examples/checkbox-disabled.tsx",
    slug: "checkbox",
  },
  "radio-group-demo": {
    component: dynamic(() => import("@/examples/radio-group-demo")),
    path: "examples/radio-group-demo.tsx",
    slug: "radio-group",
  },
  "radio-group-with-description": {
    component: dynamic(() => import("@/examples/radio-group-with-description")),
    path: "examples/radio-group-with-description.tsx",
    slug: "radio-group",
  },
  "radio-group-fieldset": {
    component: dynamic(() => import("@/examples/radio-group-fieldset")),
    path: "examples/radio-group-fieldset.tsx",
    slug: "radio-group",
  },
  "radio-group-disabled": {
    component: dynamic(() => import("@/examples/radio-group-disabled")),
    path: "examples/radio-group-disabled.tsx",
    slug: "radio-group",
  },
  "select-demo": {
    component: dynamic(() => import("@/examples/select-demo")),
    path: "examples/select-demo.tsx",
    slug: "select",
  },
  "select-groups": {
    component: dynamic(() => import("@/examples/select-groups")),
    path: "examples/select-groups.tsx",
    slug: "select",
  },
  "select-all-sizes": {
    component: dynamic(() => import("@/examples/select-all-sizes")),
    path: "examples/select-all-sizes.tsx",
    slug: "select",
  },
  "select-disabled": {
    component: dynamic(() => import("@/examples/select-disabled")),
    path: "examples/select-disabled.tsx",
    slug: "select",
  },
  "select-invalid": {
    component: dynamic(() => import("@/examples/select-invalid")),
    path: "examples/select-invalid.tsx",
    slug: "select",
  },
  "native-select-demo": {
    component: dynamic(() => import("@/examples/native-select-demo")),
    path: "examples/native-select-demo.tsx",
    slug: "native-select",
  },
  "native-select-with-field": {
    component: dynamic(() => import("@/examples/native-select-with-field")),
    path: "examples/native-select-with-field.tsx",
    slug: "native-select",
  },
  "native-select-with-opt-group": {
    component: dynamic(() => import("@/examples/native-select-with-opt-group")),
    path: "examples/native-select-with-opt-group.tsx",
    slug: "native-select",
  },
  "native-select-sizes": {
    component: dynamic(() => import("@/examples/native-select-sizes")),
    path: "examples/native-select-sizes.tsx",
    slug: "native-select",
  },
  "native-select-disabled": {
    component: dynamic(() => import("@/examples/native-select-disabled")),
    path: "examples/native-select-disabled.tsx",
    slug: "native-select",
  },
  "slider-demo": {
    component: dynamic(() => import("@/examples/slider-demo")),
    path: "examples/slider-demo.tsx",
    slug: "slider",
  },
  "slider-range": {
    component: dynamic(() => import("@/examples/slider-range")),
    path: "examples/slider-range.tsx",
    slug: "slider",
  },
  "slider-vertical": {
    component: dynamic(() => import("@/examples/slider-vertical")),
    path: "examples/slider-vertical.tsx",
    slug: "slider",
  },
  "slider-disabled": {
    component: dynamic(() => import("@/examples/slider-disabled")),
    path: "examples/slider-disabled.tsx",
    slug: "slider",
  },
  "input-group-icon": {
    component: dynamic(() => import("@/examples/input-group-icon")),
    path: "examples/input-group-icon.tsx",
    slug: "input-group",
  },
  "input-group-text-addon": {
    component: dynamic(() => import("@/examples/input-group-text-addon")),
    path: "examples/input-group-text-addon.tsx",
    slug: "input-group",
  },
  "input-group-with-button": {
    component: dynamic(() => import("@/examples/input-group-with-button")),
    path: "examples/input-group-with-button.tsx",
    slug: "input-group",
  },
  "input-group-with-kbd": {
    component: dynamic(() => import("@/examples/input-group-with-kbd")),
    path: "examples/input-group-with-kbd.tsx",
    slug: "input-group",
  },
  "input-group-sizes": {
    component: dynamic(() => import("@/examples/input-group-sizes")),
    path: "examples/input-group-sizes.tsx",
    slug: "input-group",
  },
  "input-group-textarea-addon": {
    component: dynamic(() => import("@/examples/input-group-textarea-addon")),
    path: "examples/input-group-textarea-addon.tsx",
    slug: "input-group",
  },
  "input-group-with-label": {
    component: dynamic(() => import("@/examples/input-group-with-label")),
    path: "examples/input-group-with-label.tsx",
    slug: "input-group",
  },
  "field-demo": {
    component: dynamic(() => import("@/examples/field-demo")),
    path: "examples/field-demo.tsx",
    slug: "field",
  },
  "field-horizontal": {
    component: dynamic(() => import("@/examples/field-horizontal")),
    path: "examples/field-horizontal.tsx",
    slug: "field",
  },
  "field-with-error": {
    component: dynamic(() => import("@/examples/field-with-error")),
    path: "examples/field-with-error.tsx",
    slug: "field",
  },
  "field-multiple-errors": {
    component: dynamic(() => import("@/examples/field-multiple-errors")),
    path: "examples/field-multiple-errors.tsx",
    slug: "field",
  },
  "field-disabled": {
    component: dynamic(() => import("@/examples/field-disabled")),
    path: "examples/field-disabled.tsx",
    slug: "field",
  },
  "field-checkbox-group": {
    component: dynamic(() => import("@/examples/field-checkbox-group")),
    path: "examples/field-checkbox-group.tsx",
    slug: "field",
  },
  "field-form-example": {
    component: dynamic(() => import("@/examples/field-form-example")),
    path: "examples/field-form-example.tsx",
    slug: "field",
  },
  "tooltip-demo": {
    component: dynamic(() => import("@/examples/tooltip-demo")),
    path: "examples/tooltip-demo.tsx",
    slug: "tooltip",
  },
  "tooltip-sides": {
    component: dynamic(() => import("@/examples/tooltip-sides")),
    path: "examples/tooltip-sides.tsx",
    slug: "tooltip",
  },
  "tooltip-with-kbd": {
    component: dynamic(() => import("@/examples/tooltip-with-kbd")),
    path: "examples/tooltip-with-kbd.tsx",
    slug: "tooltip",
  },
  "tabs-demo": {
    component: dynamic(() => import("@/examples/tabs-demo")),
    path: "examples/tabs-demo.tsx",
    slug: "tabs",
  },
  "tabs-line": {
    component: dynamic(() => import("@/examples/tabs-line")),
    path: "examples/tabs-line.tsx",
    slug: "tabs",
  },
  "tabs-vertical": {
    component: dynamic(() => import("@/examples/tabs-vertical")),
    path: "examples/tabs-vertical.tsx",
    slug: "tabs",
  },
  "tabs-disabled": {
    component: dynamic(() => import("@/examples/tabs-disabled")),
    path: "examples/tabs-disabled.tsx",
    slug: "tabs",
  },
  "tabs-sizes": {
    component: dynamic(() => import("@/examples/tabs-sizes")),
    path: "examples/tabs-sizes.tsx",
    slug: "tabs",
  },
  "tabs-with-icons": {
    component: dynamic(() => import("@/examples/tabs-with-icons")),
    path: "examples/tabs-with-icons.tsx",
    slug: "tabs",
  },
  "dialog-demo": {
    component: dynamic(() => import("@/examples/dialog-demo")),
    path: "examples/dialog-demo.tsx",
    slug: "dialog",
  },
  "dialog-confirm": {
    component: dynamic(() => import("@/examples/dialog-confirm")),
    path: "examples/dialog-confirm.tsx",
    slug: "dialog",
  },
  "dialog-scrollable": {
    component: dynamic(() => import("@/examples/dialog-scrollable")),
    path: "examples/dialog-scrollable.tsx",
    slug: "dialog",
  },
  "sheet-demo": {
    component: dynamic(() => import("@/examples/sheet-demo")),
    path: "examples/sheet-demo.tsx",
    slug: "sheet",
  },
  "sheet-sides": {
    component: dynamic(() => import("@/examples/sheet-sides")),
    path: "examples/sheet-sides.tsx",
    slug: "sheet",
  },
  "sheet-no-close-button": {
    component: dynamic(() => import("@/examples/sheet-no-close-button")),
    path: "examples/sheet-no-close-button.tsx",
    slug: "sheet",
  },
  "alert-dialog-demo": {
    component: dynamic(() => import("@/examples/alert-dialog-demo")),
    path: "examples/alert-dialog-demo.tsx",
    slug: "alert-dialog",
  },
  "alert-dialog-with-media": {
    component: dynamic(() => import("@/examples/alert-dialog-with-media")),
    path: "examples/alert-dialog-with-media.tsx",
    slug: "alert-dialog",
  },
  "alert-dialog-small": {
    component: dynamic(() => import("@/examples/alert-dialog-small")),
    path: "examples/alert-dialog-small.tsx",
    slug: "alert-dialog",
  },
  "alert-dialog-destructive": {
    component: dynamic(() => import("@/examples/alert-dialog-destructive")),
    path: "examples/alert-dialog-destructive.tsx",
    slug: "alert-dialog",
  },
  "dropdown-menu-demo": {
    component: dynamic(() => import("@/examples/dropdown-menu-demo")),
    path: "examples/dropdown-menu-demo.tsx",
    slug: "dropdown-menu",
  },
  "dropdown-menu-with-icons": {
    component: dynamic(() => import("@/examples/dropdown-menu-with-icons")),
    path: "examples/dropdown-menu-with-icons.tsx",
    slug: "dropdown-menu",
  },
  "dropdown-menu-with-shortcuts": {
    component: dynamic(() => import("@/examples/dropdown-menu-with-shortcuts")),
    path: "examples/dropdown-menu-with-shortcuts.tsx",
    slug: "dropdown-menu",
  },
  "dropdown-menu-with-submenu": {
    component: dynamic(() => import("@/examples/dropdown-menu-with-submenu")),
    path: "examples/dropdown-menu-with-submenu.tsx",
    slug: "dropdown-menu",
  },
  "dropdown-menu-destructive": {
    component: dynamic(() => import("@/examples/dropdown-menu-destructive")),
    path: "examples/dropdown-menu-destructive.tsx",
    slug: "dropdown-menu",
  },
  "dropdown-menu-checkboxes": {
    component: dynamic(() => import("@/examples/dropdown-menu-checkboxes")),
    path: "examples/dropdown-menu-checkboxes.tsx",
    slug: "dropdown-menu",
  },
  "dropdown-menu-radio-items": {
    component: dynamic(() => import("@/examples/dropdown-menu-radio-items")),
    path: "examples/dropdown-menu-radio-items.tsx",
    slug: "dropdown-menu",
  },
  "dropdown-menu-title-description": {
    component: dynamic(() => import("@/examples/dropdown-menu-title-description")),
    path: "examples/dropdown-menu-title-description.tsx",
    slug: "dropdown-menu",
  },
  "command-demo": {
    component: dynamic(() => import("@/examples/command-demo")),
    path: "examples/command-demo.tsx",
    slug: "command",
  },
  "command-dialog-example": {
    component: dynamic(() => import("@/examples/command-dialog-example")),
    path: "examples/command-dialog-example.tsx",
    slug: "command",
  },
  "command-title-description": {
    component: dynamic(() => import("@/examples/command-title-description")),
    path: "examples/command-title-description.tsx",
    slug: "command",
  },
  "combobox-demo": {
    component: dynamic(() => import("@/examples/combobox-demo")),
    path: "examples/combobox-demo.tsx",
    slug: "combobox",
  },
  "combobox-multiple": {
    component: dynamic(() => import("@/examples/combobox-multiple")),
    path: "examples/combobox-multiple.tsx",
    slug: "combobox",
  },
  "combobox-groups": {
    component: dynamic(() => import("@/examples/combobox-groups")),
    path: "examples/combobox-groups.tsx",
    slug: "combobox",
  },
  "combobox-custom-items": {
    component: dynamic(() => import("@/examples/combobox-custom-items")),
    path: "examples/combobox-custom-items.tsx",
    slug: "combobox",
  },
  "combobox-popup": {
    component: dynamic(() => import("@/examples/combobox-popup")),
    path: "examples/combobox-popup.tsx",
    slug: "combobox",
  },
  "combobox-invalid": {
    component: dynamic(() => import("@/examples/combobox-invalid")),
    path: "examples/combobox-invalid.tsx",
    slug: "combobox",
  },
  "calendar-demo": {
    component: dynamic(() => import("@/examples/calendar-demo")),
    path: "examples/calendar-demo.tsx",
    slug: "calendar",
  },
  "calendar-range": {
    component: dynamic(() => import("@/examples/calendar-range")),
    path: "examples/calendar-range.tsx",
    slug: "calendar",
  },
  "calendar-dropdown": {
    component: dynamic(() => import("@/examples/calendar-dropdown")),
    path: "examples/calendar-dropdown.tsx",
    slug: "calendar",
  },
  "calendar-with-presets": {
    component: dynamic(() => import("@/examples/calendar-with-presets")),
    path: "examples/calendar-with-presets.tsx",
    slug: "calendar",
  },
  "calendar-week-numbers": {
    component: dynamic(() => import("@/examples/calendar-week-numbers")),
    path: "examples/calendar-week-numbers.tsx",
    slug: "calendar",
  },
  "sidebar-demo": {
    component: dynamic(() => import("@/examples/sidebar-demo")),
    path: "examples/sidebar-demo.tsx",
    slug: "sidebar",
  },
  "sidebar-with-badge": {
    component: dynamic(() => import("@/examples/sidebar-with-badge")),
    path: "examples/sidebar-with-badge.tsx",
    slug: "sidebar",
  },
  "sidebar-variants": {
    component: dynamic(() => import("@/examples/sidebar-variants")),
    path: "examples/sidebar-variants.tsx",
    slug: "sidebar",
  },
  "preview-card-demo": {
    component: dynamic(() => import("@/examples/preview-card-demo")),
    path: "examples/preview-card-demo.tsx",
    slug: "preview-card",
  },
  "preview-card-sides": {
    component: dynamic(() => import("@/examples/preview-card-sides")),
    path: "examples/preview-card-sides.tsx",
    slug: "preview-card",
  },
  "preview-card-delay": {
    component: dynamic(() => import("@/examples/preview-card-delay")),
    path: "examples/preview-card-delay.tsx",
    slug: "preview-card",
  },
}

export function getRegistryComponent(name: string): ComponentType | null {
  return examples[name]?.component ?? null
}

export function getRegistrySourcePath(name: string): string | null {
  return examples[name]?.path ?? null
}

export function getRegistryComponentSlug(name: string): string | null {
  return examples[name]?.slug ?? null
}
