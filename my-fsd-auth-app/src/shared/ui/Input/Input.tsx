import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = ({ label, error, className = '', ...props }: InputProps) => {
  return (
    <div className="flex flex-col gap-1.5 w-full group">
      {label && <label className="text-sm font-medium text-gray-400 group-focus-within:text-indigo-400 transition-colors">{label}</label>}
      <input
        className={`px-3 py-2 border rounded-lg focus:ring-2 outline-none transition-all ${error ? 'border-red-500' : 'border-gray-300'} ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};
