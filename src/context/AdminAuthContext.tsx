import React, { createContext, useContext, useState, ReactNode } from 'react';
import { api } from '../services/api';

interface AdminUser {
  email: string;
}

interface AdminAuthContextType {
  admin: AdminUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextType | null>(null);

export const AdminAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Don't check auth on mount - only when explicitly requested
  // This prevents CORS errors on the homepage

  const login = async (email: string, password: string) => {
    const res: any = await api.auth.login(email, password);
    setAdmin(res.data || { email });
  };

  const logout = async () => {
    await api.auth.logout();
    setAdmin(null);
  };

  const checkAuth = async () => {
    setIsLoading(true);
    try {
      const res: any = await api.auth.me();
      setAdmin(res.data || res);
    } catch {
      setAdmin(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminAuthContext.Provider value={{ admin, isLoading, login, logout, checkAuth }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error('useAdminAuth must be used within AdminAuthProvider');
  return ctx;
};
