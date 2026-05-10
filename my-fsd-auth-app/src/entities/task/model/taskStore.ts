import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Priority = 'low' | 'medium' | 'high';
export type TaskStatus = 'active' | 'completed';

export interface Task {
  id: string;
  title: string;
  description: string;
  project: string;
  dueDate: string | null;
  tags: string[];
  priority: Priority;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
}

interface TaskState {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTaskStatus: (id: string) => void;
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set) => ({
      tasks: [],
      addTask: (taskData) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              ...taskData,
              id: crypto.randomUUID(),
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
          ],
        })),
      updateTask: (id, updates) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id ? { ...t, ...updates, updatedAt: new Date().toISOString() } : t
          ),
        })),
      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== id),
        })),
      toggleTaskStatus: (id) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id
              ? {
                  ...t,
                  status: t.status === 'active' ? 'completed' : 'active',
                  updatedAt: new Date().toISOString(),
                }
              : t
          ),
        })),
    }),
    { name: 'task-list-storage' }
  )
);
