import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { User as SupabaseUser, Session } from '@supabase/supabase-js';
import { toast } from 'sonner';

interface AuthContextType {
  isAuthenticated: boolean;
  currentUser: string | null;
  user: SupabaseUser | null;
  isAdmin: boolean;
  session: Session | null;
  sessionExpiresAt: Date | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (email: string, password: string, username: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [sessionExpiresAt, setSessionExpiresAt] = useState<Date | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [expirationWarningShown, setExpirationWarningShown] = useState(false);

  // Callback to check if user is admin
  const checkAdminStatus = useCallback(async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .eq('role', 'admin')
        .maybeSingle();
      
      setIsAdmin(!!data && !error);
    } catch (error) {
      console.error('Error checking admin status:', error);
      setIsAdmin(false);
    }
  }, []);

  // Callback to handle session updates
  const handleSessionUpdate = useCallback((session: Session | null) => {
    setSession(session);
    setUser(session?.user ?? null);
    
    if (session?.expires_at) {
      setSessionExpiresAt(new Date(session.expires_at * 1000));
    } else {
      setSessionExpiresAt(null);
    }
    
    if (session?.user) {
      checkAdminStatus(session.user.id);
    } else {
      setIsAdmin(false);
    }
  }, [checkAdminStatus]);

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      handleSessionUpdate(session);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth event:', event);
      
      if (event === 'TOKEN_REFRESHED') {
        toast.success('Session rafraîchie automatiquement');
        setExpirationWarningShown(false);
      }
      
      if (event === 'SIGNED_OUT') {
        setExpirationWarningShown(false);
      }
      
      handleSessionUpdate(session);
    });

    return () => subscription.unsubscribe();
  }, [handleSessionUpdate]);

  // Monitor session expiration
  useEffect(() => {
    if (!sessionExpiresAt) return;

    const checkExpiration = () => {
      const now = new Date();
      const timeUntilExpiry = sessionExpiresAt.getTime() - now.getTime();
      const minutesUntilExpiry = Math.floor(timeUntilExpiry / 1000 / 60);

      // Warn 5 minutes before expiration
      if (minutesUntilExpiry <= 5 && minutesUntilExpiry > 0 && !expirationWarningShown) {
        toast.warning(
          `Votre session expire dans ${minutesUntilExpiry} minute${minutesUntilExpiry > 1 ? 's' : ''}`,
          {
            duration: 10000,
            action: {
              label: 'Rafraîchir',
              onClick: () => {
                supabase.auth.refreshSession().then(({ data, error }) => {
                  if (!error && data.session) {
                    toast.success('Session rafraîchie avec succès');
                    setExpirationWarningShown(false);
                  }
                });
              }
            }
          }
        );
        setExpirationWarningShown(true);
      }

      // Session expired
      if (timeUntilExpiry <= 0) {
        toast.error('Votre session a expiré. Veuillez vous reconnecter.');
        supabase.auth.signOut();
        setExpirationWarningShown(false);
      }
    };

    // Check every minute
    const interval = setInterval(checkExpiration, 60000);
    checkExpiration(); // Check immediately

    return () => clearInterval(interval);
  }, [sessionExpiresAt, expirationWarningShown]);

  const login = useCallback(async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message || 'Erreur de connexion' };
    }
  }, []);

  const signup = useCallback(async (email: string, password: string, username: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username: username,
          },
          emailRedirectTo: `${window.location.origin}/`,
        },
      });

      if (error) throw error;
      
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message || 'Erreur d\'inscription' };
    }
  }, []);

  const logout = useCallback(async (): Promise<void> => {
    await supabase.auth.signOut();
    setExpirationWarningShown(false);
  }, []);

  const refreshSession = useCallback(async (): Promise<void> => {
    try {
      const { data, error } = await supabase.auth.refreshSession();
      
      if (error) throw error;
      
      if (data.session) {
        toast.success('Session rafraîchie avec succès');
        setExpirationWarningShown(false);
      }
    } catch (error: any) {
      console.error('Error refreshing session:', error);
      toast.error('Impossible de rafraîchir la session. Veuillez vous reconnecter.');
      await logout();
    }
  }, [logout]);

  const value = {
    isAuthenticated: !!user,
    currentUser: user?.id ?? null,
    user,
    session,
    sessionExpiresAt,
    isAdmin,
    login,
    signup,
    logout,
    refreshSession,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
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
