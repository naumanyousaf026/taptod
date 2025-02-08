import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EmailRequest = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/sendotp", // Corrected the route here
        { email }
      );

      if (response.status === 200) {
        navigate("/verifyotp", { state: { email } }); // Move to OTP page with email
      } else {
        setErrorMessage("Failed to send OTP. Please try again.");
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Error sending OTP.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f2a46]">
      <div className="bg-white rounded-lg shadow-lg p-8 w-96">
        <h2 className="text-2xl font-bold text-center mb-4">
          Forgot password?
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Enter your email and we'll send you a link to reset your password
        </p>
        <form onSubmit={handleEmailSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2">
              Email address:
            </label>
            <input
              type="email"
              placeholder="e.g. example@gmail.com"
              className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-700"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <button
            type="submit"
            className="w-full bg-[#103153] text-white py-2 rounded-lg "
          >
            Send OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmailRequest;