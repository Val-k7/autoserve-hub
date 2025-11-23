import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 'admin' | 'user';

export interface User {
  username: string;
  password: string;
  role: UserRole;
  email?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  currentUser: string | null;
  userRole: UserRole | null;
  isAdmin: boolean;
  login: (username: string, password: string) => { success: boolean; error?: string };
  signup: (username: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  updateProfile: (username: string, email: string, newPassword?: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_STORAGE_KEY = 'autoserve_users';
const CURRENT_USER_KEY = 'autoserve_current_user';
const SIGNUP_ENABLED_KEY = 'autoserve_signup_enabled';

export const getUsers = (): User[] => {
  const stored = localStorage.getItem(USERS_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveUsers = (users: User[]) => {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
};

export const getUserRole = (username: string): UserRole | null => {
  const users = getUsers();
  const user = users.find(u => u.username === username);
  return user?.role || null;
};

// Fonction simple d'encodage (note: ce n'est PAS sécurisé pour la production)
const simpleHash = (str: string): string => {
  return btoa(str);
};

// Créer un utilisateur admin par défaut si aucun utilisateur n'existe
const initializeDefaultUser = () => {
  const users = getUsers();
  if (users.length === 0) {
    const defaultUser: User = {
      username: 'admin',
      password: simpleHash('admin123'),
      role: 'admin'
    };
    saveUsers([defaultUser]);
  } else {
    // Migration: ajouter le rôle aux utilisateurs existants
    let needsUpdate = false;
    const updatedUsers = users.map(user => {
      if (!user.role) {
        needsUpdate = true;
        return { 
          ...user, 
          role: (user.username === 'admin' ? 'admin' : 'user') as UserRole 
        };
      }
      return user;
    });
    if (needsUpdate) {
      saveUsers(updatedUsers);
    }
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<string | null>(() => {
    return localStorage.getItem(CURRENT_USER_KEY);
  });

  const userRole = currentUser ? getUserRole(currentUser) : null;
  const isAuthenticated = currentUser !== null;
  const isAdmin = userRole === 'admin';

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
    // Vérifier si les inscriptions sont activées
    const signupEnabled = localStorage.getItem(SIGNUP_ENABLED_KEY);
    if (signupEnabled === 'false') {
      return { success: false, error: 'Les inscriptions sont actuellement désactivées' };
    }

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
      password: simpleHash(password),
      role: 'user'
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

  const updateProfile = (username: string, email: string, newPassword?: string) => {
    if (!currentUser) return;

    const users = getUsers();
    const updatedUsers = users.map(user => {
      if (user.username === currentUser) {
        const updates: Partial<User> = {
          username,
          email,
        };
        
        if (newPassword) {
          updates.password = simpleHash(newPassword);
        }
        
        return { ...user, ...updates };
      }
      return user;
    });

    saveUsers(updatedUsers);
    
    // Update current user if username changed
    if (username !== currentUser) {
      setCurrentUser(username);
      localStorage.setItem(CURRENT_USER_KEY, username);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, currentUser, userRole, isAdmin, login, signup, logout, updateProfile }}>
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
