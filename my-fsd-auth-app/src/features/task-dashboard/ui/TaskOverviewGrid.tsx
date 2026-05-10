import { ListChecks, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { useTaskStats } from '../model/useTaskStats';
import { TaskStatCard } from './TaskStatCard';

export const TaskOverviewGrid = () => {
  const { total, active, completed, overdue, completionRate } = useTaskStats();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <TaskStatCard
        icon={<ListChecks className="w-5 h-5" />}
        label="Total Tasks"
        value={total}
        variant="blue"
        subtext={`${completionRate}% complete`}
      />
      <TaskStatCard
        icon={<Clock className="w-5 h-5" />}
        label="Active"
        value={active}
        variant="orange"
      />
      <TaskStatCard
        icon={<CheckCircle2 className="w-5 h-5" />}
        label="Completed"
        value={completed}
        variant="green"
      />
      <TaskStatCard
        icon={<AlertCircle className="w-5 h-5" />}
        label="Overdue"
        value={overdue}
        variant="red"
        subtext={overdue === 1 ? 'task past due' : overdue > 1 ? 'tasks past due' : undefined}
      />
    </div>
  );
};
