import  { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { properties } from '../../data/mockData';
import { FaMapMarkerAlt, FaBed, FaVectorSquare, FaArrowLeft, FaChevronDown } from 'react-icons/fa';
import { MdAddCall } from "react-icons/md";

const PropertyDetails = () => {
  const [showBuyMenu, setShowBuyMenu] = useState(false);
  const [showNumber, setShowNumber] = useState(false);
  
  // BEGINNER LESSON 1: We use 'useState' to remember if the user has clicked 'Like'.
  // 'isLiked' is the current value (starts as false). 
  // 'setIsLiked' is the function we use to change it.
  const [isLiked, setIsLiked] = useState(false);
  
  const { id } = useParams();
  const navigate = useNavigate();
  
  const property = properties.find((p) => p.id === parseInt(id));

  if (!property) {
    return (
      <div className="p-6 md:p-10 space-y-8 bg-gray-50 min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-700">Property not found</h2>
        <button 
          onClick={() => navigate('/dashboard/properties')}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700"
        >
          Back to Properties
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-16 font-sans">
      {/* Hero Section */}
      <div className="relative h-[65vh] w-full bg-slate-900">
        <div className="absolute inset-0 bg-slate-900/50 z-10 mix-blend-multiply pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent z-10 pointer-events-none"></div>
        <img 
          src={property.images[0]} 
          alt={property.name} 
          className="w-full h-full object-cover opacity-90"
        />
        
        {/* Top specific controls */}
        <div className="absolute top-8 left-8 z-20">
          <button 
            onClick={() => navigate('/dashboard/properties')}
            className="flex items-center gap-3 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-2xl transition-all font-bold border border-white/20 shadow-xl hover:-translate-x-1"
          >
            <FaArrowLeft /> View All Portfolio
          </button>
        </div>
        
        {/* Bottom Hero Content */}
        <div className="absolute bottom-0 left-0 w-full px-8 pb-12 z-20">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-8">
            <div className="flex-1 w-full md:w-auto">
              <div className="flex flex-wrap gap-3 mb-6">
                <span className={`px-5 py-2 rounded-xl font-black text-xs tracking-widest uppercase shadow-xl backdrop-blur-md border border-white/20 ${property.status === 'READY TO MOVE' ? 'bg-emerald-500/90 text-white' : 'bg-amber-500/90 text-white'}`}>
                  {property.status}
                </span>
                <span className="px-5 py-2 rounded-xl font-black text-xs tracking-widest uppercase shadow-xl backdrop-blur-md border border-white/20 bg-white/20 text-white">
                  {property.type}
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-4 drop-shadow-lg">
                {property.name}
              </h1>
              <p className="text-slate-200 text-xl font-medium flex items-center gap-3 drop-shadow-md">
                <FaMapMarkerAlt className="text-blue-400 text-2xl" /> {property.address}
              </p>
            </div>
            
            <div className="flex flex-col items-start md:items-end gap-6 w-full md:w-auto">
              <div className="text-5xl md:text-6xl font-black text-white drop-shadow-2xl">{property.price}</div>
              
              {/* BEGINNER LESSON 2: When clicked, we change 'isLiked' to the opposite of what it currently is (!isLiked). */}
              <button 
                onClick={() => setIsLiked(!isLiked)} 
                className={`px-8 py-4 rounded-2xl font-black text-lg transition-all duration-300 flex items-center gap-3 shadow-2xl hover:-translate-y-1 w-full md:w-auto justify-center ${
                  isLiked ? 'bg-rose-500 text-white border border-rose-400 shadow-rose-500/30' : 'bg-white/10 text-white backdrop-blur-md border border-white/20 hover:bg-white/20'
                }`}
              >
                {isLiked ? '❤️ Saved to Favorites' : '🤍 Save to Favorites'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Details Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 -mt-8 relative z-30">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">
          
          {/* Main Description Column */}
          <div className="lg:col-span-2 space-y-10">
            {/* Overview Card */}
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-slate-200/50 border border-slate-100">
               <h2 className="text-3xl font-black text-slate-900 mb-8 flex items-center gap-3">
                  Property Overview
               </h2>
               
               <div className="flex items-center gap-3 text-amber-400 text-2xl mb-8 bg-amber-50 w-max px-6 py-3 rounded-2xl border border-amber-100 shadow-sm">
                 ⭐ ⭐ ⭐ ⭐ ⭐
                 <span className="text-slate-700 text-lg font-black ml-3">
                   4.9 / 5.0 Rating
                 </span>
               </div>

               <p className="text-slate-600 leading-relaxed text-xl mb-12 font-medium">
                 Experience unparalleled luxury in this masterfully designed property. Offering a peaceful and comfortable living environment with cutting-edge modern design and phenomenal construction quality. Located in a highly sought-after prime area with seamless access to top-tier schools, premium hospitals, and high-end shopping centers, making it the perfect sanctuary for elevated family living.
               </p>

               <h3 className="text-2xl font-black text-slate-900 mb-6">Premium Amenities</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-slate-700">
                 {['✨ Expansive Living Spaces', '💧 24/7 Pure Water Supply', '🚗 Multi-Car Covered Parking', '🏥 Prime Educational & Medical Proximity', '🌳 Pristine Landscaped Gardens', '🛡️ Elite 24/7 Security Detail'].map((feature, i) => (
                    <div key={i} className="flex items-center gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100 font-bold hover:bg-indigo-50 hover:border-indigo-100 transition-all cursor-default text-lg">
                      {feature}
                    </div>
                 ))}
               </div>
            </div>
          </div>

          {/* Details Sidebar Card */}
          <div className="space-y-10">
            <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-2xl shadow-slate-200/50 border border-slate-100 md:sticky md:top-8">
               <h3 className="text-2xl font-black text-slate-900 mb-8">Key Specifications</h3>
               
               <div className="flex flex-col gap-5 mb-10">
                 <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl flex items-center gap-6 border border-blue-100/50 shadow-sm hover:shadow-md transition-shadow">
                   <div className="p-4 bg-white/90 text-blue-600 rounded-2xl shadow-sm backdrop-blur-sm">
                     <FaBed className="text-3xl" />
                   </div>
                   <div>
                     <p className="text-xs text-blue-600/70 font-black uppercase tracking-widest mb-2">Bedrooms</p>
                     <p className="text-3xl font-black text-slate-900">{property.bhk}</p>
                   </div>
                 </div>

                 <div className="p-6 bg-gradient-to-br from-purple-50 to-fuchsia-50 rounded-3xl flex items-center gap-6 border border-purple-100/50 shadow-sm hover:shadow-md transition-shadow">
                   <div className="p-4 bg-white/90 text-purple-600 rounded-2xl shadow-sm backdrop-blur-sm">
                     <FaVectorSquare className="text-3xl" />
                   </div>
                   <div>
                     <p className="text-xs text-purple-600/70 font-black uppercase tracking-widest mb-2">Total Area</p>
                     <p className="text-3xl font-black text-slate-900">{property.sqft}</p>
                   </div>
                 </div>
               </div>

               <div className="space-y-5">
                 <h4 className="font-black text-slate-900 mb-4 text-lg">Acquire This Property</h4>
                 
                 {!showNumber ? (
                   <button 
                     onClick={() => setShowNumber(true)} 
                     className="w-full py-5 bg-slate-900 hover:bg-slate-800 text-white font-black rounded-2xl transition-all shadow-xl hover:shadow-slate-900/30 flex items-center justify-center gap-3 text-lg hover:-translate-y-1"
                   >
                     <MdAddCall className="text-2xl" /> Connect with Agent
                   </button>
                 ) : (
                   <div className="w-full py-5 bg-emerald-50 border-2 border-emerald-200 text-emerald-800 font-black rounded-2xl flex items-center justify-center gap-3 text-xl shadow-lg shadow-emerald-100">
                     <MdAddCall className="text-2xl" /> +1 (987) 654-3210
                   </div>
                 )}
                 
                 {/* Buy Features Button with Dropdown */}
                 <div className="relative">
                   <button
                     onClick={() => setShowBuyMenu(!showBuyMenu)}
                     className="w-full py-5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black rounded-2xl shadow-xl hover:shadow-blue-600/30 transition-all flex items-center justify-center gap-3 text-lg hover:-translate-y-1"
                   >
                     Transaction Options
                     <FaChevronDown className={`transition-transform duration-300 ${showBuyMenu ? 'rotate-180' : ''}`} />
                   </button>

                   {/* Dropdown Menu */}
                   {showBuyMenu && (
                     <div className="absolute top-full left-0 right-0 mt-4 bg-white border border-slate-100 rounded-3xl shadow-2xl shadow-slate-300/50 z-50 overflow-hidden">
                       <div className="p-6 border-b border-slate-50 bg-slate-50/50">
                         <h4 className="font-black text-slate-800 mb-4 text-xs uppercase tracking-widest">Residential Options</h4>
                         <div className="grid grid-cols-2 gap-3 text-base font-bold">
                           {['Buy Now', 'Rentals', 'PG Stay', 'New Projects'].map(item => (
                             <button key={item} className="text-left bg-white border border-slate-100 hover:border-blue-400 hover:text-blue-700 hover:shadow-md px-5 py-3 rounded-xl transition-all">
                               {item}
                             </button>
                           ))}
                         </div>
                       </div>
                       <div className="p-6 bg-slate-50/50">
                         <h4 className="font-black text-slate-800 mb-4 text-xs uppercase tracking-widest">Commercial Options</h4>
                         <div className="grid grid-cols-2 gap-3 text-base font-bold">
                           {['Buy Space', 'Lease', 'Joint Projects'].map(item => (
                             <button key={item} className="text-left bg-white border border-slate-100 hover:border-purple-400 hover:text-purple-700 hover:shadow-md px-5 py-3 rounded-xl transition-all">
                               {item}
                             </button>
                           ))}
                         </div>
                       </div>
                     </div>
                   )}
                 </div>
               </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};


export default PropertyDetails;
