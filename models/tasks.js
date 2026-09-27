import mongoose from "mongoose";
import { nanoid } from "nanoid";

const tasksSchema = new mongoose.Schema(
  {
    _id: { type: String, default: () => nanoid(6) },
    description: { type: String, required: true, trim: true },
    status: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

const tasks = mongoose.model("Tasks", tasksSchema);

export default tasks;
