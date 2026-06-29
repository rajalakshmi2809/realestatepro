import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MdHomeWork, MdPeopleOutline, MdBuild, MdTrendingUp, 
  MdArrowUpward, MdOutlineAttachMoney, MdMoreVert, MdCheckCircle
} from 'react-icons/md';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

import { properties, tenants, maintenanceTickets, financialLedger } from '../../data/mockData';

// Mock chart data
const revenueData = [
  { name: 'Jan', revenue: 34000 },
  { name: 'Feb', revenue: 38000 },
  { name: 'Mar', revenue: 35000 },
  { name: 'Apr', revenue: 42000 },
  { name: 'May', revenue: 39000 },
  { name: 'Jun', revenue: 46000 },
  { name: 'Jul', revenue: 52000 },
];

const Dashboard = () => {
  const navigate = useNavigate();


  const activeTenantsCount = tenants.filter(t => t.status === 'Active').length;
  const highPriorityTickets = maintenanceTickets.filter(t => t.priority.includes('HIGH')).length;
  const totalRevenue = financialLedger
    .filter(item => item.type === 'positive')
    .reduce((sum, item) => {
      const amountStr = item.amount.replace(/[^0-9]/g, '');
      return sum + parseInt(amountStr || '0', 10);
    }, 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto pb-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-700 p-8 rounded-3xl text-white shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform duration-700"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full blur-2xl transform -translate-x-1/2 translate-y-1/2 group-hover:scale-110 transition-transform duration-700"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2 drop-shadow-sm">Portfolio Overview</h1>
          <p className="text-blue-100 font-medium text-lg max-w-xl">Here's what's happening with your properties today. Stay updated with your real-time metrics.</p>
        </div>
        <button className="relative z-10 bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white px-6 py-3.5 rounded-xl font-bold transition-all duration-300 shadow-lg flex items-center gap-2 hover:-translate-y-1">
          <MdOutlineAttachMoney className="text-2xl" /> Generate Report
        </button>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Properties" 
          value={properties.length} 
          trend="+2 this month" 
          icon={<MdHomeWork className="text-3xl text-indigo-500" />} 
          color="bg-indigo-50" 
        />
        <StatCard 
          title="Active Tenants" 
          value={activeTenantsCount} 
          trend="98% occupancy" 
          icon={<MdPeopleOutline className="text-3xl text-emerald-500" />} 
          color="bg-emerald-50" 
        />
        <StatCard 
          title="Monthly Revenue" 
          value={`₹${(totalRevenue/1000).toFixed(1)}k`} 
          trend="+12.5% vs last month" 
          icon={<MdTrendingUp className="text-3xl text-blue-500" />} 
          color="bg-blue-50" 
        />
        <StatCard 
          title="Urgent Issues" 
          value={highPriorityTickets} 
          trend="Requires attention" 
          icon={<MdBuild className="text-3xl text-rose-500" />} 
          color="bg-rose-50" 
        />
      </div>

      {/* Charts & Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Revenue Analytics</h2>
              <p className="text-sm font-medium text-slate-500 mt-1">Monthly cash flow breakdown</p>
            </div>
            <select className="bg-slate-50 border border-slate-200 text-slate-600 font-medium text-sm rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow shadow-sm cursor-pointer hover:bg-slate-100">
              <option>Last 7 Months</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="flex-1 min-h-[300px] w-full mt-auto">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 13, fontWeight: 500}} dy={15} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 13, fontWeight: 500}} tickFormatter={(value) => `₹${value / 1000}k`} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)', padding: '12px 20px' }}
                  itemStyle={{ color: '#4f46e5', fontWeight: '800', fontSize: '16px' }}
                  labelStyle={{ color: '#64748b', fontWeight: '600', marginBottom: '4px' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={4} fillOpacity={1} fill="url(#colorRevenue)" animationDuration={1500} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Transactions</h2>
              <p className="text-sm font-medium text-slate-500 mt-1">Latest financial activities</p>
            </div>
            <button className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"><MdMoreVert className="text-xl" /></button>
          </div>
          <div className="space-y-5 flex-1">
            {financialLedger.slice(0, 5).map((tx) => (
              <div key={tx.id} className="flex items-center justify-between group p-2 -mx-2 rounded-xl hover:bg-slate-50 transition-colors cursor-default">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 shadow-sm ${tx.type === 'positive' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                    {tx.type === 'positive' ? <MdArrowUpward className="text-xl" /> : <MdTrendingUp className="rotate-180 text-xl" />}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-slate-800 line-clamp-1 group-hover:text-indigo-600 transition-colors">{tx.description}</p>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">{tx.date}</p>
                  </div>
                </div>
                <div className={`font-extrabold text-sm tracking-tight ${tx.type === 'positive' ? 'text-emerald-600' : 'text-slate-800'}`}>
                  {tx.amount}
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-3.5 rounded-xl border-2 border-slate-100 text-slate-600 font-bold text-sm hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-100 transition-all duration-300">
            View Complete Ledger
          </button>
        </div>

      </div>

      {/* Bottom Section: Properties & Maintenance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Properties List */}
        <div className="bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Top Properties</h2>
              <p className="text-sm font-medium text-slate-500 mt-1">Highest performing assets</p>
            </div>
            <button className="text-indigo-600 text-sm font-bold hover:text-indigo-800 transition-colors bg-indigo-50 px-4 py-2 rounded-xl hover:bg-indigo-100">View Portfolio</button>
          </div>
          <div className="space-y-4">
            {properties.slice(0, 3).map((prop) => (
              <div key={prop.id} className="flex items-center gap-5 p-3 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all duration-300 group cursor-pointer shadow-sm hover:shadow-md">
                <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 relative shadow-inner">
                  <img src={prop.images[0]} alt={prop.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
                </div>
                <div className="flex-1">
                  <h3 className="font-extrabold text-slate-800 text-base group-hover:text-indigo-600 transition-colors">{prop.name}</h3>
                  <p className="text-xs text-slate-500 font-semibold mt-1 flex items-center gap-1">
                    <MdHomeWork className="text-slate-400" /> {prop.address}
                  </p>
                </div>
                <div className="text-right pr-2">
                  <p className="font-extrabold text-indigo-600 text-base">{prop.price}</p>
                  <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest bg-slate-100 inline-block px-2 py-0.5 rounded-md">{prop.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Maintenance Tasks */}
        <div className="bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Recent Maintenance</h2>
              <p className="text-sm font-medium text-slate-500 mt-1">Latest tickets & requests</p>
            </div>
            <button className="text-indigo-600 text-sm font-bold hover:text-indigo-800 transition-colors bg-indigo-50 px-4 py-2 rounded-xl hover:bg-indigo-100">View All</button>
          </div>
          <div className="space-y-4">
            {maintenanceTickets.slice(0, 3).map((ticket) => (
              <div key={ticket.id} className="p-5 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-lg transition-all duration-300 cursor-pointer group hover:-translate-y-1">
                <div className="flex justify-between items-start mb-3">
                  <span className={`text-[10px] font-extrabold px-3 py-1.5 rounded-lg uppercase tracking-wider shadow-sm ${
                    ticket.priority.includes('HIGH') ? 'bg-rose-100 text-rose-700 border border-rose-200' : 
                    ticket.priority.includes('MEDIUM') ? 'bg-amber-100 text-amber-700 border border-amber-200' : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                  }`}>
                    {ticket.priority}
                  </span>
                  <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-md">{ticket.date}</span>
                </div>
                <h3 className="font-bold text-slate-800 text-base mb-1.5 group-hover:text-indigo-600 transition-colors line-clamp-1">{ticket.title}</h3>
                <p className="text-sm text-slate-500 font-medium flex items-center gap-1.5">
                  <MdBuild className="text-slate-400" />
                  <span className="truncate">{ticket.property}</span> 
                  <span className="text-slate-300 mx-1">•</span> 
                  <span className="text-slate-600">{ticket.assignedTo}</span>
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

// Reusable Stat Card Component
const StatCard = ({ title, value, trend, icon, color }) => (
  <div className="bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-3xl p-6 md:p-7 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group cursor-default relative overflow-hidden">
    <div className="absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br from-white/40 to-transparent rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
    <div className="flex justify-between items-start mb-6 relative z-10">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 shadow-sm ${color}`}>
        {icon}
      </div>
      <span className="bg-slate-50 border border-slate-100 text-slate-600 text-xs font-bold px-2.5 py-1.5 rounded-lg shadow-sm group-hover:bg-white transition-colors">{trend}</span>
    </div>
    <div className="relative z-10">
      <p className="text-sm font-bold text-slate-500 mb-1.5">{title}</p>
      <h3 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight group-hover:text-indigo-600 transition-colors">{value}</h3>
    </div>
  </div>
);

export default Dashboard;
