import jwt from "jsonwebtoken";
import UserModel from "../Models/user.js";

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1]; 

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await UserModel.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user; 
    next(); 
  } catch (err) {
    console.error("Token verification error:", err.message);
    res.status(401).json({ message: "Invalid token" });
  }
};

export { verifyToken };
