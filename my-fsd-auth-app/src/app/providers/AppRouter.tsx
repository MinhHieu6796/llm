import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from '@/pages/login';
import { DashboardPage } from '@/pages/dashboard';
import { TasksPage } from '@/pages/tasks';
import { useUserStore } from '@/entities/user/model/userStore';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useUserStore((state) => state.user);
  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/tasks" 
          element={
            <ProtectedRoute>
              <TasksPage />
            </ProtectedRoute>
          } 
        />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
