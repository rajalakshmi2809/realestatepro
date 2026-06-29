import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  MdDashboard, 
  MdOutlineApartment, 
  MdOutlinePeople,
  MdOutlineBuild,
  MdOutlineAccountBalanceWallet,
  MdAdd
} from 'react-icons/md';

const navItems = [
  { path: '/dashboard', name: 'Dashboard', icon: <MdDashboard className="text-xl" /> },
  { path: '/dashboard/properties', name: 'Properties', icon: <MdOutlineApartment className="text-xl" /> },
  { path: '/dashboard/tenants', name: 'Tenants', icon: <MdOutlinePeople className="text-xl" /> },
  { path: '/dashboard/maintenance', name: 'Maintenance', icon: <MdOutlineBuild className="text-xl" /> },
  { path: '/dashboard/financials', name: 'Financials', icon: <MdOutlineAccountBalanceWallet className="text-xl" /> },
];

const Sidebar = () => {
  return (
    <aside className="w-64 bg-[#f8fafc] border-r border-slate-200 h-screen flex flex-col fixed left-0 top-0 z-20">
      <div className="p-6">
        <div className="font-bold text-xl text-slate-800 tracking-tight">
          Portfolio <span className="text-slate-500 font-medium">Pulse</span>
        </div>
        <p className="text-xs text-slate-400 font-medium mt-1 uppercase tracking-wider">Premium Management</p>
      </div>

      <nav className="flex-1 px-4 space-y-1 mt-4">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/dashboard'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive 
                  ? 'bg-blue-50 text-blue-700' 
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`
            }
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* <div className="p-4 mt-auto">
        <button className="btn-primary w-full shadow-md py-2.5">
          <MdAdd className="text-lg" />
          Add Property
        </button>
      </div> */}
    </aside>
  );
};

export default Sidebar;
