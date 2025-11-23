import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Save, FolderOpen, Globe, Lock } from 'lucide-react';

const Settings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    installPath: '/opt/autoserve',
    dataPath: '/var/lib/autoserve',
    domain: 'autoserve.local',
    httpsEnabled: false,
    certPath: '/etc/ssl/certs/autoserve.crt',
    keyPath: '/etc/ssl/private/autoserve.key'
  });

  const handleSave = () => {
    toast({
      title: 'Configuration sauvegardée',
      description: 'Les paramètres système ont été mis à jour avec succès',
    });
  };

  const handleChange = (field: string, value: string | boolean) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container py-8 animate-fade-in">
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-fade-in">
            Configuration Système
          </h1>
          <p className="text-muted-foreground text-lg">
            Gérez les chemins, domaines et certificats HTTPS
          </p>
        </div>

        <div className="space-y-6">
          {/* Chemins d'installation */}
          <Card className="border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 card-hover animate-scale-in">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5">
              <CardTitle className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-primary/10">
                  <FolderOpen className="h-5 w-5 text-primary" />
                </div>
                Chemins d'installation
              </CardTitle>
              <CardDescription>
                Définissez les répertoires par défaut pour les applications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="space-y-2">
                <Label htmlFor="installPath" className="text-base font-medium">Chemin d'installation</Label>
                <Input
                  id="installPath"
                  value={settings.installPath}
                  onChange={(e) => handleChange('installPath', e.target.value)}
                  className="border-primary/20 focus:border-primary transition-colors"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dataPath" className="text-base font-medium">Chemin des données</Label>
                <Input
                  id="dataPath"
                  value={settings.dataPath}
                  onChange={(e) => handleChange('dataPath', e.target.value)}
                  className="border-primary/20 focus:border-primary transition-colors"
                />
              </div>
            </CardContent>
          </Card>

          {/* Configuration réseau */}
          <Card className="border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 card-hover animate-scale-in" style={{ animationDelay: '0.1s' }}>
            <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5">
              <CardTitle className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Globe className="h-5 w-5 text-primary" />
                </div>
                Configuration réseau
              </CardTitle>
              <CardDescription>
                Paramètres de domaine et d'accès
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="space-y-2">
                <Label htmlFor="domain" className="text-base font-medium">Domaine</Label>
                <Input
                  id="domain"
                  value={settings.domain}
                  onChange={(e) => handleChange('domain', e.target.value)}
                  placeholder="autoserve.local"
                  className="border-primary/20 focus:border-primary transition-colors"
                />
              </div>
            </CardContent>
          </Card>

          {/* Certificats HTTPS */}
          <Card className="border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 card-hover animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5">
              <CardTitle className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Lock className="h-5 w-5 text-primary" />
                </div>
                Certificats HTTPS
              </CardTitle>
              <CardDescription>
                Configuration des certificats SSL/TLS
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="space-y-2">
                <Label htmlFor="certPath" className="text-base font-medium">Chemin du certificat</Label>
                <Input
                  id="certPath"
                  value={settings.certPath}
                  onChange={(e) => handleChange('certPath', e.target.value)}
                  className="border-primary/20 focus:border-primary transition-colors"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="keyPath" className="text-base font-medium">Chemin de la clé privée</Label>
                <Input
                  id="keyPath"
                  value={settings.keyPath}
                  onChange={(e) => handleChange('keyPath', e.target.value)}
                  className="border-primary/20 focus:border-primary transition-colors"
                />
              </div>
            </CardContent>
          </Card>

          <Button onClick={handleSave} className="w-full sm:w-auto gradient-primary hover:opacity-90 transition-opacity shadow-lg hover:shadow-xl">
            <Save className="mr-2 h-4 w-4" />
            Sauvegarder les modifications
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
