import { createContext, useContext, useState, ReactNode } from 'react';
import { UserRole, User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (role: UserRole) => {
    setUser({
      id: '1',
      name: role === 'PATIENT' ? 'Paciente Teste' : role === 'DOCTOR' ? 'Dr. Paulo Dr.' : 'Admin TeleHealth',
      email: 'demo@telehealth.com',
      role: role,
      avatar: 'https://picsum.photos/seed/user/100/100'
    });
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
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
