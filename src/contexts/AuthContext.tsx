import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  username: string;
  password: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  currentUser: string | null;
  login: (username: string, password: string) => { success: boolean; error?: string };
  signup: (username: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_STORAGE_KEY = 'autoserve_users';
const CURRENT_USER_KEY = 'autoserve_current_user';

// Fonction simple d'encodage (note: ce n'est PAS sécurisé pour la production)
const simpleHash = (str: string): string => {
  return btoa(str);
};

const getUsers = (): User[] => {
  const stored = localStorage.getItem(USERS_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

const saveUsers = (users: User[]) => {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
};

// Créer un utilisateur admin par défaut si aucun utilisateur n'existe
const initializeDefaultUser = () => {
  const users = getUsers();
  if (users.length === 0) {
    const defaultUser: User = {
      username: 'admin',
      password: simpleHash('admin123')
    };
    saveUsers([defaultUser]);
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<string | null>(() => {
    return localStorage.getItem(CURRENT_USER_KEY);
  });

  const isAuthenticated = currentUser !== null;

  useEffect(() => {
    initializeDefaultUser();
  }, []);

  const login = (username: string, password: string): { success: boolean; error?: string } => {
    if (!username.trim() || !password.trim()) {
      return { success: false, error: 'Nom d\'utilisateur et mot de passe requis' };
    }

    const users = getUsers();
    const hashedPassword = simpleHash(password);
    const user = users.find(u => u.username === username && u.password === hashedPassword);

    if (user) {
      setCurrentUser(username);
      localStorage.setItem(CURRENT_USER_KEY, username);
      return { success: true };
    }

    return { success: false, error: 'Identifiants incorrects' };
  };

  const signup = (username: string, password: string): { success: boolean; error?: string } => {
    if (!username.trim() || !password.trim()) {
      return { success: false, error: 'Nom d\'utilisateur et mot de passe requis' };
    }

    if (username.length < 3) {
      return { success: false, error: 'Le nom d\'utilisateur doit contenir au moins 3 caractères' };
    }

    if (password.length < 6) {
      return { success: false, error: 'Le mot de passe doit contenir au moins 6 caractères' };
    }

    const users = getUsers();
    
    if (users.some(u => u.username === username)) {
      return { success: false, error: 'Ce nom d\'utilisateur existe déjà' };
    }

    const newUser: User = {
      username,
      password: simpleHash(password)
    };

    saveUsers([...users, newUser]);
    setCurrentUser(username);
    localStorage.setItem(CURRENT_USER_KEY, username);

    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem(CURRENT_USER_KEY);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, currentUser, login, signup, logout }}>
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
