import dynamic from "next/dynamic"
import type { ComponentType } from "react"

type RegistryEntry = {
  component: ComponentType
  slug: string
}

const examples: Record<string, RegistryEntry> = {
  "accordion-demo": {
    component: dynamic(() => import("@/examples/accordion-demo")),
    slug: "accordion",
  },
  "accordion-multiple": {
    component: dynamic(() => import("@/examples/accordion-multiple")),
    slug: "accordion",
  },
  "accordion-default-open": {
    component: dynamic(() => import("@/examples/accordion-default-open")),
    slug: "accordion",
  },
  "accordion-icons": {
    component: dynamic(() => import("@/examples/accordion-icons")),
    slug: "accordion",
  },
  "accordion-borders": {
    component: dynamic(() => import("@/examples/accordion-borders")),
    slug: "accordion",
  },
  "badge-demo": {
    component: dynamic(() => import("@/examples/badge-demo")),
    slug: "badge",
  },
  "badge-colors": {
    component: dynamic(() => import("@/examples/badge-colors")),
    slug: "badge",
  },
  "badge-with-icon": {
    component: dynamic(() => import("@/examples/badge-with-icon")),
    slug: "badge",
  },
  "badge-with-spinner": {
    component: dynamic(() => import("@/examples/badge-with-spinner")),
    slug: "badge",
  },
  "badge-sizes": {
    component: dynamic(() => import("@/examples/badge-sizes")),
    slug: "badge",
  },
  "separator-demo": {
    component: dynamic(() => import("@/examples/separator-demo")),
    slug: "separator",
  },
  "separator-vertical": {
    component: dynamic(() => import("@/examples/separator-vertical")),
    slug: "separator",
  },
  "code-demo": {
    component: dynamic(() => import("@/examples/code-demo")),
    slug: "code",
  },
  "code-sizes": {
    component: dynamic(() => import("@/examples/code-sizes")),
    slug: "code",
  },
  "kbd-demo": {
    component: dynamic(() => import("@/examples/kbd-demo")),
    slug: "kbd",
  },
  "kbd-sizes": {
    component: dynamic(() => import("@/examples/kbd-sizes")),
    slug: "kbd",
  },
  "kbd-key-combination": {
    component: dynamic(() => import("@/examples/kbd-key-combination")),
    slug: "kbd",
  },
  "kbd-with-button": {
    component: dynamic(() => import("@/examples/kbd-with-button")),
    slug: "kbd",
  },
  "kbd-with-input": {
    component: dynamic(() => import("@/examples/kbd-with-input")),
    slug: "kbd",
  },
  "label-demo": {
    component: dynamic(() => import("@/examples/label-demo")),
    slug: "label",
  },
  "label-with-checkbox": {
    component: dynamic(() => import("@/examples/label-with-checkbox")),
    slug: "label",
  },
  "label-disabled": {
    component: dynamic(() => import("@/examples/label-disabled")),
    slug: "label",
  },
  "skeleton-demo": {
    component: dynamic(() => import("@/examples/skeleton-demo")),
    slug: "skeleton",
  },
  "skeleton-card": {
    component: dynamic(() => import("@/examples/skeleton-card")),
    slug: "skeleton",
  },
  "skeleton-text": {
    component: dynamic(() => import("@/examples/skeleton-text")),
    slug: "skeleton",
  },
  "progress-demo": {
    component: dynamic(() => import("@/examples/progress-demo")),
    slug: "progress",
  },
  "progress-with-label": {
    component: dynamic(() => import("@/examples/progress-with-label")),
    slug: "progress",
  },
  "chip-demo": {
    component: dynamic(() => import("@/examples/chip-demo")),
    slug: "chip",
  },
  "chip-sizes": {
    component: dynamic(() => import("@/examples/chip-sizes")),
    slug: "chip",
  },
  "chip-with-icons": {
    component: dynamic(() => import("@/examples/chip-with-icons")),
    slug: "chip",
  },
  "chip-active": {
    component: dynamic(() => import("@/examples/chip-active")),
    slug: "chip",
  },
  "button-demo": {
    component: dynamic(() => import("@/examples/button-demo")),
    slug: "button",
  },
  "button-variants": {
    component: dynamic(() => import("@/examples/button-variants")),
    slug: "button",
  },
  "button-sizes": {
    component: dynamic(() => import("@/examples/button-sizes")),
    slug: "button",
  },
  "button-with-icon": {
    component: dynamic(() => import("@/examples/button-with-icon")),
    slug: "button",
  },
  "button-disabled": {
    component: dynamic(() => import("@/examples/button-disabled")),
    slug: "button",
  },
  "button-group-demo": {
    component: dynamic(() => import("@/examples/button-group-demo")),
    slug: "button-group",
  },
  "button-group-orientation": {
    component: dynamic(() => import("@/examples/button-group-orientation")),
    slug: "button-group",
  },
  "button-group-size": {
    component: dynamic(() => import("@/examples/button-group-size")),
    slug: "button-group",
  },
  "button-group-nested": {
    component: dynamic(() => import("@/examples/button-group-nested")),
    slug: "button-group",
  },
  "button-group-separator": {
    component: dynamic(() => import("@/examples/button-group-separator")),
    slug: "button-group",
  },
  "button-group-split": {
    component: dynamic(() => import("@/examples/button-group-split")),
    slug: "button-group",
  },
  "button-group-input": {
    component: dynamic(() => import("@/examples/button-group-input")),
    slug: "button-group",
  },
  "button-group-input-group": {
    component: dynamic(() => import("@/examples/button-group-input-group")),
    slug: "button-group",
  },
  "button-group-dropdown": {
    component: dynamic(() => import("@/examples/button-group-dropdown")),
    slug: "button-group",
  },
  "button-group-select": {
    component: dynamic(() => import("@/examples/button-group-select")),
    slug: "button-group",
  },
  "button-group-popover": {
    component: dynamic(() => import("@/examples/button-group-popover")),
    slug: "button-group",
  },
  "toggle-demo": {
    component: dynamic(() => import("@/examples/toggle-demo")),
    slug: "toggle",
  },
  "toggle-outline": {
    component: dynamic(() => import("@/examples/toggle-outline")),
    slug: "toggle",
  },
  "toggle-with-text": {
    component: dynamic(() => import("@/examples/toggle-with-text")),
    slug: "toggle",
  },
  "toggle-sizes": {
    component: dynamic(() => import("@/examples/toggle-sizes")),
    slug: "toggle",
  },
  "toggle-disabled": {
    component: dynamic(() => import("@/examples/toggle-disabled")),
    slug: "toggle",
  },
  "avatar-demo": {
    component: dynamic(() => import("@/examples/avatar-demo")),
    slug: "avatar",
  },
  "avatar-fallback": {
    component: dynamic(() => import("@/examples/avatar-fallback")),
    slug: "avatar",
  },
  "avatar-sizes": {
    component: dynamic(() => import("@/examples/avatar-sizes")),
    slug: "avatar",
  },
  "avatar-shapes": {
    component: dynamic(() => import("@/examples/avatar-shapes")),
    slug: "avatar",
  },
  "avatar-with-badge": {
    component: dynamic(() => import("@/examples/avatar-with-badge")),
    slug: "avatar",
  },
  "avatar-icon-fallback": {
    component: dynamic(() => import("@/examples/avatar-icon-fallback")),
    slug: "avatar",
  },
  "avatar-group": {
    component: dynamic(() => import("@/examples/avatar-group")),
    slug: "avatar",
  },
  "card-demo": {
    component: dynamic(() => import("@/examples/card-demo")),
    slug: "card",
  },
  "card-with-action": {
    component: dynamic(() => import("@/examples/card-with-action")),
    slug: "card",
  },
  "card-sizes": {
    component: dynamic(() => import("@/examples/card-sizes")),
    slug: "card",
  },
  "callout-demo": {
    component: dynamic(() => import("@/examples/callout-demo")),
    slug: "callout",
  },
  "callout-with-icon": {
    component: dynamic(() => import("@/examples/callout-with-icon")),
    slug: "callout",
  },
  "callout-with-action": {
    component: dynamic(() => import("@/examples/callout-with-action")),
    slug: "callout",
  },
  "callout-with-close": {
    component: dynamic(() => import("@/examples/callout-with-close")),
    slug: "callout",
  },
  "callout-variants": {
    component: dynamic(() => import("@/examples/callout-variants")),
    slug: "callout",
  },
  "toast-demo": {
    component: dynamic(() => import("@/examples/toast-demo")),
    slug: "toast",
  },
  "toast-types": {
    component: dynamic(() => import("@/examples/toast-types")),
    slug: "toast",
  },
  "empty-demo": {
    component: dynamic(() => import("@/examples/empty-demo")),
    slug: "empty",
  },
  "empty-with-avatar-group": {
    component: dynamic(() => import("@/examples/empty-with-avatar-group")),
    slug: "empty",
  },
  "empty-no-results": {
    component: dynamic(() => import("@/examples/empty-no-results")),
    slug: "empty",
  },
  "breadcrumb-demo": {
    component: dynamic(() => import("@/examples/breadcrumb-demo")),
    slug: "breadcrumb",
  },
  "breadcrumb-custom-separator": {
    component: dynamic(() => import("@/examples/breadcrumb-custom-separator")),
    slug: "breadcrumb",
  },
  "breadcrumb-collapsed": {
    component: dynamic(() => import("@/examples/breadcrumb-collapsed")),
    slug: "breadcrumb",
  },
  "breadcrumb-dropdown": {
    component: dynamic(() => import("@/examples/breadcrumb-dropdown")),
    slug: "breadcrumb",
  },
  "breadcrumb-dropdown-inline": {
    component: dynamic(() => import("@/examples/breadcrumb-dropdown-inline")),
    slug: "breadcrumb",
  },
  "breadcrumb-link": {
    component: dynamic(() => import("@/examples/breadcrumb-link")),
    slug: "breadcrumb",
  },
  "icon-tile-demo": {
    component: dynamic(() => import("@/examples/icon-tile-demo")),
    slug: "icon-tile",
  },
  "icon-tile-variants": {
    component: dynamic(() => import("@/examples/icon-tile-variants")),
    slug: "icon-tile",
  },
  "icon-tile-colors": {
    component: dynamic(() => import("@/examples/icon-tile-colors")),
    slug: "icon-tile",
  },
  "icon-tile-sizes": {
    component: dynamic(() => import("@/examples/icon-tile-sizes")),
    slug: "icon-tile",
  },
  "icon-tile-shapes": {
    component: dynamic(() => import("@/examples/icon-tile-shapes")),
    slug: "icon-tile",
  },
  "icon-tile-with-item": {
    component: dynamic(() => import("@/examples/icon-tile-with-item")),
    slug: "icon-tile",
  },
  "item-demo": {
    component: dynamic(() => import("@/examples/item-demo")),
    slug: "item",
  },
  "item-variants": {
    component: dynamic(() => import("@/examples/item-variants")),
    slug: "item",
  },
  "item-sizes": {
    component: dynamic(() => import("@/examples/item-sizes")),
    slug: "item",
  },
  "item-icon": {
    component: dynamic(() => import("@/examples/item-icon")),
    slug: "item",
  },
  "item-avatar": {
    component: dynamic(() => import("@/examples/item-avatar")),
    slug: "item",
  },
  "item-header": {
    component: dynamic(() => import("@/examples/item-header")),
    slug: "item",
  },
  "item-footer": {
    component: dynamic(() => import("@/examples/item-footer")),
    slug: "item",
  },
  "pagination-demo": {
    component: dynamic(() => import("@/examples/pagination-demo")),
    slug: "pagination",
  },
  "pagination-simple": {
    component: dynamic(() => import("@/examples/pagination-simple")),
    slug: "pagination",
  },
  "pagination-with-rows-per-page": {
    component: dynamic(
      () => import("@/examples/pagination-with-rows-per-page")
    ),
    slug: "pagination",
  },
  "toggle-group-demo": {
    component: dynamic(() => import("@/examples/toggle-group-demo")),
    slug: "toggle-group",
  },
  "toggle-group-outline": {
    component: dynamic(() => import("@/examples/toggle-group-outline")),
    slug: "toggle-group",
  },
  "toggle-group-sizes": {
    component: dynamic(() => import("@/examples/toggle-group-sizes")),
    slug: "toggle-group",
  },
  "toggle-group-vertical": {
    component: dynamic(() => import("@/examples/toggle-group-vertical")),
    slug: "toggle-group",
  },
  "toggle-group-disabled": {
    component: dynamic(() => import("@/examples/toggle-group-disabled")),
    slug: "toggle-group",
  },
  "toggle-group-custom": {
    component: dynamic(() => import("@/examples/toggle-group-custom")),
    slug: "toggle-group",
  },
  "table-demo": {
    component: dynamic(() => import("@/examples/table-demo")),
    slug: "table",
  },
  "table-with-footer": {
    component: dynamic(() => import("@/examples/table-with-footer")),
    slug: "table",
  },
  "input-demo": {
    component: dynamic(() => import("@/examples/input-demo")),
    slug: "input",
  },
  "input-with-field": {
    component: dynamic(() => import("@/examples/input-with-field")),
    slug: "input",
  },
  "input-all-sizes": {
    component: dynamic(() => import("@/examples/input-all-sizes")),
    slug: "input",
  },
  "input-disabled": {
    component: dynamic(() => import("@/examples/input-disabled")),
    slug: "input",
  },
  "input-invalid": {
    component: dynamic(() => import("@/examples/input-invalid")),
    slug: "input",
  },
  "textarea-demo": {
    component: dynamic(() => import("@/examples/textarea-demo")),
    slug: "textarea",
  },
  "textarea-with-field": {
    component: dynamic(() => import("@/examples/textarea-with-field")),
    slug: "textarea",
  },
  "textarea-disabled": {
    component: dynamic(() => import("@/examples/textarea-disabled")),
    slug: "textarea",
  },
  "textarea-invalid": {
    component: dynamic(() => import("@/examples/textarea-invalid")),
    slug: "textarea",
  },
  "textarea-with-button": {
    component: dynamic(() => import("@/examples/textarea-with-button")),
    slug: "textarea",
  },
  "switch-demo": {
    component: dynamic(() => import("@/examples/switch-demo")),
    slug: "switch",
  },
  "switch-with-description": {
    component: dynamic(() => import("@/examples/switch-with-description")),
    slug: "switch",
  },
  "switch-sizes": {
    component: dynamic(() => import("@/examples/switch-sizes")),
    slug: "switch",
  },
  "switch-disabled": {
    component: dynamic(() => import("@/examples/switch-disabled")),
    slug: "switch",
  },
  "switch-choice-card": {
    component: dynamic(() => import("@/examples/switch-choice-card")),
    slug: "switch",
  },
  "checkbox-demo": {
    component: dynamic(() => import("@/examples/checkbox-demo")),
    slug: "checkbox",
  },
  "checkbox-with-description": {
    component: dynamic(() => import("@/examples/checkbox-with-description")),
    slug: "checkbox",
  },
  "checkbox-group": {
    component: dynamic(() => import("@/examples/checkbox-group")),
    slug: "checkbox",
  },
  "checkbox-disabled": {
    component: dynamic(() => import("@/examples/checkbox-disabled")),
    slug: "checkbox",
  },
  "checkbox-basic": {
    component: dynamic(() => import("@/examples/checkbox-basic")),
    slug: "checkbox",
  },
  "checkbox-controlled": {
    component: dynamic(() => import("@/examples/checkbox-controlled")),
    slug: "checkbox",
  },
  "checkbox-indeterminate": {
    component: dynamic(() => import("@/examples/checkbox-indeterminate")),
    slug: "checkbox",
  },
  "checkbox-invalid": {
    component: dynamic(() => import("@/examples/checkbox-invalid")),
    slug: "checkbox",
  },
  "checkbox-in-table": {
    component: dynamic(() => import("@/examples/checkbox-in-table")),
    slug: "checkbox",
  },
  "radio-group-demo": {
    component: dynamic(() => import("@/examples/radio-group-demo")),
    slug: "radio-group",
  },
  "radio-group-with-description": {
    component: dynamic(() => import("@/examples/radio-group-with-description")),
    slug: "radio-group",
  },
  "radio-group-choice-card": {
    component: dynamic(() => import("@/examples/radio-group-choice-card")),
    slug: "radio-group",
  },
  "radio-group-fieldset": {
    component: dynamic(() => import("@/examples/radio-group-fieldset")),
    slug: "radio-group",
  },
  "radio-group-disabled": {
    component: dynamic(() => import("@/examples/radio-group-disabled")),
    slug: "radio-group",
  },
  "select-demo": {
    component: dynamic(() => import("@/examples/select-demo")),
    slug: "select",
  },
  "select-groups": {
    component: dynamic(() => import("@/examples/select-groups")),
    slug: "select",
  },
  "select-all-sizes": {
    component: dynamic(() => import("@/examples/select-all-sizes")),
    slug: "select",
  },
  "select-disabled": {
    component: dynamic(() => import("@/examples/select-disabled")),
    slug: "select",
  },
  "select-invalid": {
    component: dynamic(() => import("@/examples/select-invalid")),
    slug: "select",
  },
  "menubar-demo": {
    component: dynamic(() => import("@/examples/menubar-demo")),
    slug: "menubar",
  },
  "menubar-checkbox-items": {
    component: dynamic(() => import("@/examples/menubar-checkbox-items")),
    slug: "menubar",
  },
  "menubar-radio-items": {
    component: dynamic(() => import("@/examples/menubar-radio-items")),
    slug: "menubar",
  },
  "menubar-disabled-menu": {
    component: dynamic(() => import("@/examples/menubar-disabled-menu")),
    slug: "menubar",
  },
  "native-select-demo": {
    component: dynamic(() => import("@/examples/native-select-demo")),
    slug: "native-select",
  },
  "native-select-with-field": {
    component: dynamic(() => import("@/examples/native-select-with-field")),
    slug: "native-select",
  },
  "native-select-with-opt-group": {
    component: dynamic(() => import("@/examples/native-select-with-opt-group")),
    slug: "native-select",
  },
  "native-select-sizes": {
    component: dynamic(() => import("@/examples/native-select-sizes")),
    slug: "native-select",
  },
  "native-select-disabled": {
    component: dynamic(() => import("@/examples/native-select-disabled")),
    slug: "native-select",
  },
  "slider-demo": {
    component: dynamic(() => import("@/examples/slider-demo")),
    slug: "slider",
  },
  "slider-range": {
    component: dynamic(() => import("@/examples/slider-range")),
    slug: "slider",
  },
  "slider-vertical": {
    component: dynamic(() => import("@/examples/slider-vertical")),
    slug: "slider",
  },
  "slider-disabled": {
    component: dynamic(() => import("@/examples/slider-disabled")),
    slug: "slider",
  },
  "input-group-icon": {
    component: dynamic(() => import("@/examples/input-group-icon")),
    slug: "input-group",
  },
  "input-group-text-addon": {
    component: dynamic(() => import("@/examples/input-group-text-addon")),
    slug: "input-group",
  },
  "input-group-with-button": {
    component: dynamic(() => import("@/examples/input-group-with-button")),
    slug: "input-group",
  },
  "input-group-with-kbd": {
    component: dynamic(() => import("@/examples/input-group-with-kbd")),
    slug: "input-group",
  },
  "input-group-sizes": {
    component: dynamic(() => import("@/examples/input-group-sizes")),
    slug: "input-group",
  },
  "input-group-textarea-addon": {
    component: dynamic(() => import("@/examples/input-group-textarea-addon")),
    slug: "input-group",
  },
  "input-group-with-label": {
    component: dynamic(() => import("@/examples/input-group-with-label")),
    slug: "input-group",
  },
  "input-group-states": {
    component: dynamic(() => import("@/examples/input-group-states")),
    slug: "input-group",
  },
  "input-group-align": {
    component: dynamic(() => import("@/examples/input-group-align")),
    slug: "input-group",
  },
  "field-demo": {
    component: dynamic(() => import("@/examples/field-demo")),
    slug: "field",
  },
  "field-horizontal": {
    component: dynamic(() => import("@/examples/field-horizontal")),
    slug: "field",
  },
  "field-with-error": {
    component: dynamic(() => import("@/examples/field-with-error")),
    slug: "field",
  },
  "field-multiple-errors": {
    component: dynamic(() => import("@/examples/field-multiple-errors")),
    slug: "field",
  },
  "field-disabled": {
    component: dynamic(() => import("@/examples/field-disabled")),
    slug: "field",
  },
  "field-checkbox-group": {
    component: dynamic(() => import("@/examples/field-checkbox-group")),
    slug: "field",
  },
  "field-form-example": {
    component: dynamic(() => import("@/examples/field-form-example")),
    slug: "field",
  },
  "tooltip-demo": {
    component: dynamic(() => import("@/examples/tooltip-demo")),
    slug: "tooltip",
  },
  "tooltip-sides": {
    component: dynamic(() => import("@/examples/tooltip-sides")),
    slug: "tooltip",
  },
  "tooltip-with-kbd": {
    component: dynamic(() => import("@/examples/tooltip-with-kbd")),
    slug: "tooltip",
  },
  "tabs-demo": {
    component: dynamic(() => import("@/examples/tabs-demo")),
    slug: "tabs",
  },
  "tabs-line": {
    component: dynamic(() => import("@/examples/tabs-line")),
    slug: "tabs",
  },
  "tabs-vertical": {
    component: dynamic(() => import("@/examples/tabs-vertical")),
    slug: "tabs",
  },
  "tabs-disabled": {
    component: dynamic(() => import("@/examples/tabs-disabled")),
    slug: "tabs",
  },
  "tabs-sizes": {
    component: dynamic(() => import("@/examples/tabs-sizes")),
    slug: "tabs",
  },
  "tabs-with-icons": {
    component: dynamic(() => import("@/examples/tabs-with-icons")),
    slug: "tabs",
  },
  "dialog-demo": {
    component: dynamic(() => import("@/examples/dialog-demo")),
    slug: "dialog",
  },
  "dialog-confirm": {
    component: dynamic(() => import("@/examples/dialog-confirm")),
    slug: "dialog",
  },
  "dialog-scrollable": {
    component: dynamic(() => import("@/examples/dialog-scrollable")),
    slug: "dialog",
  },
  "drawer-demo": {
    component: dynamic(() => import("@/examples/drawer-demo")),
    slug: "drawer",
  },
  "drawer-bottom": {
    component: dynamic(() => import("@/examples/drawer-bottom")),
    slug: "drawer",
  },
  "drawer-snap-points": {
    component: dynamic(() => import("@/examples/drawer-snap-points")),
    slug: "drawer",
  },
  "drawer-nested": {
    component: dynamic(() => import("@/examples/drawer-nested")),
    slug: "drawer",
  },
  "drawer-nested-side": {
    component: dynamic(() => import("@/examples/drawer-nested-side")),
    slug: "drawer",
  },
  "drawer-swipe-area": {
    component: dynamic(() => import("@/examples/drawer-swipe-area")),
    slug: "drawer",
  },
  "drawer-indent": {
    component: dynamic(() => import("@/examples/drawer-indent")),
    slug: "drawer",
  },
  "alert-dialog-demo": {
    component: dynamic(() => import("@/examples/alert-dialog-demo")),
    slug: "alert-dialog",
  },
  "alert-dialog-with-media": {
    component: dynamic(() => import("@/examples/alert-dialog-with-media")),
    slug: "alert-dialog",
  },
  "alert-dialog-small": {
    component: dynamic(() => import("@/examples/alert-dialog-small")),
    slug: "alert-dialog",
  },
  "alert-dialog-destructive": {
    component: dynamic(() => import("@/examples/alert-dialog-destructive")),
    slug: "alert-dialog",
  },
  "dropdown-menu-demo": {
    component: dynamic(() => import("@/examples/dropdown-menu-demo")),
    slug: "dropdown-menu",
  },
  "dropdown-menu-with-icons": {
    component: dynamic(() => import("@/examples/dropdown-menu-with-icons")),
    slug: "dropdown-menu",
  },
  "dropdown-menu-with-shortcuts": {
    component: dynamic(() => import("@/examples/dropdown-menu-with-shortcuts")),
    slug: "dropdown-menu",
  },
  "dropdown-menu-with-submenu": {
    component: dynamic(() => import("@/examples/dropdown-menu-with-submenu")),
    slug: "dropdown-menu",
  },
  "dropdown-menu-destructive": {
    component: dynamic(() => import("@/examples/dropdown-menu-destructive")),
    slug: "dropdown-menu",
  },
  "dropdown-menu-checkboxes": {
    component: dynamic(() => import("@/examples/dropdown-menu-checkboxes")),
    slug: "dropdown-menu",
  },
  "dropdown-menu-radio-items": {
    component: dynamic(() => import("@/examples/dropdown-menu-radio-items")),
    slug: "dropdown-menu",
  },
  "dropdown-menu-title-description": {
    component: dynamic(
      () => import("@/examples/dropdown-menu-title-description")
    ),
    slug: "dropdown-menu",
  },
  "command-demo": {
    component: dynamic(() => import("@/examples/command-demo")),
    slug: "command",
  },
  "command-dialog-example": {
    component: dynamic(() => import("@/examples/command-dialog-example")),
    slug: "command",
  },
  "command-title-description": {
    component: dynamic(() => import("@/examples/command-title-description")),
    slug: "command",
  },
  "combobox-demo": {
    component: dynamic(() => import("@/examples/combobox-demo")),
    slug: "combobox",
  },
  "combobox-multiple": {
    component: dynamic(() => import("@/examples/combobox-multiple")),
    slug: "combobox",
  },
  "combobox-groups": {
    component: dynamic(() => import("@/examples/combobox-groups")),
    slug: "combobox",
  },
  "combobox-custom-items": {
    component: dynamic(() => import("@/examples/combobox-custom-items")),
    slug: "combobox",
  },
  "combobox-popup": {
    component: dynamic(() => import("@/examples/combobox-popup")),
    slug: "combobox",
  },
  "combobox-invalid": {
    component: dynamic(() => import("@/examples/combobox-invalid")),
    slug: "combobox",
  },
  "combobox-clear": {
    component: dynamic(() => import("@/examples/combobox-clear")),
    slug: "combobox",
  },
  "calendar-demo": {
    component: dynamic(() => import("@/examples/calendar-demo")),
    slug: "calendar",
  },
  "calendar-range": {
    component: dynamic(() => import("@/examples/calendar-range")),
    slug: "calendar",
  },
  "calendar-dropdown": {
    component: dynamic(() => import("@/examples/calendar-dropdown")),
    slug: "calendar",
  },
  "calendar-with-presets": {
    component: dynamic(() => import("@/examples/calendar-with-presets")),
    slug: "calendar",
  },
  "calendar-week-numbers": {
    component: dynamic(() => import("@/examples/calendar-week-numbers")),
    slug: "calendar",
  },
  "sidebar-demo": {
    component: dynamic(() => import("@/examples/sidebar-demo")),
    slug: "sidebar",
  },
  "sidebar-with-badge": {
    component: dynamic(() => import("@/examples/sidebar-with-badge")),
    slug: "sidebar",
  },
  "sidebar-variants": {
    component: dynamic(() => import("@/examples/sidebar-variants")),
    slug: "sidebar",
  },
  "popover-demo": {
    component: dynamic(() => import("@/examples/popover-demo")),
    slug: "popover",
  },
  "popover-sides": {
    component: dynamic(() => import("@/examples/popover-sides")),
    slug: "popover",
  },
  "popover-align": {
    component: dynamic(() => import("@/examples/popover-align")),
    slug: "popover",
  },
  "popover-with-form": {
    component: dynamic(() => import("@/examples/popover-with-form")),
    slug: "popover",
  },
  "preview-card-demo": {
    component: dynamic(() => import("@/examples/preview-card-demo")),
    slug: "preview-card",
  },
  "preview-card-sides": {
    component: dynamic(() => import("@/examples/preview-card-sides")),
    slug: "preview-card",
  },
  "preview-card-delay": {
    component: dynamic(() => import("@/examples/preview-card-delay")),
    slug: "preview-card",
  },
  "scroll-area-demo": {
    component: dynamic(() => import("@/examples/scroll-area-demo")),
    slug: "scroll-area",
  },
  "scroll-area-horizontal": {
    component: dynamic(() => import("@/examples/scroll-area-horizontal")),
    slug: "scroll-area",
  },
  "scroll-fade-demo": {
    component: dynamic(() => import("@/examples/scroll-fade-demo")),
    slug: "scroll-fade",
  },
  "scroll-fade-overflow": {
    component: dynamic(() => import("@/examples/scroll-fade-overflow")),
    slug: "scroll-fade",
  },
  "scroll-fade-horizontal": {
    component: dynamic(() => import("@/examples/scroll-fade-horizontal")),
    slug: "scroll-fade",
  },
  "scroll-fade-edge": {
    component: dynamic(() => import("@/examples/scroll-fade-edge")),
    slug: "scroll-fade",
  },
  "scroll-fade-size": {
    component: dynamic(() => import("@/examples/scroll-fade-size")),
    slug: "scroll-fade",
  },
  "scroll-fade-none": {
    component: dynamic(() => import("@/examples/scroll-fade-none")),
    slug: "scroll-fade",
  },
  "scroll-fade-rtl": {
    component: dynamic(() => import("@/examples/scroll-fade-rtl")),
    slug: "scroll-fade",
  },
}

export function getRegistryComponent(name: string): ComponentType | null {
  return examples[name]?.component ?? null
}

export function hasRegistryExample(name: string): boolean {
  return name in examples
}

export function getRegistryComponentSlug(name: string): string | null {
  return examples[name]?.slug ?? null
}
