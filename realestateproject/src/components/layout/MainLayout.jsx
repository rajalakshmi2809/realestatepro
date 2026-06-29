import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Footer from '../Footer';

const MainLayout = () => {
  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-64 min-h-screen">
        <Topbar />
        
        <main className="flex-1 p-6">
          <Outlet />
        </main>
        
        {/* Footer sits naturally at the bottom of the right-hand content area */}
        <Footer />
      </div>
     
    </div>
  );
};

export default MainLayout;
