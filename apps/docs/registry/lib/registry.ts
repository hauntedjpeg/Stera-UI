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
}

export function getRegistryComponent(name: string): ComponentType | null {
  return examples[name]?.component ?? null
}

export function getRegistrySourcePath(name: string): string | null {
  return examples[name]?.path ?? null
}
