import React, { useState, useEffect } from "react";
import Header from "../Header_1";

const WithdrawalRequestCard = () => {
  // State to store the withdrawal requests
  const [withdrawalRequests, setWithdrawalRequests] = useState([]);

  // Fetch withdrawal requests from the API on component mount
  useEffect(() => {
    const fetchWithdrawalRequests = async () => {
      const token = localStorage.getItem("token"); // Retrieve the token from localStorage
      try {
        const response = await fetch(
          "http://localhost:5000/api/money/withdrawals",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, // Include the Bearer token in the request headers
            },
          }
        );

        const data = await response.json();
        if (response.ok) {
          setWithdrawalRequests(data); // Set the withdrawal requests in the state
        } else {
          console.error("Error fetching withdrawal requests:", data.message);
          alert("Failed to fetch withdrawal requests. Please try again.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
      }
    };

    fetchWithdrawalRequests(); // Call the function to fetch the data
  }, []); // Empty dependency array to run this effect once when the component mounts

  return (
    <div>
      <Header />
      <div className="px-4 py-6 bg-gray-50">
        <div className="w-full max-w-md mx-auto bg-white/10 backdrop-blur-lg rounded-xl shadow-lg p-6">
          {/* Header */}
          <div className="flex justify-between items-center border-b pb-3 mb-4">
            <h1 className="text-[#008069] text-center roboto-slab font-bold text-lg">
              Withdrawal Requests
            </h1>
            <span className="text-gray-500 text-sm hidden sm:block">
              Latest Transactions
            </span>
          </div>

          {/* Records */}
          <div className="divide-y">
            {withdrawalRequests.length > 0 ? (
              withdrawalRequests.map((record, index) => (
                <div
                  key={index}
                  className="py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0"
                >
                  {/* Date and Time */}
                  <div className="flex justify-between w-full sm:w-auto sm:flex-col text-sm text-gray-500 font-medium">
                    <span>{record.date}</span>
                    <span className="ml-4 sm:ml-0 sm:mt-1">{record.time}</span>
                  </div>

                  {/* Status */}
                  <div className="flex justify-center sm:justify-end w-full sm:w-auto">
                    <span className="bg-[#e6f7f0] text-[#008069] roboto-slab px-3 py-1 rounded-full text-xs">
                      {record.status}
                    </span>
                  </div>

                  {/* Amount and Balance */}
                  <div className="flex justify-between w-full sm:w-auto sm:justify-end items-center space-x-4">
                    <span className="text-[#ff4d4d] roboto-slab font-semibold text-lg">
                      {record.amount}
                    </span>
                    <span className="text-gray-500 text-sm">
                      name:{" "}
                      <span className="font-semibold text-gray-800">
                        {record.name}
                      </span>
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-4">
                No withdrawal requests found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithdrawalRequestCard;
