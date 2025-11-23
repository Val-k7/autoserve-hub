import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { App } from '@/types/app';
import { Download, Check } from 'lucide-react';

interface CatalogAppCardProps {
  app: App;
  onInstallClick: (app: App) => void;
}

export const CatalogAppCard = ({ app, onInstallClick }: CatalogAppCardProps) => {
  const isInstalled = app.status !== 'not_installed';

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{app.icon}</span>
            <div>
              <CardTitle className="text-xl">{app.name}</CardTitle>
              <p className="text-xs text-muted-foreground mt-1">
                {isInstalled ? `Installé${app.version ? ` - v${app.version}` : ''}` : 'Non installé'}
              </p>
            </div>
          </div>
          {isInstalled && (
            <div className="flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">
              <Check className="h-3 w-3" />
              Installé
            </div>
          )}
        </div>
        <CardDescription className="mt-3">{app.description}</CardDescription>
      </CardHeader>
      
      <CardContent className="flex-1">
        {isInstalled && (
          <p className="text-sm text-muted-foreground">
            Gérez cette application depuis le dashboard
          </p>
        )}
      </CardContent>

      <CardFooter>
        {!isInstalled ? (
          <Button onClick={() => onInstallClick(app)} className="w-full">
            <Download className="mr-2 h-4 w-4" />
            Installer
          </Button>
        ) : (
          <Button variant="outline" className="w-full" disabled>
            <Check className="mr-2 h-4 w-4" />
            Déjà installé
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
