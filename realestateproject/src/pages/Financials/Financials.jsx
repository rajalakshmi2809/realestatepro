import React from 'react';
// Import financial ledger from mock data
import { financialLedger } from '../../data/mockData';

const Financials = () => {
  // 1. Beginner Logic: Using javascript .reduce() to mathematically calculate totals!
  // We go through all the money in our ledger and add it up.
  const totalIncome = financialLedger.reduce((total, item) => {
    if (item.type === 'positive') {
      // Beginner Logic: How to clean text like "+₹28,000" to get the math number "28000"
      let cleanText = item.amount;
      cleanText = cleanText.replace('+', ''); // remove plus sign
      cleanText = cleanText.replace('₹', ''); // remove rupees symbol
      cleanText = cleanText.replace('$', ''); // remove dollar sign (just in case)
      cleanText = cleanText.replaceAll(',', ''); // remove all commas
      
      // Now it's just regular numbers. We use Number() to do math with it!
      const amount = Number(cleanText);
      return total + amount;
    }
    return total;
  }, 0);

  const totalExpense = financialLedger.reduce((total, item) => {
    if (item.type === 'negative') {
      // Beginner Logic: How to clean text like "-₹6,500" to get the math number "6500"
      let cleanText = item.amount;
      cleanText = cleanText.replace('-', ''); // remove minus sign (so it becomes a positive total expense)
      cleanText = cleanText.replace('₹', ''); // remove rupees symbol
      cleanText = cleanText.replace('$', ''); // remove dollar sign
      cleanText = cleanText.replaceAll(',', ''); // remove all commas
      
      // Now it's just regular numbers. We use Number() to do math with it!
      const amount = Number(cleanText);
      return total + amount;
    }
    return total;
  }, 0);

  // Remaining Cash Flow calculation
  const cashFlow = totalIncome - totalExpense;

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      
      {/* Header Section */}
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-slate-800 drop-shadow-sm mb-2">
          Financial Overview
        </h1>
        <p className="text-slate-500 text-lg font-medium">
          A simple, easy-to-read tracker of your properties' income and expenses.
        </p>
      </div>

      {/* 2. Modern Design: Display Totals using clear, bold layouts and glassmorphism */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white/60 backdrop-blur-xl border border-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 transition-transform">
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Total Income</p>
          <h2 className="text-5xl font-extrabold text-green-600">₹{totalIncome.toLocaleString()}</h2>
        </div>
        
        <div className="bg-white/60 backdrop-blur-xl border border-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 transition-transform">
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Total Expenses</p>
          <h2 className="text-5xl font-extrabold text-red-500">₹{totalExpense.toLocaleString()}</h2>
        </div>

        <div className="bg-white/60 backdrop-blur-xl border border-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-transform">
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Net Cash Flow</p>
          <h2 className="text-5xl font-extrabold text-teal-600">₹{cashFlow.toLocaleString()}</h2>
        </div>
      </div>

      {/* 3. Beginner Logic: The map function to loop over the financial ledger array */}
      <div className="bg-white/60 backdrop-blur-xl border border-white rounded-[2rem] shadow-xl overflow-hidden">
        <div className="p-8 border-b border-white/50 bg-white/40">
          <h3 className="text-2xl font-bold text-slate-800">Recent Transactions</h3>
        </div>
        
        <div className="p-6 md:p-8">
          <div className="space-y-4">
            {financialLedger.map((transaction) => {
              
              // 4. Beginner Logic: Conditional Styling!
              // If it's an income, make it styled green. If expense, make it styled red.
              const isIncome = transaction.type === 'positive';
              
              return (
                <div 
                  key={transaction.id} 
                  className={`p-6 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center transition-all cursor-pointer border ${
                    isIncome ? 'bg-green-50/50 hover:bg-green-50 hover:shadow-md border-green-100/50' : 'bg-red-50/50 hover:bg-red-50 hover:shadow-md border-red-100/50'
                  }`}
                  onClick={() => alert(`Showing receipt details for: ${transaction.description}`)}
                >
                  
                  {/* Transaction Details */}
                  <div>
                    <h4 className="text-lg font-bold text-slate-800 mb-1">{transaction.description}</h4>
                    <p className="text-sm font-semibold text-slate-500 flex gap-4">
                      <span>{transaction.entity}</span>
                      <span className="text-slate-300">•</span>
                      <span>{transaction.date}</span>
                    </p>
                  </div>
                  
                  {/* Transaction Amounts */}
                  <div className="mt-4 md:mt-0 flex flex-row md:flex-col items-center md:items-end gap-4 md:gap-1">
                    <span className="px-3 py-1 bg-white/80 rounded-lg text-[10px] font-bold text-slate-500 tracking-wider uppercase border border-slate-100">
                      {transaction.category}
                    </span>
                    <h3 className={`text-2xl font-bold ${isIncome ? 'text-green-600' : 'text-red-500'}`}>
                      {transaction.amount}
                    </h3>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Financials;
