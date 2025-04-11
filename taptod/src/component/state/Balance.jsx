// import React, { useEffect, useState } from "react";
// import axios from "axios";

// export default function LastConnectedUser() {
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [deleting, setDeleting] = useState(false);

//   useEffect(() => {
//     const fetchLastConnectedUser = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/last-connected", {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         });

//         setUserData(response.data);
//       } catch (err) {
//         setError(err.response?.data?.message || "Error fetching data.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLastConnectedUser();
//   }, []);

//   const handleDelete = async () => {
//     if (!userData?.uniqueId) {
//       alert("Required data is missing!");
//       return;
//     }
  
//     setDeleting(true);
  
//     try {
//       const response = await axios.delete(
//         "http://localhost:5000/api/delete-wa-account",
//         {
//           params: { unique: userData.uniqueId },
//           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
//         }
//       );
  
//       if (response.data.message === "Account deleted successfully") {
//         alert("Deleted successfully!");
//         // Refresh contact data
//         const updated = await axios.get("http://localhost:5000/api/last-connected", {
//           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
//         });
//         setUserData(updated.data);
//       }
//     } catch (error) {
//       alert(error.response?.data?.message || "Deletion failed");
//     } finally {
//       setDeleting(false);
//     }
//   };

  

//   if (loading) return <p className="text-center text-gray-500">Loading...</p>;
//   if (error) return <p className="text-center text-red-500">{error}</p>;

//   const randomProfileImage = `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`;

//   return (
//     <div>
//       <div className="mt-8 bg-[#008069] p-4 mx-3 rounded-lg shadow-xl text-center">
//         <h2 className="text-3xl font-semibold roboto-slab text-[#ffdd59]">Rs {userData.balance}</h2>
//         <p className="text-lg sm:text-xl sans text-gray-300 mt-2">Last Connected User</p>
//         <p className="text-sm sans text-gray-400 italic mt-1">Real-time updates</p>
//       </div>

//       <div className="mt-8 p-6 mx-3 rounded-lg shadow-md bg-white">
//         <div className="flex items-center">
//           <img
//             src={randomProfileImage}
//             alt="Profile"
//             className="w-20 h-20 rounded-full border-4 border-green-500 shadow-md"
//           />
//           <div className="ml-6">
//             <h3 className="text-xl sm:text-2xl roboto-slab font-semibold text-[#008069]">
//               WhatsApp ID: {userData.whatsappId}
//             </h3>
//             <p className="text-sm text-[#008069]">Status: {userData.status}</p>
//             <p className="text-sm sans text-green-400 font-medium">Always Online</p>
//           </div>
//         </div>

//         <div className="flex justify-between items-center mt-6">
//           <div>
//             <p className="text-sm roboto-slab text-[#008069]">Last Connected At</p>
//             <p className="text-2xl sm:text-3xl font-bold roboto-slab text-[#ffdd59]">
//               {new Date(userData.lastConnectedAt).toLocaleString()}
//             </p>
//           </div>

//           <button
//             onClick={handleDelete}
//             disabled={deleting}
//             className="px-4 py-2 mr-4 roboto-slab bg-gradient-to-r from-red-500 to-red-700 text-white font-bold rounded-lg shadow-md hover:scale-105 transition-transform disabled:opacity-50"
//           >
//             {deleting ? "Deleting..." : "Go Delete"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import { FaWhatsapp, FaRegMoneyBillAlt, FaRegClock } from "react-icons/fa";

function Balance({ whatsappInfo }) {
  const [balance, setBalance] = useState(0);
  const [rewards, setRewards] = useState(0);
  const [lastConnected, setLastConnected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If we have WhatsApp info from the previous step, use it
    if (whatsappInfo && whatsappInfo.data) {
      setBalance(whatsappInfo.data.userBalance || 0);
      setRewards(whatsappInfo.data.userRewards || 0);
      setLoading(false);
    } else {
      // Otherwise fetch last connected info
      fetchLastConnected();
    }
  }, [whatsappInfo]);

  const fetchLastConnected = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/last-connected", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setLastConnected(data);
        
        // Also fetch user balance data from another endpoint or use mock data
        setBalance(500); // Example value
        setRewards(120); // Example value
      } else {
        console.error("Failed to fetch last connected data");
      }
    } catch (error) {
      console.error("Error fetching last connected:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="mt-8 p-6 rounded-lg shadow-md bg-white text-center">
        <h2 className="text-2xl roboto-slab font-semibold text-[#008069]">Loading...</h2>
      </div>
    );
  }

  return (
    <div className="mt-8 p-6 rounded-lg shadow-md bg-white">
      <h2 className="text-2xl roboto-slab font-semibold text-[#008069] text-center">
        Your Dashboard
      </h2>

      {/* Balance Cards */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Balance Card */}
        <div className="p-4 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-3 bg-white rounded-full shadow-md">
              <FaRegMoneyBillAlt className="text-green-600 text-2xl" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Balance</h3>
              <p className="text-3xl font-bold text-gray-800">₹{balance || 0}</p>
            </div>
          </div>
        </div>

        {/* Rewards Card */}
        <div className="p-4 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-3 bg-white rounded-full shadow-md">
              <FaRegMoneyBillAlt className="text-yellow-600 text-2xl" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Total Rewards</h3>
              <p className="text-3xl font-bold text-gray-800">₹{rewards || 0}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-700 mb-3">Recent Activity</h3>

        {lastConnected ? (
          <div className="border border-gray-200 rounded-lg p-4 bg-green-50">
            <div className="flex items-start">
              <div className="p-2 bg-green-500 rounded-full">
                <FaWhatsapp className="text-white" />
              </div>
              <div className="ml-3">
                <p className="font-medium">WhatsApp Connected</p>
                <p className="text-sm text-gray-600">
                  {lastConnected.whatsappId || "Unknown ID"}
                </p>
                <div className="flex items-center mt-1 text-xs text-gray-500">
                  <FaRegClock className="mr-1" />
                  {lastConnected.lastConnectedAt 
                    ? new Date(lastConnected.lastConnectedAt).toLocaleString() 
                    : "Recent"}
                </div>
              </div>
              <div className="ml-auto">
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  {lastConnected.status || "Connected"}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 text-center text-gray-500">
            No recent activity to display
          </div>
        )}
      </div>

      {/* Information Section */}
      <div className="mt-8 bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h3 className="font-medium text-blue-800">How to earn more rewards</h3>
        <ul className="mt-2 text-sm text-gray-600 list-disc list-inside">
          <li>Keep your WhatsApp connected for hourly rewards</li>
          <li>Refer friends to join Taptod Premium</li>
          <li>Complete daily tasks and missions</li>
        </ul>
      </div>

      {/* Withdrawal Section */}
      <div className="mt-6 text-center">
        <button className="px-6 py-2 bg-[#008069] text-white rounded-md hover:bg-[#006e58] transition-colors">
          Withdraw Funds
        </button>
        <p className="mt-2 text-xs text-gray-500">
          Minimum withdrawal amount: ₹100
        </p>
      </div>
    </div>
  );
}

export default Balance;