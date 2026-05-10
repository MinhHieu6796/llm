import { useState } from 'react';

interface FilterState {
  priority: string[];
  project: string;
  tag: string;
  completionStatus: string;
}

interface TaskFilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filter: FilterState;
  onFilterChange: (filter: FilterState) => void;
  sortOrder: 'asc' | 'desc' | null;
  onSortToggle: () => void;
}

const priorities = ['low', 'medium', 'high'];

export const TaskFilterBar = ({
  searchQuery,
  onSearchChange,
  filter,
  onFilterChange,
  sortOrder,
  onSortToggle,
}: TaskFilterBarProps) => {
  const [showFilters, setShowFilters] = useState(false);

  const togglePriority = (p: string) => {
    const next = filter.priority.includes(p)
      ? filter.priority.filter((x) => x !== p)
      : [...filter.priority, p];
    onFilterChange({ ...filter, priority: next });
  };

  const clearFilters = () => {
    onFilterChange({ priority: [], project: '', tag: '', completionStatus: '' });
  };

  const hasActiveFilters = filter.priority.length > 0 || filter.project || filter.tag || filter.completionStatus;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search tasks..."
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-200 transition-all"
          />
        </div>

        <div className="relative">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-3 py-2 text-sm border rounded-lg transition-all ${
              hasActiveFilters
                ? 'border-blue-300 bg-blue-50 text-blue-700'
                : 'border-gray-300 text-gray-600 hover:border-gray-400'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filter
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-blue-500" />
            )}
          </button>
        </div>

        <button
          onClick={onSortToggle}
          className={`flex items-center gap-2 px-3 py-2 text-sm border rounded-lg transition-all ${
            sortOrder ? 'border-blue-300 bg-blue-50 text-blue-700' : 'border-gray-300 text-gray-600 hover:border-gray-400'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Date
          {sortOrder && (
            <span className="text-xs">{sortOrder === 'asc' ? '↑' : '↓'}</span>
          )}
        </button>
      </div>

      {showFilters && (
        <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">Priority</p>
              <div className="space-y-1.5">
                {priorities.map((p) => (
                  <label key={p} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filter.priority.includes(p)}
                      onChange={() => togglePriority(p)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="capitalize">{p}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">Project</p>
              <input
                value={filter.project}
                onChange={(e) => onFilterChange({ ...filter, project: e.target.value })}
                placeholder="Filter by project..."
                className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">Tag</p>
              <input
                value={filter.tag}
                onChange={(e) => onFilterChange({ ...filter, tag: e.target.value })}
                placeholder="Filter by tag..."
                className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">Status</p>
              <select
                value={filter.completionStatus}
                onChange={(e) => onFilterChange({ ...filter, completionStatus: e.target.value })}
                className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded outline-none focus:ring-2 focus:ring-blue-200 bg-white"
              >
                <option value="">All</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="mt-3 text-sm text-blue-600 hover:text-blue-800 transition-colors"
            >
              Clear all filters
            </button>
          )}
        </div>
      )}
    </div>
  );
};
