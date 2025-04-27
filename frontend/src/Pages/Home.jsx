import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { isLoggedIn, getToken } from "../utils/auth";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  // Redirecting the user to login if he's not logged in
  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/login"); 
    }
  }, []);

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    assignedTo: "",
    status: "To Do", 
  });
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get("https://final-hackathon-backend-fh9v.onrender.com/api/tasks", {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        setTasks(res.data);
      } catch (err) {
        console.error("Failed to fetch tasks:", err);
      }
    };
    fetchTasks();
  }, []);

  // Handle input change for new task
  const handleChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleAddTask = async () => {
    try {
      const taskData = {
        title: newTask.title,
        description: newTask.description,
        assignedTo: newTask.assignedTo,
        status: newTask.status,
      };

      const response = await fetch("https://final-hackathon-backend-fh9v.onrender.com/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(taskData),
      });

      const result = await response.json();
      if (response.ok) {
        setTasks((prevTasks) => [...prevTasks, result]);
        alert("Task created successfully!");
        setNewTask({ title: "", description: "", assignedTo: "", status: "To Do" }); // Clear input fields
      } else {
        alert(result.message || "Failed to create task");
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Task editing 
  const handleEditTask = (task) => {
    setEditingTask(task);
    setNewTask({
      title: task.title,
      description: task.description,
      assignedTo: task.assignedTo,
      status: task.status,
    });
  };

  // Task update
  const handleSaveEdit = (e) => {
    e.preventDefault();
    const updatedTasks = tasks.map((task) =>
      task._id === editingTask._id ? { ...task, ...newTask } : task
    );
    setTasks(updatedTasks);
    setNewTask({ title: "", description: "", assignedTo: "", status: "To Do" });
    setEditingTask(null);
  };

  // Task delete
  const handleDeleteTask = async (taskId) => {
    try {
      await fetch(`https://final-hackathon-backend-fh9v.onrender.com/api/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };
//RenderTakss
  const renderTasks = (status) =>
    tasks
      .filter((task) => task.status === status)
      .map((task) => (
        <div className="task-card" key={task._id}>
          <h4>{task.title}</h4>
          <p>{task.description}</p>
          <span>👤 {task.assignedTo}</span>
          <div className="task-buttons">
            {status !== "To Do" && (
              <button onClick={() => updateTaskStatus(task._id, "To Do")}>
                ⬅️ To Do
              </button>
            )}
            {status !== "In Progress" && (
              <button onClick={() => updateTaskStatus(task._id, "In Progress")}>
                🔄 In Progress
              </button>
            )}
            {status !== "Done" && (
              <button onClick={() => updateTaskStatus(task._id, "Done")}>
                ✅ Done
              </button>
            )}
            <div>
              <button onClick={() => handleEditTask(task)}>✏️ Edit</button>
              <button onClick={() => handleDeleteTask(task._id)}>❌ Delete</button>
            </div>
          </div>
        </div>
      ));
  

  // Update task status
  const updateTaskStatus = (taskId, newStatus) => {
    const updatedTasks = tasks.map((task) =>
      task._id === taskId ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="home-board">
      <h1 className="board-title">Welcome 👋</h1>
      <form className="add-task-form" onSubmit={editingTask ? handleSaveEdit : handleAddTask}>
        <input
          type="text"
          name="title"
          placeholder="Task Title"
          value={newTask.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={newTask.description}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="assignedTo"
          placeholder="Assigned To"
          value={newTask.assignedTo}
          onChange={handleChange}
          required
        />
        <button type="submit">{editingTask ? "Save Changes" : "Add Task"}</button>
      </form>

      <div className="columns">
        <div className="column">
          <h2>To Do</h2>
          {renderTasks("To Do")}
        </div>
        <div className="column">
          <h2>In Progress</h2>
          {renderTasks("In Progress")}
        </div>
        <div className="column">
          <h2>Done</h2>
          {renderTasks("Done")}
        </div>
      </div>
    </div>
  );
}

export default Home;
