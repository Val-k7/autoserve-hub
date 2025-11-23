import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Home, LayoutDashboard, Store, ArrowLeft, Search, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

const NotFound = () => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const quickLinks = [
    {
      title: 'Accueil',
      description: 'Retour à la page principale',
      icon: Home,
      path: '/',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Dashboard',
      description: 'Gérer vos applications',
      icon: LayoutDashboard,
      path: '/dashboard',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Catalogue',
      description: 'Découvrir les apps',
      icon: Store,
      path: '/catalog',
      gradient: 'from-green-500 to-emerald-500',
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 mesh-background" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-primary/20 animate-float"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${Math.random() * 15 + 10}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <div className="text-center mb-12 animate-fade-in">
          {/* 3D 404 Text */}
          <div className="relative mb-8">
            <h1
              className="text-[200px] md:text-[280px] font-black leading-none select-none"
              style={{
                transform: `perspective(1000px) rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg)`,
                transition: 'transform 0.1s ease-out',
              }}
            >
              <span className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-primary bg-clip-text text-transparent blur-2xl opacity-50 animate-gradient-shift">
                404
              </span>
              <span className="relative bg-gradient-to-br from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient-shift">
                404
              </span>
            </h1>
          </div>

          {/* Floating icons */}
          <div className="relative h-32 mb-8">
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-float"
              style={{ animationDelay: '0s', animationDuration: '6s' }}
            >
              <div className="p-4 rounded-2xl bg-gradient-to-br from-red-500/20 to-orange-500/20 backdrop-blur-sm border border-red-500/30">
                <Search className="h-12 w-12 text-red-500" />
              </div>
            </div>
            
            <div
              className="absolute left-1/4 top-1/4 animate-float"
              style={{ animationDelay: '2s', animationDuration: '8s' }}
            >
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm border border-blue-500/30">
                <Sparkles className="h-8 w-8 text-blue-500" />
              </div>
            </div>

            <div
              className="absolute right-1/4 top-1/3 animate-float"
              style={{ animationDelay: '4s', animationDuration: '7s' }}
            >
              <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-500/30">
                <Sparkles className="h-8 w-8 text-purple-500" />
              </div>
            </div>
          </div>

          {/* Text content */}
          <div className="space-y-4 mb-12 animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-foreground via-foreground/80 to-foreground/60 bg-clip-text text-transparent">
              Page introuvable
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Oups ! La page que vous recherchez semble s'être perdue dans le cyberespace.
              Mais ne vous inquiétez pas, nous allons vous ramener à bon port.
            </p>
          </div>

          {/* Back button */}
          <div className="mb-16 animate-scale-in" style={{ animationDelay: '0.4s' }}>
            <Button
              size="lg"
              onClick={() => navigate(-1)}
              className="group h-14 px-8 text-lg button-texture-primary"
            >
              <ArrowLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
              Retour en arrière
            </Button>
          </div>
        </div>

        {/* Quick navigation cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {quickLinks.map((link, index) => (
            <Card
              key={link.path}
              className="glass-card hover-lift group cursor-pointer border-primary/20 animate-scale-in"
              style={{ animationDelay: `${0.6 + index * 0.1}s` }}
              onClick={() => navigate(link.path)}
            >
              <div className="p-6 space-y-4">
                {/* Icon */}
                <div
                  className={`
                    inline-flex p-4 rounded-2xl 
                    bg-gradient-to-br ${link.gradient}
                    shadow-xl group-hover:scale-110 transition-transform duration-300
                  `}
                >
                  <link.icon className="h-8 w-8 text-white" />
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {link.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {link.description}
                  </p>
                </div>

                {/* Arrow indicator */}
                <div className="flex items-center text-primary text-sm font-medium group-hover:translate-x-2 transition-transform">
                  Accéder
                  <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotFound;
