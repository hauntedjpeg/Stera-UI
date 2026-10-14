import { brand, CHECK, CROSS } from "./format.js"

const FRAMES = ["•", "✦", "✶", "✻"].map(brand)
const INTERVAL_MS = 150

const HIDE_CURSOR = "\x1b[?25l"
const SHOW_CURSOR = "\x1b[?25h"
const ERASE_LINE = "\x1b[2K\r"

/**
 * A single-line status indicator. The animation is progress, not output, so
 * it goes to stderr — result lines from `succeed` stay on stdout.
 */
export function createSpinner(text: string) {
  const out = process.stderr

  if (!out.isTTY || process.env.CI) {
    out.write(`${text}...\n`)
    return {
      update(_text: string) {},
      stop() {},
      succeed(msg: string) {
        process.stdout.write(`${CHECK} ${msg}\n`)
      },
      fail(msg: string) {
        process.stderr.write(`${CROSS} ${msg}\n`)
      },
    }
  }

  let frameIndex = 0
  let active = true

  const render = () => {
    // Truncate to one row — a wrapped line can't be erased with ERASE_LINE.
    const label = text.slice(0, Math.max(0, (out.columns || 80) - 3))
    out.write(`${ERASE_LINE}${FRAMES[frameIndex % FRAMES.length]} ${label}`)
    frameIndex++
  }

  const restoreCursor = () => out.write(SHOW_CURSOR)
  const onSigint = () => {
    out.write(ERASE_LINE)
    restoreCursor()
    process.exit(130)
  }

  out.write(HIDE_CURSOR)
  process.once("exit", restoreCursor)
  process.once("SIGINT", onSigint)
  render()
  const interval = setInterval(render, INTERVAL_MS)

  const stop = () => {
    if (!active) return
    active = false
    clearInterval(interval)
    process.off("exit", restoreCursor)
    process.off("SIGINT", onSigint)
    out.write(ERASE_LINE)
    restoreCursor()
  }

  return {
    /** Swap the label while the spinner keeps running. */
    update(next: string) {
      text = next
    },
    /** Clear the line without printing a result. */
    stop,
    succeed(msg: string) {
      stop()
      process.stdout.write(`${CHECK} ${msg}\n`)
    },
    fail(msg: string) {
      stop()
      process.stderr.write(`${CROSS} ${msg}\n`)
    },
  }
}
