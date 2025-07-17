import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";


const MainLayout = () => (
  <div className="flex">
    
    <SideBar /> 

    {/* ---------- MAIN SCROLLING AREA ---------- */}
    <main className="ml-53 flex-1 min-h-screen overflow-y-auto bg-gray-100 p-6">
      <div className="bg-white border border-gray-300 rounded-lg shadow-sm p-6">
        <Outlet />
      </div>
    </main>
  </div>
);

export default MainLayout;
