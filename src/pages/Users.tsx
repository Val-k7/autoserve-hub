import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users as UsersIcon, UserX, Shield, User as UserIcon, UserPlus } from 'lucide-react';
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
    <div className="min-h-full">
      <div className="container py-8 animate-fade-in max-w-7xl mx-auto">
        {/* Hero Header */}
        <div className="mb-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 blur-3xl -z-10 rounded-3xl" />
          <div className="glass-card p-8 rounded-3xl depth-3">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 shadow-2xl button-glow-primary">
                <UsersIcon className="h-10 w-10 text-white" />
              </div>
              <div>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-shift">
                  Gestion des utilisateurs
                </h1>
                <p className="text-muted-foreground text-lg mt-2">
                  Gérez les comptes utilisateurs et leurs permissions
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Signup Control Card */}
          <Card className="glass-card hover:shadow-2xl transition-all duration-500 border-primary/20 animate-scale-in hover-lift">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-t-2xl">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 shadow-xl button-glow-success">
                  <UserPlus className="h-6 w-6 text-white" />
                </div>
                Paramètres d'inscription
              </CardTitle>
              <CardDescription className="text-base">
                Contrôlez qui peut créer un nouveau compte sur le système
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/10 depth-2">
                <div className="space-y-1">
                  <Label htmlFor="signup-toggle" className="text-base font-semibold cursor-pointer">
                    Autoriser les nouvelles inscriptions
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    {signupEnabled ? 'Les nouveaux utilisateurs peuvent créer un compte' : 'Les inscriptions sont désactivées'}
                  </p>
                </div>
                <Switch
                  id="signup-toggle"
                  checked={signupEnabled}
                  onCheckedChange={handleToggleSignup}
                  className="scale-125"
                />
              </div>
            </CardContent>
          </Card>

          {/* Users List Card */}
          <Card className="glass-card hover:shadow-2xl transition-all duration-500 border-primary/20 animate-scale-in hover-lift" style={{ animationDelay: '0.1s' }}>
            <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-t-2xl">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-xl button-glow-primary">
                  <UsersIcon className="h-6 w-6 text-white" />
                </div>
                Liste des utilisateurs
                <span className="ml-auto text-base px-4 py-1.5 rounded-xl bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 font-semibold">
                  {users.length} utilisateur{users.length > 1 ? 's' : ''}
                </span>
              </CardTitle>
              <CardDescription className="text-base">
                Gérez les rôles et permissions des utilisateurs
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="rounded-xl border border-border/40 overflow-hidden depth-2">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gradient-to-r from-primary/5 to-accent/5 border-b border-border/40 hover:bg-primary/10">
                      <TableHead className="font-bold text-base">Utilisateur</TableHead>
                      <TableHead className="font-bold text-base">Rôle</TableHead>
                      <TableHead className="font-bold text-base">Statut</TableHead>
                      <TableHead className="font-bold text-base text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user, index) => (
                      <TableRow 
                        key={user.username} 
                        className="hover:bg-primary/5 transition-colors animate-fade-in"
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 depth-2">
                              <UserIcon className="h-4 w-4 text-primary" />
                            </div>
                            <span className="font-semibold">{user.username}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Select
                            value={user.role}
                            onValueChange={(value) => handleChangeRole(user.username, value as UserRole)}
                            disabled={user.username === 'admin' || user.username === currentUser}
                          >
                            <SelectTrigger className="w-40 depth-2">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="admin">
                                <div className="flex items-center gap-2">
                                  <Shield className="h-4 w-4 text-primary" />
                                  Administrateur
                                </div>
                              </SelectItem>
                              <SelectItem value="user">
                                <div className="flex items-center gap-2">
                                  <UserIcon className="h-4 w-4 text-muted-foreground" />
                                  Utilisateur
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold depth-2 ${
                            user.role === 'admin' 
                              ? 'bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 text-primary' 
                              : 'bg-gradient-to-r from-muted to-muted/80 text-muted-foreground'
                          }`}>
                            {user.role === 'admin' ? <Shield className="h-3 w-3" /> : <UserIcon className="h-3 w-3" />}
                            {user.role === 'admin' ? 'Admin' : 'User'}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="destructive"
                                size="sm"
                                disabled={user.username === 'admin' || user.username === currentUser}
                                className="gap-2"
                              >
                                <UserX className="h-4 w-4" />
                                Supprimer
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="glass-card border-destructive/20 depth-3">
                              <AlertDialogHeader>
                                <AlertDialogTitle className="text-2xl">Confirmer la suppression</AlertDialogTitle>
                                <AlertDialogDescription className="text-base">
                                  Êtes-vous sûr de vouloir supprimer l'utilisateur <strong>{user.username}</strong> ?
                                  Cette action est irréversible.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel className="depth-2">Annuler</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeleteUser(user.username)}
                                  className="bg-gradient-to-r from-red-500 to-red-600 text-white button-glow-destructive"
                                >
                                  Supprimer
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Users;
