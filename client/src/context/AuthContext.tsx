
import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import axios from '../api/axios';

export interface AuthUser {
  user: any;
  id: number;
  username: string;
  email: string;
  role: string;
}
interface AuthContextType {
  user: AuthUser | null;
  login: (token: string, user: AuthUser) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  const login = (token: string, user: AuthUser) => {
    localStorage.setItem('token', token);
    console.log(token);
    setUser(user.user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(res => {
        setUser(res.data.user);
      }).catch(() => {
        logout();
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Optional helper hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
