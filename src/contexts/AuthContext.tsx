import React, { createContext, useContext, useState, useEffect } from 'react';

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
  const [user, setUser] = useState<User | null>(() => {
    // Initialize user from localStorage if available
    const savedUser = localStorage.getItem('gdg_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(() => {
    // Initialize admin state from localStorage
    const savedUser = localStorage.getItem('gdg_user');
    return savedUser ? JSON.parse(savedUser).role === 'admin' : false;
  });
  const [isDataManager, setIsDataManager] = useState(() => {
    // Initialize data manager state from localStorage
    const savedUser = localStorage.getItem('gdg_user');
    return savedUser ? ['admin', 'data-manager'].includes(JSON.parse(savedUser).role) : false;
  });

  // Initialize with loading state
  useEffect(() => {
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      let userData: User | null = null;

      // Simple hardcoded authentication
      if (email === 'admin@gdg.com' && password === 'admin123') {
        userData = {
          uid: 'admin-user-id',
          email,
          name: 'Admin User',
          role: 'admin'
        };
      } else if (email === 'manager@gdg.com' && password === 'manager123') {
        userData = {
          uid: 'manager-user-id',
          email,
          name: 'Data Manager',
          role: 'data-manager'
        };
      } else if (email === 'viewer@gdg.com' && password === 'viewer123') {
        userData = {
          uid: 'viewer-user-id',
          email,
          name: 'Viewer User',
          role: 'viewer'
        };
      }

      if (!userData) {
        throw new Error('Invalid credentials');
      }

      // Save user data to localStorage
      localStorage.setItem('gdg_user', JSON.stringify(userData));
      
      // Update state
      setUser(userData);
      setIsAdmin(userData.role === 'admin');
      setIsDataManager(['admin', 'data-manager'].includes(userData.role));
      
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const logout = async () => {
    try {
      // Clear localStorage
      localStorage.removeItem('gdg_user');
      
      // Clear state
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
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext; 