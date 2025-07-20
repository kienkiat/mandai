
import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import {jwtDecode} from 'jwt-decode';

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
interface DecodedToken {
  userId: number;
  role: string;
  exp: number;
  iat: number;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  const login = (token: string, user: AuthUser) => {
    localStorage.setItem('token', token);
    setUser(user.user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        if (decoded.exp * 1000 < Date.now()) {
          logout();
        } else {
          setUser({
            id: decoded.userId,
            username: '',
            email: '', 
            role: decoded.role,
            user: null,
          });
        }
      } catch {
        logout();
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
