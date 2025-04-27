import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
} from "../Controllers/userController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", verifyToken, getProfile); // Secure profile route

export default router;
