import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Users as UsersIcon, UserX, Shield } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

interface User {
  username: string;
  password: string;
}

const USERS_STORAGE_KEY = 'autoserve_users';
const SIGNUP_ENABLED_KEY = 'autoserve_signup_enabled';

const Users = () => {
  const { currentUser } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [signupEnabled, setSignupEnabled] = useState<boolean>(() => {
    const stored = localStorage.getItem(SIGNUP_ENABLED_KEY);
    return stored === null ? true : stored === 'true';
  });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    const stored = localStorage.getItem(USERS_STORAGE_KEY);
    if (stored) {
      setUsers(JSON.parse(stored));
    }
  };

  const handleDeleteUser = (username: string) => {
    if (username === 'admin') {
      toast.error('Impossible de supprimer le compte admin');
      return;
    }

    if (username === currentUser) {
      toast.error('Impossible de supprimer votre propre compte');
      return;
    }

    const updatedUsers = users.filter(u => u.username !== username);
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
    toast.success(`Utilisateur ${username} supprimé`);
  };

  const handleToggleSignup = (enabled: boolean) => {
    setSignupEnabled(enabled);
    localStorage.setItem(SIGNUP_ENABLED_KEY, String(enabled));
    toast.success(enabled ? 'Inscriptions activées' : 'Inscriptions désactivées');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container py-8">
        <div className="flex items-center gap-3 mb-6">
          <UsersIcon className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold text-foreground">Gestion des utilisateurs</h1>
            <p className="text-muted-foreground">Gérez les comptes et les inscriptions</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Contrôle des inscriptions
              </CardTitle>
              <CardDescription>
                Activez ou désactivez la création de nouveaux comptes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Switch
                  id="signup-toggle"
                  checked={signupEnabled}
                  onCheckedChange={handleToggleSignup}
                />
                <Label htmlFor="signup-toggle">
                  {signupEnabled ? 'Inscriptions activées' : 'Inscriptions désactivées'}
                </Label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Statistiques</CardTitle>
              <CardDescription>Aperçu des comptes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">
                {users.length}
              </div>
              <p className="text-sm text-muted-foreground">
                {users.length === 1 ? 'Utilisateur enregistré' : 'Utilisateurs enregistrés'}
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Liste des utilisateurs</CardTitle>
            <CardDescription>Tous les comptes enregistrés dans le système</CardDescription>
          </CardHeader>
          <CardContent>
            {users.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Aucun utilisateur enregistré
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom d'utilisateur</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.username}>
                      <TableCell className="font-medium">{user.username}</TableCell>
                      <TableCell>
                        {user.username === 'admin' ? (
                          <span className="inline-flex items-center gap-1 text-sm text-primary">
                            <Shield className="h-4 w-4" />
                            Administrateur
                          </span>
                        ) : (
                          <span className="text-sm text-muted-foreground">Utilisateur</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        {user.username !== 'admin' && user.username !== currentUser && (
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <UserX className="h-4 w-4 mr-2" />
                                Supprimer
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Êtes-vous sûr de vouloir supprimer l'utilisateur "{user.username}" ?
                                  Cette action est irréversible.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Annuler</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDeleteUser(user.username)}>
                                  Supprimer
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        )}
                        {(user.username === 'admin' || user.username === currentUser) && (
                          <span className="text-sm text-muted-foreground">—</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Users;
