import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTaskStore } from '@/entities/task';
import { Badge } from '@/shared/ui/Badge';

const statusBadgeVariant: Record<string, 'blue' | 'green'> = {
  active: 'blue',
  completed: 'green',
};

const priorityBadgeVariant: Record<string, 'green' | 'orange' | 'red'> = {
  low: 'green',
  medium: 'orange',
  high: 'red',
};

function getRelativeTime(dateStr: string): string {
  const now = Date.now();
  const date = new Date(dateStr).getTime();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 30) return `${diffDays}d ago`;
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export const RecentTasks = () => {
  const tasks = useTaskStore((state) => state.tasks);

  const recentTasks = useMemo(() => {
    return [...tasks]
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, 5);
  }, [tasks]);

  if (recentTasks.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400 text-sm">No recent tasks</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {recentTasks.map((task, index) => (
        <motion.div
          key={task.id}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100 hover:border-gray-200 transition-colors"
        >
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <span
              className={`text-sm font-medium truncate ${
                task.status === 'completed'
                  ? 'line-through text-gray-400'
                  : 'text-gray-800'
              }`}
            >
              {task.title}
            </span>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0 ml-3">
            <Badge variant={statusBadgeVariant[task.status]}>
              {task.status}
            </Badge>
            <Badge variant={priorityBadgeVariant[task.priority]}>
              {task.priority}
            </Badge>
            <span className="text-xs text-gray-400 w-14 text-right tabular-nums">
              {getRelativeTime(task.updatedAt)}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
