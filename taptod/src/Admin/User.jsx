import React, { useState, useEffect } from "react";

export default function User() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log("Fetching user data...");
        const token = localStorage.getItem("token");
        console.log("Stored Token:", token);

        const response = await fetch("http://localhost:5000/api/auth/current-user", {
          method: "GET",
          credentials: "include", // Ensures cookies (auth token) are sent
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Ensure token is sent
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch user data: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Fetched Data:", data);
        
        setUser(data.user || data); // Handle cases where data is nested inside `user`
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError(error.message);
      }
    };

    fetchUser();
  }, []);

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  if (!user) {
    return <div className="text-center text-gray-700">Loading user data...</div>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex justify-center items-center">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-2xl font-semibold mb-4 text-gray-700">User Details</h3>
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="border p-3 text-left">User ID</th>
                <th className="border p-3 text-left">Phone Number</th>
                <th className="border p-3 text-left">Email Address</th>
                <th className="border p-3 text-left">Balance</th>
                <th className="border p-3 text-left">Referral Link</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr className="hover:bg-gray-100">
                <td className="border p-3">{user.userId || "N/A"}</td>
                <td className="border p-3">{user.phone || "N/A"}</td>
                <td className="border p-3">{user.email || "N/A"}</td>
                <td className="border p-3">Rs {user.balance || "0"}.00</td>
                <td className="border p-3 text-blue-500">
                  {user.referralLink ? (
                    <a href={user.referralLink} target="_blank" rel="noopener noreferrer">
                      {user.referralLink}
                    </a>
                  ) : (
                    "N/A"
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
