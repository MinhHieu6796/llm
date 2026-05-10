import { useEffect, useState, type ReactNode } from 'react';
import { motion, animate } from 'framer-motion';

export type StatCardVariant = 'default' | 'green' | 'blue' | 'orange' | 'purple' | 'red';

interface TaskStatCardProps {
  icon: ReactNode;
  label: string;
  value: number;
  variant?: StatCardVariant;
  subtext?: string;
}

const variantStyles: Record<StatCardVariant, { bg: string; iconColor: string; borderColor: string }> = {
  default: { bg: 'bg-gray-50', iconColor: 'text-gray-600', borderColor: 'border-gray-200' },
  green: { bg: 'bg-green-50', iconColor: 'text-green-600', borderColor: 'border-green-200' },
  blue: { bg: 'bg-blue-50', iconColor: 'text-blue-600', borderColor: 'border-blue-200' },
  orange: { bg: 'bg-orange-50', iconColor: 'text-orange-600', borderColor: 'border-orange-200' },
  purple: { bg: 'bg-purple-50', iconColor: 'text-purple-600', borderColor: 'border-purple-200' },
  red: { bg: 'bg-red-50', iconColor: 'text-red-600', borderColor: 'border-red-200' },
};

export const TaskStatCard = ({
  icon,
  label,
  value,
  variant = 'default',
  subtext,
}: TaskStatCardProps) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(0, value, {
      duration: 0.8,
      ease: 'easeOut',
      onUpdate: (latest) => setDisplayValue(Math.round(latest)),
    });
    return controls.stop;
  }, [value]);

  const styles = variantStyles[variant];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`p-5 bg-white rounded-xl shadow-sm border ${styles.borderColor}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-500 truncate">{label}</p>
          <p className={`text-3xl font-bold mt-1 ${styles.iconColor}`}>
            {displayValue}
          </p>
          {subtext && (
            <p className="text-xs text-gray-400 mt-1">{subtext}</p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${styles.bg} ${styles.iconColor} flex-shrink-0`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
};
