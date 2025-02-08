import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthProvider"; // ✅ Import AuthProvider

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>  {/* ✅ Wrap the entire app */}
    <App />
  </AuthProvider>
);
