import { z } from "zod"

export const registryItemTypeSchema = z.enum([
  "registry:ui",
  "registry:component",
  "registry:hook",
  "registry:lib",
  "registry:style",
  "registry:font",
])

export type RegistryItemType = z.infer<typeof registryItemTypeSchema>

export const registryItemFileSchema = z.object({
  path: z.string(),
  type: registryItemTypeSchema,
  content: z.string().optional(),
  target: z.string().optional(),
})

export type RegistryItemFile = z.infer<typeof registryItemFileSchema>

// Font metadata schema for registry:font items.
export const registryItemFontSchema = z.object({
  family: z.string(),
  provider: z.literal("google"),
  import: z.string(),
  variable: z.string(),
  weight: z.array(z.string()).optional(),
  subsets: z.array(z.string()).optional(),
  selector: z.string().optional(),
  dependency: z.string().optional(),
})

export type RegistryItemFont = z.infer<typeof registryItemFontSchema>

// Common fields shared by all registry items.
const registryItemCommonSchema = z.object({
  name: z.string(),
  dependencies: z.array(z.string()).optional(),
  registryDependencies: z.array(z.string()).optional(),
  files: z.array(registryItemFileSchema).optional(),
})

// registry:font items have a font field, all other types do not.
export const registryItemSchema = z.discriminatedUnion("type", [
  registryItemCommonSchema.extend({
    type: z.literal("registry:font"),
    font: registryItemFontSchema,
    files: z.array(registryItemFileSchema).optional(),
  }),
  registryItemCommonSchema.extend({
    type: registryItemTypeSchema.exclude(["registry:font"]),
    files: z.array(registryItemFileSchema),
  }),
])

export type RegistryItem = z.infer<typeof registryItemSchema>

// Helper type for registry:font items specifically.
export type RegistryFontItem = Extract<RegistryItem, { type: "registry:font" }>

export const registryIndexSchema = z.object({
  name: z.string(),
  items: z.array(registryItemSchema),
})

export type RegistryIndex = z.infer<typeof registryIndexSchema>

export const configSchema = z.object({
  $schema: z.string().optional(),
  version: z.literal(1),
  css: z.string(),
  aliases: z.object({
    components: z.string(),
    utils: z.string(),
    ui: z.string(),
    lib: z.string(),
    hooks: z.string(),
  }),
  fonts: z
    .object({
      strategy: z.enum(["stera-default", "keep-existing", "skip"]),
      nextFont: z.boolean().optional(),
    })
    .optional(),
})

export type SteraConfig = z.infer<typeof configSchema>
