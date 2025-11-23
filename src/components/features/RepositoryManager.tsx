import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useRepositories } from '@/hooks/useRepositories';
import { validateGitHubRawUrl, validateRepositoryName, sanitizeString } from '@/lib/validation';
import { toast } from 'sonner';
import { 
  GitBranch, 
  Plus, 
  RefreshCw, 
  Trash2, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  ExternalLink
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export const RepositoryManager = () => {
  const { repositories, loading, syncing, addRepository, syncRepository, deleteRepository } = useRepositories();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newRepo, setNewRepo] = useState({
    name: '',
    description: '',
    url: '',
  });
  const [validationErrors, setValidationErrors] = useState<{
    name?: string;
    url?: string;
  }>({});

  const validateForm = useMemo(() => {
    const errors: { name?: string; url?: string } = {};
    
    if (newRepo.name && !validateRepositoryName(newRepo.name)) {
      errors.name = 'Le nom doit contenir entre 3 et 100 caractères';
    }
    
    if (newRepo.url && !validateGitHubRawUrl(newRepo.url)) {
      errors.url = 'URL invalide. Utilisez une URL GitHub raw (raw.githubusercontent.com)';
    }
    
    return errors;
  }, [newRepo.name, newRepo.url]);

  const handleAddRepository = async () => {
    // Validate inputs
    const errors = validateForm;
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      toast.error('Veuillez corriger les erreurs');
      return;
    }

    if (!newRepo.name || !newRepo.url) {
      toast.error('Le nom et l\'URL sont requis');
      return;
    }

    const result = await addRepository(
      sanitizeString(newRepo.name),
      sanitizeString(newRepo.description),
      newRepo.url.trim()
    );

    if (result.success) {
      setIsDialogOpen(false);
      setNewRepo({ name: '', description: '', url: '' });
      setValidationErrors({});
    }
  };

  const handleSyncRepository = async (repoId: string) => {
    await syncRepository(repoId);
  };

  const handleDeleteRepository = async (repoId: string) => {
    await deleteRepository(repoId);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'in_progress':
        return <RefreshCw className="w-4 h-4 text-blue-500 animate-spin" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="default" className="bg-green-500">Synchronisé</Badge>;
      case 'error':
        return <Badge variant="destructive">Erreur</Badge>;
      case 'in_progress':
        return <Badge variant="secondary">En cours...</Badge>;
      default:
        return <Badge variant="outline">En attente</Badge>;
    }
  };

  if (loading) {
    return <div className="text-center py-8">Chargement...</div>;
  }

  return (
    <Card className="glass-card hover:shadow-2xl transition-all duration-500 border-primary/20">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-t-2xl">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-xl">
                <GitBranch className="h-6 w-6 text-white" />
              </div>
              Dépôts de catalogues
            </CardTitle>
            <CardDescription className="text-base mt-2">
              Gérez les sources de catalogues d'applications depuis GitHub
            </CardDescription>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="button-texture-primary">
                <Plus className="mr-2 h-4 w-4" />
                Ajouter un dépôt
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Ajouter un nouveau dépôt</DialogTitle>
                <DialogDescription>
                  Ajoutez un dépôt GitHub contenant un catalogue d'applications
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom du dépôt</Label>
                  <Input
                    id="name"
                    placeholder="Mon Catalogue"
                    value={newRepo.name}
                    onChange={(e) => {
                      setNewRepo(prev => ({ ...prev, name: e.target.value }));
                      setValidationErrors(prev => ({ ...prev, name: undefined }));
                    }}
                    className={validationErrors.name ? 'border-red-500' : ''}
                  />
                  {validationErrors.name && (
                    <p className="text-xs text-red-500">{validationErrors.name}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description (optionnel)</Label>
                  <Input
                    id="description"
                    placeholder="Description du catalogue"
                    value={newRepo.description}
                    onChange={(e) => setNewRepo(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="url">URL du manifest</Label>
                  <Input
                    id="url"
                    placeholder="https://raw.githubusercontent.com/user/repo/main/manifest.json"
                    value={newRepo.url}
                    onChange={(e) => {
                      setNewRepo(prev => ({ ...prev, url: e.target.value }));
                      setValidationErrors(prev => ({ ...prev, url: undefined }));
                    }}
                    className={validationErrors.url ? 'border-red-500' : ''}
                  />
                  {validationErrors.url && (
                    <p className="text-xs text-red-500">{validationErrors.url}</p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    URL directe vers le fichier JSON du manifest GitHub (raw.githubusercontent.com)
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Annuler
                </Button>
                <Button onClick={handleAddRepository} className="button-texture-primary">
                  Ajouter
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          {repositories.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              Aucun dépôt configuré. Ajoutez-en un pour commencer.
            </p>
          ) : (
            repositories.map((repo) => (
              <div
                key={repo.id}
                className="p-4 rounded-lg border border-border/50 bg-background/30 hover:bg-background/50 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg">{repo.name}</h3>
                      {repo.is_official && (
                        <Badge variant="secondary" className="bg-blue-500/20 text-blue-500">
                          Officiel
                        </Badge>
                      )}
                      {getStatusBadge(repo.sync_status)}
                    </div>
                    {repo.description && (
                      <p className="text-sm text-muted-foreground mb-2">{repo.description}</p>
                    )}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <a 
                        href={repo.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 hover:text-primary transition-colors"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Voir le manifest
                      </a>
                      {repo.last_synced_at && (
                        <span className="flex items-center gap-1">
                          {getStatusIcon(repo.sync_status)}
                          Dernière sync: {new Date(repo.last_synced_at).toLocaleString()}
                        </span>
                      )}
                    </div>
                    {repo.sync_error && (
                      <p className="text-xs text-red-500 mt-2">
                        Erreur: {repo.sync_error}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleSyncRepository(repo.id)}
                      disabled={syncing === repo.id}
                    >
                      <RefreshCw className={`w-4 h-4 ${syncing === repo.id ? 'animate-spin' : ''}`} />
                    </Button>
                    {!repo.is_official && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="sm" variant="destructive">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Supprimer ce dépôt ?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Cette action supprimera le dépôt et toutes les applications associées du catalogue.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeleteRepository(repo.id)}>
                              Supprimer
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};
