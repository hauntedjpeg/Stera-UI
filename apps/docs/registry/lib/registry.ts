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
}

export function getRegistryComponent(name: string): ComponentType | null {
  return examples[name]?.component ?? null
}

export function getRegistrySourcePath(name: string): string | null {
  return examples[name]?.path ?? null
}
