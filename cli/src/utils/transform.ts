import type { SteraConfig } from "./resolve-config.js"

export interface TransformContext {
  config: SteraConfig
  filename: string
}

export type TransformFn = (content: string, ctx: TransformContext) => string

/**
 * Apply a sequence of transforms to file content.
 */
export function applyTransforms(
  content: string,
  ctx: TransformContext,
  transforms: TransformFn[]
): string {
  return transforms.reduce((acc, fn) => fn(acc, ctx), content)
}
