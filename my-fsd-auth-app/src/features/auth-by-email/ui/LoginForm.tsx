import React, { useState } from 'react';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { useAuth } from '../model/useAuth';

export const LoginForm = ({ onLoginSuccess }: { onLoginSuccess: () => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) onLoginSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md mx-auto p-6 bg-transparent border-none shadow-none">
      <h2 className="text-3xl font-bold text-center text-white mb-2">Welcome Back</h2>
      <p className="text-center text-gray-400 mb-6 text-sm">Login to manage your account</p>

      <Input
        label="Email Address"
        type="email"
        placeholder="admin@example.com"
        className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-indigo-500/50 focus:ring-indigo-500/50"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={error ? 'Invalid credentials' : undefined}
      />
      <Input
        label="Password"
        type="password"
        placeholder="••••••••"
        className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-indigo-500/50 focus:ring-indigo-500/50"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={error ? 'Invalid credentials' : undefined}
      />

      {error && <div className="p-2 text-xs text-red-400 bg-red-500/10 rounded-md text-center border border-red-500/20">{error}</div>}

      <Button type="submit" variant="primary" isLoading={isLoading} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white border-none h-11 rounded-xl font-semibold transition-transform active:scale-95">
        Sign In
      </Button>

      <div className="text-center mt-6">
        <a href="#" className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors underline-offset-4 hover:underline">Forgot password?</a>
      </div>
    </form>
  );
};
