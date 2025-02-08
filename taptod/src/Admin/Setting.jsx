import { useState } from "react";
import { FiEdit, FiUpload, FiTrash2, FiMoreHorizontal } from "react-icons/fi";

const SettingsPage = () => {
  const [theme, setTheme] = useState("Light mode");
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-1/4 bg-white p-6 border-r">
        <h2 className="text-lg font-semibold mb-4">Settings</h2>
        <ul className="space-y-2">
          <li className="text-blue-600 font-medium">General</li>
          <li className="text-gray-600">Notifications</li>
          <li className="text-gray-600">Billing plans</li>
          <li className="text-gray-600">Login & security</li>
          <li className="text-gray-600">Members</li>
          <li className="text-gray-600">User roles</li>
        </ul>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center gap-4 mb-6">
            <img
              src="https://via.placeholder.com/80"
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover"
            />
            <div>
              <button className="text-gray-500 hover:text-red-500"><FiTrash2 /></button>
              <button className="ml-2 bg-gray-200 px-3 py-1 rounded-lg flex items-center gap-1">
                <FiUpload /> Upload
              </button>
            </div>
          </div>
          
          {/* User Info Sections */}
          {[
            { label: "Name", value: "Alex Jackson" },
            { label: "Contacts", value: "Phone: +123123217923\nEmail: finalui@yandex.com" },
            { label: "Social media", value: "linkedin.com/company/finalui\ndribbble.com/final-ui" },
            { label: "Language & currency", value: "English, USD" }
          ].map((item, index) => (
            <div key={index} className="py-4 border-b flex justify-between items-center">
              <div>
                <h3 className="text-sm font-semibold">{item.label}</h3>
                <p className="text-gray-600 whitespace-pre-line">{item.value}</p>
              </div>
              <button className="text-blue-500"><FiEdit /></button>
            </div>
          ))}

          {/* Theme Selector */}
          <div className="py-4 border-b flex justify-between items-center">
            <h3 className="text-sm font-semibold">Theme</h3>
            <select
              className="border p-2 rounded-lg"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            >
              <option>Light mode</option>
              <option>Dark mode</option>
            </select>
          </div>
          
          {/* Integration */}
          <div className="py-4 flex justify-between items-center">
            <h3 className="text-sm font-semibold">Integration</h3>
            <div className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-lg">
              <span>Connected</span>
              <FiMoreHorizontal />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;
