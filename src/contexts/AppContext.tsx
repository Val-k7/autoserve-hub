import { createContext, useContext, useState, ReactNode } from 'react';
import { App, AppStatus } from '@/types/app';
import { AVAILABLE_APPS } from '@/data/apps';

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
  updateAppStatus: (appId: string, status: AppStatus, version?: string) => void;
  addLog: (type: LogEntry['type'], appName: string, message: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [apps, setApps] = useState<App[]>(AVAILABLE_APPS);
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: '1',
      timestamp: new Date(),
      type: 'info',
      appName: 'Système',
      message: 'AutoServe démarré avec succès'
    }
  ]);

  const updateAppStatus = (appId: string, status: AppStatus, version?: string) => {
    setApps(prevApps =>
      prevApps.map(app =>
        app.id === appId ? { ...app, status, ...(version && { version }) } : app
      )
    );
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
    <AppContext.Provider value={{ apps, logs, updateAppStatus, addLog }}>
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
