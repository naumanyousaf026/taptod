// src/components/ResetPasswordModal.js
import React, { useState } from "react";

const ResetPasswordModal = ({ isOpen, onClose }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match!");
      return;
    }

    alert("Password has been reset successfully!");
    onClose(); // Close the modal after password reset
  };

  if (!isOpen) return null; // Render nothing if modal is not open

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-gray-900 bg-opacity-50">
      <div className="w-full max-w-lg bg-white p-8 rounded-2xl mx-3 shadow-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-extrabold text-[#008069]">Reset Password</h2>
          <button onClick={onClose} className="text-xl text-gray-600">X</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="relative">
            <label htmlFor="new-password" className="block text-sm font-medium text-gray-600">
              New Password
            </label>
            <input
              type="password"
              id="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border-2 rounded px-2 py-3 bg-transparent text-gray-700 placeholder-gray-400"
              required
            />
          </div>

          <div className="relative">
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-600">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border-2 rounded px-2 py-3 bg-transparent text-gray-700 placeholder-gray-400"
              required
            />
          </div>

          {passwordError && <p className="text-red-500 text-sm mt-2">{passwordError}</p>}

          <button
            type="submit"
            className="w-full bg-[#008069] text-white py-3 rounded-xl font-semibold hover:bg-[#006c58] transition-all"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordModal;
