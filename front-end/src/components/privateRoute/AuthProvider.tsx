import { useState, createContext, ReactNode, FC, useContext } from 'react';
import User from '../../models/user.model';

interface AuthContextType {
  user: User | undefined;
  token: string;
  signIn: () => void;
  signOut: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user] = useState<undefined | User>(undefined);
  const [token] = useState(localStorage.getItem('token') || 'token'); // replace 'token' with ''

  
  const signIn = () => {
    console.log('sign in');
  };
  
  const signOut = () => {
    console.log('sign out');
  };
  
  return (
    <AuthContext.Provider value={{ user, token, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for accessing the context
export const useAuth = () => {
  return useContext(AuthContext);
};
