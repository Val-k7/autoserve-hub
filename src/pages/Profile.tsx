import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { UserCircle, Mail, Lock, Save } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const Profile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [email, setEmail] = useState(user?.email || '');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateProfile = async () => {
    setIsLoading(true);

    try {
      // Update email if changed
      if (email !== user?.email) {
        const { error: emailError } = await supabase.auth.updateUser({
          email: email,
        });
        
        if (emailError) throw emailError;
      }

      // Update password if provided
      if (newPassword) {
        if (newPassword !== confirmPassword) {
          toast({
            title: 'Erreur',
            description: 'Les mots de passe ne correspondent pas',
            variant: 'destructive',
          });
          setIsLoading(false);
          return;
        }

        if (newPassword.length < 6) {
          toast({
            title: 'Erreur',
            description: 'Le mot de passe doit contenir au moins 6 caractères',
            variant: 'destructive',
          });
          setIsLoading(false);
          return;
        }

        const { error: passwordError } = await supabase.auth.updateUser({
          password: newPassword,
        });
        
        if (passwordError) throw passwordError;
      }
      
      toast({
        title: 'Profil mis à jour',
        description: 'Vos informations ont été enregistrées avec succès',
      });

      // Reset password fields
      setNewPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      toast({
        title: 'Erreur',
        description: error.message || 'Impossible de mettre à jour le profil',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
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
              Mettez à jour votre email
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
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
            disabled={isLoading}
            className="gradient-primary hover:opacity-90 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 px-8"
          >
            <Save className="mr-2 h-5 w-5" />
            {isLoading ? 'Enregistrement...' : 'Sauvegarder les modifications'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
