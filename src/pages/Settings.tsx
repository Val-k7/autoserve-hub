import { useState } from 'react';
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
    <div className="min-h-full">
      <div className="container py-8 animate-fade-in max-w-5xl mx-auto">
        {/* Hero Header */}
        <div className="mb-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-teal-500/10 blur-3xl -z-10 rounded-3xl" />
          <div className="glass-card p-8 rounded-3xl depth-3">
            <h1 className="mb-3 text-5xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent animate-gradient-shift">
              Configuration Système
            </h1>
            <p className="text-muted-foreground text-lg">
              Gérez les chemins, domaines et certificats HTTPS
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Chemins d'installation */}
          <Card className="glass-card hover:shadow-2xl transition-all duration-500 border-primary/20 animate-scale-in hover-lift">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-t-2xl">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-xl button-texture-primary">
                  <FolderOpen className="h-6 w-6 text-white" />
                </div>
                Chemins d'installation
              </CardTitle>
              <CardDescription className="text-base">
                Définissez les répertoires par défaut pour les applications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="space-y-3">
                <Label htmlFor="installPath" className="text-base font-semibold">Chemin d'installation</Label>
                <Input
                  id="installPath"
                  value={settings.installPath}
                  onChange={(e) => handleChange('installPath', e.target.value)}
                  className="border-primary/20 focus:border-primary transition-all duration-300 h-12 text-base depth-2"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="dataPath" className="text-base font-semibold">Chemin des données</Label>
                <Input
                  id="dataPath"
                  value={settings.dataPath}
                  onChange={(e) => handleChange('dataPath', e.target.value)}
                  className="border-primary/20 focus:border-primary transition-all duration-300 h-12 text-base depth-2"
                />
              </div>
            </CardContent>
          </Card>

          {/* Configuration réseau */}
          <Card className="glass-card hover:shadow-2xl transition-all duration-500 border-primary/20 animate-scale-in hover-lift" style={{ animationDelay: '0.1s' }}>
            <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-t-2xl">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 shadow-xl button-texture-success">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                Configuration réseau
              </CardTitle>
              <CardDescription className="text-base">
                Paramètres de domaine et d'accès
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="space-y-3">
                <Label htmlFor="domain" className="text-base font-semibold">Domaine</Label>
                <Input
                  id="domain"
                  value={settings.domain}
                  onChange={(e) => handleChange('domain', e.target.value)}
                  placeholder="autoserve.local"
                  className="border-primary/20 focus:border-primary transition-all duration-300 h-12 text-base depth-2"
                />
              </div>
            </CardContent>
          </Card>

          {/* Certificats HTTPS */}
          <Card className="glass-card hover:shadow-2xl transition-all duration-500 border-primary/20 animate-scale-in hover-lift" style={{ animationDelay: '0.2s' }}>
            <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-t-2xl">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 shadow-xl button-texture-destructive">
                  <Lock className="h-6 w-6 text-white" />
                </div>
                Certificats HTTPS
              </CardTitle>
              <CardDescription className="text-base">
                Configuration des certificats SSL/TLS
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="space-y-3">
                <Label htmlFor="certPath" className="text-base font-semibold">Chemin du certificat</Label>
                <Input
                  id="certPath"
                  value={settings.certPath}
                  onChange={(e) => handleChange('certPath', e.target.value)}
                  className="border-primary/20 focus:border-primary transition-all duration-300 h-12 text-base depth-2"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="keyPath" className="text-base font-semibold">Chemin de la clé privée</Label>
                <Input
                  id="keyPath"
                  value={settings.keyPath}
                  onChange={(e) => handleChange('keyPath', e.target.value)}
                  className="border-primary/20 focus:border-primary transition-all duration-300 h-12 text-base depth-2"
                />
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Button 
              onClick={handleSave} 
              size="lg"
              className="px-8 button-texture-primary"
            >
              <Save className="mr-2 h-5 w-5" />
              Sauvegarder les modifications
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
