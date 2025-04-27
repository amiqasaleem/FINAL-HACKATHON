// src/Routes/taskRoutes.js
import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import {
  createTask,
  getTasks,
  updateTaskStatus,
  deleteTask,
} from "../Controllers/taskController.js"; // Import task controller

const router = express.Router();

// Create a task
router.post("/", verifyToken, createTask);

// Get tasks for the logged-in user
router.get("/", verifyToken, getTasks);

// Update task status
router.put("/:id", verifyToken, updateTaskStatus);

// Delete a task
router.delete("/:id", verifyToken, deleteTask);

export default router;
