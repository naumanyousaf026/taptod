import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import taptod from "../images/taptod_1.png"; // Logo image
import ForgotPasswordModal from "./ForgotPassword";

const ErrorModal = ({ message, isOpen, onClose }) => {
  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-5">
          <h2 className="text-lg font-bold text-red-500">Error</h2>
          <p className="mt-2">{message}</p>
          <button
            className="mt-4 bg-[#008069] text-white py-2 px-4 rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    )
  );
};

const Login = () => {
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false); // State for error modal
  const [phone, setPhone] = useState(""); // State for phone number
  const [password, setPassword] = useState(""); // State for password
  const navigate = useNavigate(); // Use navigate for redirection

  // Phone number validation
  const validatePhone = (e) => {
    const phone = e.target.value;
    const regex = /^[0-9]{10}$/; // Example regex for 10-digit phone numbers
    setPhone(phone); // Update phone state
    setPhoneError(
      !regex.test(phone) ? "Please enter a valid phone number." : ""
    );
  };

  // Password validation
  const validatePassword = (e) => {
    const password = e.target.value;
    setPassword(password); // Update password state
    setPasswordError(
      password.length < 6 ? "Password must be at least 6 characters." : ""
    );
  };

  // Toggle Forgot Password modal
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!phoneError && !passwordError) {
      try {
        const response = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ phone, password }),
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("token", data.token);
          console.log("Login successful"); // Store JWT token
          navigate("/home"); // Redirect to home page
        } else {
          const data = await response.json();
          setErrorMessage(data.message || "Login failed. Please try again.");
          setIsErrorModalOpen(true);
        }
      } catch (error) {
        console.error("Error:", error);
        setErrorMessage("An unexpected error occurred. Please try again.");
        setIsErrorModalOpen(true);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full bg-gradient-to-r from-[#008069] to-[#008069] text-white py-2 px-4 shadow-xl border-b-4 border-[#006c58]">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <img
              src={taptod}
              alt="Logo"
              className="w-12 h-12 rounded-full transform hover:scale-110 transition-transform duration-300 ease-in-out"
            />
            <h1 className="text-2xl font-bold tracking-wide uppercase">
              <span className="text-[#ffdd59]">Tap</span>tod
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center px-5">
        <div className="w-full max-w-lg mt-8 px-8 py-5 bg-white rounded-xl shadow-2xl transform transition-all hover:shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Phone Number */}
            <div className="relative">
              <label
                htmlFor="phone"
                className="block text-sm text-[#008069] font-medium"
              >
                Phone Number
              </label>
              <div className="flex items-center mt-2 bg-gray-50 border-b-2 border-[#008069] py-3">
                <span className="text-[#008069] pr-2">+92</span>
                <input
                  type="tel"
                  id="phone"
                  placeholder="Enter your phone number"
                  onChange={validatePhone}
                  className="w-full outline-none bg-transparent placeholder-gray-400"
                  required
                />
              </div>
              {phoneError && (
                <p className="text-red-500 text-sm mt-2">{phoneError}</p>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[#008069]"
              >
                Password
              </label>
              <div className="flex items-center mt-2 bg-gray-50 border-b-2 border-[#008069] py-3">
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  onChange={validatePassword}
                  className="w-full outline-none bg-transparent placeholder-gray-400"
                  required
                />
              </div>
              {passwordError && (
                <p className="text-red-500 text-sm mt-2">{passwordError}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#008069] text-white py-3 rounded-lg font-semibold hover:bg-[#006c58] hover:shadow-lg transition-all"
            >
              Login
            </button>
          </form>
        </div>

        {/* Forgot Password link */}
        <div className="w-full max-w-lg mt-8 p-3 bg-[#e6f4f1] rounded-md shadow-[-6px_6px_0_#008069] flex items-start gap-4">
          <span className="text-[#008069] text-2xl">ℹ️</span>
          <p className="text-gray-700 text-sm leading-relaxed">
            Forgot your password?{" "}
            <button
              onClick={toggleModal}
              className="text-[#008069] block font-medium hover:underline hover:text-[#006c58]"
            >
              Reset it here
            </button>
          </p>
        </div>

        {/* Footer */}
        <footer className="w-full max-w-lg mt-6 text-center">
          <Link
            to="/register"
            className="text-[#008069] font-medium hover:underline hover:text-[#006c58]"
          >
            Create a new account
          </Link>
        </footer>
      </main>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal isOpen={isModalOpen} onClose={toggleModal} />

      {/* Error Modal */}
      <ErrorModal
        message={errorMessage}
        isOpen={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
      />
    </div>
  );
};

export default Login;
