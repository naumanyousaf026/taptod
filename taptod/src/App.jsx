import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./component/index/Home"; // Your Home component
import NavigationBar from "./component/Header"; // Assuming NavigationBar is in `component/Header`
import Invite from "./component/invite/Invite";
import Activity from "./component/activity/Activity";
import Profile from "./component/me/profile";
import "./App.css"
import State from "./component/state/state";

const App = () => {
  return (
    <div>
      {/* Routes for Pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Add additional pages here */}
  
        <Route path="/state" element={<State />} />
        <Route path="/invite" element={<Invite />} />
        <Route path="/activity" element={<Activity />} />
      <Route path="/profile" element={<Profile />} />            
      </Routes>

      {/* Navigation Bar */}
      <NavigationBar />
    </div>
  );
};

export default App;
