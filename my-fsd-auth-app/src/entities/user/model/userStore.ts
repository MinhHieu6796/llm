import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
}

interface UserState {
  user: User | null;
  token: string | null;
  setAuth: (user: User, token: string) => void;
  clearAuth: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setAuth: (user, token) => {
        localStorage.setItem('auth_token', token);
        set({ user, token });
      },
      clearAuth: () => {
        localStorage.removeItem('auth_token');
        set({ user: null, token: null });
      },
    }),
    { name: 'user-auth-storage' }
  )
);
