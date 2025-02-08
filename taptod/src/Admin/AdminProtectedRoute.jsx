import React, { useContext } from "react";
import { Navigate } from "react-router-dom"; // Import Navigate here
import { useAuth } from "../context/AuthProvider"; // Correct import of useAuth

const AdminProtectedRoute = ({ children }) => {
  const { isAuthenticated, userRole } = useAuth();

  // Check if authenticated and role is admin
  if (!isAuthenticated || userRole !== "admin") {
    return <Navigate to="/admin/login" replace />;
  }

  return children; // Render children if the user is authenticated and has the correct role
};

export default AdminProtectedRoute;
