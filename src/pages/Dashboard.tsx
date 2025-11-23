import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { AppCard } from '@/components/AppCard';
import { AVAILABLE_APPS } from '@/data/apps';
import { App, AppStatus } from '@/types/app';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Server, HardDrive, Activity } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Dashboard = () => {
  const [apps, setApps] = useState<App[]>(AVAILABLE_APPS);
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

  const installedApps = apps.filter(a => a.status !== 'not_installed');
  const runningApps = apps.filter(a => a.status === 'running');
  const stoppedApps = apps.filter(a => a.status === 'stopped' || a.status === 'installed');

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Gérez vos applications installées</p>
        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Applications installées</CardTitle>
              <Server className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{installedApps.length}</div>
              <p className="text-xs text-muted-foreground">
                {runningApps.length} en cours d'exécution
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Statut système</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">Opérationnel</div>
              <p className="text-xs text-muted-foreground">
                Tous les services fonctionnent
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Stockage</CardTitle>
              <HardDrive className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">125 GB</div>
              <p className="text-xs text-muted-foreground">
                / 500 GB disponibles
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Apps Tabs */}
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">
              Toutes ({installedApps.length})
            </TabsTrigger>
            <TabsTrigger value="running">
              En cours ({runningApps.length})
            </TabsTrigger>
            <TabsTrigger value="stopped">
              Arrêtées ({stoppedApps.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {installedApps.length === 0 ? (
              <Card>
                <CardHeader>
                  <CardTitle>Aucune application installée</CardTitle>
                  <CardDescription>
                    Visitez le catalogue pour installer vos premières applications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild>
                    <a href="/catalog">Voir le catalogue</a>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {installedApps.map(app => (
                  <AppCard
                    key={app.id}
                    app={app}
                    onStart={handleStart}
                    onStop={handleStop}
                    onUninstall={handleUninstall}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="running" className="space-y-4">
            {runningApps.length === 0 ? (
              <Card>
                <CardHeader>
                  <CardTitle>Aucune application en cours</CardTitle>
                  <CardDescription>
                    Démarrez une application pour la voir ici
                  </CardDescription>
                </CardHeader>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {runningApps.map(app => (
                  <AppCard
                    key={app.id}
                    app={app}
                    onStop={handleStop}
                    onUninstall={handleUninstall}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="stopped" className="space-y-4">
            {stoppedApps.length === 0 ? (
              <Card>
                <CardHeader>
                  <CardTitle>Aucune application arrêtée</CardTitle>
                  <CardDescription>
                    Les applications arrêtées apparaîtront ici
                  </CardDescription>
                </CardHeader>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {stoppedApps.map(app => (
                  <AppCard
                    key={app.id}
                    app={app}
                    onStart={handleStart}
                    onUninstall={handleUninstall}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
