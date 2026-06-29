import React, { useState } from 'react';
// Import our mock data containing the tickets
import { maintenanceTickets as initialTickets } from '../../data/mockData';
import { FaTimes } from 'react-icons/fa';

const Maintenance = () => {
  // 1. Beginner Logic: useState to keep track of what the user types in the search bar
  const [searchTerm, setSearchTerm] = useState('');
  
  // State for all tickets
  const [tickets, setTickets] = useState(initialTickets);
  
  // State for the modal form
  const [showForm, setShowForm] = useState(false);
  
  // State for the new complaint data
  const [newComplaint, setNewComplaint] = useState({
    title: '',
    property: '123 Main St',
    priority: 'MEDIUM'
  });

  // Handle typing in the form
  const handleInputChange = (e) => {
    setNewComplaint({ ...newComplaint, [e.target.name]: e.target.value });
  };

  // 2. Beginner Logic: Handle adding a new complaint with interactions
  const handleFileComplaint = (e) => {
    e.preventDefault();
    
    // Check if it's a lift issue to assign to specific person
    let assignedPerson = 'General Maintenance Team';
    if (newComplaint.title.toLowerCase().includes('lift') || newComplaint.title.toLowerCase().includes('elevator')) {
      assignedPerson = 'Lift Technician (Mr. John)';
    } else if (newComplaint.title.toLowerCase().includes('plumb') || newComplaint.title.toLowerCase().includes('water')) {
      assignedPerson = 'Plumber';
    } else if (newComplaint.title.toLowerCase().includes('electric') || newComplaint.title.toLowerCase().includes('light')) {
      assignedPerson = 'Electrician';
    }

    // Create a new ticket object
    const newTicket = {
      id: Date.now(),
      title: newComplaint.title,
      property: newComplaint.property,
      priority: newComplaint.priority,
      status: 'OPEN',
      assignedTo: assignedPerson,
      date: new Date().toLocaleDateString()
    };

    // Add it to our state so it updates the screen!
    setTickets([newTicket, ...tickets]);
    
    // Interaction/Notification: Tell the user that the specific person has been notified
    alert(`Success! Complaint logged. \nNotification has been sent to: ${assignedPerson} regarding your issue.`);
    
    // Close form and reset
    setShowForm(false);
    setNewComplaint({ title: '', property: '123 Main St', priority: 'MEDIUM' });
  };

  // 3. Beginner Logic: Filter the tickets based on the search term
  const filteredTickets = tickets.filter((ticket) =>
    ticket.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-indigo-50 via-white to-sky-50 relative">
      
      {/* Header & Complaint Setup Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-800 drop-shadow-sm mb-2">
            Maintenance & Complaints
          </h1>
          <p className="text-slate-500 text-lg font-medium">
            Manage all property issues and log new complaints easily.
          </p>
        </div>
        
        <button 
          onClick={() => setShowForm(true)}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-full shadow-lg shadow-red-200 transition-transform transform hover:-translate-y-1 flex items-center"
        >
          <span className="text-xl mr-2">+</span> File Complaint
        </button>
      </div>

      {/* Modal for Filing Complaint */}
      {showForm && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] p-8 w-full max-w-lg shadow-2xl relative">
            <button 
              onClick={() => setShowForm(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-700 transition-colors"
            >
              <FaTimes className="text-2xl" />
            </button>
            
            <h2 className="text-3xl font-black text-slate-800 mb-6">File a Complaint</h2>
            
            <form onSubmit={handleFileComplaint} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Issue / Complaint (e.g., Lift is not working)</label>
                <input 
                  type="text" 
                  name="title" 
                  value={newComplaint.title} 
                  onChange={handleInputChange} 
                  required 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500" 
                  placeholder="Describe the issue..." 
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Property</label>
                <input 
                  type="text" 
                  name="property" 
                  value={newComplaint.property} 
                  onChange={handleInputChange} 
                  required 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500" 
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Priority</label>
                <select 
                  name="priority" 
                  value={newComplaint.priority} 
                  onChange={handleInputChange} 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                </select>
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg transition-transform hover:-translate-y-1"
              >
                Submit Complaint
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Search Bar Section using simple component state */}
      <div className="mb-10 max-w-2xl">
        <input 
          type="text" 
          placeholder="Search for an issue or title..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-4 rounded-2xl border border-slate-200 bg-white/70 backdrop-blur-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 shadow-sm text-lg text-slate-700 transition-all font-medium"
        />
      </div>

      {/* 4. Beginner Logic: The map function to loop over filtered tickets and display them */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTickets.map((ticket) => (
          
          /* Modern Design: Glassmorphism look with semi-transparent background, blur, and large borders */
          <div key={ticket.id} className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.1)] transition-all flex flex-col justify-between">
            
            <div className="flex justify-between items-start mb-6">
              {/* Conditional styling based on priority */}
              <span className={`px-4 py-1.5 text-xs font-bold rounded-xl uppercase tracking-widest ${
                ticket.priority.includes('HIGH') ? 'bg-red-100 text-red-700 shadow-inner' :
                ticket.priority.includes('MEDIUM') ? 'bg-orange-100 text-orange-700 shadow-inner' :
                'bg-green-100 text-green-700 shadow-inner'
              }`}>
                {ticket.priority}
              </span>
              <span className="text-slate-400 font-bold text-xs bg-slate-100/50 px-3 py-1 rounded-lg">
                {ticket.date}
              </span>
            </div>

            <h2 className="text-xl font-bold text-slate-800 mb-6 leading-relaxed line-clamp-2">
              {ticket.title}
            </h2>
            
            <div className="bg-white/50 p-4 rounded-2xl border border-slate-100/50 mb-6 mt-auto">
              <p className="text-slate-500 text-sm mb-3 flex justify-between">
                <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Property</span> 
                <span className="font-semibold text-slate-700">{ticket.property}</span>
              </p>
              <p className="text-slate-500 text-sm flex justify-between">
                <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Assigned To</span> 
                <span className="font-semibold text-slate-700">{ticket.assignedTo}</span>
              </p>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-slate-100/50">
              <span className="font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-xl text-sm">
                {ticket.status}
              </span>
              
              <button 
                onClick={() => alert(`Sending a quick reminder notification to ${ticket.assignedTo} for the issue at ${ticket.property}!`)}
                className="text-white bg-slate-800 hover:bg-slate-900 font-bold py-2 px-5 rounded-xl shadow-md transition-colors text-sm"
              >
                Remind
              </button>
            </div>
            
          </div>
        ))}
        
        {/* If no tickets match the search, show a friendly message */}
        {filteredTickets.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl text-slate-600 font-bold">No complaints found.</h3>
            <p className="text-slate-400 mt-2">Try searching with a different keyword!</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default Maintenance;
