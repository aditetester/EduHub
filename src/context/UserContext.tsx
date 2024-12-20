import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  subscriptions?: string[];
}

interface UserContextType {
  user: User | null;
  login: (token: string, userData: User) => Promise<void>;
  logout: () => void;
  loading: boolean;
  token: string | null;
}


const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');

      console.log('Checking auth:', { storedToken: !!storedToken, storedUser: !!storedUser });

      if (storedToken && storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          setUser(userData);
          setToken(storedToken);
        } catch (error) {
          console.error('Error parsing stored user data:', error);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (token: string, userData: User) => {
    setUser(userData);
    setToken(token);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <UserContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};;

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}; 