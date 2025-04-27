// src/Models/task.js
import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    assignedTo: { type: String, required: true },
    status: { type: String, enum: ["To Do", "In Progress", "Done"], default: "To Do" },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the user
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
