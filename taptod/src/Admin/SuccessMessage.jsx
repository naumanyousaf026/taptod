import React from "react";
import { useNavigate } from "react-router-dom";

function SuccessMessage() {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate("/admin/login"); // Navigate to the login page when "Continue" is clicked
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f2a46]">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-4 rounded-full">
            <svg
              className="w-8 h-8 text-green-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 10-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold nunito-sans mb-2">Successful</h2>

        {/* Description */}
        <p className="text-gray-600 mb-6 nunito-sans">
          Congratulations! Your password has been changed. Click continue to
          login.
        </p>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          className="w-full bg-[#103153] nunito-sans text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default SuccessMessage;