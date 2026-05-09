import { useState } from 'react';
import { loginRequest } from '../api/authApi';
import { useUserStore } from '@/entities/user/model/userStore';

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const setAuth = useUserStore((state) => state.setAuth);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await loginRequest(email, password);
      setAuth(data.user, data.token);
      return true;
    } catch (e: any) {
      setError(e.message || 'Something went wrong');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
