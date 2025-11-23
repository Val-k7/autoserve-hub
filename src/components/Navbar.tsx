import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Server, Package, Settings, ScrollText, LogOut, Users } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export const Navbar = () => {
  const { isAuthenticated, currentUser, userRole, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.info('Déconnexion réussie');
    navigate('/login');
  };

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-semibold text-foreground">
          <Server className="h-6 w-6" />
          <span className="text-xl">AutoServe</span>
        </Link>
        
        <div className="flex items-center gap-2">
          <Link to="/">
            <Button variant="ghost">Accueil</Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="ghost">Dashboard</Button>
          </Link>
          <Link to="/catalog">
            <Button variant="ghost">
              <Package className="mr-2 h-4 w-4" />
              Catalogue
            </Button>
          </Link>
          <Link to="/logs">
            <Button variant="ghost">
              <ScrollText className="mr-2 h-4 w-4" />
              Logs
            </Button>
          </Link>
          {isAdmin && (
            <>
              <Link to="/users">
                <Button variant="ghost">
                  <Users className="mr-2 h-4 w-4" />
                  Utilisateurs
                </Button>
              </Link>
              <Link to="/settings">
                <Button variant="ghost">
                  <Settings className="mr-2 h-4 w-4" />
                  Configuration
                </Button>
              </Link>
            </>
          )}
          {isAuthenticated && (
            <>
              <div className="flex flex-col items-end">
                <span className="text-sm font-medium">{currentUser}</span>
                <span className="text-xs text-muted-foreground">
                  {userRole === 'admin' ? 'Administrateur' : 'Utilisateur'}
                </span>
              </div>
              <Button variant="ghost" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Déconnexion
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
