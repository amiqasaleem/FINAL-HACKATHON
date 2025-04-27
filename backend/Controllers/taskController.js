// src/Controllers/taskController.js
import Task from "../Models/task.js";

const createTask = async (req, res) => {
    try {
      const { title, description, assignedTo, status } = req.body;
  
      const task = new Task({
        title,
        description,
        assignedTo,
        status,
        owner: req.user._id, // Ensure this is correct
      });
  
      await task.save();
      res.status(201).json(task);
    } catch (err) {
      console.error("Task Creation Error:", err.message);
      res.status(500).json({ message: "Server error" });
    }
  };
  

// Get tasks for the logged-in user
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ owner: req.user._id }); // Fetch tasks only belonging to the user
    res.status(200).json(tasks);
  } catch (err) {
    console.error("Get Tasks Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Update task status
const updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body; // No need to include taskId in body, it's in the URL
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id }, // Ensure task belongs to the logged-in user
      { status },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found or unauthorized" });
    }

    res.status(200).json(task);
  } catch (err) {
    console.error("Update Task Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id, // Ensure task belongs to the logged-in user
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found or unauthorized" });
    }

    res.status(200).json({ message: "Task deleted" });
  } catch (err) {
    console.error("Delete Task Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

export { createTask, getTasks, updateTaskStatus, deleteTask };
