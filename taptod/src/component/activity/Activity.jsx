import React, { useEffect, useState } from "react";
import axios from "axios";

export default function LastConnectedUser() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0); // Add a refresh key to force re-render

  const fetchLastConnectedUser = async () => { 
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/last-connected", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setUserData(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLastConnectedUser();
  }, [refreshKey]); // Re-fetch when refresh key changes

  const handleDelete = async () => {
    if (!userData?.uniqueId) {
      alert("Required data is missing!");
      return;
    }
  
    setDeleting(true);
  
    try {
      const response = await axios.delete(
        "http://localhost:5000/api/delete-wa-account",
        {
          params: { unique: userData.uniqueId },
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }
      );
  
      if (response.data.message === "Account deleted successfully") {
        // Update the user data status locally first for immediate UI feedback
        setUserData(prev => ({
          ...prev,
          status: "Disconnected"  // Update the status immediately in UI
        }));
        
        // Then refresh the data from the server
        setTimeout(() => {
          setRefreshKey(prevKey => prevKey + 1); // Force a refresh
          alert("Deleted successfully!");
        }, 500);
      }
    } catch (error) {
      alert(error.response?.data?.message || "Deletion failed");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!userData) return <p className="text-center text-gray-500">No data available</p>;

  const randomProfileImage = `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`;
  const statusColorClass = userData.status === "Connected" ? "text-green-500" : "text-red-500";

  return (
    <div>
      <div className="mt-8 bg-[#008069] p-4 mx-3 rounded-lg shadow-xl text-center">
        <h2 className="text-3xl font-semibold roboto-slab text-[#ffdd59]">Rs {userData.balance}</h2>
        <p className="text-lg sm:text-xl sans text-gray-300 mt-2">Last Connected User</p>
        <p className="text-sm sans text-gray-400 italic mt-1">Real-time updates</p>
      </div>

      <div className="mt-8 p-6 mx-3 rounded-lg shadow-md bg-white">
        <div className="flex items-center">
          <img
            src={randomProfileImage}
            alt="Profile"
            className={`w-20 h-20 rounded-full border-4 ${userData.status === "Connected" ? "border-green-500" : "border-red-500"} shadow-md`}
          />
          <div className="ml-6">
            <h3 className="text-xl sm:text-2xl roboto-slab font-semibold text-[#008069]">
              WhatsApp ID: {userData.whatsappId}
            </h3>
            <p className={`text-sm font-medium ${statusColorClass}`}>
              Status: {userData.status}
            </p>
            <p className={`text-sm sans font-medium ${userData.status === "Connected" ? "text-green-400" : "text-red-400"}`}>
              {userData.status === "Connected" ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center mt-6">
          <div>
            <p className="text-sm roboto-slab text-[#008069]">Last Connected At</p>
            <p className="text-2xl sm:text-3xl font-bold roboto-slab text-[#ffdd59]">
              {new Date(userData.lastConnectedAt).toLocaleString()}
            </p>
          </div>

          <button
            onClick={handleDelete}
            disabled={deleting || userData.status === "Disconnected"}
            className="px-4 py-2 mr-4 roboto-slab bg-gradient-to-r from-red-500 to-red-700 text-white font-bold rounded-lg shadow-md hover:scale-105 transition-transform disabled:opacity-50"
          >
            {deleting ? "Deleting..." : userData.status === "Disconnected" ? "Deleted" : "Go Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}