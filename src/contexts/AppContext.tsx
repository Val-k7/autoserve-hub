import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { App, AppStatus } from '@/types/app';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './AuthContext';

export interface LogEntry {
  id: string;
  timestamp: Date;
  type: 'info' | 'success' | 'warning' | 'error';
  appName: string;
  message: string;
}

interface AppContextType {
  apps: App[];
  logs: LogEntry[];
  loading: boolean;
  updateAppStatus: (appId: string, status: AppStatus, version?: string) => Promise<void>;
  addLog: (type: LogEntry['type'], appName: string, message: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const { currentUser } = useAuth();
  const [apps, setApps] = useState<App[]>([]);
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: '1',
      timestamp: new Date(),
      type: 'info',
      appName: 'Système',
      message: 'AutoServe démarré avec succès'
    }
  ]);
  const [loading, setLoading] = useState(true);

  // Fetch apps from catalog and merge with user installations
  useEffect(() => {
    const fetchApps = async () => {
      try {
        setLoading(true);
        
        // Fetch all catalog apps
        const { data: catalogApps, error: catalogError } = await supabase
          .from('catalog_apps')
          .select('*');

        if (catalogError) throw catalogError;

        // Fetch user's installed apps if logged in
        let installedApps: any[] = [];
        if (currentUser) {
          const { data: userApps, error: userAppsError } = await supabase
            .from('user_installed_apps')
            .select('*');

          if (userAppsError) throw userAppsError;
          installedApps = userApps || [];
        }

        // Map catalog apps to App type and merge with installation status
        const mappedApps: App[] = (catalogApps || []).map(catalogApp => {
          const userInstall = installedApps.find(ua => ua.catalog_app_id === catalogApp.id);
          
          return {
            id: catalogApp.app_id,
            name: catalogApp.name,
            description: catalogApp.description || '',
            category: catalogApp.category as any || 'tools',
            icon: catalogApp.icon || '📦',
            status: userInstall ? (userInstall.status as AppStatus) : 'not_installed',
            version: userInstall ? catalogApp.version : undefined,
            url: catalogApp.website_url || undefined,
          };
        });

        setApps(mappedApps);
      } catch (error) {
        console.error('Error fetching apps:', error);
        addLog('error', 'Système', 'Erreur lors du chargement des applications');
      } finally {
        setLoading(false);
      }
    };

    fetchApps();
  }, [currentUser]);

  const updateAppStatus = async (appId: string, status: AppStatus, version?: string) => {
    // Update local state immediately for better UX
    setApps(prevApps =>
      prevApps.map(app =>
        app.id === appId ? { ...app, status, ...(version && { version }) } : app
      )
    );

    // Update in database if user is logged in
    if (currentUser) {
      try {
        const app = apps.find(a => a.id === appId);
        if (!app) return;

        // Get catalog app id
        const { data: catalogApp } = await supabase
          .from('catalog_apps')
          .select('id')
          .eq('app_id', appId)
          .single();

        if (!catalogApp) return;

        if (status === 'not_installed') {
          // Delete from user_installed_apps
          await supabase
            .from('user_installed_apps')
            .delete()
            .eq('catalog_app_id', catalogApp.id);
        } else {
          // Upsert to user_installed_apps
          const { data: existingInstall } = await supabase
            .from('user_installed_apps')
            .select('id')
            .eq('catalog_app_id', catalogApp.id)
            .maybeSingle();

          if (existingInstall) {
            await supabase
              .from('user_installed_apps')
              .update({ status, updated_at: new Date().toISOString() })
              .eq('id', existingInstall.id);
          } else {
            await supabase
              .from('user_installed_apps')
              .insert({
                catalog_app_id: catalogApp.id,
                status,
                user_id: currentUser,
              });
          }
        }
      } catch (error) {
        console.error('Error updating app status:', error);
      }
    }
  };

  const addLog = (type: LogEntry['type'], appName: string, message: string) => {
    const newLog: LogEntry = {
      id: Date.now().toString(),
      timestamp: new Date(),
      type,
      appName,
      message
    };
    setLogs(prevLogs => [newLog, ...prevLogs]);
  };

  return (
    <AppContext.Provider value={{ apps, logs, updateAppStatus, addLog, loading }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};
