// src/components/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  // Check if there's a valid token in localStorage (or use a global state)
  const token = localStorage.getItem("token");

  // If no token, redirect to login page
  if (!token) {
    return <Navigate to="/login" />;
  }

  // If token exists, render the children (i.e., protected component)
  return children;
};

export default PrivateRoute;
