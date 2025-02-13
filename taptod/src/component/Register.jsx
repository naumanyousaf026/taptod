import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import taptod from "../images/taptod_1.png";

const Register = () => {
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invitationCode, setInvitationCode] = useState("");
  const navigate = useNavigate();

  // Extract referral code from the URL on component mount
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const refCode = queryParams.get("ref");
    if (refCode) {
      setInvitationCode(refCode);
    }
  }, []);

  const validateEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
    const regex = /\S+@\S+\.\S+/;
    setEmailError(
      !regex.test(email) ? "Please enter a valid email address." : ""
    );
  };

  const validatePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
    setPasswordError(
      password.length < 6 ? "Password must be at least 6 characters." : ""
    );
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailError && !passwordError) {
      try {
        const response = await fetch(
          "http://localhost:5000/api/auth/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              phone,
              email,
              password,
              referredBy: invitationCode, // Send the invitation code as referredBy
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("token", data.token);
          console.log("Registration successful");
          navigate("/login");
        } else {
          const data = await response.json();
          console.error(data.message);
        }
      } catch (error) {
        console.error("Error:", error);
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

      {/* Page Content */}
      <main className="flex-grow flex flex-col items-center px-4">
        <div className="w-full max-w-lg mt-5 px-8 py-6 bg-white rounded shadow-sm transform transition-all hover:shadow-2xl">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="w-full max-w-lg rounded-md flex items-center justify-center gap-4">
              <h1 className="text-xl font-bold text-[#008069] tracking-wide uppercase">
                <span className="block text-lg mt-2">Create Your Account</span>
              </h1>
            </div>

            <div className="relative">
              <label
                htmlFor="phone"
                className="block text-sm font-semibold text-[#008069]"
              >
                Phone Number
              </label>
              <div className="flex items-center mt-2 bg-gray-50 border-b-2 border-[#008069] py-3">
                <input
                  type="tel"
                  id="phone"
                  placeholder="Enter your phone number by +923107726015 formate"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full outline-none roboto-thin bg-gray-50 rounded-md border-[#9CA3AF] bg-transparent"
                  required
                />
              </div>
            </div>

            <div className="relative">
              <label
                htmlFor="email"
                className="block text-[#008069] text-sm font-medium"
              >
                Email Address
              </label>
              <div className="flex items-center mt-2 border-b-2 bg-gray-50 border-[#008069] py-3">
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  onChange={validateEmail}
                  className="w-full outline-none bg-gray-50 roboto-thin rounded-md"
                  required
                />
              </div>
              {emailError && (
                <p className="text-red-500 text-sm mt-2">{emailError}</p>
              )}
            </div>

            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm text-[#008069] font-medium"
              >
                Password
              </label>
              <div className="flex items-center bg-gray-50 mt-2 border-b-2 border-[#008069] py-3">
                <input
                  type="password"
                  id="password"
                  placeholder="Enter a secure password"
                  onChange={validatePassword}
                  className="w-full outline-none roboto-thin rounded-md border-[#9CA3AF] bg-transparent"
                  required
                />
              </div>
              {passwordError && (
                <p className="text-red-500 text-sm mt-2">{passwordError}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="invitation-code"
                className="block text-sm font-medium text-[#008069]"
              >
                Invitation Code (Optional)
              </label>
              <div className="flex bg-gray-50 items-center mt-2 border-b-2 border-[#008069] py-3">
                <input
                  type="text"
                  id="invitation-code"
                  placeholder="Enter your invitation code"
                  value={invitationCode}
                  onChange={(e) => setInvitationCode(e.target.value)}
                  className="w-full outline-none roboto-thin rounded-md border-[#9CA3AF] bg-transparent"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#008069] text-white py-3 rounded font-semibold hover:bg-[#006c58] hover:shadow-lg transition-all"
            >
              Register
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Register;
