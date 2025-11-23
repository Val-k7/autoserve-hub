import { useState } from 'react';
import { CatalogAppCard } from '@/components/features/CatalogAppCard';
import { InstallDialog } from '@/components/features/InstallDialog';
import { useAppContext } from '@/contexts/AppContext';
import { useDebounce } from '@/hooks/useDebounce';
import { APP_CATEGORIES } from '@/types/app';
import { App, AppCategory } from '@/types/app';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AppCatalog = () => {
  const { apps, updateAppStatus, addLog } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const [selectedApp, setSelectedApp] = useState<App | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleInstallClick = (app: App) => {
    setSelectedApp(app);
    setIsDialogOpen(true);
  };

  const handleInstallConfirm = (config: Record<string, string>) => {
    if (!selectedApp) return;

    updateAppStatus(selectedApp.id, 'installed', '1.0.0');
    addLog('success', selectedApp.name, `Installation réussie avec la configuration: ${Object.keys(config).join(', ')}`);
    
    toast({
      title: 'Installation réussie',
      description: `${selectedApp.name} a été installé et ajouté au dashboard`,
    });
    
    setIsDialogOpen(false);
    setSelectedApp(null);
  };

  const filterApps = (category?: AppCategory) => {
    let filtered = apps;
    if (category) {
      filtered = filtered.filter(app => app.category === category);
    }
    if (debouncedSearchQuery) {
      filtered = filtered.filter(app =>
        app.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
        app.description.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
      );
    }
    return filtered;
  };

  return (
    <div className="min-h-screen mesh-background">
      <div className="container py-8">
        {/* Hero Header with depth */}
        <div className="mb-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 blur-3xl -z-10 rounded-3xl" />
          <div className="glass-card p-8 rounded-3xl">
            <h1 className="mb-3 text-5xl font-bold text-gradient animate-gradient-shift">
              Catalogue d'applications
            </h1>
            <p className="text-muted-foreground text-lg">
              Parcourez et installez des applications auto-hébergées en un clic
            </p>
          </div>
        </div>

        {/* Search with 3D effect */}
        <div className="mb-8 animate-fade-in">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 blur-xl group-hover:blur-2xl transition-all duration-500 -z-10 rounded-2xl" />
            <div className="relative depth-3 rounded-2xl overflow-hidden">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-primary z-10" />
              <Input
                placeholder="Rechercher une application..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-base border-primary/20 bg-card/80 backdrop-blur-sm focus:border-primary transition-all duration-300"
              />
            </div>
          </div>
        </div>

        {/* Apps by Category with enhanced styling */}
        <Tabs defaultValue="all" className="space-y-6">
          <div className="glass-card p-2 rounded-2xl depth-2">
            <TabsList className="flex flex-wrap h-auto gap-2 bg-transparent">
              <TabsTrigger 
                value="all" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-primary/50 rounded-xl px-4 py-2.5 transition-all duration-300"
              >
                Toutes ({apps.length})
              </TabsTrigger>
              {(Object.entries(APP_CATEGORIES) as [AppCategory, typeof APP_CATEGORIES[AppCategory]][]).map(([key, { label, icon }]) => (
                <TabsTrigger 
                  key={key} 
                  value={key}
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-primary/50 rounded-xl px-4 py-2.5 transition-all duration-300"
                >
                  {icon} {label} ({apps.filter(a => a.category === key).length})
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value="all" className="space-y-4 animate-fade-in">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filterApps().map((app, index) => (
                <div key={app.id} className="animate-scale-in" style={{ animationDelay: `${index * 0.05}s` }}>
                  <CatalogAppCard
                    app={app}
                    onInstallClick={handleInstallClick}
                  />
                </div>
              ))}
            </div>
          </TabsContent>

          {(Object.keys(APP_CATEGORIES) as AppCategory[]).map(category => (
            <TabsContent key={category} value={category} className="space-y-4 animate-fade-in">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filterApps(category).map((app, index) => (
                  <div key={app.id} className="animate-scale-in" style={{ animationDelay: `${index * 0.05}s` }}>
                    <CatalogAppCard
                      app={app}
                      onInstallClick={handleInstallClick}
                    />
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <InstallDialog
          app={selectedApp}
          open={isDialogOpen}
          onClose={() => {
            setIsDialogOpen(false);
            setSelectedApp(null);
          }}
          onConfirm={handleInstallConfirm}
        />
      </div>
    </div>
  );
};

export default AppCatalog;
