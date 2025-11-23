import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center space-y-8 p-8 animate-fade-in">
        <div className="space-y-4">
          <div className="inline-block">
            <h1 className="text-9xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-scale-in">
              404
            </h1>
          </div>
          <h2 className="text-3xl font-bold text-foreground animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Page introuvable
          </h2>
          <p className="text-xl text-muted-foreground max-w-md mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            La page que vous recherchez n'existe pas ou a été déplacée.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <Button asChild size="lg" className="gradient-primary shadow-lg hover:shadow-xl transition-all">
            <Link to="/">
              <Home className="mr-2 h-5 w-5" />
              Retour à l'accueil
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-primary/20 hover:border-primary transition-colors">
            <Link to="#" onClick={() => window.history.back()}>
              <ArrowLeft className="mr-2 h-5 w-5" />
              Page précédente
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
