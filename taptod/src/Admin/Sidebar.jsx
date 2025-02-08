import { FaUserCircle } from "react-icons/fa";
import { CiGrid41 } from "react-icons/ci";
import { FaWhatsapp } from 'react-icons/fa';
import { FaRegUser } from "react-icons/fa";
import { TbSettings2 } from "react-icons/tb";
import { FiLogOut } from "react-icons/fi";
import { FaMoon, FaSun } from "react-icons/fa";

const Sidebar = ({ darkMode, toggleDarkMode, setSection }) => {
  return (
    <aside
      className={`w-20 ${darkMode ? "bg-gray-800" : "bg-white"} 
        shadow-md flex flex-col items-center py-4 space-y-6 
        transform transition-all duration-300 ease-in-out 
        hover:scale-105 hover:shadow-2xl`}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Sidebar Icons */}
      <FaUserCircle
        className="text-4xl text-gray-600 cursor-pointer transform transition-transform duration-300 hover:rotate-12"
        onClick={() => setSection('dashboard')}
      />
      <CiGrid41
        className="text-3xl text-gray-500 cursor-pointer transform transition-transform duration-300 hover:rotate-12"
        onClick={() => setSection('dashboard')}
      />
      <FaWhatsapp
        className="text-3xl text-gray-500 cursor-pointer transform transition-transform duration-300 hover:rotate-12"
        onClick={() => setSection('account')}
      />
      <FaRegUser
        className="text-3xl text-gray-500 cursor-pointer transform transition-transform duration-300 hover:rotate-12"
        onClick={() => setSection('user')}
      />
      <TbSettings2
        className="text-3xl text-gray-500 cursor-pointer transform transition-transform duration-300 hover:rotate-12"
        onClick={() => setSection('setting')}
      />
      <button
        onClick={toggleDarkMode}
        className="text-3xl transform transition-transform duration-300 hover:scale-125"
      >
        {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-400" />}
      </button>
      <FiLogOut
        className="text-3xl text-gray-500 cursor-pointer transform transition-transform duration-300 hover:rotate-12"
        onClick={() => setSection('logout')}
      />
    </aside>
  );
};

export default Sidebar;
