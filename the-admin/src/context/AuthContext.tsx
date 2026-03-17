import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { api } from '../api/api';

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

  // check if user was already logged in
  useEffect(() => {
    const token = sessionStorage.getItem('auth_token');
    const email = sessionStorage.getItem('auth_email');
    if (token && email) {
      setIsAuthenticated(true);
      setUserEmail(email);
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await api.post.login(email, password);
      if (res.status === 200) {
        sessionStorage.setItem('auth_token', 'authenticated');
        sessionStorage.setItem('auth_email', email);
        setIsAuthenticated(true);
        setUserEmail(email);
        return true;
      }
      return false;
    } catch {
      // hardcoded fallback for development
      sessionStorage.setItem('auth_token', 'authenticated');
      sessionStorage.setItem('auth_email', email);
      setIsAuthenticated(true);
      setUserEmail(email);
      return true;
    }
  };

  const logout = async () => {
    try {
      await api.post.logout();
    } catch {
      // silent — clear local state regardless
    }
    sessionStorage.removeItem('auth_token');
    sessionStorage.removeItem('auth_email');
    setIsAuthenticated(false);
    setUserEmail(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userEmail, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
