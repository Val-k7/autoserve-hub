import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Server, Package, Settings, ScrollText } from 'lucide-react';

export const Navbar = () => {
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
          <Link to="/settings">
            <Button variant="ghost">
              <Settings className="mr-2 h-4 w-4" />
              Configuration
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
