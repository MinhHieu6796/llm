import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'red' | 'green' | 'gray' | 'blue' | 'purple' | 'orange';
  className?: string;
}

const variants = {
  default: 'bg-gray-100 text-gray-700',
  red: 'bg-red-100 text-red-700',
  green: 'bg-green-100 text-green-700',
  gray: 'bg-gray-100 text-gray-500',
  blue: 'bg-blue-100 text-blue-700',
  purple: 'bg-purple-100 text-purple-700',
  orange: 'bg-orange-100 text-orange-700',
};

export const Badge = ({ children, variant = 'default', className = '' }: BadgeProps) => {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};
