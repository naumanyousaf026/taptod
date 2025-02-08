import React, { useState } from 'react';
import Sidebar from './Sidebar';
// import AdminHeader from './AdminHeader';
import Dashboard from './Dashboard';
import User from './User';
import TeamList from './TeamList';
import SettingsPage from './Setting';



const Layout = () => {
  const [section, setSection] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };   

  return (  
    <div className="flex">
      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} setSection={setSection} />

      {/* Backdrop for mobile view */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Main content area */}
      <div className="flex-1 ">
        {/* <AdminHeader toggleSidebar={toggleSidebar} /> */}
        <div className="p-6">
          {/* Conditional rendering of sections */}
          {section === 'dashboard' && <Dashboard />}
          {section === 'user' && <User />}
          {section === 'setting' && <SettingsPage /> } 
          {section === 'account' && <TeamList /> }
          {/* {section === 'Merchant' && <MerchantDetails />}
         */}
        </div>
      </div>
    </div> 
  );
};

export default Layout;
