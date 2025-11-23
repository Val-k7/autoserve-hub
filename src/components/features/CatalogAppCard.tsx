import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { App } from '@/types/app';
import { Download, Check } from 'lucide-react';

interface CatalogAppCardProps {
  app: App;
  onInstallClick: (app: App) => void;
}

export const CatalogAppCard = ({ app, onInstallClick }: CatalogAppCardProps) => {
  const isInstalled = app.status !== 'not_installed';

  return (
    <Card className="flex flex-col group hover-lift relative overflow-hidden">
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-accent/0 to-primary/0 group-hover:from-primary/10 group-hover:via-accent/5 group-hover:to-primary/10 transition-all duration-500 pointer-events-none rounded-2xl" />
      
      {/* Glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/0 via-accent/0 to-primary/0 group-hover:from-primary/20 group-hover:via-accent/20 group-hover:to-primary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
      
      <CardHeader className="relative z-10">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 blur-xl rounded-2xl" />
              <div className="relative p-3 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 backdrop-blur-sm border border-primary/20 depth-2 group-hover:scale-110 transition-transform duration-300">
                <span className="text-4xl">{app.icon}</span>
              </div>
            </div>
            <div>
              <CardTitle className="text-xl font-bold">{app.name}</CardTitle>
              <p className="text-xs text-muted-foreground mt-1 font-medium">
                {isInstalled ? `Installé${app.version ? ` - v${app.version}` : ''}` : 'Non installé'}
              </p>
            </div>
          </div>
          {isInstalled && (
            <div className="flex items-center gap-1 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 px-3 py-1.5 text-xs text-green-600 dark:text-green-400 font-semibold shadow-lg shadow-green-500/20">
              <Check className="h-3 w-3" />
              Installé
            </div>
          )}
        </div>
        <CardDescription className="mt-3 text-base leading-relaxed">{app.description}</CardDescription>
      </CardHeader>
      
      <CardContent className="flex-1 relative z-10">
        {isInstalled && (
          <div className="p-3 rounded-xl bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/10">
            <p className="text-sm text-muted-foreground">
              Gérez cette application depuis le dashboard
            </p>
          </div>
        )}
      </CardContent>

      <CardFooter className="relative z-10">
        {!isInstalled ? (
          <Button 
            onClick={() => onInstallClick(app)} 
            className="w-full group/btn"
            size="lg"
          >
            <Download className="mr-2 h-5 w-5 group-hover/btn:animate-bounce" />
            Installer
          </Button>
        ) : (
          <Button variant="outline" className="w-full" size="lg" disabled>
            <Check className="mr-2 h-5 w-5" />
            Déjà installé
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
