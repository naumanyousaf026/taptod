import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // Import useNavigate hook
import shahzad from "../../images/shahzad.jpeg";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/auth/current-user",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(response.data); // Set the user data in state
      } catch (error) {
        console.error(
          "Error fetching user data:",
          error.response?.data || error.message
        );
      }
    };

    fetchUserData();
  }, []);

  if (!user) return <div>Loading...</div>; // Show loading state while data is being fetched

  const handleWithdrawClick = () => {
    navigate("/withdraw");  // Navigate to /withdraw page when button is clicked
  };

  return (
    <div className="max-w-sm mx-auto bg-white border-t-2 border-white shadow">
      {/* Header Section */}
      <div className="bg-[#008069] text-white p-6">
        <div className="flex items-center space-x-6">
          <div className="relative">
            <img
              src={shahzad} // Placeholder image
              alt="User"
              className="w-16 h-16 rounded-full border-4 border-white shadow-lg"
            />
          </div>
          <div>
            <p className="text-xl roboto-slab font-semibold">
              {user.phone || "N/A"}
            </p>
            <p className="text-sm roboto-slab font-medium text-gray-300">
              ID: {user.userId || "N/A"}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4">
        {/* Account Balance */}
        <div className="text-center space-y-2 bg-[#e0f7e9] rounded shadow-[-8px_8px_0_#008069] py-5">
          <p className="text-lg font-semibold text-[#008069]">
            Account Balance 
          </p>
          <p className="text-3xl font-bold roboto-slab text-green-400">
            Rs {user.Rewards || "0.0000"}
          </p>
          <button 
            onClick={handleWithdrawClick} // Call handleWithdrawClick on button click
            className="w-[85%] font-bold py-2 mt-4 bg-[#008069] text-[#fff] rounded-lg"
          >
            Withdraw
          </button>
        </div>

        {/* Withdraw Information */}
        <div className="grid grid-cols-2 my-3 gap-6 text-center">
          <div className="space-y-1">
            <p className="text-[#008069] font-semibold text-lg">0.0000</p>
            <p className="text-sm text-gray-600">Withdrawal Review</p>
          </div>
          <div className="space-y-1">
            <p className="text-[#008069] font-semibold text-lg">0.0000</p>
            <p className="text-sm text-gray-600">Withdrawal Success</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
