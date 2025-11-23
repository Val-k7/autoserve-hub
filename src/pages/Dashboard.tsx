import { useState, useEffect } from 'react';
import { AppCard } from '@/components/AppCard';
import { SystemMetricsChart } from '@/components/SystemMetricsChart';
import { ActivityTimeline } from '@/components/ActivityTimeline';
import { useAppContext } from '@/contexts/AppContext';
import { App } from '@/types/app';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Server, HardDrive, Activity, TrendingUp, Zap, ArrowUp, ArrowDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Dashboard = () => {
  const { apps, updateAppStatus, addLog } = useAppContext();
  const { toast } = useToast();

  // Animated counters
  const [animatedCounts, setAnimatedCounts] = useState({
    installed: 0,
    running: 0,
    disk: 0,
  });

  const installedApps = apps.filter(a => a.status !== 'not_installed');
  const runningApps = apps.filter(a => a.status === 'running');
  const stoppedApps = apps.filter(a => a.status === 'stopped' || a.status === 'installed');

  // Animate counters on mount
  useEffect(() => {
    const duration = 1000;
    const steps = 30;
    const stepDuration = duration / steps;
    
    let currentStep = 0;
    
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setAnimatedCounts({
        installed: Math.floor(installedApps.length * progress),
        running: Math.floor(runningApps.length * progress),
        disk: Math.floor(42 * progress),
      });
      
      if (currentStep >= steps) {
        clearInterval(interval);
        setAnimatedCounts({
          installed: installedApps.length,
          running: runningApps.length,
          disk: 42,
        });
      }
    }, stepDuration);
    
    return () => clearInterval(interval);
  }, [installedApps.length, runningApps.length]);

  const handleStart = (app: App) => {
    updateAppStatus(app.id, 'running');
    addLog('success', app.name, 'Application démarrée avec succès');
    toast({
      title: 'Application démarrée',
      description: `${app.name} est maintenant en cours d'exécution`,
    });
  };

  const handleStop = (app: App) => {
    updateAppStatus(app.id, 'stopped');
    addLog('info', app.name, 'Application arrêtée');
    toast({
      title: 'Application arrêtée',
      description: `${app.name} a été arrêté`,
    });
  };

  const handleUninstall = (app: App) => {
    updateAppStatus(app.id, 'not_installed');
    addLog('warning', app.name, 'Application désinstallée');
    toast({
      title: 'Désinstallation réussie',
      description: `${app.name} a été désinstallé`,
      variant: 'destructive',
    });
  };

  return (
    <div className="min-h-full">
      <div className="container py-8">
        {/* Hero Header */}
        <div className="mb-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 blur-3xl -z-10 rounded-3xl" />
          <div className="glass-card p-8 rounded-3xl depth-3">
            <h1 className="mb-3 text-5xl font-bold text-gradient animate-gradient-shift">
              Dashboard
            </h1>
            <p className="text-muted-foreground text-lg">
              Gérez et surveillez vos applications installées en temps réel
            </p>
          </div>
        </div>

        {/* Stats Grid with enhanced styling and animations */}
        <div className="mb-8 grid gap-6 md:grid-cols-3">
          <Card className="hover-lift group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Applications installées</CardTitle>
              <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Server className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                {animatedCounts.installed}
              </div>
              <p className="text-sm text-muted-foreground mt-2 font-medium flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-green-500" />
                {runningApps.length} en cours d'exécution
              </p>
            </CardContent>
          </Card>

          <Card className="hover-lift group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Statut système</CardTitle>
              <div className="p-2 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Activity className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Opérationnel
              </div>
              <p className="text-sm text-muted-foreground mt-2 font-medium flex items-center gap-1">
                <ArrowUp className="h-3 w-3 text-green-500" />
                Tous les services fonctionnent
              </p>
            </CardContent>
          </Card>

          <Card className="hover-lift group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Ressources</CardTitle>
              <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <HardDrive className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                {animatedCounts.disk}%
              </div>
              <p className="text-sm text-muted-foreground mt-2 font-medium flex items-center gap-1">
                <ArrowDown className="h-3 w-3 text-blue-500" />
                Utilisation du disque
              </p>
            </CardContent>
          </Card>
        </div>

        {/* System Metrics and Activity Timeline */}
        <div className="mb-8 grid gap-6 lg:grid-cols-2">
          <SystemMetricsChart />
          <ActivityTimeline />
        </div>

        {/* Apps Management with enhanced tabs */}
        <Tabs defaultValue="all" className="space-y-6">
          <div className="glass-card p-2 rounded-2xl depth-2">
            <TabsList className="flex w-full gap-2 bg-transparent">
              <TabsTrigger 
                value="all"
                className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-primary/50 rounded-xl transition-all duration-300"
              >
                <Server className="mr-2 h-4 w-4" />
                Toutes ({installedApps.length})
              </TabsTrigger>
              <TabsTrigger 
                value="running"
                className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-green-500/50 rounded-xl transition-all duration-300"
              >
                <Zap className="mr-2 h-4 w-4" />
                En cours ({runningApps.length})
              </TabsTrigger>
              <TabsTrigger 
                value="stopped"
                className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-orange-500/50 rounded-xl transition-all duration-300"
              >
                <Activity className="mr-2 h-4 w-4" />
                Arrêtées ({stoppedApps.length})
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="space-y-4 animate-fade-in">
            {installedApps.length === 0 ? (
              <Card className="glass-card hover-lift">
                <CardHeader>
                  <CardTitle>Aucune application installée</CardTitle>
                  <CardDescription>
                    Rendez-vous dans le catalogue pour installer vos premières applications
                  </CardDescription>
                </CardHeader>
              </Card>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {installedApps.map((app, index) => (
                  <div key={app.id} className="animate-scale-in" style={{ animationDelay: `${index * 0.05}s` }}>
                    <AppCard
                      app={app}
                      onStart={handleStart}
                      onStop={handleStop}
                      onUninstall={handleUninstall}
                    />
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="running" className="space-y-4 animate-fade-in">
            {runningApps.length === 0 ? (
              <Card className="glass-card hover-lift">
                <CardHeader>
                  <CardTitle>Aucune application en cours d'exécution</CardTitle>
                  <CardDescription>
                    Démarrez une application depuis l'onglet "Toutes"
                  </CardDescription>
                </CardHeader>
              </Card>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {runningApps.map((app, index) => (
                  <div key={app.id} className="animate-scale-in" style={{ animationDelay: `${index * 0.05}s` }}>
                    <AppCard
                      app={app}
                      onStart={handleStart}
                      onStop={handleStop}
                      onUninstall={handleUninstall}
                    />
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="stopped" className="space-y-4 animate-fade-in">
            {stoppedApps.length === 0 ? (
              <Card className="glass-card hover-lift">
                <CardHeader>
                  <CardTitle>Aucune application arrêtée</CardTitle>
                  <CardDescription>
                    Toutes vos applications sont en cours d'exécution
                  </CardDescription>
                </CardHeader>
              </Card>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {stoppedApps.map((app, index) => (
                  <div key={app.id} className="animate-scale-in" style={{ animationDelay: `${index * 0.05}s` }}>
                    <AppCard
                      app={app}
                      onStart={handleStart}
                      onStop={handleStop}
                      onUninstall={handleUninstall}
                    />
                  </div>
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
