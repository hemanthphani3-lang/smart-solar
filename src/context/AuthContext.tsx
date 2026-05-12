import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'producer' | 'handler' | 'consumer';

interface User {
  id: string;
  unique_id: string;
  name: string;
  email: string;
  role: UserRole;
  location: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, role: UserRole) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for session
    const savedUser = localStorage.getItem('solarsync_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, role: UserRole) => {
    // Mock login logic
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      unique_id: role === 'producer' ? 'PROD-001' : role === 'handler' ? 'HDL-AP-0001' : 'CUS-AP-0001',
      name: role.charAt(0).toUpperCase() + role.slice(1) + ' User',
      email,
      role,
      location: 'New York, USA',
    };
    
    setUser(mockUser);
    localStorage.setItem('solarsync_user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('solarsync_user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
