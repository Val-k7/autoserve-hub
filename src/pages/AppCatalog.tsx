import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { AppCard } from '@/components/AppCard';
import { AVAILABLE_APPS } from '@/data/apps';
import { APP_CATEGORIES } from '@/types/app';
import { App, AppCategory, AppStatus } from '@/types/app';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AppCatalog = () => {
  const [apps, setApps] = useState<App[]>(AVAILABLE_APPS);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  const handleInstall = (app: App) => {
    setApps(apps.map(a => 
      a.id === app.id ? { ...a, status: 'installed' as AppStatus, version: '1.0.0' } : a
    ));
    toast({
      title: 'Installation réussie',
      description: `${app.name} a été installé avec succès`,
    });
  };

  const handleStart = (app: App) => {
    setApps(apps.map(a => 
      a.id === app.id ? { ...a, status: 'running' as AppStatus, url: `https://${app.id}.localhost:9443` } : a
    ));
    toast({
      title: 'Application démarrée',
      description: `${app.name} est maintenant en cours d'exécution`,
    });
  };

  const handleStop = (app: App) => {
    setApps(apps.map(a => 
      a.id === app.id ? { ...a, status: 'stopped' as AppStatus, url: undefined } : a
    ));
    toast({
      title: 'Application arrêtée',
      description: `${app.name} a été arrêté`,
    });
  };

  const handleUninstall = (app: App) => {
    setApps(apps.map(a => 
      a.id === app.id ? { ...a, status: 'not_installed' as AppStatus, url: undefined, version: undefined } : a
    ));
    toast({
      title: 'Désinstallation réussie',
      description: `${app.name} a été désinstallé`,
      variant: 'destructive',
    });
  };

  const filterApps = (category?: AppCategory) => {
    let filtered = apps;
    if (category) {
      filtered = filtered.filter(app => app.category === category);
    }
    if (searchQuery) {
      filtered = filtered.filter(app =>
        app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return filtered;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-foreground">Catalogue d'applications</h1>
          <p className="text-muted-foreground">
            Parcourez et installez des applications auto-hébergées en un clic
          </p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Rechercher une application..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Apps by Category */}
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList className="flex flex-wrap h-auto">
            <TabsTrigger value="all">
              Toutes ({apps.length})
            </TabsTrigger>
            {(Object.entries(APP_CATEGORIES) as [AppCategory, typeof APP_CATEGORIES[AppCategory]][]).map(([key, { label, icon }]) => (
              <TabsTrigger key={key} value={key}>
                {icon} {label} ({apps.filter(a => a.category === key).length})
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filterApps().map(app => (
                <AppCard
                  key={app.id}
                  app={app}
                  onInstall={handleInstall}
                  onStart={handleStart}
                  onStop={handleStop}
                  onUninstall={handleUninstall}
                />
              ))}
            </div>
          </TabsContent>

          {(Object.keys(APP_CATEGORIES) as AppCategory[]).map(category => (
            <TabsContent key={category} value={category} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filterApps(category).map(app => (
                  <AppCard
                    key={app.id}
                    app={app}
                    onInstall={handleInstall}
                    onStart={handleStart}
                    onStop={handleStop}
                    onUninstall={handleUninstall}
                  />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default AppCatalog;
