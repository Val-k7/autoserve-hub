import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Repository {
  id: string;
  name: string;
  description: string | null;
  url: string;
  type: string;
  is_official: boolean;
  is_enabled: boolean;
  sync_status: string;
  sync_error: string | null;
  last_synced_at: string | null;
}

export const useRepositories = () => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState<string | null>(null);

  const fetchRepositories = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('repositories')
        .select('*')
        .order('is_official', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRepositories(data || []);
    } catch (error: any) {
      console.error('Error fetching repositories:', error);
      toast.error('Erreur lors du chargement des dépôts');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRepositories();
  }, [fetchRepositories]);

  const addRepository = useCallback(async (
    name: string,
    description: string,
    url: string
  ) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { error } = await supabase
        .from('repositories')
        .insert({
          name,
          description: description || null,
          url,
          type: 'github',
          added_by: user?.id,
        });

      if (error) throw error;

      toast.success('Dépôt ajouté avec succès');
      await fetchRepositories();
      return { success: true };
    } catch (error: any) {
      console.error('Error adding repository:', error);
      toast.error('Erreur lors de l\'ajout du dépôt');
      return { success: false, error: error.message };
    }
  }, [fetchRepositories]);

  const syncRepository = useCallback(async (repoId: string) => {
    setSyncing(repoId);
    try {
      const { data, error } = await supabase.functions.invoke('sync-repository', {
        body: { repositoryId: repoId }
      });

      if (error) throw error;

      if (data?.success) {
        toast.success(data.message || 'Synchronisation réussie');
      } else {
        toast.error(data?.error || 'Erreur lors de la synchronisation');
      }
      
      await fetchRepositories();
      return { success: true };
    } catch (error: any) {
      console.error('Error syncing repository:', error);
      toast.error('Erreur lors de la synchronisation');
      return { success: false, error: error.message };
    } finally {
      setSyncing(null);
    }
  }, [fetchRepositories]);

  const deleteRepository = useCallback(async (repoId: string) => {
    try {
      const { error } = await supabase
        .from('repositories')
        .delete()
        .eq('id', repoId);

      if (error) throw error;

      toast.success('Dépôt supprimé');
      await fetchRepositories();
      return { success: true };
    } catch (error: any) {
      console.error('Error deleting repository:', error);
      toast.error('Erreur lors de la suppression');
      return { success: false, error: error.message };
    }
  }, [fetchRepositories]);

  return {
    repositories,
    loading,
    syncing,
    fetchRepositories,
    addRepository,
    syncRepository,
    deleteRepository,
  };
};
