
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@/entities/user/model/userStore';
import { Button } from '@/shared/ui/Button';
import { TaskOverviewGrid, PriorityBreakdown, RecentTasks } from '@/features/task-dashboard';
import { TasksActivityChart } from '@/features/task-dashboard/ui/TasksActivityChart';
import { useTaskStats } from '@/features/task-dashboard/model/useTaskStats';

export const DashboardPage = () => {
  const { user, clearAuth } = useUserStore();
  const navigate = useNavigate();
  const { tasksOverTime } = useTaskStats();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">User Dashboard</h1>
          <div className="flex items-center gap-3">
            <Button variant="primary" onClick={() => navigate('/tasks')}>
              Go to Tasks
            </Button>
            <Button variant="outline" onClick={clearAuth}>Logout</Button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
            <p className="text-sm text-gray-500">Welcome back,</p>
            <p className="text-xl font-semibold text-gray-800">{user?.name || 'User'}</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
            <p className="text-sm text-gray-500">Account Email</p>
            <p className="text-xl font-semibold text-gray-800">{user?.email || 'N/A'}</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
            <p className="text-sm text-gray-500">Status</p>
            <p className="text-xl font-semibold text-green-600">Authenticated</p>
          </div>
        </div>

        <section className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Task Overview</h2>
            <Button variant="outline" onClick={() => navigate('/tasks')}>
              View All Tasks
            </Button>
          </div>
          <div className="h-px bg-gray-200 mb-6" />
          <TaskOverviewGrid />
        </section>

        <section className="mb-10">
          <TasksActivityChart data={tasksOverTime} />
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Priority Breakdown</h3>
            <div className="p-5 bg-white rounded-xl shadow-sm border border-gray-200">
              <PriorityBreakdown />
            </div>
          </section>
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Tasks</h3>
            <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-200">
              <RecentTasks />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
