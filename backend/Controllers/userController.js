import UserModel from "../Models/user.js";
import jwt from "jsonwebtoken";

// Helper to generate JWT
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// @route POST /api/users/register
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = await UserModel.create({ username, email, password });

    res.status(201).json({
      token: generateToken(newUser._id),
      user: {
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Register Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// @route POST /api/users/login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    res.status(200).json({
      token: generateToken(user._id),
      user: {
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// @route GET /api/users/profile
const getProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      username: req.user.username,
      email: req.user.email,
    });
  } catch (error) {
    console.error("Profile Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

export { registerUser, loginUser, getProfile };
