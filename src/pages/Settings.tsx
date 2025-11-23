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
      
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-foreground">Configuration Système</h1>
          <p className="text-muted-foreground">
            Gérez les chemins, domaines et certificats HTTPS
          </p>
        </div>

        <div className="space-y-6">
          {/* Chemins d'installation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FolderOpen className="h-5 w-5" />
                Chemins d'installation
              </CardTitle>
              <CardDescription>
                Définissez les répertoires par défaut pour les applications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="installPath">Chemin d'installation</Label>
                <Input
                  id="installPath"
                  value={settings.installPath}
                  onChange={(e) => handleChange('installPath', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dataPath">Chemin des données</Label>
                <Input
                  id="dataPath"
                  value={settings.dataPath}
                  onChange={(e) => handleChange('dataPath', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Configuration réseau */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Configuration réseau
              </CardTitle>
              <CardDescription>
                Paramètres de domaine et d'accès
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="domain">Domaine</Label>
                <Input
                  id="domain"
                  value={settings.domain}
                  onChange={(e) => handleChange('domain', e.target.value)}
                  placeholder="autoserve.local"
                />
              </div>
            </CardContent>
          </Card>

          {/* Certificats HTTPS */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Certificats HTTPS
              </CardTitle>
              <CardDescription>
                Configuration des certificats SSL/TLS
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="certPath">Chemin du certificat</Label>
                <Input
                  id="certPath"
                  value={settings.certPath}
                  onChange={(e) => handleChange('certPath', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="keyPath">Chemin de la clé privée</Label>
                <Input
                  id="keyPath"
                  value={settings.keyPath}
                  onChange={(e) => handleChange('keyPath', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Button onClick={handleSave} className="w-full sm:w-auto">
            <Save className="mr-2 h-4 w-4" />
            Sauvegarder les modifications
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
