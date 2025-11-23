import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/contexts/AppContext';
import { Server, Package, Activity, ArrowRight, Sparkles, Zap, Shield, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { StatsCard } from '@/components/features/StatsCard';
import { QuickActions } from '@/components/features/QuickActions';

const Home = () => {
  const { apps, logs } = useAppContext();
  const navigate = useNavigate();

  const installedApps = apps.filter(app => app.status !== 'not_installed').length;
  const runningApps = apps.filter(app => app.status === 'running').length;
  const totalApps = apps.length;

  return (
    <div className="min-h-full">
      {/* Hero Section with Glassmorphism */}
      <div className="relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-background -z-10" />
        <div className="absolute top-20 right-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl animate-float" />
        <div className="absolute bottom-20 left-20 h-96 w-96 rounded-full bg-accent/10 blur-3xl animate-float" style={{ animationDelay: '3s' }} />
        
        <div className="container py-20">
          {/* Hero Section */}
          <div className="text-center mb-20 space-y-8">
            <div className="inline-block animate-scale-in">
              <div className="p-4 rounded-3xl bg-gradient-to-br from-primary via-accent to-primary shadow-2xl glow-strong animate-gradient-shift">
                <Server className="h-16 w-16 text-white" />
              </div>
            </div>
            
            <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <h1 className="text-6xl md:text-7xl font-bold">
                <span className="text-gradient animate-gradient-shift">AutoServe</span>
              </h1>
              <p className="text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
                Plateforme moderne de gestion et déploiement d'applications auto-hébergées
              </p>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Button size="lg" onClick={() => navigate('/catalog')} className="gradient-primary hover:opacity-90 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 text-lg px-8 py-6">
                <Sparkles className="mr-2 h-5 w-5" />
                Explorer le catalogue
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate('/dashboard')} className="border-primary/30 hover:border-primary hover:bg-primary/5 shadow-lg text-lg px-8 py-6">
                <Activity className="mr-2 h-5 w-5" />
                Voir le Dashboard
              </Button>
            </div>
          </div>

          {/* Stats Grid with new StatsCard component */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-16">
            <StatsCard
              title="Applications disponibles"
              value={totalApps}
              icon={Package}
              gradient="from-blue-500 to-cyan-500"
            />
            
            <StatsCard
              title="Applications installées"
              value={installedApps}
              icon={TrendingUp}
              gradient="from-green-500 to-emerald-500"
              trend={{ value: 12, positive: true }}
              delay="0.1s"
            />
            
            <StatsCard
              title="Applications actives"
              value={runningApps}
              icon={Activity}
              gradient="from-purple-500 to-pink-500"
              trend={{ value: 8, positive: true }}
              delay="0.2s"
            />
            
            <StatsCard
              title="Logs système"
              value={logs.length}
              icon={Server}
              gradient="from-orange-500 to-red-500"
              delay="0.3s"
            />
          </div>

          {/* Features Grid with Glassmorphism */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-16">
            <Card className="glass-card hover:shadow-2xl transition-all duration-500 hover:scale-105 group animate-scale-in" style={{ animationDelay: '0.4s' }}>
              <CardHeader>
                <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 w-fit mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Package className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-xl">Applications variées</CardTitle>
                <CardDescription className="text-base">
                  Large catalogue d'applications prêtes à déployer
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="ghost" 
                  className="w-full justify-between group/btn hover:bg-primary/10 transition-all duration-300 text-primary font-medium"
                  onClick={() => navigate('/catalog')}
                >
                  Explorer le catalogue
                  <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-2 transition-transform duration-300" />
                </Button>
              </CardContent>
            </Card>

            <Card className="glass-card hover:shadow-2xl transition-all duration-500 hover:scale-105 group animate-scale-in" style={{ animationDelay: '0.5s' }}>
              <CardHeader>
                <div className="p-4 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 w-fit mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Activity className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-xl">Surveillance temps réel</CardTitle>
                <CardDescription className="text-base">
                  Suivez l'état et les performances de vos services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="ghost" 
                  className="w-full justify-between group/btn hover:bg-primary/10 transition-all duration-300 text-primary font-medium"
                  onClick={() => navigate('/dashboard')}
                >
                  Ouvrir Dashboard
                  <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-2 transition-transform duration-300" />
                </Button>
              </CardContent>
            </Card>

            <Card className="glass-card hover:shadow-2xl transition-all duration-500 hover:scale-105 group animate-scale-in" style={{ animationDelay: '0.6s' }}>
              <CardHeader>
                <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 w-fit mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Server className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-xl">Logs centralisés</CardTitle>
                <CardDescription className="text-base">
                  Accédez à tous les journaux système en un seul endroit
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="ghost" 
                  className="w-full justify-between group/btn hover:bg-primary/10 transition-all duration-300 text-primary font-medium"
                  onClick={() => navigate('/logs')}
                >
                  Consulter logs
                  <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-2 transition-transform duration-300" />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Additional Features Section */}
          <div className="grid gap-8 md:grid-cols-3 items-start">
            <div className="text-center space-y-4 p-6 rounded-2xl glass-card hover:shadow-xl transition-all duration-500 hover:scale-105 animate-fade-in" style={{ animationDelay: '0.7s' }}>
              <div className="inline-block p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10">
                <Zap className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Déploiement rapide</h3>
              <p className="text-muted-foreground leading-relaxed">Installation en un clic avec configuration automatique</p>
            </div>
            
            <div className="text-center space-y-4 p-6 rounded-2xl glass-card hover:shadow-xl transition-all duration-500 hover:scale-105 animate-fade-in" style={{ animationDelay: '0.8s' }}>
              <div className="inline-block p-4 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/10">
                <Shield className="h-10 w-10 text-green-500" />
              </div>
              <h3 className="text-xl font-bold">Sécurisé</h3>
              <p className="text-muted-foreground leading-relaxed">Gestion des permissions et authentification robuste</p>
            </div>
            
            <div className="text-center space-y-4 p-6 rounded-2xl glass-card hover:shadow-xl transition-all duration-500 hover:scale-105 animate-fade-in" style={{ animationDelay: '0.9s' }}>
              <div className="inline-block p-4 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10">
                <Sparkles className="h-10 w-10 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold">Interface moderne</h3>
              <p className="text-muted-foreground leading-relaxed">Design élégant et intuitif pour une expérience optimale</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
