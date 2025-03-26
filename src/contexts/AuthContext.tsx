import React, { createContext, useContext, useState } from 'react';

// Define user roles
export type UserRole = 'admin' | 'data-manager' | 'viewer';

interface User {
  uid: string;
  email: string;
  name: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAdmin: boolean;
  isDataManager: boolean;
  hasRole: (role: UserRole) => boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDataManager, setIsDataManager] = useState(false);

  // Initialize with loading state
  useState(() => {
    setLoading(false);
  });

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      // Simple hardcoded authentication
      if (email === 'admin@gdg.com' && password === 'admin123') {
        setUser({
          uid: 'admin-user-id',
          email,
          name: 'Admin User',
          role: 'admin'
        });
        setIsAdmin(true);
        setIsDataManager(true);
      } else if (email === 'manager@gdg.com' && password === 'manager123') {
        setUser({
          uid: 'manager-user-id',
          email,
          name: 'Data Manager',
          role: 'data-manager'
        });
        setIsAdmin(false);
        setIsDataManager(true);
      } else if (email === 'viewer@gdg.com' && password === 'viewer123') {
        setUser({
          uid: 'viewer-user-id',
          email,
          name: 'Viewer User',
          role: 'viewer'
        });
        setIsAdmin(false);
        setIsDataManager(false);
      } else {
        throw new Error('Invalid credentials');
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const logout = async () => {
    try {
      setUser(null);
      setIsAdmin(false);
      setIsDataManager(false);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  // Function to check if user has a specific role
  const hasRole = (role: UserRole): boolean => {
    if (!user) return false;
    
    if (user.role === 'admin') return true; // Admin has access to everything
    return user.role === role;
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAdmin,
    isDataManager,
    hasRole
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext; 