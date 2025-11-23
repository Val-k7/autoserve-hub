import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { CatalogAppCard } from '@/components/CatalogAppCard';
import { InstallDialog } from '@/components/InstallDialog';
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
  const [selectedApp, setSelectedApp] = useState<App | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleInstallClick = (app: App) => {
    setSelectedApp(app);
    setIsDialogOpen(true);
  };

  const handleInstallConfirm = (config: Record<string, string>) => {
    if (!selectedApp) return;

    setApps(apps.map(a => 
      a.id === selectedApp.id ? { ...a, status: 'installed' as AppStatus, version: '1.0.0' } : a
    ));
    
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
                <CatalogAppCard
                  key={app.id}
                  app={app}
                  onInstallClick={handleInstallClick}
                />
              ))}
            </div>
          </TabsContent>

          {(Object.keys(APP_CATEGORIES) as AppCategory[]).map(category => (
            <TabsContent key={category} value={category} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filterApps(category).map(app => (
                  <CatalogAppCard
                    key={app.id}
                    app={app}
                    onInstallClick={handleInstallClick}
                  />
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
