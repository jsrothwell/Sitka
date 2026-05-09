#!/usr/bin/env node
import { program } from "commander";
import { add } from "../src/add.js";

program
  .name("sitka")
  .description("Sitka Design System CLI")
  .version("0.1.0");

program
  .command("add <component>")
  .description("Add a Sitka component to your project")
  .option("-d, --dir <path>", "destination directory", "src/components/ui")
  .option("--ts", "output TypeScript (default)", true)
  .action((component, options) => add(component, options));

program.parse();
