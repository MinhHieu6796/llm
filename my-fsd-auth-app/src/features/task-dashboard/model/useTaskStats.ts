import { useMemo } from 'react';
import { useTaskStore, type Priority } from '@/entities/task';

export interface TaskStats {
  total: number;
  active: number;
  completed: number;
  byPriority: Record<Priority, number>;
  overdue: number;
  completionRate: number;
  tasksOverTime: Array<{ date: string; count: number }>;
}

export const useTaskStats = (): TaskStats => {
  const tasks = useTaskStore((state) => state.tasks);

  return useMemo(() => {
    const total = tasks.length;
    const active = tasks.filter((t) => t.status === 'active').length;
    const completed = tasks.filter((t) => t.status === 'completed').length;

    const byPriority: Record<Priority, number> = {
      low: 0,
      medium: 0,
      high: 0,
    };

    for (const task of tasks) {
      byPriority[task.priority]++;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const overdue = tasks.filter(
      (t) => t.status === 'active' && t.dueDate !== null && new Date(t.dueDate) < today,
    ).length;

    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    const tasksOverTime = useMemo(() => {
      if (tasks.length === 0) return [];

      const dateCounts: Record<string, number> = {};
      tasks.forEach((t) => {
        const date = t.createdAt.split('T')[0];
        dateCounts[date] = (dateCounts[date] || 0) + 1;
      });

      const sortedDates = Object.keys(dateCounts).sort();
      const firstDate = new Date(sortedDates[0]);
      const lastDate = new Date(sortedDates[sortedDates.length - 1]);
      
      const result: Array<{ date: string; count: number }> = [];
      const curr = new Date(firstDate);
      while (curr <= lastDate) {
        const dateStr = curr.toISOString().split('T')[0];
        result.push({
          date: dateStr,
          count: dateCounts[dateStr] || 0,
        });
        curr.setDate(curr.getDate() + 1);
      }

      return result;
    }, [tasks]);

    return { total, active, completed, byPriority, overdue, completionRate, tasksOverTime };
  }, [tasks]);
};
