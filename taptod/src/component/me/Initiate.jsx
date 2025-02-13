import React, { useState } from "react";
import Header from "../Header_1";
import { Link } from "react-router-dom";

function WithdrawalPage() {
  const [selectedAmount, setSelectedAmount] = useState(100);
  const [error, setError] = useState(null); // State to track the error
  const [successMessage, setSuccessMessage] = useState(null); // State for success message
  const accountBalance = 1000.1;

  // Handle submit logic
  const handleSubmit = async () => {
    if (selectedAmount > accountBalance) {
      setError("Insufficient funds. Please select a smaller amount.");
    } else {
      setError(null); // Clear any existing errors

      const token = localStorage.getItem("token"); // Get token from localStorage

      // API request to withdraw money
      try {
        const response = await fetch(
          "http://localhost:5000/api/money/withdraw",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Include Bearer token in the request headers
            },
            body: JSON.stringify({
              amount: selectedAmount,
            }),
          }
        );

        const data = await response.json();

        if (response.ok) {
          // If withdrawal is successful, handle success
          setSuccessMessage("Withdrawal successful");
        } else {
          // Handle API errors
          setError(data.message || "An error occurred. Please try again.");
        }
      } catch (err) {
        // Handle fetch or network errors
        setError("Network error. Please try again.");
      }
    }
  };

  return (
    <div>
      <Header />
      <div className="px-3 py-4">
        <div className="w-full max-w-md mx-auto rounded-xl shadow-2xl px-8 py-6">
          <div className="text-center mb-6">
            <h1 className="text-xl roboto-slab text-[#008069] font-bold">
              Bank Account
            </h1>
            <Link
              to="/withdraw"
              className="mt-2 sm:mt-0 text-sm text-red-500 underline hover:text-red-400"
            >
              Unbound Bank Account.{" "}
              <span className="font-semibold">Go to bind &gt;&gt;</span>
            </Link>
          </div>

          {/* Main Content */}
          <div className="space-y-3">
            {/* Withdrawal Amount Section */}
            <div className="p-4 rounded shadow">
              <h2 className="text-lg text-[#008069] roboto-slab font-semibold mb-4">
                Withdrawal Amount
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[100, 2200, 11000, 55000].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setSelectedAmount(amount)}
                    className={`py-3 text-sm sm:text-lg font-semibold rounded-lg transition-all ${
                      selectedAmount === amount
                        ? "bg-[#008069]  text-white shadow-lg"
                        : "bg-[#e6f4f1] text-[#008069] shadow-sm sans "
                    }`}
                  >
                    {amount}
                  </button>
                ))}
              </div>
             
            </div>

            {/* Withdrawal Details */}
            <div className="p-4 sm:p-6 rounded shadow">
              <div className="flex justify-between items-center mb-3">
                <span className="text-gray-400 text-sm sans">
                  Withdrawal Amount:
                </span>
                <span className="font-semibold roboto-slab">
                  {selectedAmount}
                </span>
              </div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-gray-400 text-sm sans sm:text-base">
                  Bank Service Fee (10%):
                </span>
                <span className="text-green-400 roboto-slab font-semibold">
                  0%
                </span>
              </div>
              <div className="bg-orange-400 p-4 roboto-slab rounded-lg text-xs sm:text-sm text-white mb-4">
                <strong>Activity:</strong> Amount {selectedAmount}. Bank service
                fee platform bears: All
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 sans text-sm sm:text-base">
                  Actual Amount Received:
                </span>
                <span className="roboto-slab font-semibold">
                  {selectedAmount}
                </span>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-400 text-white p-4 rounded-lg text-sm mb-4">
                {error}
              </div>
            )}

            {/* Success Message */}
            {successMessage && (
              <div className="bg-green-400 text-white p-4 rounded-lg text-sm mb-4">
                {successMessage}
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-[#008069] roboto-slab text-white text-sm sm:text-lg font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              Submit
            </button>
          </div>

          {/* Notes Section */}
          <div className="w-full bg-white mt-5 p-4 shadow-sm">
            <h2 className="text-2xl mt-6 font-bold roboto-slab text-[#008069] flex items-center mb-4">
              <span className="mr-4 ml-2 text-2xl">📝</span>
              Notes
            </h2>
            <div className="space-y-3">
              <ul className="text-gray-800">
                <li className="flex items-start text-md sm:text-lg sans rounded-lg py-2">
                  <span className="mr-5 text-[#ffdd59] text-2xl">●</span>
                  <span className="leading-relaxed">
                    Withdrawal needs to be bound to a bank account and Telegram
                    BOT.
                  </span>
                </li>
                <li className="flex items-start text-md sm:text-lg sans rounded-lg py-2">
                  <span className="mr-5 text-[#ffdd59] text-2xl">●</span>
                  <span className="leading-relaxed">
                    For the first withdrawal, you can withdraw if you meet the
                    requirement of 100 rupees.
                  </span>
                </li>
                <li className="flex items-start text-md sm:text-lg sans rounded-lg py-2">
                  <span className="mr-5 text-[#ffdd59] text-2xl">●</span>
                  <span className="leading-relaxed">
                    After applying for withdrawal, the money will be transferred
                    to the account within 72 hours. Please wait patiently.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WithdrawalPage;
