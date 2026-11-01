import type {
  SerializedCollection,
  SerializedTextStyle,
} from "../../shared/messages.js"

/**
 * Primitive ramps are mode-less: each family carries a `Light` and a `Dark`
 * subgroup instead of the collection switching modes. `Black`/`White` are alpha
 * ramps with no subgroup, which is why they appear here unqualified.
 */
export const basePrimitives: SerializedCollection = {
  id: "col-base-color",
  name: "Color",
  modes: [{ id: "value", name: "Value" }],
  variables: [
    {
      id: "v-neutral-light-1",
      name: "Neutral/Light/1",
      type: "COLOR",
      valuesByMode: {
        value: { kind: "color", r: 0.99, g: 0.99, b: 0.99, a: 1 },
      },
    },
    {
      id: "v-neutral-light-12",
      name: "Neutral/Light/12",
      type: "COLOR",
      valuesByMode: {
        value: { kind: "color", r: 0.13, g: 0.13, b: 0.13, a: 1 },
      },
    },
    {
      id: "v-neutral-dark-1",
      name: "Neutral/Dark/1",
      type: "COLOR",
      valuesByMode: { value: { kind: "color", r: 0.0, g: 0.0, b: 0.0, a: 1 } },
    },
    {
      id: "v-neutral-dark-12",
      name: "Neutral/Dark/12",
      type: "COLOR",
      valuesByMode: {
        value: { kind: "color", r: 0.93, g: 0.93, b: 0.93, a: 1 },
      },
    },
    {
      id: "v-brand-light-9",
      name: "Brand/Light/9",
      type: "COLOR",
      valuesByMode: { value: { kind: "color", r: 0.2, g: 0.3, b: 0.9, a: 1 } },
    },
    {
      id: "v-brand-dark-3",
      name: "Brand/Dark/3",
      type: "COLOR",
      valuesByMode: {
        value: { kind: "color", r: 0.12, g: 0.12, b: 0.12, a: 1 },
      },
    },
    {
      id: "v-black-11",
      name: "Black/11",
      type: "COLOR",
      valuesByMode: { value: { kind: "color", r: 0, g: 0, b: 0, a: 0.88 } },
    },
    {
      id: "v-white-11",
      name: "White/11",
      type: "COLOR",
      valuesByMode: { value: { kind: "color", r: 1, g: 1, b: 1, a: 0.89 } },
    },
  ],
}

/**
 * The semantic layer is what switches modes. The four tokens here cover every
 * shape the exporter has to survive: a parallel pair, a pair pointing at
 * different steps, a pair pointing at different ramps entirely, and one that is
 * deliberately mode-invariant.
 */
export const themeSemantic: SerializedCollection = {
  id: "col-theme-color",
  name: "Theme",
  modes: [
    { id: "light", name: "Light" },
    { id: "dark", name: "Dark" },
  ],
  variables: [
    {
      id: "v-surface",
      name: "Surface/-",
      type: "COLOR",
      valuesByMode: {
        light: { kind: "alias", targetId: "v-neutral-light-1" },
        dark: { kind: "alias", targetId: "v-neutral-dark-1" },
      },
    },
    {
      id: "v-surface-brand",
      name: "Surface/Brand/-",
      type: "COLOR",
      valuesByMode: {
        // Different step per mode — the case that rules out redeclaring ramps
        // under `.dark` and leaving the semantic layer mode-less.
        light: { kind: "alias", targetId: "v-brand-light-9" },
        dark: { kind: "alias", targetId: "v-brand-dark-3" },
      },
    },
    {
      id: "v-text",
      name: "Text/-",
      type: "COLOR",
      valuesByMode: {
        light: { kind: "alias", targetId: "v-black-11" },
        dark: { kind: "alias", targetId: "v-white-11" },
      },
    },
    {
      id: "v-text-onbrand",
      name: "Text/Onbrand/-",
      type: "COLOR",
      valuesByMode: {
        // Same primitive in both modes: text on a brand surface stays light.
        light: { kind: "alias", targetId: "v-neutral-light-1" },
        dark: { kind: "alias", targetId: "v-neutral-light-1" },
      },
    },
  ],
}

export const baseTypography: SerializedCollection = {
  id: "col-base-typo",
  name: "Typography",
  modes: [{ id: "default", name: "Default" }],
  variables: [
    {
      id: "v-font-sans",
      name: "Font/Sans",
      type: "STRING",
      valuesByMode: { default: { kind: "string", value: "'Geist'" } },
    },
    {
      id: "v-size-body-sm",
      name: "Size/Body-SM",
      type: "FLOAT",
      valuesByMode: { default: { kind: "number", value: 12 } },
    },
    {
      id: "v-lh-snug",
      name: "Line Height/Snug",
      type: "FLOAT",
      valuesByMode: { default: { kind: "number", value: 16 } },
    },
    {
      id: "v-lh-28",
      name: "Line Height/28",
      type: "FLOAT",
      valuesByMode: { default: { kind: "number", value: 28 } },
    },
    {
      id: "v-weight-regular",
      name: "Weight/Regular",
      type: "FLOAT",
      valuesByMode: { default: { kind: "number", value: 400 } },
    },
    {
      id: "v-weight-medium",
      name: "Weight/Medium",
      type: "FLOAT",
      valuesByMode: { default: { kind: "number", value: 500 } },
    },
    {
      id: "v-weight-strong",
      name: "Weight/Strong",
      type: "FLOAT",
      valuesByMode: { default: { kind: "number", value: 500 } },
    },
    {
      id: "v-ls-tight",
      name: "Letter Spacing/Tight",
      type: "FLOAT",
      valuesByMode: { default: { kind: "number", value: -0.4 } },
    },
  ],
}

export const referenceDimension: SerializedCollection = {
  id: "col-ref-dim",
  name: "Reference",
  modes: [{ id: "default", name: "Default" }],
  variables: [
    {
      id: "v-spacing-4",
      name: "Spacing/4",
      type: "FLOAT",
      valuesByMode: { default: { kind: "number", value: 4 } },
    },
    {
      id: "v-radii-md",
      name: "Radii/MD",
      type: "FLOAT",
      valuesByMode: { default: { kind: "number", value: 6 } },
    },
    {
      id: "v-radii-10",
      name: "Radii/10",
      type: "FLOAT",
      valuesByMode: { default: { kind: "number", value: 10 } },
    },
    {
      id: "v-radii-full",
      name: "Radii/Full",
      type: "FLOAT",
      valuesByMode: { default: { kind: "number", value: 9999 } },
    },
  ],
}

/** A Figma-only collection: never exported, but exported tokens may alias into it. */
export const figmaOnlyLayout: SerializedCollection = {
  id: "col-layout",
  name: "Layout",
  modes: [
    { id: "layout-light", name: "Light" },
    { id: "layout-dark", name: "Dark" },
  ],
  variables: [
    {
      id: "v-layout-gutter",
      name: "Gutter",
      type: "FLOAT",
      valuesByMode: {
        "layout-light": { kind: "number", value: 24 },
        "layout-dark": { kind: "number", value: 24 },
      },
    },
    {
      id: "v-layout-annotation",
      name: "Annotation",
      type: "COLOR",
      valuesByMode: {
        "layout-light": { kind: "color", r: 1, g: 0, b: 0, a: 1 },
        "layout-dark": { kind: "color", r: 0, g: 0, b: 1, a: 1 },
      },
    },
    {
      id: "v-layout-proxy",
      name: "Proxy",
      type: "COLOR",
      valuesByMode: {
        "layout-light": { kind: "alias", targetId: "v-neutral-light-1" },
        "layout-dark": { kind: "alias", targetId: "v-neutral-dark-1" },
      },
    },
  ],
}

export const baseOptions = {
  strategy: "next-font" as const,
  unit: "rem" as const,
  fontAssignments: [],
}

export const headingSmStyle: SerializedTextStyle = {
  id: "S:1",
  name: "Heading/SM",
  fontFamily: "Geist",
  fontStyle: "Medium",
  fontSize: 20,
  lineHeight: { unit: "PIXELS", value: 28 },
  letterSpacing: { unit: "PIXELS", value: -0.4 },
  boundVariables: {
    fontFamily: "v-font-sans",
    fontSize: "v-size-body-sm",
    lineHeight: "v-lh-28",
    fontWeight: "v-weight-strong",
    letterSpacing: "v-ls-tight",
  },
}
