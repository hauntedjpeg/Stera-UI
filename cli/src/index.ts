#!/usr/bin/env node

import { Command } from "commander"
import { add } from "./commands/add.js"
import { init } from "./commands/init.js"
import { list } from "./commands/list.js"

const program = new Command()

program
  .name("stera-ui")
  .description("Add Stera UI components to your project.")
  .version("0.1.0")

program
  .command("init")
  .description("Initialize Stera UI in your project.")
  .option("-c, --cwd <path>", "Working directory", process.cwd())
  .option("-y, --yes", "Skip confirmation prompts")
  .action(async (options) => {
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
    await add(components, options)
  })

program
  .command("list")
  .description("List all available components.")
  .action(() => {
    list()
  })

program.parse()
