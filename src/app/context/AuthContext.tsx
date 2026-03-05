import { createContext, useContext, useState, ReactNode } from 'react';

export interface AuthUser {
  email: string;
  firstName: string;
  lastName: string;
  company: string;
  role: 'investor' | 'founder';
}

interface AuthContextType {
  isAuthenticated: boolean;
  onboardingCompleted: boolean;
  user: AuthUser | null;
  login: (email: string, password: string) => void;
  register: (user: AuthUser, password: string) => void;
  completeOnboarding: (role?: 'investor' | 'founder') => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  const [onboardingCompleted, setOnboardingCompleted] = useState(() => {
    return localStorage.getItem('onboardingCompleted') === 'true';
  });

  const [user, setUser] = useState<AuthUser | null>(() => {
    const stored = localStorage.getItem('authUser');
    return stored ? JSON.parse(stored) : null;
  });

  const login = (email: string, password: string) => {
    if (email && password) {
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true');
      // Restore user if stored, else create placeholder
      if (!user) {
        const u: AuthUser = { email, firstName: 'User', lastName: '', company: '', role: 'investor' };
        setUser(u);
        localStorage.setItem('authUser', JSON.stringify(u));
      }
    }
  };

  const register = (newUser: AuthUser, _password: string) => {
    setIsAuthenticated(true);
    setUser(newUser);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('authUser', JSON.stringify(newUser));
  };

  const completeOnboarding = (role: 'investor' | 'founder' = 'investor') => {
    setOnboardingCompleted(true);
    localStorage.setItem('onboardingCompleted', 'true');
    if (user) {
      const updated = { ...user, role };
      setUser(updated);
      localStorage.setItem('authUser', JSON.stringify(updated));
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setOnboardingCompleted(false);
    setUser(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('onboardingCompleted');
    localStorage.removeItem('authUser');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, onboardingCompleted, user, login, register, completeOnboarding, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
