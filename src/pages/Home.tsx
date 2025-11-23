import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Navbar } from '@/components/Navbar';
import { Server, Zap, Shield, Cloud, Package, ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="container py-20 md:py-32">
        <div className="mx-auto max-w-3xl text-center animate-fade-in">
          <div className="mb-6 flex justify-center">
            <div className="gradient-primary rounded-full p-6 shadow-2xl hover-lift">
              <Server className="h-16 w-16 text-white" />
            </div>
          </div>
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-6xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            AutoServe
          </h1>
          <p className="mb-4 text-xl text-muted-foreground font-medium">
            Plateforme d'Applications Self-Hosted Préconfigurées
          </p>
          <p className="mb-8 text-lg text-muted-foreground">
            Logiciel Linux avec une interface web simpliste pour installer et gérer vos applications auto-hébergées en 1 clic
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link to="/catalog">
              <Button size="lg" className="w-full sm:w-auto hover-lift shadow-lg">
                <Package className="mr-2 h-5 w-5" />
                Voir le catalogue
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button size="lg" variant="outline" className="w-full sm:w-auto hover-lift">
                Accéder au Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-16">
        <div className="mb-12 text-center animate-fade-in">
          <h2 className="mb-4 text-3xl font-bold text-foreground">Caractéristiques principales</h2>
          <p className="text-lg text-muted-foreground">
            Tout ce dont vous avez besoin pour auto-héberger vos applications
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="card-hover animate-fade-in">
            <CardHeader>
              <div className="gradient-primary rounded-lg p-2 w-fit">
                <Package className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="mt-4">Installation en 1 clic</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Plus de 15 applications préconfigurées prêtes à être installées instantanément
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="card-hover animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <CardHeader>
              <div className="gradient-primary rounded-lg p-2 w-fit">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="mt-4">Sécurisé par défaut</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                HTTPS, pare-feu, isolation des conteneurs et permissions configurés automatiquement
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="card-hover animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <CardHeader>
              <div className="gradient-primary rounded-lg p-2 w-fit">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="mt-4">Interface simpliste</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Gérez toutes vos applications depuis un panneau web simple et intuitif
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="card-hover animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <CardHeader>
              <div className="gradient-primary rounded-lg p-2 w-fit">
                <Cloud className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="mt-4">Accès distant</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Certificats HTTPS automatiques pour un accès sécurisé de n'importe où
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* App Categories */}
      <section className="container py-16">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground">Bibliothèque d'applications</h2>
          <p className="text-lg text-muted-foreground">
            Des applications pour tous vos besoins
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            { emoji: '🎬', title: 'Serveurs multimédias', desc: 'Jellyfin, Plex, Navidrome' },
            { emoji: '📥', title: 'Téléchargement', desc: 'qBittorrent, Transmission, SABnzbd' },
            { emoji: '🔁', title: 'Automatisation', desc: 'Sonarr, Radarr, Lidarr, Bazarr' },
            { emoji: '🌩', title: 'Cloud privé', desc: 'Nextcloud, Seafile, Syncthing' },
            { emoji: '🧰', title: 'Outils', desc: 'Portainer, FileBrowser, Code-Server' },
            { emoji: '🔐', title: 'Sécurité', desc: 'Vaultwarden, Authelia' },
          ].map((category, i) => (
            <Card key={i} className="card-hover animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
              <CardHeader>
                <div className="mb-2 text-5xl hover-lift">{category.emoji}</div>
                <CardTitle className="text-lg">{category.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{category.desc}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-20">
        <Card className="gradient-primary text-white border-0 shadow-2xl animate-fade-in">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">Prêt à commencer ?</CardTitle>
            <CardDescription className="text-white/90 text-base">
              Installez AutoServe sur votre serveur Linux en quelques minutes
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <code className="rounded-lg bg-white/20 backdrop-blur px-6 py-3 text-sm font-mono hover-lift">
              curl -sSL https://autoserve.sh/install | bash
            </code>
            <Link to="/catalog">
              <Button size="lg" variant="secondary" className="hover-lift shadow-lg">
                Découvrir les applications
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container text-center text-sm text-muted-foreground">
          <p>AutoServe - Logiciel libre sous licence GPL v3</p>
          <p className="mt-2">Rendez le self-hosting aussi simple qu'un App Store</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
