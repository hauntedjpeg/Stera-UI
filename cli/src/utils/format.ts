// #A6F430 → RGB(166, 244, 48)
const BRAND = "\x1b[38;2;166;244;48m"
const DIM = "\x1b[2m"
const RESET = "\x1b[0m"

const enabled = process.stdout.isTTY && !process.env.NO_COLOR

const wrap = (code: string, text: string) =>
  enabled ? `${code}${text}${RESET}` : text

export const brand = (text: string) => wrap(BRAND, text)
export const dim = (text: string) => wrap(DIM, text)

export const LOGO = brand("✻")
export const CHECK = brand("✓")
export const CROSS = "✗"
export const WARN = "!"
