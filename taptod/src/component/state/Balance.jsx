import React, { useEffect, useState } from "react";
import axios from "axios";

export default function LastConnectedUser() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchLastConnectedUser = async () => {
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

    fetchLastConnectedUser();
  }, []);

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
        alert("Deleted successfully!");
        // Refresh contact data
        const updated = await axios.get("http://localhost:5000/api/last-connected", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        setUserData(updated.data);
      }
    } catch (error) {
      alert(error.response?.data?.message || "Deletion failed");
    } finally {
      setDeleting(false);
    }
  };

  

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  const randomProfileImage = `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`;

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
            className="w-20 h-20 rounded-full border-4 border-green-500 shadow-md"
          />
          <div className="ml-6">
            <h3 className="text-xl sm:text-2xl roboto-slab font-semibold text-[#008069]">
              WhatsApp ID: {userData.whatsappId}
            </h3>
            <p className="text-sm text-[#008069]">Status: {userData.status}</p>
            <p className="text-sm sans text-green-400 font-medium">Always Online</p>
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
            disabled={deleting}
            className="px-4 py-2 mr-4 roboto-slab bg-gradient-to-r from-red-500 to-red-700 text-white font-bold rounded-lg shadow-md hover:scale-105 transition-transform disabled:opacity-50"
          >
            {deleting ? "Deleting..." : "Go Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
