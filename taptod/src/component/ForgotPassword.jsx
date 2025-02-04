import React, { useState } from "react";
import { CgPhone } from "react-icons/cg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPasswordModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [otpError, setOtpError] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        { phone }
      );
      if (response.data.message === "OTP sent successfully") {
        alert("OTP sent to your phone!");
        setStep(2);
      } else {
        alert("Failed to send OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert(
        error.response?.data?.message ||
          "An error occurred. Please try again later."
      );
    }
  };

  const handleOtpChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < 3) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const fullOtp = otp.join("");
    if (fullOtp.length !== 4) {
      setOtpError("Please enter a 4-digit OTP.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/verify-otp",
        { phone, otp: fullOtp }
      );

      if (response.data.message === "OTP verified successfully") {
        alert("OTP verified! You can now reset your password.");
        setStep(3);
      } else {
        alert("Invalid OTP. Please try again.");
        setStep(1);
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert(
        error.response?.data?.message ||
          "An error occurred. Please try again later."
      );
      setStep(1);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/reset-password",
        { phone, newPassword }
      );

      if (response.data.message === "Password changed successfully") {
        alert("Password changed successfully! Redirecting to login...");
        navigate("/login");
      } else {
        setErrorMessage("Failed to change password. Please try again.");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      setErrorMessage(
        error.response?.data?.message ||
          "An error occurred. Please try again later."
      );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-gray-900 bg-opacity-50">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-[#008069]">
            {step === 1
              ? "Forgot Password"
              : step === 2
              ? "Verify OTP"
              : "Reset Password"}
          </h2>
          <button onClick={onClose} className="text-xl text-gray-600">
            X
          </button>
        </div>

        {step === 1 ? (
          <form onSubmit={handlePhoneSubmit} className="space-y-6 mt-4">
            <div className="relative">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-600"
              >
                Enter your phone number
              </label>
              <div className="flex items-center mt-2 border-2 rounded-lg border-gray-400">
                <CgPhone className="absolute left-3 text-[#008069] text-2xl" />
                <input
                  type="text"
                  id="phone"
                  placeholder="Enter your phone number using +92 format"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-transparent text-gray-700 placeholder-gray-400 rounded-lg focus:outline-none"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-[#008069] text-white py-3 rounded-xl font-semibold hover:bg-[#006c58] transition-all"
            >
              Send OTP
            </button>
          </form>
        ) : step === 2 ? (
          <form onSubmit={handleOtpSubmit} className="space-y-6 mt-4">
            <div>
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-gray-600"
              >
                Enter the OTP sent to {phone}
              </label>
              <div className="flex justify-center gap-3 mt-3">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpChange(e.target.value, index)}
                    className="w-12 h-12 text-center border-2 rounded-lg border-gray-400 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#008069]"
                  />
                ))}
              </div>
              {otpError && (
                <p className="text-red-500 text-sm mt-2">{otpError}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-[#008069] text-white py-3 rounded-xl font-semibold hover:bg-[#006c58] transition-all"
            >
              Verify OTP
            </button>
          </form>
        ) : (
          <form onSubmit={handlePasswordReset} className="space-y-6 mt-4">
            <div className="relative">
              <label
                htmlFor="new-password"
                className="block text-sm font-medium text-gray-600"
              >
                New Password
              </label>
              <input
                type="password"
                id="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 rounded-lg border-gray-400 text-gray-700 placeholder-gray-400 focus:outline-none"
                placeholder="Enter new password"
              />
            </div>
            <div className="relative">
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-gray-600"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 rounded-lg border-gray-400 text-gray-700 placeholder-gray-400 focus:outline-none"
                placeholder="Confirm new password"
              />
            </div>
            {errorMessage && (
              <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
            )}
            <button
              type="submit"
              className="w-full bg-[#008069] text-white py-3 rounded-xl font-semibold hover:bg-[#006c58] transition-all"
            >
              Reset Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
