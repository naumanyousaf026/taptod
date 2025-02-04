import React, { useState } from "react";
import Swal from "sweetalert2";
import Header from "../Header_1";

function ModifyPasswordPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form inputs
    if (!currentPassword || !newPassword || !confirmPassword) {
      setErrorMessage("All fields are required!");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("New password and confirmation password do not match!");
      return;
    }

    if (newPassword.length < 8) {
      setErrorMessage("Password must be at least 8 characters long!");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setErrorMessage("User not authenticated. Please log in.");
        return;
      }

      const response = await fetch(
        "http://localhost:5000/api/auth/change-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ currentPassword, newPassword }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setErrorMessage("");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");

        // Show success popup and navigate back
        Swal.fire({
          title: "Success!",
          text: data.message || "Password changed successfully!",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          // Navigate back
          window.history.back();
        });
      } else {
        setErrorMessage(data.error || "Failed to change the password.");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      setErrorMessage(
        "An error occurred while changing the password. Please try again."
      );
    }
  };

  return (
    <div>
      <Header />
      <div className="px-3 py-4">
        <div className="w-full max-w-md mx-auto bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl p-8">
          <h1 className="text-2xl font-bold roboto-slab text-[#008069] text-center mb-6">
            Modify Password
          </h1>
          <form onSubmit={handleSubmit} className="space-y-3">
            <label className="block text-sm font-medium text-[#008069] roboto-slab mb-2">
              Current Password
            </label>
            <div className="flex items-center px-2 border-2 border-[#9CA3AF] rounded-md">
              <input
                type="password"
                placeholder="Enter current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full py-[10px] sm:py-3 outline-none rounded-md bg-transparent"
              />
            </div>
            <label className="block text-sm font-medium text-[#008069] roboto-slab mb-2">
              New Password
            </label>
            <div className="flex items-center px-2 border-2 border-[#9CA3AF] rounded-md">
              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full py-[10px] sm:py-3 outline-none rounded-md bg-transparent"
              />
            </div>
            <label className="block text-sm font-medium text-[#008069] roboto-slab mb-2">
              Confirm New Password
            </label>
            <div className="flex items-center px-2 border-2 border-[#9CA3AF] rounded-md">
              <input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full py-[10px] sm:py-3 outline-none rounded-md bg-transparent"
              />
            </div>
            {errorMessage && (
              <div className="text-red-500 bg-red-100 p-4 rounded-lg text-sm">
                {errorMessage}
              </div>
            )}
            <button
              type="submit"
              className="w-full roboto-slab bg-[#008069] text-white text-lg font-semibold py-2 rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ModifyPasswordPage;
