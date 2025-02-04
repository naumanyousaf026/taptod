import React, { useState } from "react";
import Header from "../Header_1"; // Ensure this import path is correct.

function WithdrawalForm() {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [amount, setAmount] = useState(""); // State for the "Enter your amount" field
  const [bankAccount, setBankAccount] = useState(""); // State for bank account field
  const [name, setName] = useState(""); // State for Name field
  const [phone, setPhone] = useState(""); // State for Phone field
  const [errors, setErrors] = useState({}); // State for tracking errors

  const validateForm = () => {
    let formErrors = {};

    // Name Validation
    if (!name) formErrors.name = "Name is required.";

    // Phone Validation (Backend expects +92 prefix)
    const phoneRegex = /^\+92[0-9]{10}$/; // Phone should start with +92 followed by 10 digits
    if (!phone) formErrors.phone = "Phone number is required.";
    else if (!phoneRegex.test(phone))
      formErrors.phone = "Please enter a valid phone number starting with +92.";

    // Amount Validation (Positive number)
    if (!amount || isNaN(amount) || amount <= 0)
      formErrors.amount = "Please enter a valid amount greater than 0.";

    // Bank Account Validation (10 digits)
    const bankAccountRegex = /^[0-9]{10}$/; // Bank account should be exactly 10 digits
    if (!bankAccount) formErrors.bankAccount = "Bank account is required.";
    else if (!bankAccountRegex.test(bankAccount))
      formErrors.bankAccount = "Bank account must be exactly 10 digits.";

    // Payment Method Validation
    if (!paymentMethod)
      formErrors.paymentMethod = "Please select a payment method.";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const token = localStorage.getItem("token"); // Get the token from localStorage

      try {
        const response = await fetch(
          "http://localhost:5000/api/money/withdrawals",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Add the Bearer token to the headers
            },
            body: JSON.stringify({
              name,
              phone,
              bankAccount,
              paymentMethod,
              amount,
            }),
          }
        );

        const data = await response.json();
        if (response.ok) {
          console.log("Withdrawal request successful:", data);
          alert("Withdrawal request submitted successfully!");
        } else {
          console.error("Error processing withdrawal:", data.message);
          alert(data.message); // Show error message from backend
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
      }
    } else {
      console.log("Form contains errors.");
    }
  };

  return (
    <div>
      <Header />
      <div className="px-4 py-4 sm:px-8 sm:py-8">
        <div className="p-6 sm:p-8 md:p-12 rounded-md shadow-xl max-w-xl mx-auto">
          <div className=" inset-0 bg-gradient-to-b from-white/10 to-black/10 backdrop-blur-lg rounded-3xl border border-white/20"></div>

          <div className="">
            <h1 className="text-[22px] sm:text-3xl font-bold text-[#008069] roboto-slab text-center uppercase tracking-wide mb-4">
              Withdrawal Account
            </h1>
            <p className="text-center text-gray-500 text-md sm:text-lg mb-3">
              Your premium account for secure and smooth withdrawals.
            </p>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  className="block text-[#008069] roboto-slab text-sm sm:text-base mb-2 font-medium"
                  htmlFor="name"
                >
                  Name
                </label>
                <div className="flex items-center px-2 border-2 border-[#9CA3AF] rounded-md">
                  <input
                    type="text"
                    id="name"
                    className="w-full py-[10px] sm:py-3 outline-none rounded-md border-[#9CA3AF] bg-transparent"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label
                  className="block text-[#008069] roboto-slab text-sm sm:text-base mb-2 font-medium"
                  htmlFor="phone"
                >
                  Phone
                </label>
                <div className="flex items-center px-2 border-2 border-[#9CA3AF] rounded-md">
                  <input
                    type="text"
                    id="phone"
                    className="w-full py-[10px] sm:py-3 outline-none rounded-md border-[#9CA3AF] bg-transparent"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                )}
              </div>

              <div>
                <label
                  className="block text-[#008069] roboto-slab text-sm sm:text-base mb-2 font-medium"
                  htmlFor="amount"
                >
                  Enter Your Amount
                </label>
                <div className="flex items-center px-2 border-2 border-[#9CA3AF] rounded-md">
                  <input
                    type="number"
                    id="amount"
                    className="w-full py-[10px] sm:py-3 outline-none rounded-md border-[#9CA3AF] bg-transparent"
                    placeholder="Enter the withdrawal amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                {errors.amount && (
                  <p className="text-red-500 text-xs mt-1">{errors.amount}</p>
                )}
              </div>

              <div>
                <label
                  className="block text-[#008069] roboto-slab text-sm sm:text-base mb-2 font-medium"
                  htmlFor="bank-account"
                >
                  Bank Account
                </label>
                <div className="flex items-center px-2 border-2 border-[#9CA3AF] rounded-md">
                  <input
                    type="text"
                    id="bank-account"
                    className="w-full py-[10px] sm:py-3 outline-none rounded-md border-[#9CA3AF] bg-transparent"
                    placeholder="Enter your bank account"
                    value={bankAccount}
                    onChange={(e) => setBankAccount(e.target.value)}
                  />
                </div>
                {errors.bankAccount && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.bankAccount}
                  </p>
                )}
              </div>

              <div className="mb-6">
                <label className="block text-[#008069] roboto-slab text-sm sm:text-base mb-2 font-medium">
                  Payment Method
                </label>
                <div className="flex items-center px-2 border-2 border-[#9CA3AF] rounded-md">
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full py-3 outline-none rounded-md border-[#9CA3AF] bg-transparent"
                  >
                    <option value="" className="roboto-slab">
                      Select a method
                    </option>
                    <option value="JazzCash" className="roboto-slab">
                      JazzCash
                    </option>
                    <option value="EasyPaisa" className="roboto-slab">
                      EasyPaisa
                    </option>
                  </select>
                </div>
                {errors.paymentMethod && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.paymentMethod}
                  </p>
                )}
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="w-full bg-[#008069] text-white py-3 rounded font-semibold hover:bg-[#006c58] hover:shadow-lg transition-all"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WithdrawalForm;
