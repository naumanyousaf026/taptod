import React from "react";
import { useNavigate } from "react-router-dom";
// In Earnings.jsx
import { useAuth } from "../../context/AuthContext";  // Use ../../ to go up two levels
import { FaMoneyCheckAlt, FaWallet, FaClipboardList, FaFileInvoiceDollar, FaLock, FaSignOutAlt } from "react-icons/fa";

const Dashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth(); // Get logout function from auth context

  // Handle logout
  const handleLogout = () => {
    try {
      // Call the logout function from auth context
      logout();
      // Navigate to login page
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
 
  return (
    <div className="px-5 py-3 mb-14 mx-2 shadow-2xl">
      {/* Earnings Section (Moved to top) */}
      <div className="bg-white rounded-lg p-5 mb-8">
        <div className="flex justify-between items-center pb-4 mb-4">
          <h2 className="text-lg font-semibold roboto-slab text-green-700">Today</h2>
          <h2 className="text-lg font-semibold roboto-slab text-gray-700">Total</h2>
        </div>
        <div className="grid grid-cols-2 gap-6">
          {[ 
            { title: "WhatsApp", value: "0.0000" },
            { title: "Total Earnings", value: "0.0000" },
            { title: "Activity Income", value: "0.0000" },
            { title: "Other", value: "0.0000" },
          ].map((item, index) => (
            <div
              key={index}
              className="p-2 rounded shadow-inner border border-gray-200 flex flex-col items-start"
            >
              <p className="text-sm font-semibold sans text-[#008069]">{item.title}</p>
              <p className="text-2xl roboto-slab text-gray-600">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Actions Section (Moved to bottom) */}
      <div className="grid grid-cols-3 text-center gap-4">
        {[ 
          { label: "Initiate Withdrawal", icon: <FaMoneyCheckAlt />, path: "/initiate" },
          { label: "Receiving Account", icon: <FaWallet />, path: "/withdraw" },
          { label: "Revenue Record", icon: <FaClipboardList />, path: "/revenue" },
          { label: "Withdrawal Record", icon: <FaFileInvoiceDollar />, path: "/withdrawalRecord" },
          { label: "Modify Password", icon: <FaLock />, path: "/modifyPassword", fullWidth: true },
          { label: "Logout", icon: <FaSignOutAlt />, onClick: handleLogout, fullWidth: true }
        ].map((action, index) => (
          <div
            key={index}
            onClick={action.onClick ? action.onClick : () => navigate(action.path)}
            className={`cursor-pointer ${action.fullWidth ? "" : ""} shadow-sm text-gray-600 sans rounded-xl py-3 flex flex-col items-center justify-center text-center`}
          > 
            <div className="text-xl mb-2" style={{ color: '#008069' }}>
              {action.icon}
            </div>
            <span className="font-semibold">{action.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;