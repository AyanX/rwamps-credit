import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { api } from '../api/api';
import { toast } from '@/components/Toast';
import { redirect, useNavigate } from 'react-router-dom';
import { nav } from 'framer-motion/client';

interface AuthContextType {
  isAuthenticated: boolean;
  userEmail: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}




const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
 

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get.email();
        if (res.status === 200 && res.data?.email) {
          setIsAuthenticated(true);
        }
        redirect("/login");
      } catch {
        // Not authenticated
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      const res = await api.post.login(email, password);
      if (res.status === 200) {
        setIsAuthenticated(true);
        return true;
      }
      return false;
    
    } catch {
      toast.error('Login failed. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await api.post.logout();
    } catch {
      toast.error('Logout failed. Please try again.');
    }
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userEmail, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
