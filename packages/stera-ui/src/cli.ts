import { createRequire } from "node:module"
import { Command } from "commander"
import { CROSS } from "./utils/format.js"

// Resolves to packages/stera-ui/package.json both from src/ and dist/.
const pkg = createRequire(import.meta.url)("../package.json") as {
  version: string
}

const program = new Command()

program
  .name("stera-ui")
  .description("Add Stera UI components to your project.")
  .version(pkg.version)

// Commands are loaded lazily so heavy imports (ts-morph via init's font
// tooling) don't slow down every invocation.
program
  .command("init")
  .description("Initialize Stera UI in your project.")
  .option("-c, --cwd <path>", "Working directory", process.cwd())
  .option("-y, --yes", "Skip confirmation prompts")
  .action(async (options) => {
    const { init } = await import("./commands/init.js")
    await init(options)
  })

program
  .command("add")
  .description("Add components to your project.")
  .argument("<components...>", "Components to add")
  .option("-c, --cwd <path>", "Working directory", process.cwd())
  .option("-y, --yes", "Skip confirmation prompts")
  .option("-o, --overwrite", "Overwrite existing files without prompting")
  .action(async (components, options) => {
    const { add } = await import("./commands/add.js")
    await add(components, options)
  })

program
  .command("list")
  .description("List all available components.")
  .action(async () => {
    const { list } = await import("./commands/list.js")
    await list()
  })

program.parseAsync().catch((error: unknown) => {
  // Ctrl-C during an interactive prompt — exit quietly.
  if (error instanceof Error && error.name === "ExitPromptError") {
    process.exit(130)
  }
  const message = error instanceof Error ? error.message : String(error)
  console.error(`\n  ${CROSS}  ${message}\n`)
  process.exit(1)
})
