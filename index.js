import mongoose from "mongoose";
import Tasks from "./models/tasks.js";
import connectDB from "./config/connectDB.js";

await connectDB();

export const listAllTasks = async () => {
  try {
    const tasks = await Tasks.find().sort({ status: -1 }).lean();
    if (tasks.length) {
      console.info(`${tasks.length} total tasks`);
      console.table(tasks, ["_id", "description", "status"]);
    } else {
      console.info(`No tasks yet. Add some tasks to get started.`);
    }
    mongoose.disconnect();
  } catch (error) {
    console.error(error);
  }
};

export const listFinishedTasks = async () => {
  try {
    const tasks = await Tasks.find({ status: "done" })
      .sort({ status: -1 })
      .lean();
    if (tasks.length) {
      console.info(`${tasks.length} total tasks`);
      console.table(tasks, ["_id", "description", "status"]);
    } else {
      console.info(
        `No completed tasks yet. Mark some tasks as completed to show them here.`,
      );
    }
    mongoose.disconnect();
  } catch (error) {
    console.error(error);
  }
};

export const listUntouchedTasks = async () => {
  try {
    const tasks = await Tasks.find({ status: "ns" })
      .sort({ status: -1 })
      .lean();
    if (tasks.length) {
      console.info(`${tasks.length} total tasks`);
      console.table(tasks, ["_id", "description", "status"]);
    } else {
      console.info(
        `No unfinished tasks yet. Mark some tasks as unfinished to show them here.`,
      );
    }
    mongoose.disconnect();
  } catch (error) {
    console.error(error);
  }
};

export const listWipTasks = async () => {
  try {
    const tasks = await Tasks.find({ status: "wip" })
      .sort({ status: -1 })
      .lean();
    if (tasks.length) {
      console.info(`${tasks.length} total tasks`);
      console.table(tasks, ["_id", "description", "status"]);
    } else {
      console.info(
        `No work-in-progrss tasks yet. Mark some tasks as work-in-progress to show them here.`,
      );
    }
    mongoose.disconnect();
  } catch (error) {
    console.error(error);
  }
};

export const addTask = async (newTask) => {
  try {
    await Tasks.create(newTask);
    console.info(`task created`);
    mongoose.disconnect();
  } catch (error) {
    console.error(error);
  }
};

export const removeTask = async (id) => {
  try {
    const task = await Tasks.findOne({ _id: id });
    if (!task) {
      console.info(`The task with id ${id} was not found`);
    } else {
      await Tasks.deleteOne({ _id: id });
      console.info(`The task with id ${id} has been deleted`);
    }
    mongoose.disconnect();
  } catch (error) {
    console.error(error);
  }
};

export const updateTask = async (id, task) => {
  try {
    const oldTask = await Tasks.findOne({ _id: id });
    if (!oldTask) {
      console.info(`The task with id ${id} was not found`);
    } else {
      await Tasks.updateOne({ _id: id }, task);
      console.info(`task updated`);
    }
    mongoose.disconnect();
  } catch (error) {
    console.error(error);
  }
};

export const findById = async (id) => {
  try {
    const task = await Tasks.findOne({ _id: id });
    return task;
  } catch (error) {
    console.error(error);
  }
};
