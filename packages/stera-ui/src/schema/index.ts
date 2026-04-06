import { z } from "zod"

export const registryItemTypeSchema = z.enum([
  "registry:ui",
  "registry:component",
  "registry:hook",
  "registry:lib",
  "registry:style",
])

export type RegistryItemType = z.infer<typeof registryItemTypeSchema>

export const registryItemFileSchema = z.object({
  path: z.string(),
  type: registryItemTypeSchema,
  content: z.string().optional(),
  target: z.string().optional(),
})

export type RegistryItemFile = z.infer<typeof registryItemFileSchema>

export const registryItemSchema = z.object({
  name: z.string(),
  type: registryItemTypeSchema,
  dependencies: z.array(z.string()).optional(),
  registryDependencies: z.array(z.string()).optional(),
  files: z.array(registryItemFileSchema),
})

export type RegistryItem = z.infer<typeof registryItemSchema>

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
})

export type SteraConfig = z.infer<typeof configSchema>
