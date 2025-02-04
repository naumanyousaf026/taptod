import React, { useEffect, useState } from "react";
import {
  FaMoneyBillTrendUp,
  FaRegShareFromSquare,
  FaSquareWebAwesomeStroke,
  FaArrowDown,
  FaClock,
  FaRegClock,
} from "react-icons/fa6";
import { MdOutlineSwitchAccount } from "react-icons/md";

const EnhancedInviteCard = () => {
  const [referralLink, setReferralLink] = useState("");
  const [copySuccess, setCopySuccess] = useState("");

  // Fetch referral link from the backend
  useEffect(() => {
    const fetchReferralLink = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(
          "http://localhost:5000/api/auth/referral-link",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        if (response.ok) {
          setReferralLink(data.referralLink);
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error("Failed to fetch referral link:", error);
      }
    };

    fetchReferralLink();
  }, []);

  // Copy referral link to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink).then(
      () => setCopySuccess("Link copied to clipboard!"),
      () => setCopySuccess("Failed to copy link.")
    );
    setTimeout(() => setCopySuccess(""), 2000); // Clear the success message after 2 seconds
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Header Section */}
      <div className="text-center pt-8">
        <h1 className="text-2xl roboto-slab font-extrabold">
          Invite Friends to Join Taptod
        </h1>
        <p className="text-lg font-medium roboto-slab mt-2">
          Earn <span className="text-[#ffdd59] font-bold">Rs 900.00</span> for
          each referral
        </p>
      </div>

      {/* Action Buttons */}
      <div className="max-w-lg mx-auto bg-white rounded-xl overflow-hidden py-5 px-8 sm:p-12">
        <ul className="space-y-2">
          {/* Share Section */}
          <li className="flex items-center gap-6 p-4 rounded-xl shadow-md">
            <div className="bg-[#008069] p-4 rounded-full shadow-lg">
              <FaRegShareFromSquare className="text-[#ffff] text-xl" />
            </div>
            <div>
              <p className="text-lg roboto-slab font-semibold text-[#008069]">
                Share
              </p>
              <p className="text-sm sans font-medium opacity-80">
                Share and earn rewards
              </p>
            </div>
          </li>
          <li className="flex justify-center items-center">
            <FaArrowDown className="text-[#008069] text-xl" />
          </li>
          {/* Register Section */}
          <li className="flex items-center gap-6 shadow-md p-4 rounded-xl">
            <div className="bg-[#008069] p-4 rounded-full shadow-lg">
              <MdOutlineSwitchAccount className="text-[#ffff] text-xl" />
            </div>
            <div>
              <p className="text-lg roboto-slab font-semibold text-[#008069]">
                Register
              </p>
              <p className="text-sm sans font-medium opacity-80">
                Sign up and start earning
              </p>
            </div>
          </li>
          <li className="flex justify-center items-center">
            <FaArrowDown className="text-[#008069] text-xl" />
          </li>
          {/* Claim Rewards Section */}
          <li className="flex items-center gap-6 p-4 rounded-xl shadow-md">
            <div className="bg-[#008069] p-4 rounded-full shadow-lg">
              <FaSquareWebAwesomeStroke className="text-[#ffff] text-xl" />
            </div>
            <div>
              <p className="text-lg roboto-slab font-semibold text-[#008069]">
                Claim Rewards
              </p>
              <p className="text-sm sans font-medium opacity-80">
                Redeem after your referrals join
              </p>
            </div>
          </li>
        </ul>
      </div>

      {/* Invite Links Section */}
      <div className="p-6">
        <label className="block text-[#008069] roboto-slab font-semibold mb-2">
          Your Invite Links:
        </label>
        <textarea
          className="w-full border border-gray-300 rounded-md p-2 text-gray-700 focus:outline-none focus:ring focus:ring-[#25D366] resize-none"
          rows="2"
          value={referralLink}
          readOnly
        ></textarea>
        <button
          className="mt-2 w-full roboto-slab text-white font-semibold py-3 rounded-md shadow-lg bg-[#008069] transition-all"
          onClick={copyToClipboard}
          disabled={!referralLink}
        >
          Copy Invite Links
        </button>
        {copySuccess && (
          <p className="text-sm text-green-600 mt-2">{copySuccess}</p>
        )}
      </div>

      {/* Invitation Info */}
      <div className="p-2 rounded-xl shadow-sm mx-6">
        <h2 className="text-2xl font-bold roboto-slab text-[#1a4e4a] mb-6 text-center">
          Invitation Information
        </h2>
        <table className="w-full table-auto border-collapse">
          <thead className="bg-[#008069] shadow-md text-white">
            <tr>
              <th className="text-sm p-3 roboto-slab opacity-90 text-left font-semibold">
                Details
              </th>
              <th className="text-sm p-3 roboto-slab opacity-90 text-right font-semibold">
                Information
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-300 shadow-sm transition-all">
              <td className="text-xl py-2 sans text-[#1a4e4a] px-2 opacity-80 font-medium">
                Level Size:
              </td>
              <td className="text-xl sans px-2 text-[#ffdd59] font-semibold text-right">
                1 Friend
              </td>
            </tr>
            <tr className="border-b border-gray-300 shadow-sm transition-all">
              <td className="text-xl py-2 text-[#1a4e4a] sans px-2 opacity-80 font-medium">
                Commissions:
              </td>
              <td className="text-xl px-2 sans text-[#ffdd59] font-semibold text-right">
                Rs 0.00
              </td>
            </tr>
          </tbody>
        </table>
        <button className="mt-4 w-full bg-[#e0f7e9] roboto-slab text-[#1a4e4a] font-bold py-4 rounded-lg shadow-sm">
          View Details
        </button>
      </div>

      {/* Program Incentives */}
      <div className="p-6">
        <h2 className="text-2xl roboto-slab font-extrabold text-[#008069] mb-6 tracking-wide text-center">
          Program Incentives
        </h2>
        <div className="grid grid-cols-3 gap-2">
          {[
            { hours: "24 Hours", reward: "Rs 200.00" },
            { hours: "48 Hours", reward: "Rs 150.00" },
            { hours: "72 Hours", reward: "Rs 550.00" },
          ].map(({ hours, reward }, index) => (
            <div
              key={index}
              className="text-center bg-[#008069] text-white py-4 px-2 rounded shadow-lg"
            >
              <div className="flex justify-center items-center mb-4">
                <FaRegClock className="text-2xl" />
              </div>
              <p className="text-lg font-semibold">{hours}</p>
              <p className="text-xl font-bold mt-2 text-[#ffdd59]">{reward}</p>
            </div>
          ))}
        </div>
        <p className="text-sm sans font-semibold text-[#25D366] mt-6 text-center">
          Your friends must sign up and stay online for the specified hours to
          unlock these rewards.
        </p>
      </div>
    </div>
  );
};

export default EnhancedInviteCard;
