import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider"; // Correct import
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
import EmailRequest from "./Admin/EmailRequest.jsx";
import VerifyOTP from "./Admin/VerifyOTP.jsx";
import ResetPassword from "./Admin/ResetPassword.jsx";
import Admin from "./Admin/Admin.jsx";
import AdminLogin from "./Admin/Login";
import SuccessMessage from "./Admin/SuccessMessage.jsx";
import AdminProtectedRoute from "./Admin/AdminProtectedRoute.jsx";

// Router Configuration
const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
  { path: "/home", element: <Home /> },
  { path: "/invite", element: <Invite /> },
  { path: "/activity", element: <Activity /> },
  { path: "/profile", element: <Profile /> },
  { path: "/test", element: <Test /> },
  { path: "/withdraw", element: <WithdrawalForm /> },
  { path: "/revenue", element: <Revenue /> },
  { path: "/initiate", element: <Initiate /> },
  { path: "/modifyPassword", element: <ModifyPassword /> },
  { path: "/withdrawalRecord", element: <WithdrawalRecord /> },

  // Admin Routes
  { path: "/admin/login", element: <AdminLogin /> },
  { path: "/admin", element: <AdminProtectedRoute><Admin /></AdminProtectedRoute> },
]);

// Render Application
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider> {/* Wrapping AuthProvider here */}
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
