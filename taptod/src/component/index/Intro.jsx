import React, { useState } from "react";
import { FaUser, FaWhatsapp, FaCreditCard, FaShareAlt } from "react-icons/fa"; // Importing icons
import { HiChevronRight } from "react-icons/hi"; // Importing HiChevronRight icon
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const TapToD = () => {
  // State to track the completion status of tasks
  const [completedTasks, setCompletedTasks] = useState({
    task1: false,
    task2: false,
    task3: false,
    task4: false,
  });

  // State to handle task list visibility
  const [showTasks, setShowTasks] = useState(false);

  // Function to handle task completion
  const handleTaskCompletion = (task) => {
    setCompletedTasks((prevState) => ({
      ...prevState,
      [task]: !prevState[task],
    }));
  };

  // Function to handle "Get Started" button click
  const handleGetStarted = () => {
    setShowTasks(true); // Show task list when button is clicked
  };

  return (
    <div className="bg-gray-50 flex flex-col justify-center items-center">
      {/* Welcome Card */}
      <div className="max-w-lg rounded-xl overflow-hidden bg-[#008069] mx-6 mt-8">
        <div className="px-5 py-4">
          <h2 className="text-2xl roboto-slab text-white">
            Your Gateway to Easy Earnings with{" "}
            <span className="text-[#ffdd59]">TapToD</span>
          </h2>
          <p className="text-white sans text-sm mt-4">
            Get Started with <span className="font-semibold">TapToD</span> and
            start earning today.
          </p>

          {/* Get Started Button */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleGetStarted} // Show tasks when clicked
              className="px-6 py-2 bg-white text-[#008069] font-semibold rounded-lg hover:bg-[#f1f1f1] transition duration-300"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>

      {/* Task List - Initially Hidden */}
      {showTasks && (
        <div className="flex flex-col gap-2 p-6 max-w-md mx-auto mt-2">
          {/* Task 1 */}
          <div
            onClick={() => handleTaskCompletion("task1")}
            className={`flex items-center space-x-3 p-4 rounded-xl shadow-lg transition-all duration-300 cursor-pointer ${
              completedTasks.task1
                ? "bg-[#e0f7e9] text-gray-500 cursor-not-allowed"
                : "bg-[#f3f9f4] hover:bg-[#d6e9e0]"
            }`}
          >
            <FaUser className="text-xl text-[#008069]" />
            <div className="flex flex-col flex-grow">
              <span className="font-semibold text-[15px] sans text-gray-800">
                Complete new user tasks
              </span>
              <span className="text-gray-500 sans text-sm">
                {completedTasks.task1 ? "Completed" : "Earn Rs80"}
              </span>
            </div>
            <HiChevronRight className="ml-auto text-xl text-[#008069]" /> {/* Right Arrow Icon */}
          </div>

          {/* Task 2 - Link to WhatsApp Login (Internal Route) */}
          <Link
            to="/state" // Internal link for WhatsApp login (replace with actual route)
            className={`flex items-center space-x-3 p-4 rounded-xl shadow-lg transition-all duration-300 cursor-pointer ${
              completedTasks.task2
                ? "bg-[#e0f7e9] text-gray-500 cursor-not-allowed"
                : "bg-[#f3f9f4] hover:bg-[#d6e9e0]"
            }`}
          >
            <FaWhatsapp className="text-xl text-[#25D366]" />
            <div className="flex flex-col flex-grow">
              <span className="font-semibold text-[15px] sans text-gray-800">
                Log in to WhatsApp
              </span>
              <span className="text-gray-500 sans text-sm">
                {completedTasks.task2 ? "Completed" : "Earn ₨10.0000 per day"}
              </span>
            </div>
            <HiChevronRight className="ml-auto text-xl text-[#008069]" /> {/* Right Arrow Icon */}
          </Link>

          {/* Task 3 - Link to Bind Withdrawal Bank Card (Internal Route) */}
          <Link
            to="/withdraw" // Internal link to bind the bank card (replace with actual route)
            className={`flex items-center space-x-3 p-4 rounded-xl shadow-lg transition-all duration-300 cursor-pointer ${
              completedTasks.task3
                ? "bg-[#e0f7e9] text-gray-500 cursor-not-allowed"
                : "bg-[#f3f9f4] hover:bg-[#d6e9e0]"
            }`}
          >
            <FaCreditCard className="text-xl text-[#4caf50]" />
            <div className="flex flex-col flex-grow">
              <span className="font-semibold text-[15px] sans text-gray-800">
                Bind withdrawal bank card
              </span>
              <span className="text-gray-500 sans text-sm">
                {completedTasks.task3
                  ? "Completed"
                  : "Activate the TapToD account after setup"}
              </span>
            </div>
            <HiChevronRight className="ml-auto text-xl text-[#008069]" /> {/* Right Arrow Icon */}
          </Link>

          {/* Task 4 - Link to Invite Friends (Internal Route) */}
          <Link
            to="/invite" // Internal link to the invite friends page
            className="flex items-center space-x-3 p-4 rounded-xl shadow-lg transition-all duration-300 cursor-pointer bg-[#f3f9f4] hover:bg-[#d6e9e0]"
          >
            <FaShareAlt className="text-xl text-[#ff9800]" />
            <div className="flex flex-col flex-grow">
              <span className="font-semibold text-[15px] sans text-gray-800">
                Invite friends to register on TapToD
              </span>
              <span className="text-gray-500 sans text-sm">
                {completedTasks.task4
                  ? "Completed"
                  : "If conditions are met: 1 person = Rs900.0000"}
              </span>
            </div>
            <HiChevronRight className="ml-auto text-xl text-[#008069]" /> {/* Right Arrow Icon */}
          </Link>
        </div>
      )}
    </div>
  );
};

export default TapToD;
