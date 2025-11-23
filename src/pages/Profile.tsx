import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { UserCircle, Mail, Lock, Save, Shield } from 'lucide-react';

const Profile = () => {
  const { currentUser, updateProfile, userRole } = useAuth();
  const { toast } = useToast();
  
  const [username, setUsername] = useState(currentUser || '');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleUpdateProfile = () => {
    if (username.trim().length < 3) {
      toast({
        title: 'Erreur',
        description: 'Le nom d\'utilisateur doit contenir au moins 3 caractères',
        variant: 'destructive',
      });
      return;
    }

    if (newPassword && newPassword !== confirmPassword) {
      toast({
        title: 'Erreur',
        description: 'Les mots de passe ne correspondent pas',
        variant: 'destructive',
      });
      return;
    }

    if (newPassword && newPassword.length < 6) {
      toast({
        title: 'Erreur',
        description: 'Le mot de passe doit contenir au moins 6 caractères',
        variant: 'destructive',
      });
      return;
    }

    updateProfile(username, email, newPassword);
    
    toast({
      title: 'Profil mis à jour',
      description: 'Vos informations ont été enregistrées avec succès',
    });

    // Reset password fields
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="container py-8 max-w-4xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold text-gradient animate-gradient-shift">
          Mon Profil
        </h1>
        <p className="text-muted-foreground text-lg">
          Gérez vos informations personnelles et paramètres de sécurité
        </p>
      </div>

      <div className="space-y-6">
        {/* User Info Card */}
        <Card className="glass-card hover:shadow-2xl transition-all duration-500 border-primary/20 animate-scale-in">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5">
            <CardTitle className="flex items-center gap-3 text-2xl">
              <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-accent shadow-lg">
                <UserCircle className="h-6 w-6 text-white" />
              </div>
              Informations du compte
            </CardTitle>
            <CardDescription className="text-base">
              Mettez à jour votre nom d'utilisateur et email
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
              <div className="p-3 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Rôle actuel</p>
                <p className="text-lg font-bold capitalize">{userRole}</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="username" className="text-base font-medium">Nom d'utilisateur</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border-primary/20 focus:border-primary transition-colors h-12 text-base"
                placeholder="Votre nom d'utilisateur"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-base font-medium">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-primary/20 focus:border-primary transition-colors h-12 pl-11 text-base"
                  placeholder="votre@email.com"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Password Card */}
        <Card className="glass-card hover:shadow-2xl transition-all duration-500 border-primary/20 animate-scale-in" style={{ animationDelay: '0.1s' }}>
          <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5">
            <CardTitle className="flex items-center gap-3 text-2xl">
              <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 shadow-lg">
                <Lock className="h-6 w-6 text-white" />
              </div>
              Sécurité
            </CardTitle>
            <CardDescription className="text-base">
              Changez votre mot de passe pour plus de sécurité
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="space-y-2">
              <Label htmlFor="currentPassword" className="text-base font-medium">Mot de passe actuel</Label>
              <Input
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="border-primary/20 focus:border-primary transition-colors h-12 text-base"
                placeholder="••••••••"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword" className="text-base font-medium">Nouveau mot de passe</Label>
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="border-primary/20 focus:border-primary transition-colors h-12 text-base"
                placeholder="••••••••"
              />
              <p className="text-xs text-muted-foreground">Minimum 6 caractères</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-base font-medium">Confirmer le mot de passe</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="border-primary/20 focus:border-primary transition-colors h-12 text-base"
                placeholder="••••••••"
              />
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <Button 
            onClick={handleUpdateProfile} 
            size="lg"
            className="gradient-primary hover:opacity-90 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 px-8"
          >
            <Save className="mr-2 h-5 w-5" />
            Sauvegarder les modifications
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
