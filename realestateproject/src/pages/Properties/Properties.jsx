import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { properties as initialProperties } from '../../data/mockData';
import { FaMapMarkerAlt, FaBed, FaVectorSquare, FaTag, FaTimes } from 'react-icons/fa';
import { MdOutlineRealEstateAgent } from 'react-icons/md';

const Properties = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');

  // Basic Beginner Level State for managing the properties list and the form
  const [propertyList, setPropertyList] = useState(initialProperties);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProperty, setNewProperty] = useState({
    name: '', type: 'HOUSE', address: '', bhk: '', sqft: '', price: '', status: 'READY TO MOVE'
  });

  // Handle typing in the inputs
  const handleInputChange = (e) => {
    setNewProperty({ ...newProperty, [e.target.name]: e.target.value });
  };

  // Handle submitting the form
  const handleAddProperty = (e) => {
    e.preventDefault();
    const propertyToAdd = {
      ...newProperty,
      id: Date.now(), // Create a unique ID for the new property
      images: ['https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'] // Placeholder image
    };
    
    // Add the new property to the top of the list
    setPropertyList([propertyToAdd, ...propertyList]);
    
    // Close the modal and reset the form
    setShowAddForm(false);
    setNewProperty({ name: '', type: 'HOUSE', address: '', bhk: '', sqft: '', price: '', status: 'READY TO MOVE' });
  };

  const filteredProperties = propertyList.filter((property) => {
    const matchesSearch = property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'All' || property.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="p-6 md:p-10 space-y-10 bg-slate-50 min-h-screen font-sans">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-gradient-to-br from-slate-900 via-indigo-900 to-blue-900 p-8 md:p-10 rounded-[2.5rem] shadow-2xl shadow-blue-900/20 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>

        <div className="relative z-10 w-full md:w-auto">
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight flex items-center gap-4 mb-3">
            <span className="p-3.5 bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 shadow-inner">
              <MdOutlineRealEstateAgent className="text-blue-300" />
            </span>
            Premium Estates
          </h1>
          <p className="text-blue-200/90 font-medium text-lg ml-2">Curated listings for your distinguished lifestyle</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 relative z-10 w-full md:w-auto mt-6 md:mt-0">
          <input
            type="text"
            placeholder="Search properties..."
            className="px-6 py-4 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/10 text-white placeholder-blue-200/60 backdrop-blur-md transition-all font-medium sm:w-72 shadow-inner"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="px-6 py-4 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-800 cursor-pointer font-bold shadow-xl"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="All">All Property Types</option>
            <option value="APARTMENT">Luxury Apartments</option>
            <option value="VILLA">Exclusive Villas</option>
            <option value="HOUSE">Premium Houses</option>
          </select>
          {/* Button to show the Add Property Modal */}
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:-translate-y-1"
          >
            Add Listing
          </button>
        </div>
      </div>

      {/* Beginner Level Modal for Adding Property */}
      {showAddForm && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] p-8 w-full max-w-2xl shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setShowAddForm(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-700 transition-colors"
            >
              <FaTimes className="text-2xl" />
            </button>
            
            <h2 className="text-3xl font-black text-slate-800 mb-6">Add New Property</h2>
            
            <form onSubmit={handleAddProperty} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Property Name</label>
                  <input type="text" name="name" value={newProperty.name} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500" placeholder="e.g. Luxury Villa" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Address</label>
                  <input type="text" name="address" value={newProperty.address} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500" placeholder="e.g. 123 Main St" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Type</label>
                  <select name="type" value={newProperty.type} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500">
                    <option value="HOUSE">House</option>
                    <option value="APARTMENT">Apartment</option>
                    <option value="VILLA">Villa</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">BHK</label>
                  <input type="text" name="bhk" value={newProperty.bhk} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500" placeholder="e.g. 3 BHK" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Square Feet</label>
                  <input type="text" name="sqft" value={newProperty.sqft} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500" placeholder="e.g. 1500 Sq.ft." />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Price</label>
                  <input type="text" name="price" value={newProperty.price} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500" placeholder="e.g. ₹ 85 Lakhs" />
                </div>
              </div>
              
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-colors text-lg shadow-lg shadow-blue-600/30">
                Submit Property
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Property Grid */}
      {filteredProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-10">
          {filteredProperties.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500 border border-slate-100 group flex flex-col hover:-translate-y-2"
            >
              {/* Image Section */}
              <div className="relative h-72 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent z-10 pointer-events-none"></div>
                <img
                  src={property.images[0]}
                  alt={property.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />

                {/* Floating Content over Image */}
                <div className="absolute bottom-6 left-6 right-6 z-20 pointer-events-none">
                  <span className="mb-3 inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-lg text-white text-[10px] font-black uppercase tracking-widest border border-white/20">
                    {property.type}
                  </span>
                  <h3 className="text-2xl font-black text-white mb-2 leading-tight drop-shadow-md">
                    {property.name}
                  </h3>
                  <p className="text-slate-200 text-sm flex items-center gap-2 font-medium">
                    <FaMapMarkerAlt className="text-blue-400" />
                    {property.address}
                  </p>
                </div>

                {/* Price Tag */}
                <div className="absolute top-6 right-6 z-20 bg-white/95 backdrop-blur-md px-5 py-2.5 rounded-xl font-black text-blue-800 shadow-xl text-sm tracking-wide border border-white/50">
                  {property.price}
                </div>

                {/* Status Badge */}
                <div className={`absolute top-6 left-6 z-20 px-4 py-2 rounded-xl font-black text-xs tracking-widest shadow-xl uppercase border border-white/20 backdrop-blur-md
                  ${property.status === 'READY TO MOVE' ? 'bg-emerald-500/90 text-white' : 'bg-amber-500/90 text-white'}`}
                >
                  {property.status}
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8 flex-1 flex flex-col">
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center gap-4 text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-100 transition-colors group-hover:border-blue-100 group-hover:bg-blue-50/50">
                    <div className="p-3 bg-white rounded-xl shadow-sm text-blue-600">
                      <FaBed className="text-xl" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Beds</p>
                      <p className="font-black text-slate-900 text-lg">{property.bhk}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-100 transition-colors group-hover:border-purple-100 group-hover:bg-purple-50/50">
                    <div className="p-3 bg-white rounded-xl shadow-sm text-purple-600">
                      <FaVectorSquare className="text-xl" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Sq.Ft</p>
                      <p className="font-black text-slate-900 text-lg">{property.sqft}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-auto">
                  <button
                    onClick={() => navigate(`/dashboard/properties/${property.id}`)}
                    className="w-full py-4 bg-slate-50 hover:bg-slate-900 text-slate-900 hover:text-white font-black rounded-2xl transition-all duration-300 border border-slate-200 hover:border-slate-900 shadow-sm hover:shadow-xl flex items-center justify-center gap-2 uppercase tracking-wide text-sm"
                  >
                    Explore Property
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 px-4 bg-white rounded-[2.5rem] shadow-sm border border-slate-100 text-center">
          <div className="p-6 bg-slate-50 rounded-full mb-6">
            <MdOutlineRealEstateAgent className="text-6xl text-slate-300" />
          </div>
          <h2 className="text-2xl font-black text-slate-800 mb-3">No properties found</h2>
          <p className="text-slate-500 max-w-md text-lg">We couldn't find any premium properties matching your current search criteria.</p>
          <button
            onClick={() => { setSearchTerm(''); setFilterType('All'); }}
            className="mt-8 px-8 py-3 bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white rounded-xl font-bold transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Properties;
