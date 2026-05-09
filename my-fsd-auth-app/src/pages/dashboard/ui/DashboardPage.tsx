
import { useUserStore } from '@/entities/user/model/userStore';
import { Button } from '@/shared/ui/Button';

export const DashboardPage = () => {
  const { user, clearAuth } = useUserStore();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">User Dashboard</h1>
          <Button variant="outline" onClick={clearAuth}>Logout</Button>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
      </div>
    </div>
  );
};
