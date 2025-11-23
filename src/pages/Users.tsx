import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users as UsersIcon, UserX, Shield, User as UserIcon } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth, User, UserRole, getUsers, saveUsers } from '@/contexts/AuthContext';

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
    setUsers(getUsers());
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
    saveUsers(updatedUsers);
    setUsers(updatedUsers);
    toast.success(`Utilisateur ${username} supprimé`);
  };

  const handleChangeRole = (username: string, newRole: UserRole) => {
    if (username === 'admin') {
      toast.error('Impossible de modifier le rôle du compte admin');
      return;
    }

    if (username === currentUser) {
      toast.error('Impossible de modifier votre propre rôle');
      return;
    }

    const updatedUsers = users.map(u => 
      u.username === username ? { ...u, role: newRole } : u
    );
    saveUsers(updatedUsers);
    setUsers(updatedUsers);
    toast.success(`Rôle de ${username} modifié en ${newRole === 'admin' ? 'Administrateur' : 'Utilisateur'}`);
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
                    <TableHead>Rôle</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.username}>
                      <TableCell className="font-medium">{user.username}</TableCell>
                      <TableCell>
                        {user.username === 'admin' || user.username === currentUser ? (
                          <span className="inline-flex items-center gap-1 text-sm">
                            {user.role === 'admin' ? (
                              <>
                                <Shield className="h-4 w-4 text-primary" />
                                <span className="text-primary">Administrateur</span>
                              </>
                            ) : (
                              <>
                                <UserIcon className="h-4 w-4 text-muted-foreground" />
                                <span className="text-muted-foreground">Utilisateur</span>
                              </>
                            )}
                          </span>
                        ) : (
                          <Select
                            value={user.role}
                            onValueChange={(value: UserRole) => handleChangeRole(user.username, value)}
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="user">
                                <span className="flex items-center gap-2">
                                  <UserIcon className="h-4 w-4" />
                                  Utilisateur
                                </span>
                              </SelectItem>
                              <SelectItem value="admin">
                                <span className="flex items-center gap-2">
                                  <Shield className="h-4 w-4" />
                                  Administrateur
                                </span>
                              </SelectItem>
                            </SelectContent>
                          </Select>
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
