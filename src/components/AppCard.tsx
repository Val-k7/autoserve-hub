import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { StatusBadge } from './StatusBadge';
import { App } from '@/types/app';
import { Play, Square, Download, Trash2, ExternalLink, Zap, Power } from 'lucide-react';

interface AppCardProps {
  app: App;
  onInstall?: (app: App) => void;
  onStart?: (app: App) => void;
  onStop?: (app: App) => void;
  onUninstall?: (app: App) => void;
}

export const AppCard = ({ app, onInstall, onStart, onStop, onUninstall }: AppCardProps) => {
  return (
    <Card className="flex flex-col group relative overflow-hidden hover-lift">
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-accent/0 to-primary/0 group-hover:from-primary/5 group-hover:via-accent/5 group-hover:to-primary/5 transition-all duration-700 pointer-events-none rounded-2xl" />
      
      {/* Glow effect on hover */}
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/0 via-accent/0 to-primary/0 group-hover:from-primary/20 group-hover:via-accent/20 group-hover:to-primary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
      
      <CardHeader className="relative z-10">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-3">
            {/* Icon with glow */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 blur-lg rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative text-5xl group-hover:scale-110 transition-transform duration-500 ease-out">
                {app.icon}
              </div>
            </div>
            <div>
              <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors duration-300">{app.name}</CardTitle>
              {app.version && (
                <p className="text-xs text-muted-foreground mt-1 font-mono px-2 py-0.5 rounded-md bg-background/50 border border-border/30 w-fit">
                  v{app.version}
                </p>
              )}
            </div>
          </div>
          <StatusBadge status={app.status} />
        </div>
        <CardDescription className="mt-3 line-clamp-2 text-base leading-relaxed">{app.description}</CardDescription>
      </CardHeader>
      
      <CardContent className="flex-1 relative z-10">
        {app.url && (
          <a 
            href={app.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="group/link inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-accent transition-colors duration-300 px-3 py-2 rounded-lg hover:bg-primary/10"
          >
            <ExternalLink className="h-4 w-4 group-hover/link:rotate-12 transition-transform duration-300" />
            Accéder à l'application
          </a>
        )}
      </CardContent>

      <CardFooter className="flex gap-2 relative z-10">
        {app.status === 'not_installed' && (
          <Button 
            onClick={() => onInstall?.(app)} 
            className="flex-1 group/btn" 
            size="lg"
          >
            <Download className="mr-2 h-4 w-4 group-hover/btn:animate-bounce" />
            Installer
          </Button>
        )}
        
        {app.status === 'installed' && (
          <>
            <Button 
              onClick={() => onStart?.(app)} 
              variant="success"
              className="flex-1 group/btn" 
              size="lg"
            >
              <Power className="mr-2 h-4 w-4 group-hover/btn:scale-110 transition-transform duration-300" />
              Démarrer
            </Button>
            <Button 
              onClick={() => onUninstall?.(app)} 
              variant="destructive" 
              size="lg"
              className="group/btn"
            >
              <Trash2 className="h-4 w-4 group-hover/btn:rotate-12 transition-transform duration-300" />
            </Button>
          </>
        )}
        
        {app.status === 'running' && (
          <>
            <Button 
              onClick={() => onStop?.(app)} 
              variant="outline" 
              className="flex-1 group/btn border-orange-500/30 hover:border-orange-500 hover:bg-orange-500/10 text-orange-600 dark:text-orange-400" 
              size="lg"
            >
              <Square className="mr-2 h-4 w-4 group-hover/btn:scale-90 transition-transform duration-300" />
              Arrêter
            </Button>
            <Button 
              onClick={() => onUninstall?.(app)} 
              variant="destructive" 
              size="lg"
              className="group/btn"
            >
              <Trash2 className="h-4 w-4 group-hover/btn:rotate-12 transition-transform duration-300" />
            </Button>
          </>
        )}
        
        {app.status === 'stopped' && (
          <>
            <Button 
              onClick={() => onStart?.(app)} 
              variant="success"
              className="flex-1 group/btn" 
              size="lg"
            >
              <Play className="mr-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
              Démarrer
            </Button>
            <Button 
              onClick={() => onUninstall?.(app)} 
              variant="destructive" 
              size="lg"
              className="group/btn"
            >
              <Trash2 className="h-4 w-4 group-hover/btn:rotate-12 transition-transform duration-300" />
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};
