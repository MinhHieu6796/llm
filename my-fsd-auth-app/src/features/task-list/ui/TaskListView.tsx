import { useState, useMemo } from 'react';
import { useTaskStore } from '@/entities/task';
import type { Task, TaskStatus } from '@/entities/task';
import { TaskCard } from './TaskCard';
import { AddTaskModal } from './AddTaskModal';
import { TaskFilterBar } from './TaskFilterBar';
import { TaskStatusTabs } from './TaskStatusTabs';

interface FilterState {
  priority: string[];
  project: string;
  tag: string;
  completionStatus: string;
}

const defaultFilter: FilterState = { priority: [], project: '', tag: '', completionStatus: '' };

export const TaskListView = () => {
  const { tasks } = useTaskStore();
  const [activeTab, setActiveTab] = useState<TaskStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<FilterState>(defaultFilter);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const counts = useMemo(() => ({
    all: tasks.length,
    active: tasks.filter((t) => t.status === 'active').length,
    completed: tasks.filter((t) => t.status === 'completed').length,
  }), [tasks]);

  const filteredTasks = useMemo(() => {
    let result = [...tasks];

    result = result.filter((t) => {
      if (activeTab === 'active') return t.status === 'active';
      if (activeTab === 'completed') return t.status === 'completed';
      return true;
    });

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.tags.some((tag) => tag.toLowerCase().includes(q)) ||
          t.project.toLowerCase().includes(q)
      );
    }

    if (filter.priority.length > 0) {
      result = result.filter((t) => filter.priority.includes(t.priority));
    }
    if (filter.project) {
      result = result.filter((t) =>
        t.project.toLowerCase().includes(filter.project.toLowerCase())
      );
    }
    if (filter.tag) {
      result = result.filter((t) =>
        t.tags.some((tag) => tag.toLowerCase().includes(filter.tag.toLowerCase()))
      );
    }
    if (filter.completionStatus) {
      result = result.filter((t) => t.status === filter.completionStatus);
    }

    if (sortOrder) {
      result.sort((a, b) => {
        const da = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
        const db = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;
        return sortOrder === 'asc' ? da - db : db - da;
      });
    }

    return result;
  }, [tasks, activeTab, searchQuery, filter, sortOrder]);

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <TaskStatusTabs activeTab={activeTab} counts={counts} onTabChange={setActiveTab} />
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Task
        </button>
      </div>

      <TaskFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filter={filter}
        onFilterChange={setFilter}
        sortOrder={sortOrder}
        onSortToggle={() => setSortOrder(sortOrder === 'asc' ? 'desc' : sortOrder === 'desc' ? null : 'asc')}
      />

      {filteredTasks.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <p className="text-gray-500 text-sm">No tasks found</p>
          <p className="text-gray-400 text-xs mt-1">
            {tasks.length === 0 ? 'Click "Add Task" to create your first task' : 'Try adjusting your search or filters'}
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} onEdit={handleEdit} />
          ))}
        </div>
      )}

      <AddTaskModal isOpen={isModalOpen} onClose={handleCloseModal} editTask={editingTask} />
    </div>
  );
};
