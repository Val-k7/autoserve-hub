import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { App } from '@/types/app';
import { Loader2 } from 'lucide-react';

interface InstallDialogProps {
  app: App | null;
  open: boolean;
  onClose: () => void;
  onConfirm: (config: Record<string, string>) => void;
}

const APP_CONFIG_FIELDS: Record<string, { label: string; type: string; required: boolean; placeholder: string }[]> = {
  nextcloud: [
    { label: 'Mot de passe administrateur', type: 'password', required: true, placeholder: 'Entrez un mot de passe sécurisé' },
    { label: 'Port d\'accès', type: 'number', required: false, placeholder: '8080' },
  ],
  vaultwarden: [
    { label: 'Token d\'administration', type: 'password', required: true, placeholder: 'Token pour l\'interface admin' },
  ],
  plex: [
    { label: 'Claim Token (optionnel)', type: 'text', required: false, placeholder: 'claim-xxxxxx' },
  ],
  jellyfin: [
    { label: 'Port d\'accès', type: 'number', required: false, placeholder: '8096' },
  ],
};

export const InstallDialog = ({ app, open, onClose, onConfirm }: InstallDialogProps) => {
  const [config, setConfig] = useState<Record<string, string>>({});
  const [isInstalling, setIsInstalling] = useState(false);

  const configFields = app ? APP_CONFIG_FIELDS[app.id] || [] : [];

  const handleInstall = async () => {
    setIsInstalling(true);
    
    // Simulate installation delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    onConfirm(config);
    setIsInstalling(false);
    setConfig({});
  };

  const handleClose = () => {
    if (!isInstalling) {
      setConfig({});
      onClose();
    }
  };

  if (!app) return null;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] border-primary/20 shadow-2xl">
        <DialogHeader className="space-y-3">
          <DialogTitle className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 animate-scale-in">
              <span className="text-3xl">{app.icon}</span>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-2xl font-bold">Installer {app.name}</span>
            </div>
          </DialogTitle>
          <DialogDescription className="text-base">
            {app.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-4">
          {configFields.length > 0 ? (
            <>
              <div className="p-4 rounded-lg bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/10">
                <p className="text-sm font-medium text-foreground mb-4">
                  Configuration de l'application :
                </p>
                <div className="space-y-4">
                  {configFields.map((field, index) => (
                    <div key={index} className="space-y-2">
                      <Label htmlFor={`field-${index}`} className="text-base font-medium">
                        {field.label}
                        {field.required && <span className="text-destructive ml-1">*</span>}
                      </Label>
                      <Input
                        id={`field-${index}`}
                        type={field.type}
                        placeholder={field.placeholder}
                        value={config[field.label] || ''}
                        onChange={(e) => setConfig({ ...config, [field.label]: e.target.value })}
                        required={field.required}
                        disabled={isInstalling}
                        className="border-primary/20 focus:border-primary transition-colors"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="p-4 rounded-lg bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/10">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Cette application sera installée avec la configuration par défaut.
                Vous pourrez la configurer après l'installation depuis le dashboard.
              </p>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isInstalling}
            className="border-border/50 hover:border-primary/50 transition-colors"
          >
            Annuler
          </Button>
          <Button
            onClick={handleInstall}
            disabled={isInstalling}
            className="gradient-primary hover:opacity-90 shadow-lg transition-all"
          >
            {isInstalling ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Installation...
              </>
            ) : (
              'Installer'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
