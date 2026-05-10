import type { Task } from '@/entities/task';
import { Badge } from '@/shared/ui/Badge';
import { useTaskStore } from '@/entities/task';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
}

const priorityColors = {
  high: 'red' as const,
  medium: 'green' as const,
  low: 'gray' as const,
};

const tagColors = [
  'blue', 'purple', 'orange', 'green', 'red', 'gray',
] as const;

export const TaskCard = ({ task, onEdit }: TaskCardProps) => {
  const { toggleTaskStatus, deleteTask } = useTaskStore();

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status === 'active';

  return (
    <div className="group flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all">
      <button
        onClick={() => toggleTaskStatus(task.id)}
        className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
          task.status === 'completed'
            ? 'bg-green-500 border-green-500'
            : 'border-gray-300 hover:border-blue-500'
        }`}
      >
        {task.status === 'completed' && (
          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3
            className={`text-sm font-medium cursor-pointer hover:text-blue-600 transition-colors ${
              task.status === 'completed' ? 'line-through text-gray-400' : 'text-gray-900'
            }`}
            onClick={() => onEdit(task)}
          >
            {task.title}
          </h3>
          <Badge variant={priorityColors[task.priority]} className="capitalize">
            {task.priority}
          </Badge>
        </div>

        <div className="flex items-center gap-3 text-xs text-gray-500">
          {task.project && (
            <span className="inline-flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
              {task.project}
            </span>
          )}
          {task.dueDate && (
            <span className={`inline-flex items-center gap-1 ${isOverdue ? 'text-red-500 font-medium' : ''}`}>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {formatDate(task.dueDate)}
              {isOverdue && ' (Overdue)'}
            </span>
          )}
        </div>

        {task.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {task.tags.map((tag, i) => (
              <Badge key={tag} variant={tagColors[i % tagColors.length]}>
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>

      <div className="flex-shrink-0 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onEdit(task)}
          className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
          title="Edit"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
        <button
          onClick={() => {
            if (confirm('Delete this task?')) deleteTask(task.id);
          }}
          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
          title="Delete"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
};
