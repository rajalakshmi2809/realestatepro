import React from "react";

const Footer = () => {
  return (
    // Modern Design: Soft glassmorphism background that perfectly matches the rest of the application
    <footer className="mt-20 bg-white/50 backdrop-blur-lg border-t border-slate-200/50 py-16 shadow-[0_-10px_40px_rgba(0,0,0,0.02)]">
      
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
        
        {/* ======== Brand Section ======== */}
        <div className="lg:col-span-2">
          {/* Awesome gradient text */}
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500 mb-4">
            RealEstate Manager
          </h2>
          <p className="text-slate-500 leading-relaxed max-w-sm font-medium">
            Your premium real estate management platform to track properties, tenants, and finances efficiently. Beautiful design, beginner-friendly logic.
          </p>
        </div>

        {/* ======== Quick Links ======== */}
        <div>
          <h3 className="text-slate-800 font-extrabold mb-5 uppercase tracking-widest text-xs">Quick Links</h3>
          <ul className="space-y-4 font-semibold text-slate-500 text-sm">
            <li className="hover:text-blue-600 cursor-pointer hover:translate-x-1 transition-all">🏠 Dashboard</li>
            <li className="hover:text-blue-600 cursor-pointer hover:translate-x-1 transition-all">🏢 Properties</li>
            <li className="hover:text-blue-600 cursor-pointer hover:translate-x-1 transition-all">👥 Tenants</li>
            <li className="hover:text-blue-600 cursor-pointer hover:translate-x-1 transition-all">🔧 Maintenance</li>
            <li className="hover:text-blue-600 cursor-pointer hover:translate-x-1 transition-all">📈 Financials</li>
          </ul>
        </div>

        {/* ======== Contact Info ======== */}
        <div>
          <h3 className="text-slate-800 font-extrabold mb-5 uppercase tracking-widest text-xs">Contact</h3>
          <ul className="space-y-4 font-semibold text-slate-500 text-sm">
            <li className="flex items-center gap-3">
              <span className="bg-white p-2 rounded-lg shadow-sm">📍</span> 
              Chennai, India
            </li>
            <li className="flex items-center gap-3">
              <span className="bg-white p-2 rounded-lg shadow-sm">📞</span> 
              +91 98765 43210
            </li>
            <li className="flex items-center gap-3">
              <span className="bg-white p-2 rounded-lg shadow-sm">✉️</span> 
              support@realestate.com
            </li>
          </ul>
        </div>

        {/* ======== Social Media ======== */}
        <div>
          <h3 className="text-slate-800 font-extrabold mb-5 uppercase tracking-widest text-xs">Follow Us</h3>
          
          <div className="flex gap-4 text-2xl">
            {/* Beginner trick: We wrap emojis in spans and use simple hover effects to make them interactive */}
            <span className="bg-white p-3 rounded-xl shadow-sm cursor-pointer hover:scale-110 hover:-translate-y-1 transition-all">🌐</span>
            <span className="bg-white p-3 rounded-xl shadow-sm cursor-pointer hover:scale-110 hover:-translate-y-1 transition-all">📸</span>
            <span className="bg-white p-3 rounded-xl shadow-sm cursor-pointer hover:scale-110 hover:-translate-y-1 transition-all">💼</span>
          </div>
        </div>

      </div>

      {/* ======== Bottom Legal ======== */}
      <div className="mt-16 pt-8 border-t border-slate-200/50 text-center">
        <p className="text-slate-400 font-semibold text-xs tracking-widest uppercase">
          © 2026 RealEstate Manager. All rights reserved.
        </p>
      </div>

    </footer>
  );
};

export default Footer;