import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const VerifyOTP = () => {
  const [otp, setOtp] = useState(["", "", "", ""]); // Array for 4-digit OTP input
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation(); // Get the passed email from the previous step
  const navigate = useNavigate();

  const handleChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const otpString = otp.join(""); // Combine OTP input into a single string
      const response = await axios.post(
        "http://localhost:5000/api/admin/verifyotp",
        {
          email: location.state.email, // Get the email from previous state
          otp: otpString,
        }
      );

      if (response.status === 200) {
        navigate("/resetpassword", { state: { email: location.state.email } });
      } else {
        setErrorMessage("Invalid OTP. Please try again.");
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Error verifying OTP.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0f2a46] flex items-center justify-center bg-custom-pattern">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-semibold mb-4 nunito-sans text-center">
          Verify OTP
        </h2>
        <p className="text-sm text-center mb-6 nunito-sans">
          Enter the OTP sent to <strong>{location.state.email}</strong>
        </p>

        <form onSubmit={handleOtpSubmit}>
          <div className="flex justify-center space-x-2 mb-6">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e.target.value, idx)}
                className="w-12 h-12 border border-gray-300 rounded-md text-center text-xl"
                required
              />
            ))}
          </div>
          {errorMessage && (
            <p className="text-red-500 text-center mb-4">{errorMessage}</p>
          )}

          <button className="w-full py-2 bg-[#103153] text-white font-medium rounded-md transition">
            Verify OTP
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-[#202224] nunito-sans">
            Didn't receive the email?{" "}
            <a
              href="#"
              className="text-[#103153] font-semibold nunito-sans underline"
            >
              Click to resend
            </a>
          </p>
          <p className="mt-2">
            <a href="#" className="text-[#103153] nunito-sans font-semibold">
              Back to Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;