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
  "item-icon": {
    component: dynamic(() => import("@/registry/examples/item-icon")),
    path: "examples/item-icon.tsx",
  },
  "item-avatar": {
    component: dynamic(() => import("@/registry/examples/item-avatar")),
    path: "examples/item-avatar.tsx",
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
  "input-demo": {
    component: dynamic(() => import("@/registry/examples/input-demo")),
    path: "examples/input-demo.tsx",
  },
  "input-with-field": {
    component: dynamic(() => import("@/registry/examples/input-with-field")),
    path: "examples/input-with-field.tsx",
  },
  "input-all-sizes": {
    component: dynamic(() => import("@/registry/examples/input-all-sizes")),
    path: "examples/input-all-sizes.tsx",
  },
  "input-disabled": {
    component: dynamic(() => import("@/registry/examples/input-disabled")),
    path: "examples/input-disabled.tsx",
  },
  "input-invalid": {
    component: dynamic(() => import("@/registry/examples/input-invalid")),
    path: "examples/input-invalid.tsx",
  },
  "textarea-demo": {
    component: dynamic(() => import("@/registry/examples/textarea-demo")),
    path: "examples/textarea-demo.tsx",
  },
  "textarea-with-field": {
    component: dynamic(() => import("@/registry/examples/textarea-with-field")),
    path: "examples/textarea-with-field.tsx",
  },
  "textarea-disabled": {
    component: dynamic(() => import("@/registry/examples/textarea-disabled")),
    path: "examples/textarea-disabled.tsx",
  },
  "textarea-invalid": {
    component: dynamic(() => import("@/registry/examples/textarea-invalid")),
    path: "examples/textarea-invalid.tsx",
  },
  "textarea-with-button": {
    component: dynamic(() => import("@/registry/examples/textarea-with-button")),
    path: "examples/textarea-with-button.tsx",
  },
  "switch-demo": {
    component: dynamic(() => import("@/registry/examples/switch-demo")),
    path: "examples/switch-demo.tsx",
  },
  "switch-with-description": {
    component: dynamic(() => import("@/registry/examples/switch-with-description")),
    path: "examples/switch-with-description.tsx",
  },
  "switch-sizes": {
    component: dynamic(() => import("@/registry/examples/switch-sizes")),
    path: "examples/switch-sizes.tsx",
  },
  "switch-disabled": {
    component: dynamic(() => import("@/registry/examples/switch-disabled")),
    path: "examples/switch-disabled.tsx",
  },
  "checkbox-demo": {
    component: dynamic(() => import("@/registry/examples/checkbox-demo")),
    path: "examples/checkbox-demo.tsx",
  },
  "checkbox-with-description": {
    component: dynamic(() => import("@/registry/examples/checkbox-with-description")),
    path: "examples/checkbox-with-description.tsx",
  },
  "checkbox-group": {
    component: dynamic(() => import("@/registry/examples/checkbox-group")),
    path: "examples/checkbox-group.tsx",
  },
  "checkbox-disabled": {
    component: dynamic(() => import("@/registry/examples/checkbox-disabled")),
    path: "examples/checkbox-disabled.tsx",
  },
  "radio-group-demo": {
    component: dynamic(() => import("@/registry/examples/radio-group-demo")),
    path: "examples/radio-group-demo.tsx",
  },
  "radio-group-with-description": {
    component: dynamic(() => import("@/registry/examples/radio-group-with-description")),
    path: "examples/radio-group-with-description.tsx",
  },
  "radio-group-fieldset": {
    component: dynamic(() => import("@/registry/examples/radio-group-fieldset")),
    path: "examples/radio-group-fieldset.tsx",
  },
  "radio-group-disabled": {
    component: dynamic(() => import("@/registry/examples/radio-group-disabled")),
    path: "examples/radio-group-disabled.tsx",
  },
  "select-demo": {
    component: dynamic(() => import("@/registry/examples/select-demo")),
    path: "examples/select-demo.tsx",
  },
  "select-groups": {
    component: dynamic(() => import("@/registry/examples/select-groups")),
    path: "examples/select-groups.tsx",
  },
  "select-all-sizes": {
    component: dynamic(() => import("@/registry/examples/select-all-sizes")),
    path: "examples/select-all-sizes.tsx",
  },
  "select-disabled": {
    component: dynamic(() => import("@/registry/examples/select-disabled")),
    path: "examples/select-disabled.tsx",
  },
  "select-invalid": {
    component: dynamic(() => import("@/registry/examples/select-invalid")),
    path: "examples/select-invalid.tsx",
  },
  "native-select-demo": {
    component: dynamic(() => import("@/registry/examples/native-select-demo")),
    path: "examples/native-select-demo.tsx",
  },
  "native-select-with-field": {
    component: dynamic(() => import("@/registry/examples/native-select-with-field")),
    path: "examples/native-select-with-field.tsx",
  },
  "native-select-with-opt-group": {
    component: dynamic(() => import("@/registry/examples/native-select-with-opt-group")),
    path: "examples/native-select-with-opt-group.tsx",
  },
  "native-select-sizes": {
    component: dynamic(() => import("@/registry/examples/native-select-sizes")),
    path: "examples/native-select-sizes.tsx",
  },
  "native-select-disabled": {
    component: dynamic(() => import("@/registry/examples/native-select-disabled")),
    path: "examples/native-select-disabled.tsx",
  },
  "slider-demo": {
    component: dynamic(() => import("@/registry/examples/slider-demo")),
    path: "examples/slider-demo.tsx",
  },
  "slider-range": {
    component: dynamic(() => import("@/registry/examples/slider-range")),
    path: "examples/slider-range.tsx",
  },
  "slider-vertical": {
    component: dynamic(() => import("@/registry/examples/slider-vertical")),
    path: "examples/slider-vertical.tsx",
  },
  "slider-disabled": {
    component: dynamic(() => import("@/registry/examples/slider-disabled")),
    path: "examples/slider-disabled.tsx",
  },
  "input-group-icon": {
    component: dynamic(() => import("@/registry/examples/input-group-icon")),
    path: "examples/input-group-icon.tsx",
  },
  "input-group-text-addon": {
    component: dynamic(() => import("@/registry/examples/input-group-text-addon")),
    path: "examples/input-group-text-addon.tsx",
  },
  "input-group-with-button": {
    component: dynamic(() => import("@/registry/examples/input-group-with-button")),
    path: "examples/input-group-with-button.tsx",
  },
  "input-group-with-kbd": {
    component: dynamic(() => import("@/registry/examples/input-group-with-kbd")),
    path: "examples/input-group-with-kbd.tsx",
  },
  "input-group-sizes": {
    component: dynamic(() => import("@/registry/examples/input-group-sizes")),
    path: "examples/input-group-sizes.tsx",
  },
  "input-group-textarea-addon": {
    component: dynamic(() => import("@/registry/examples/input-group-textarea-addon")),
    path: "examples/input-group-textarea-addon.tsx",
  },
  "input-group-with-label": {
    component: dynamic(() => import("@/registry/examples/input-group-with-label")),
    path: "examples/input-group-with-label.tsx",
  },
  "field-demo": {
    component: dynamic(() => import("@/registry/examples/field-demo")),
    path: "examples/field-demo.tsx",
  },
  "field-horizontal": {
    component: dynamic(() => import("@/registry/examples/field-horizontal")),
    path: "examples/field-horizontal.tsx",
  },
  "field-with-error": {
    component: dynamic(() => import("@/registry/examples/field-with-error")),
    path: "examples/field-with-error.tsx",
  },
  "field-multiple-errors": {
    component: dynamic(() => import("@/registry/examples/field-multiple-errors")),
    path: "examples/field-multiple-errors.tsx",
  },
  "field-disabled": {
    component: dynamic(() => import("@/registry/examples/field-disabled")),
    path: "examples/field-disabled.tsx",
  },
  "field-checkbox-group": {
    component: dynamic(() => import("@/registry/examples/field-checkbox-group")),
    path: "examples/field-checkbox-group.tsx",
  },
  "field-form-example": {
    component: dynamic(() => import("@/registry/examples/field-form-example")),
    path: "examples/field-form-example.tsx",
  },
  "tooltip-demo": {
    component: dynamic(() => import("@/registry/examples/tooltip-demo")),
    path: "examples/tooltip-demo.tsx",
  },
  "tooltip-sides": {
    component: dynamic(() => import("@/registry/examples/tooltip-sides")),
    path: "examples/tooltip-sides.tsx",
  },
  "tooltip-with-kbd": {
    component: dynamic(() => import("@/registry/examples/tooltip-with-kbd")),
    path: "examples/tooltip-with-kbd.tsx",
  },
  "tabs-demo": {
    component: dynamic(() => import("@/registry/examples/tabs-demo")),
    path: "examples/tabs-demo.tsx",
  },
  "tabs-line": {
    component: dynamic(() => import("@/registry/examples/tabs-line")),
    path: "examples/tabs-line.tsx",
  },
  "tabs-vertical": {
    component: dynamic(() => import("@/registry/examples/tabs-vertical")),
    path: "examples/tabs-vertical.tsx",
  },
  "tabs-disabled": {
    component: dynamic(() => import("@/registry/examples/tabs-disabled")),
    path: "examples/tabs-disabled.tsx",
  },
  "tabs-sizes": {
    component: dynamic(() => import("@/registry/examples/tabs-sizes")),
    path: "examples/tabs-sizes.tsx",
  },
  "tabs-with-icons": {
    component: dynamic(() => import("@/registry/examples/tabs-with-icons")),
    path: "examples/tabs-with-icons.tsx",
  },
  "dialog-demo": {
    component: dynamic(() => import("@/registry/examples/dialog-demo")),
    path: "examples/dialog-demo.tsx",
  },
  "dialog-confirm": {
    component: dynamic(() => import("@/registry/examples/dialog-confirm")),
    path: "examples/dialog-confirm.tsx",
  },
  "dialog-scrollable": {
    component: dynamic(() => import("@/registry/examples/dialog-scrollable")),
    path: "examples/dialog-scrollable.tsx",
  },
  "sheet-demo": {
    component: dynamic(() => import("@/registry/examples/sheet-demo")),
    path: "examples/sheet-demo.tsx",
  },
  "sheet-sides": {
    component: dynamic(() => import("@/registry/examples/sheet-sides")),
    path: "examples/sheet-sides.tsx",
  },
  "sheet-no-close-button": {
    component: dynamic(() => import("@/registry/examples/sheet-no-close-button")),
    path: "examples/sheet-no-close-button.tsx",
  },
  "alert-dialog-demo": {
    component: dynamic(() => import("@/registry/examples/alert-dialog-demo")),
    path: "examples/alert-dialog-demo.tsx",
  },
  "alert-dialog-with-media": {
    component: dynamic(() => import("@/registry/examples/alert-dialog-with-media")),
    path: "examples/alert-dialog-with-media.tsx",
  },
  "alert-dialog-small": {
    component: dynamic(() => import("@/registry/examples/alert-dialog-small")),
    path: "examples/alert-dialog-small.tsx",
  },
  "alert-dialog-destructive": {
    component: dynamic(() => import("@/registry/examples/alert-dialog-destructive")),
    path: "examples/alert-dialog-destructive.tsx",
  },
  "dropdown-menu-demo": {
    component: dynamic(() => import("@/registry/examples/dropdown-menu-demo")),
    path: "examples/dropdown-menu-demo.tsx",
  },
  "dropdown-menu-with-icons": {
    component: dynamic(() => import("@/registry/examples/dropdown-menu-with-icons")),
    path: "examples/dropdown-menu-with-icons.tsx",
  },
  "dropdown-menu-with-shortcuts": {
    component: dynamic(() => import("@/registry/examples/dropdown-menu-with-shortcuts")),
    path: "examples/dropdown-menu-with-shortcuts.tsx",
  },
  "dropdown-menu-with-submenu": {
    component: dynamic(() => import("@/registry/examples/dropdown-menu-with-submenu")),
    path: "examples/dropdown-menu-with-submenu.tsx",
  },
  "dropdown-menu-destructive": {
    component: dynamic(() => import("@/registry/examples/dropdown-menu-destructive")),
    path: "examples/dropdown-menu-destructive.tsx",
  },
  "dropdown-menu-checkboxes": {
    component: dynamic(() => import("@/registry/examples/dropdown-menu-checkboxes")),
    path: "examples/dropdown-menu-checkboxes.tsx",
  },
  "dropdown-menu-radio-items": {
    component: dynamic(() => import("@/registry/examples/dropdown-menu-radio-items")),
    path: "examples/dropdown-menu-radio-items.tsx",
  },
  "dropdown-menu-title-description": {
    component: dynamic(() => import("@/registry/examples/dropdown-menu-title-description")),
    path: "examples/dropdown-menu-title-description.tsx",
  },
  "command-demo": {
    component: dynamic(() => import("@/registry/examples/command-demo")),
    path: "examples/command-demo.tsx",
  },
  "command-dialog-example": {
    component: dynamic(() => import("@/registry/examples/command-dialog-example")),
    path: "examples/command-dialog-example.tsx",
  },
  "command-title-description": {
    component: dynamic(() => import("@/registry/examples/command-title-description")),
    path: "examples/command-title-description.tsx",
  },
  "combobox-demo": {
    component: dynamic(() => import("@/registry/examples/combobox-demo")),
    path: "examples/combobox-demo.tsx",
  },
  "combobox-multiple": {
    component: dynamic(() => import("@/registry/examples/combobox-multiple")),
    path: "examples/combobox-multiple.tsx",
  },
  "combobox-groups": {
    component: dynamic(() => import("@/registry/examples/combobox-groups")),
    path: "examples/combobox-groups.tsx",
  },
  "combobox-custom-items": {
    component: dynamic(() => import("@/registry/examples/combobox-custom-items")),
    path: "examples/combobox-custom-items.tsx",
  },
  "combobox-popup": {
    component: dynamic(() => import("@/registry/examples/combobox-popup")),
    path: "examples/combobox-popup.tsx",
  },
  "combobox-invalid": {
    component: dynamic(() => import("@/registry/examples/combobox-invalid")),
    path: "examples/combobox-invalid.tsx",
  },
  "calendar-demo": {
    component: dynamic(() => import("@/registry/examples/calendar-demo")),
    path: "examples/calendar-demo.tsx",
  },
  "calendar-range": {
    component: dynamic(() => import("@/registry/examples/calendar-range")),
    path: "examples/calendar-range.tsx",
  },
  "calendar-dropdown": {
    component: dynamic(() => import("@/registry/examples/calendar-dropdown")),
    path: "examples/calendar-dropdown.tsx",
  },
  "calendar-with-presets": {
    component: dynamic(() => import("@/registry/examples/calendar-with-presets")),
    path: "examples/calendar-with-presets.tsx",
  },
  "calendar-week-numbers": {
    component: dynamic(() => import("@/registry/examples/calendar-week-numbers")),
    path: "examples/calendar-week-numbers.tsx",
  },
  "sidebar-demo": {
    component: dynamic(() => import("@/registry/examples/sidebar-demo")),
    path: "examples/sidebar-demo.tsx",
  },
  "sidebar-with-badge": {
    component: dynamic(() => import("@/registry/examples/sidebar-with-badge")),
    path: "examples/sidebar-with-badge.tsx",
  },
  "sidebar-variants": {
    component: dynamic(() => import("@/registry/examples/sidebar-variants")),
    path: "examples/sidebar-variants.tsx",
  },
}

export function getRegistryComponent(name: string): ComponentType | null {
  return examples[name]?.component ?? null
}

export function getRegistrySourcePath(name: string): string | null {
  return examples[name]?.path ?? null
}
