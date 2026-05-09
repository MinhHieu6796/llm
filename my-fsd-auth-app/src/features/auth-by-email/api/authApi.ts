// import { apiClient } from '@/shared/api';

export const loginRequest = async (email: string, password: string) => {
  // Mock API call: Trong thực tế sẽ dùng apiClient.post('/auth/login', { email, password })
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  if (email === 'admin@example.com' && password === 'password123') {
    return {
      user: { id: '1', email: 'admin@example.com', name: 'Administrator' },
      token: 'mock-jwt-token-2026',
    };
  }
  throw new Error('Invalid email or password');
};
