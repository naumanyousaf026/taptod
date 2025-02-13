import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Login from "./component/Login.jsx";
import Register from "./component/Register.jsx";
import Home from "./component/index/Home.jsx";
import Invite from "./component/invite/Invite.jsx";
import Activity from "./component/activity/Activity.jsx";
import Profile from "./component/me/profile.jsx";
import Test from "./component/Test.jsx";
import WithdrawalForm from "./component/index/WithdrawalForm.jsx";
import State from "./component/state/state.jsx";
import Revenue from "./component/me/Revenue.jsx";
import Initiate from "./component/me/Initiate.jsx";
import ModifyPassword from "./component/me/ModifyPassword.jsx";
import WithdrawalRecord from "./component/me/WithdrawalRecord.jsx";
import AdminLogin from "./Admin/AdminLogin.jsx";
import SuccessMessage from "./Admin/SuccessMessage.jsx";
import Admin from "./Admin/Admin.jsx";
import { AuthProvider } from './context/AuthContext.jsx';
import ProtectedRoute from "./Admin/ProtectedRoute.jsx";

// Function to check if user is authenticated and has correct role
const isAuthorized = (allowedRoles = ['user', 'admin']) => {
  const token = localStorage.getItem('authToken');
  const role = localStorage.getItem('role');
  return token && allowedRoles.includes(role);
};

// Router with protected routes and role-based access
const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/successmessage",
    element: <SuccessMessage />,
  },
  // Admin routes
  {
    path: "/admin",
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <Admin />
      </ProtectedRoute>
    ),
  },
  // User routes (accessible by both users and admins)
  {
    path: "/home",
    element: (
      <ProtectedRoute allowedRoles={['user', 'admin']}>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/invite",
    element: (
      <ProtectedRoute allowedRoles={['user', 'admin']}>
        <Invite />
      </ProtectedRoute>
    ),
  },
  {
    path: "/activity",
    element: (
      <ProtectedRoute allowedRoles={['user', 'admin']}>
        <Activity />
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute allowedRoles={['user', 'admin']}>
        <Profile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/test",
    element: (
      <ProtectedRoute allowedRoles={['user', 'admin']}>
        <Test />
      </ProtectedRoute>
    ),
  },
  {
    path: "/state",
    element: (
      <ProtectedRoute allowedRoles={['user', 'admin']}>
        <State />
      </ProtectedRoute>
    ),
  },
  {
    path: "/withdraw",
    element: (
      <ProtectedRoute allowedRoles={['user', 'admin']}>
        <WithdrawalForm />
      </ProtectedRoute>
    ),
  },
  {
    path: "/revenue",
    element: (
      <ProtectedRoute allowedRoles={['user', 'admin']}>
        <Revenue />
      </ProtectedRoute>
    ),
  },
  {
    path: "/initiate",
    element: (
      <ProtectedRoute allowedRoles={['user', 'admin']}>
        <Initiate />
      </ProtectedRoute>
    ),
  },
  {
    path: "/modifyPassword",
    element: (
      <ProtectedRoute allowedRoles={['user', 'admin']}>
        <ModifyPassword />
      </ProtectedRoute>
    ),
  },
  {
    path: "/withdrawalRecord",
    element: (
      <ProtectedRoute allowedRoles={['user', 'admin']}>
        <WithdrawalRecord />
      </ProtectedRoute>
    ),
  },
  // Catch-all route for undefined paths
  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
]);

// Root render with AuthProvider
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);

export default router;