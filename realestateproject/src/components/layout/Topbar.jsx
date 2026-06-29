import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MdSearch, 
  MdNotificationsNone, 
  MdSettings, 
  MdLogout, 
  MdPerson, 
  MdSecurity, 
  MdHelpOutline, 
  MdOutlineMonetizationOn, 
  MdOutlineBuild 
} from 'react-icons/md';

const Topbar = () => {
  const navigate = useNavigate();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (dropdown) => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdown);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-10 w-full sticky top-0">
      <div className="flex items-center">
        <h1 className="text-xl font-bold text-slate-800 tracking-tight ml-64 lg:ml-0 hidden lg:block">
          Estate<span className="font-normal">Curator</span>
        </h1>
      </div>

      <div className="flex-1 max-w-2xl px-6">
        <div className="relative">
          <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
          <input
            type="text"
            placeholder="Search portfolio, analytics, assets..."
            className="w-full bg-slate-100/70 border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium placeholder-slate-400 text-slate-700"
          />
        </div>
      </div>

      <div className="flex items-center gap-4" ref={dropdownRef}>
        {/* Notifications */}
        <div className="relative">
          <button 
            onClick={() => toggleDropdown('notifications')}
            className={`relative p-2 rounded-full transition-colors ${activeDropdown === 'notifications' ? 'bg-slate-100 text-slate-800' : 'text-slate-600 hover:bg-slate-100'}`}
          >
            <MdNotificationsNone className="text-xl" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          
          {activeDropdown === 'notifications' && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden z-50">
              <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <h3 className="font-semibold text-slate-800">Notifications</h3>
                <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">2 New</span>
              </div>
              <div className="max-h-80 overflow-y-auto">
                <div className="p-4 border-b border-slate-50 hover:bg-slate-50 cursor-pointer transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-orange-50 text-orange-600 rounded-full">
                      <MdOutlineBuild className="text-lg" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-800">Maintenance Request</p>
                      <p className="text-xs text-slate-500 mt-1">Plumbing issue reported at Sunset Heights Apt 4B.</p>
                      <p className="text-[10px] text-slate-400 mt-2">10 mins ago</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 border-b border-slate-50 hover:bg-slate-50 cursor-pointer transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-green-50 text-green-600 rounded-full">
                      <MdOutlineMonetizationOn className="text-lg" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-800">Rent Payment Received</p>
                      <p className="text-xs text-slate-500 mt-1">Payment of $1,200 received from John Doe.</p>
                      <p className="text-[10px] text-slate-400 mt-2">1 hour ago</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-3 text-center border-t border-slate-100">
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View All Activity</button>
              </div>
            </div>
          )}
        </div>

        {/* Settings */}
        <div className="relative">
          <button 
            onClick={() => toggleDropdown('settings')}
            className={`p-2 rounded-full transition-colors ${activeDropdown === 'settings' ? 'bg-slate-100 text-slate-800' : 'text-slate-600 hover:bg-slate-100'}`}
          >
            <MdSettings className="text-xl" />
          </button>
          
          {activeDropdown === 'settings' && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden z-50">
              <div className="p-3 border-b border-slate-100 bg-slate-50">
                <h3 className="font-semibold text-slate-800 text-sm">Quick Settings</h3>
              </div>
              <div className="p-2">
                <button className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg transition-colors flex items-center gap-2">
                  <MdPerson className="text-slate-400" /> Account Settings
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg transition-colors flex items-center gap-2">
                  <MdSecurity className="text-slate-400" /> Security & Privacy
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg transition-colors flex items-center gap-2">
                  <MdNotificationsNone className="text-slate-400" /> Notification Preferences
                </button>
                <div className="h-px bg-slate-100 my-1"></div>
                <button className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg transition-colors flex items-center gap-2">
                  <MdHelpOutline className="text-slate-400" /> Help & Support
                </button>
              </div>
            </div>
          )}
        </div>
        
        <div className="h-8 w-px bg-slate-200 mx-1"></div>
        
        {/* Profile */}
        <div className="relative flex items-center gap-2">
          <div 
            onClick={() => toggleDropdown('profile')}
            className={`flex items-center gap-3 p-1 pr-3 rounded-full cursor-pointer transition-colors ${activeDropdown === 'profile' ? 'bg-slate-100' : 'hover:bg-slate-50'}`}
          >
            <div className="hidden md:flex flex-col items-end">
              <span className="text-sm font-semibold text-slate-700 leading-none">Alex Sterling</span>
              <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider mt-1">Portfolio Manager</span>
            </div>
            <img 
              src="https://api.dicebear.com/9.x/avataaars/svg?seed=Alex&backgroundColor=b6e3f4" 
              alt="Profile Avatar" 
              className="w-9 h-9 rounded-full bg-slate-200 object-cover border border-slate-200 shadow-sm"
            />
          </div>
          
          {activeDropdown === 'profile' && (
            <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden z-50">
              <div className="p-4 border-b border-slate-100 flex items-center gap-3 bg-slate-50">
                <img 
                  src="https://api.dicebear.com/9.x/avataaars/svg?seed=Alex&backgroundColor=b6e3f4" 
                  alt="Profile Avatar" 
                  className="w-12 h-12 rounded-full bg-slate-200 object-cover border border-slate-200 shadow-sm"
                />
                <div>
                  <p className="font-semibold text-slate-800">Alex Sterling</p>
                  <p className="text-xs text-slate-500">alex.s@estatecurator.com</p>
                </div>
              </div>
              <div className="p-2">
                <button className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg transition-colors flex items-center gap-2">
                  <MdPerson className="text-slate-400" /> My Profile
                </button>
                <div className="h-px bg-slate-100 my-1"></div>
                <button 
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2"
                >
                  <MdLogout className="text-red-400" /> Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
