import {
  StrictMode,
  useContext,
  createContext,
  useState,
  useEffect,
} from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Login from "./component/Login.jsx";
import Dashboard from "./component/dashboard.jsx";
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

// Authentication Context
const AuthContext = createContext();

// Custom hook for accessing auth state
const useAuth = () => useContext(AuthContext);

// AuthProvider component
const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Rehydrate authentication state on initial load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = () => setIsAuthenticated(true);
  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ProtectedRoute component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// Router with protected routes
const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ), // Redirect or Main Layout
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/invite",
    element: (
      <ProtectedRoute>
        <Invite />
      </ProtectedRoute>
    ),
  },
  {
    path: "/activity",
    element: (
      <ProtectedRoute>
        <Activity />
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/test",
    element: (
      <ProtectedRoute>
        <Test />
      </ProtectedRoute>
    ),
  },
  {
    path: "/state",
    element: (
      <ProtectedRoute>
        <State />
      </ProtectedRoute>
    ),
  },
  {
    path: "/withdraw",
    element: (
      <ProtectedRoute>
        <WithdrawalForm />
      </ProtectedRoute>
    ),
  },
  {
    path: "/revenue",
    element: (
      <ProtectedRoute>
        <Revenue />
      </ProtectedRoute>
    ),
  },
  {
    path: "/initiate",
    element: (
      <ProtectedRoute>
        <Initiate />
      </ProtectedRoute>
    ),
  },
  {
    path: "/modifyPassword",
    element: (
      <ProtectedRoute>
        <ModifyPassword />
      </ProtectedRoute>
    ),
  },
  {
    path: "withdrawalRecord",
    element: (
      <ProtectedRoute>
        <WithdrawalRecord />
      </ProtectedRoute>
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
