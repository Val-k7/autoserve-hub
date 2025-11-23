import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { StatusBadge } from './StatusBadge';
import { App } from '@/types/app';
import { Play, Square, Download, Trash2, ExternalLink } from 'lucide-react';

interface AppCardProps {
  app: App;
  onInstall?: (app: App) => void;
  onStart?: (app: App) => void;
  onStop?: (app: App) => void;
  onUninstall?: (app: App) => void;
}

export const AppCard = ({ app, onInstall, onStart, onStop, onUninstall }: AppCardProps) => {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{app.icon}</span>
            <div>
              <CardTitle className="text-xl">{app.name}</CardTitle>
              {app.version && <p className="text-xs text-muted-foreground mt-1">v{app.version}</p>}
            </div>
          </div>
          <StatusBadge status={app.status} />
        </div>
        <CardDescription className="mt-3">{app.description}</CardDescription>
      </CardHeader>
      
      <CardContent className="flex-1">
        {app.url && (
          <a 
            href={app.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline flex items-center gap-1"
          >
            Accéder à l'application
            <ExternalLink className="h-3 w-3" />
          </a>
        )}
      </CardContent>

      <CardFooter className="flex gap-2">
        {app.status === 'not_installed' && (
          <Button onClick={() => onInstall?.(app)} className="flex-1" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Installer
          </Button>
        )}
        
        {app.status === 'installed' && (
          <>
            <Button onClick={() => onStart?.(app)} className="flex-1" size="sm">
              <Play className="mr-2 h-4 w-4" />
              Démarrer
            </Button>
            <Button onClick={() => onUninstall?.(app)} variant="destructive" size="sm">
              <Trash2 className="h-4 w-4" />
            </Button>
          </>
        )}
        
        {app.status === 'running' && (
          <>
            <Button onClick={() => onStop?.(app)} variant="secondary" className="flex-1" size="sm">
              <Square className="mr-2 h-4 w-4" />
              Arrêter
            </Button>
            <Button onClick={() => onUninstall?.(app)} variant="destructive" size="sm">
              <Trash2 className="h-4 w-4" />
            </Button>
          </>
        )}
        
        {app.status === 'stopped' && (
          <>
            <Button onClick={() => onStart?.(app)} className="flex-1" size="sm">
              <Play className="mr-2 h-4 w-4" />
              Démarrer
            </Button>
            <Button onClick={() => onUninstall?.(app)} variant="destructive" size="sm">
              <Trash2 className="h-4 w-4" />
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};
