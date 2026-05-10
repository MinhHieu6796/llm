import type { TaskStatus } from '@/entities/task';

interface TaskStatusTabsProps {
  activeTab: TaskStatus | 'all';
  counts: { all: number; active: number; completed: number };
  onTabChange: (tab: TaskStatus | 'all') => void;
}

const tabs: { key: TaskStatus | 'all'; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'completed', label: 'Completed' },
];

export const TaskStatusTabs = ({ activeTab, counts, onTabChange }: TaskStatusTabsProps) => {
  return (
    <div className="flex gap-1 p-1 bg-gray-100 rounded-xl w-fit">
      {tabs.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onTabChange(key)}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
            activeTab === key
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          {label}
          <span className={`text-xs px-1.5 py-0.5 rounded-full ${
            activeTab === key ? 'bg-gray-100 text-gray-600' : 'bg-gray-200 text-gray-500'
          }`}>
            {counts[key]}
          </span>
        </button>
      ))}
    </div>
  );
};
