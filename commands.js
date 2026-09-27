#!/usr/bin/env node
import { Command } from "commander";
import { input, select } from "@inquirer/prompts";
import {
  addTask,
  listAllTasks,
  listUntouchedTasks,
  listFinishedTasks,
  listWipTasks,
  removeTask,
  updateTask,
  findById,
} from "./index.js";

const program = new Command();

program
  .name("tasks-cli")
  .version("1.0.0")
  .description("Simple Task Manager For Everyday Work")
  .action(async () => {
    await listAllTasks();
    process.exit();
  });

program
  .command("add")
  .description("add a new task")
  .alias("a")
  .action(async () => {
    const description = await input({ message: "Describe the task: " });
    if (description === "" || description === null) {
      console.info(`Description can't be blank`);
      process.exit(1);
    }
    const status = await select({
      message: "Task Status: ",
      default: "ns",
      choices: [
        {
          name: "not started",
          value: "ns",
          description: "mark as not started",
        },
        {
          name: "work in progress",
          value: "wip",
          description: "mark as work in progress",
        },
        {
          name: "completed",
          value: "done",
          description: "mark as finished ",
        },
      ],
    });

    const newTask = {
      description,
      status,
    };
    await addTask(newTask);
    process.exit();
  });

program
  .command("list-ns")
  .description(`list projects you haven't started yet`)
  .alias("ns")
  .action(async () => {
    await listUntouchedTasks();
    process.exit();
  });

program
  .command("list-wip")
  .description(`list projects you are currently working on`)
  .alias("wip")
  .action(async () => {
    await listWipTasks();
    process.exit();
  });

program
  .command("list-done")
  .description(`list projects you are currently working on`)
  .alias("d")
  .action(async () => {
    await listFinishedTasks();
    process.exit();
  });

program
  .command("remove")
  .description(`remove a task`)
  .alias("r")
  .action(async () => {
    const id = await input({ message: "Task id:" });
    if (id === "" || id === null) {
      console.info(`ID can't be blank`);
      process.exit(1);
    }
    await removeTask(id);
    process.exit();
  });

program
  .command("update")
  .description("update a task")
  .alias("u")
  .action(async () => {
    const id = await input({ message: "Task id:" });
    if (id === "" || id === null) {
      console.info(`ID can't be blank`);
      process.exit(1);
    }
    const { description, status } = await findById(id);
    const task = {
      description:
        (await input({ message: "New Description: " })) || description,
      status:
        (await select({
          message: "Task Status: ",
          default: "ns",
          choices: [
            {
              name: "not started",
              value: "ns",
              description: "mark as not started",
            },
            {
              name: "work in progress",
              value: "wip",
              description: "mark as work in progress",
            },
            {
              name: "completed",
              value: "done",
              description: "mark as finished ",
            },
          ],
        })) || status,
    };
    await updateTask(id, task);
    process.exit;
  });

program.parse(process.argv);
