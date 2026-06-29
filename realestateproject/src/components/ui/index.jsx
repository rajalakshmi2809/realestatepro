import React from 'react';

export const Badge = ({ children, variant = 'primary', className = '' }) => {
  const variants = {
    primary: 'bg-blue-100 text-blue-700',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-yellow-100 text-yellow-700',
    danger: 'bg-red-100 text-red-700',
    neutral: 'bg-slate-100 text-slate-700',
    white: 'bg-white text-slate-800 shadow-sm border border-slate-200'
  };

  return (
    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full uppercase tracking-wider ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

export const Card = ({ children, className = '' }) => {
  return (
    <div className={`card ${className}`}>
      {children}
    </div>
  );
};

export const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseClass = variant === 'primary' ? 'btn-primary' : 'btn-secondary';
  return (
    <button className={`${baseClass} ${className}`} {...props}>
      {children}
    </button>
  );
};
