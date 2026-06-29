import React, { useState } from 'react';
import { tenants as initialTenants } from '../../data/mockData';
import { MdOutlineEmail, MdOutlinePhone, MdOutlineChatBubbleOutline, MdOutlineInsertDriveFile, MdFilterList, MdAdd, MdSearch, MdMoreVert, MdClose } from 'react-icons/md';

const Tenants = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // 1. Beginner logic: Manage the list of tenants with useState
  const [tenantList, setTenantList] = useState(initialTenants);
  
  // 2. Beginner logic: State for showing/hiding the Add Tenant form
  const [showAddForm, setShowAddForm] = useState(false);
  
  // 3. Beginner logic: State for the new tenant input fields
  const [newTenant, setNewTenant] = useState({
    name: '',
    email: '',
    phone: '',
    property: 'Luxury Villa',
    rentAmount: '$2,000'
  });

  // Handle typing in the input fields
  const handleInputChange = (e) => {
    setNewTenant({ ...newTenant, [e.target.name]: e.target.value });
  };

  // Handle adding a new tenant
  const handleAddTenant = (e) => {
    e.preventDefault();
    
    // Create a new tenant object (assigning some mock default values for simplicity)
    const tenantToAdd = {
      id: Date.now(),
      name: newTenant.name,
      email: newTenant.email,
      phone: newTenant.phone,
      property: newTenant.property,
      rentAmount: newTenant.rentAmount,
      status: 'Active', // Default status
      since: new Date().getFullYear().toString(),
      avatar: 'https://i.pravatar.cc/150?u=' + Date.now(), // Generate random avatar
      unit: 'Unit ' + Math.floor(Math.random() * 900 + 100),
      lastPaymentStatus: 'Paid',
      lastPaymentDate: 'Just Now'
    };
    
    // Add to the top of our state list
    setTenantList([tenantToAdd, ...tenantList]);
    
    // Trigger notification interaction
    alert(`Success! ${newTenant.name} has been added as a new tenant to ${newTenant.property}. An onboarding email has been sent!`);
    
    // Reset form and close modal
    setShowAddForm(false);
    setNewTenant({ name: '', email: '', phone: '', property: 'Luxury Villa', rentAmount: '$2,000' });
  };

  const handleActionClick = (action, name) => {
    // Beginner level interaction mapping based on action
    if (action === 'Contact') {
      alert(`Opening chat window for ${name}... (Interaction Triggered!)`);
    } else if (action === 'View Documents') {
      alert(`Fetching lease agreement and documents for ${name}...`);
    } else if (action === 'Filter options') {
      alert(`Opening advanced filter panel (Feature coming soon!)`);
    } else {
      alert(`${action} triggered for ${name}`);
    }
  };

  // Filter based on search term
  const filteredTenants = tenantList.filter(tenant => 
    tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    tenant.property.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fade-in relative z-10 w-full">
      {/* Premium Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-indigo-900 shadow-2xl relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-[-50%] left-[-10%] w-96 h-96 bg-fuchsia-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-40"></div>
        <div className="absolute bottom-[-50%] right-[-10%] w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-40"></div>
        
        <div className="relative z-10">
          <h2 className="text-sm font-black text-cyan-400 uppercase tracking-widest mb-1 drop-shadow-md">Portfolio Database</h2>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-2 drop-shadow-lg leading-tight">Tenant Directory</h1>
          <p className="text-indigo-200 font-medium text-lg max-w-lg">Oversee resident lifecycle, lease health, and communication channels with state-of-the-art tools.</p>
        </div>
        
        <div className="flex items-center gap-3 relative z-10 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold transition-all backdrop-blur-md" onClick={() => handleActionClick('Filter options', '')}>
            <MdFilterList className="text-xl" />
            Filter
          </button>
          <button 
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-900 font-bold transition-all shadow-lg hover:shadow-cyan-500/30 transform hover:-translate-y-0.5" 
            onClick={() => setShowAddForm(true)}
          >
            <MdAdd className="text-xl" />
            New Tenant
          </button>
        </div>
      </div>

      {/* Beginner Level Modal for Adding Tenant */}
      {showAddForm && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] p-8 w-full max-w-xl shadow-2xl relative">
            <button 
              onClick={() => setShowAddForm(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-700 transition-colors"
            >
              <MdClose className="text-3xl" />
            </button>
            
            <h2 className="text-3xl font-black text-slate-800 mb-6">Add New Tenant</h2>
            
            <form onSubmit={handleAddTenant} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Tenant Name</label>
                <input 
                  type="text" 
                  name="name" 
                  value={newTenant.name} 
                  onChange={handleInputChange} 
                  required 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 bg-slate-50" 
                  placeholder="e.g. John Doe" 
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
                  <input 
                    type="email" 
                    name="email" 
                    value={newTenant.email} 
                    onChange={handleInputChange} 
                    required 
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 bg-slate-50" 
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Phone</label>
                  <input 
                    type="text" 
                    name="phone" 
                    value={newTenant.phone} 
                    onChange={handleInputChange} 
                    required 
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 bg-slate-50" 
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Property</label>
                  <input 
                    type="text" 
                    name="property" 
                    value={newTenant.property} 
                    onChange={handleInputChange} 
                    required 
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 bg-slate-50" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Rent Amount</label>
                  <input 
                    type="text" 
                    name="rentAmount" 
                    value={newTenant.rentAmount} 
                    onChange={handleInputChange} 
                    required 
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 bg-slate-50" 
                  />
                </div>
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold py-4 rounded-xl shadow-lg transition-transform hover:-translate-y-1 mt-4"
              >
                Save & Onboard Tenant
              </button>
            </form>
          </div>
        </div>
      )}

      {/* KPI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Total Tenants', value: tenantList.length, sub: 'Across all properties', icon: '👥', color: 'from-blue-500 to-indigo-600' },
          { title: 'Expiring Soon', value: tenantList.filter(t => t.status === 'Expiring Soon').length, sub: 'Needs attention', icon: '⏳', color: 'from-amber-400 to-orange-500' },
          { title: 'Avg. Occupancy', value: '96.4%', sub: 'Premium Portfolios', icon: '🏢', color: 'from-emerald-400 to-teal-500' }
        ].map((kpi, index) => (
          <div key={index} className="group relative p-6 rounded-3xl bg-white border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-indigo-100 transition-all duration-300 transform hover:-translate-y-1">
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${kpi.color} opacity-[0.03] rounded-bl-full group-hover:opacity-[0.06] transition-all`}></div>
            <div className="flex justify-between items-start mb-4">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${kpi.color} text-white flex items-center justify-center text-2xl shadow-lg`}>
                {kpi.icon}
              </div>
            </div>
            <div>
              <p className="text-sm text-slate-500 font-bold mb-1 tracking-wide uppercase">{kpi.title}</p>
              <h2 className="text-4xl font-black text-slate-800 tracking-tight">{kpi.value}</h2>
              <p className="text-sm font-semibold text-slate-400 mt-2">{kpi.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Control Bar (Search) */}
      <div className="flex items-center space-x-4 mb-4">
        <div className="relative w-full max-w-xl group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <MdSearch className="text-slate-400 text-2xl group-focus-within:text-indigo-500 transition-colors" />
          </div>
          <input
            type="text"
            className="block w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-slate-100 bg-white placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-700 font-medium transition-all shadow-sm"
            placeholder="Search by tenant name or property..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b-2 border-slate-100">
                <th className="p-5 text-xs font-black text-slate-400 uppercase tracking-widest">Tenant Info</th>
                <th className="p-5 text-xs font-black text-slate-400 uppercase tracking-widest hidden md:table-cell">Contact Details</th>
                <th className="p-5 text-xs font-black text-slate-400 uppercase tracking-widest">Property & Rent</th>
                <th className="p-5 text-xs font-black text-slate-400 uppercase tracking-widest">Lease Status</th>
                <th className="p-5 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTenants.length > 0 ? (
                filteredTenants.map((tenant) => (
                  <tr key={tenant.id} className="hover:bg-indigo-50/30 transition-colors group">
                    <td className="p-5">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <img src={tenant.avatar} alt={tenant.name} className="w-12 h-12 rounded-full border-2 border-white shadow-md bg-slate-100 group-hover:scale-105 transition-transform" />
                          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${tenant.status === 'Active' ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors text-base">{tenant.name}</p>
                          <p className="text-xs uppercase font-bold text-slate-400 tracking-wider mt-0.5">Since {tenant.since}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-5 hidden md:table-cell">
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                          <MdOutlineEmail className="text-slate-400" /> {tenant.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                          <MdOutlinePhone className="text-slate-400" /> {tenant.phone}
                        </div>
                      </div>
                    </td>
                    <td className="p-5">
                      <div className="flex flex-col">
                        <p className="font-bold text-slate-800 text-sm">{tenant.property}</p>
                        <p className="text-xs text-slate-500 font-medium mb-1">{tenant.unit}</p>
                        <span className="inline-block mt-1 font-black text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-md text-sm self-start">
                          {tenant.rentAmount} <span className="text-xs font-semibold text-indigo-400">/mo</span>
                        </span>
                      </div>
                    </td>
                    <td className="p-5">
                       <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                        tenant.status === 'Active' 
                          ? 'bg-emerald-100 text-emerald-700' 
                          : 'bg-amber-100 text-amber-700'
                       }`}>
                         {tenant.status}
                       </span>
                       <div className="mt-2 text-xs font-semibold text-slate-500">
                         Paid: <span className={tenant.lastPaymentStatus === 'Past Due' ? 'text-rose-500 font-bold' : 'text-slate-700'}>{tenant.lastPaymentDate}</span>
                       </div>
                    </td>
                    <td className="p-5 text-right">
                      <div className="flex justify-end gap-2 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleActionClick('Contact', tenant.name)}
                          className="p-2.5 hover:bg-slate-100 hover:text-indigo-600 rounded-xl transition-all hover:scale-110 shadow-sm"
                          title="Contact Tenant"
                        >
                          <MdOutlineChatBubbleOutline className="text-lg" />
                        </button>
                        <button 
                          onClick={() => handleActionClick('View Documents', tenant.name)}
                          className="p-2.5 hover:bg-slate-100 hover:text-indigo-600 rounded-xl transition-all hover:scale-110 shadow-sm"
                          title="View Documents"
                        >
                          <MdOutlineInsertDriveFile className="text-lg" />
                        </button>
                        <button 
                          onClick={() => handleActionClick('More Options', tenant.name)}
                          className="p-2.5 hover:bg-slate-100 hover:text-indigo-600 rounded-xl transition-all hover:scale-110 shadow-sm"
                        >
                          <MdMoreVert className="text-lg" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-16 text-center">
                    <div className="mx-auto w-16 h-16 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center mb-4">
                      <MdSearch className="text-3xl" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-700 mb-1">No matching tenants</h3>
                    <p className="text-sm font-medium text-slate-500 mb-4">We couldn't find anyone matching "{searchTerm}".</p>
                    <button className="text-indigo-600 text-sm font-bold hover:underline" onClick={() => setSearchTerm('')}>Clear search filter</button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          
          <div className="p-5 border-t border-slate-100 bg-slate-50/50 flex justify-between items-center text-sm font-bold text-slate-500">
            <span>Showing <span className="text-slate-800">{filteredTenants.length}</span> of <span className="text-slate-800">{tenantList.length}</span> matching tenants</span>
          </div>
        </div>
      </div>

      {/* Expert Tip - Premium design */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-indigo-100 rounded-3xl p-6 md:p-8 flex items-start gap-6 relative overflow-hidden">
        <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-gradient-to-l from-white/40 to-transparent"></div>
        <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-blue-600 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-indigo-200">
           <span className="text-2xl">💡</span>
        </div>
        <div className="flex-1 relative z-10">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
             <h4 className="font-extrabold text-slate-800 text-lg tracking-tight">Expert Tip: Lease Renewals</h4>
             <button className="text-indigo-600 font-bold text-sm tracking-wide hover:text-indigo-800 transition bg-indigo-100 hover:bg-indigo-200 px-4 py-2 rounded-xl" onClick={() => handleActionClick("Manage Templates", "Settings")}>Manage Templates</button>
          </div>
          <p className="text-base text-slate-600 mt-2 font-medium leading-relaxed max-w-4xl">
            Automated renewal reminders for <span className="text-slate-900 font-bold">Priya Lakshmi</span> will trigger soon. You can customize the messaging template in <strong className="font-bold text-indigo-600 cursor-pointer hover:underline" onClick={() => handleActionClick("Communication Settings", "Navigating")}>Communication Settings</strong>.
          </p>
        </div>
      </div>

    </div>
  );
};

export default Tenants;
