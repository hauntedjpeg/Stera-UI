import { brand, CHECK, CROSS } from "./format.js"

const FRAMES = ["•", "✦", "✶", "✻"].map(brand)
const INTERVAL_MS = 150

export function createSpinner(text: string) {
  const isTTY = process.stdout.isTTY

  if (!isTTY) {
    process.stdout.write(`  ${text}...\n`)
    return {
      succeed(msg: string) {
        process.stdout.write(`  ${CHECK}  ${msg}\n`)
      },
      fail(msg: string) {
        process.stdout.write(`  ${CROSS}  ${msg}\n`)
      },
    }
  }

  let frameIndex = 0
  const interval = setInterval(() => {
    process.stdout.write(`\r  ${FRAMES[frameIndex % FRAMES.length]}  ${text}`)
    frameIndex++
  }, INTERVAL_MS)

  const clear = () => {
    clearInterval(interval)
    // +6 covers the "  X  " prefix
    process.stdout.write("\r" + " ".repeat(text.length + 6) + "\r")
  }

  return {
    succeed(msg: string) {
      clear()
      process.stdout.write(`  ${CHECK}  ${msg}\n`)
    },
    fail(msg: string) {
      clear()
      process.stdout.write(`  ${CROSS}  ${msg}\n`)
    },
  }
}
