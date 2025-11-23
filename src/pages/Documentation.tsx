import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CodeBlock } from '@/components/docs/CodeBlock';
import { 
  Book, 
  Code, 
  Users, 
  HelpCircle, 
  Rocket,
  Shield,
  Download,
  Settings,
  Server,
  Database,
  GitBranch,
  Package,
  Play,
  FileText,
  Terminal,
  Cloud,
  Lock,
  Zap
} from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const Documentation = () => {
  return (
    <div className="min-h-full">
      <div className="container py-8 animate-fade-in max-w-7xl mx-auto">
        {/* Hero Header */}
        <div className="mb-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 blur-3xl -z-10 rounded-3xl" />
          <div className="glass-card p-8 rounded-3xl depth-3">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 shadow-2xl button-texture-primary animate-float">
                <Book className="h-10 w-10 text-white" />
              </div>
              <div>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-shift">
                  Documentation AutoServe
                </h1>
                <p className="text-muted-foreground text-lg mt-2">
                  Guide complet pour utilisateurs et développeurs
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="user" className="space-y-8">
          <div className="glass-card p-2 rounded-2xl depth-2 sticky top-4 z-10 backdrop-blur-xl">
            <TabsList className="flex w-full gap-2 bg-transparent">
              <TabsTrigger
                value="user"
                className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl transition-all duration-300"
              >
                <Users className="mr-2 h-4 w-4" />
                Guide Utilisateur
              </TabsTrigger>
              <TabsTrigger
                value="dev"
                className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl transition-all duration-300"
              >
                <Code className="mr-2 h-4 w-4" />
                Guide Développeur
              </TabsTrigger>
              <TabsTrigger
                value="faq"
                className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl transition-all duration-300"
              >
                <HelpCircle className="mr-2 h-4 w-4" />
                FAQ
              </TabsTrigger>
            </TabsList>
          </div>

          {/* USER GUIDE */}
          <TabsContent value="user" className="space-y-6 animate-fade-in">
            {/* Introduction */}
            <Card className="glass-card border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
                    <Rocket className="h-5 w-5 text-white" />
                  </div>
                  Introduction
                </CardTitle>
                <CardDescription>Bienvenue dans AutoServe</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  AutoServe est une plateforme de gestion d'applications auto-hébergées qui vous permet d'installer, 
                  configurer et gérer facilement vos applications préférées sans compétences techniques avancées.
                </p>
                <Alert>
                  <Zap className="h-4 w-4" />
                  <AlertTitle>Fonctionnalités principales</AlertTitle>
                  <AlertDescription>
                    <ul className="list-disc list-inside space-y-1 mt-2">
                      <li>Catalogue d'applications pré-configurées</li>
                      <li>Installation en un clic</li>
                      <li>Gestion centralisée de vos services</li>
                      <li>Monitoring en temps réel</li>
                      <li>Interface moderne et intuitive</li>
                    </ul>
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            {/* Quick Start */}
            <Card className="glass-card border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500">
                    <Play className="h-5 w-5 text-white" />
                  </div>
                  Démarrage Rapide
                </CardTitle>
                <CardDescription>Premiers pas avec AutoServe</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold flex-shrink-0">
                      1
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">Créer un compte</h4>
                      <p className="text-sm text-muted-foreground">
                        Inscrivez-vous avec votre email pour commencer. Les administrateurs peuvent gérer les inscriptions 
                        depuis les paramètres.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold flex-shrink-0">
                      2
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">Explorer le catalogue</h4>
                      <p className="text-sm text-muted-foreground">
                        Visitez la page <strong>Catalogue</strong> pour découvrir toutes les applications disponibles. 
                        Utilisez les filtres par catégorie pour trouver ce que vous cherchez.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold flex-shrink-0">
                      3
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">Installer une application</h4>
                      <p className="text-sm text-muted-foreground">
                        Cliquez sur <strong>Installer</strong> sur n'importe quelle application. Configurez les paramètres 
                        nécessaires dans le dialogue qui s'ouvre, puis confirmez l'installation.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold flex-shrink-0">
                      4
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">Gérer vos applications</h4>
                      <p className="text-sm text-muted-foreground">
                        Accédez au <strong>Dashboard</strong> pour voir toutes vos applications installées. 
                        Vous pouvez les démarrer, arrêter ou les désinstaller à tout moment.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card className="glass-card border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
                    <Package className="h-5 w-5 text-white" />
                  </div>
                  Fonctionnalités Détaillées
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Download className="h-5 w-5 text-blue-500" />
                      <h4 className="font-semibold">Catalogue d'Apps</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Plus de 15 applications populaires pré-configurées incluant serveurs multimédias, 
                      outils de téléchargement, automatisation et plus.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Server className="h-5 w-5 text-green-500" />
                      <h4 className="font-semibold">Gestion Simplifiée</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Interface intuitive pour démarrer, arrêter et configurer vos services en quelques clics.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="h-5 w-5 text-purple-500" />
                      <h4 className="font-semibold">Logs en Temps Réel</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Surveillez l'activité de vos applications avec des logs détaillés et un système de filtrage avancé.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Lock className="h-5 w-5 text-orange-500" />
                      <h4 className="font-semibold">Sécurité</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Authentification sécurisée, gestion des rôles et permissions pour protéger vos données.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* DEVELOPER GUIDE */}
          <TabsContent value="dev" className="space-y-6 animate-fade-in">
            {/* Architecture */}
            <Card className="glass-card border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
                    <GitBranch className="h-5 w-5 text-white" />
                  </div>
                  Architecture Technique
                </CardTitle>
                <CardDescription>Stack technologique et organisation du code</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Code className="h-4 w-4 text-primary" />
                      Frontend
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground ml-6 list-disc">
                      <li><strong>React 18</strong> - Bibliothèque UI avec hooks modernes</li>
                      <li><strong>TypeScript</strong> - Type safety et meilleure expérience développeur</li>
                      <li><strong>Vite</strong> - Build tool ultra-rapide</li>
                      <li><strong>Tailwind CSS</strong> - Styling utility-first</li>
                      <li><strong>Shadcn/ui</strong> - Composants UI réutilisables</li>
                      <li><strong>React Router</strong> - Gestion du routing</li>
                      <li><strong>TanStack Query</strong> - Gestion de l'état serveur</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Database className="h-4 w-4 text-primary" />
                      Backend
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground ml-6 list-disc">
                      <li><strong>Supabase</strong> - Backend-as-a-Service (PostgreSQL, Auth, Storage)</li>
                      <li><strong>Row Level Security</strong> - Sécurité au niveau des données</li>
                      <li><strong>Edge Functions</strong> - Fonctions serverless (Deno)</li>
                      <li><strong>Realtime</strong> - Synchronisation en temps réel</li>
                    </ul>
                  </div>
                </div>

                <Alert>
                  <Cloud className="h-4 w-4" />
                  <AlertTitle>Structure du projet</AlertTitle>
                  <AlertDescription>
                    <CodeBlock 
                      language="plaintext" 
                      code={`src/
├── components/        # Composants React
│   ├── ui/           # Composants UI de base (Shadcn)
│   ├── features/     # Composants métier
│   ├── layouts/      # Composants de layout
│   └── guards/       # Composants de protection de routes
├── contexts/         # Contexts React (Auth, App, Theme)
├── pages/            # Pages de l'application
├── hooks/            # Hooks personnalisés
├── lib/              # Utilitaires
├── integrations/     # Intégrations (Supabase)
└── types/            # Types TypeScript`}
                    />
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            {/* Development Setup */}
            <Card className="glass-card border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500">
                    <Terminal className="h-5 w-5 text-white" />
                  </div>
                  Configuration Développement
                </CardTitle>
                <CardDescription>Installer et lancer le projet en local</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Prérequis</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground ml-6 list-disc">
                    <li>Node.js 18+ ou Bun</li>
                    <li>Compte Supabase (ou projet Lovable Cloud)</li>
                    <li>Git</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Installation</h4>
                  <CodeBlock 
                    language="bash" 
                    code={`# Cloner le repository
git clone <repository-url>
cd autoserve

# Installer les dépendances
npm install
# ou
bun install

# Configurer les variables d'environnement
# Les fichiers .env sont générés automatiquement avec Lovable Cloud

# Lancer le serveur de développement
npm run dev
# ou
bun dev`}
                  />
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Scripts disponibles</h4>
                  <CodeBlock 
                    language="bash" 
                    code={`npm run dev          # Démarre le serveur de développement
npm run build        # Build pour la production
npm run preview      # Prévisualise le build de production
npm run lint         # Lint le code`}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Database Schema */}
            <Card className="glass-card border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
                    <Database className="h-5 w-5 text-white" />
                  </div>
                  Schéma de Base de Données
                </CardTitle>
                <CardDescription>Structure des tables Supabase</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">repositories</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Stocke les dépôts d'applications (sources du catalogue)
                    </p>
                    <CodeBlock 
                      language="sql" 
                      code={`CREATE TABLE repositories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  type TEXT DEFAULT 'github',
  is_official BOOLEAN DEFAULT false,
  is_enabled BOOLEAN DEFAULT true,
  added_by UUID REFERENCES auth.users,
  created_at TIMESTAMPTZ DEFAULT now()
);`}
                    />
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">catalog_apps</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Applications disponibles dans le catalogue
                    </p>
                    <CodeBlock 
                      language="sql" 
                      code={`CREATE TABLE catalog_apps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  repository_id UUID REFERENCES repositories,
  app_id TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT,
  icon TEXT,
  docker_image TEXT,
  version TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);`}
                    />
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">user_installed_apps</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Applications installées par les utilisateurs
                    </p>
                    <CodeBlock 
                      language="sql" 
                      code={`CREATE TABLE user_installed_apps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  catalog_app_id UUID REFERENCES catalog_apps,
  status TEXT DEFAULT 'installed',
  configuration JSONB DEFAULT '{}',
  container_id TEXT,
  installed_at TIMESTAMPTZ DEFAULT now()
);`}
                    />
                  </div>
                </div>

                <Alert>
                  <Shield className="h-4 w-4" />
                  <AlertTitle>Row Level Security (RLS)</AlertTitle>
                  <AlertDescription>
                    Toutes les tables ont des politiques RLS configurées pour garantir que les utilisateurs 
                    ne peuvent accéder qu'à leurs propres données.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            {/* API Examples */}
            <Card className="glass-card border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500 to-red-500">
                    <Code className="h-5 w-5 text-white" />
                  </div>
                  Exemples d'API
                </CardTitle>
                <CardDescription>Utilisation du client Supabase</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Récupérer les applications du catalogue</h4>
                  <CodeBlock 
                    language="typescript" 
                    code={`import { supabase } from '@/integrations/supabase/client';

// Récupérer toutes les apps
const { data: apps, error } = await supabase
  .from('catalog_apps')
  .select('*');

// Filtrer par catégorie
const { data: mediaApps } = await supabase
  .from('catalog_apps')
  .select('*')
  .eq('category', 'media');`}
                  />
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Installer une application</h4>
                  <CodeBlock 
                    language="typescript" 
                    code={`const { data, error } = await supabase
  .from('user_installed_apps')
  .insert({
    catalog_app_id: appId,
    user_id: userId,
    status: 'installed',
    configuration: { port: 8080, ... }
  });`}
                  />
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Authentification</h4>
                  <CodeBlock 
                    language="typescript" 
                    code={`// Connexion
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password'
});

// Inscription
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password'
});

// Déconnexion
await supabase.auth.signOut();`}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* FAQ */}
          <TabsContent value="faq" className="space-y-6 animate-fade-in">
            <Card className="glass-card border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500">
                    <HelpCircle className="h-5 w-5 text-white" />
                  </div>
                  Questions Fréquentes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/5 to-cyan-500/5 border border-blue-500/20">
                    <h4 className="font-semibold mb-2">Comment installer une application ?</h4>
                    <p className="text-sm text-muted-foreground">
                      Rendez-vous dans l'onglet <strong>Catalogue</strong>, trouvez l'application souhaitée, 
                      cliquez sur <strong>Installer</strong>, configurez les paramètres si nécessaire, 
                      puis confirmez. L'application apparaîtra dans votre Dashboard.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-gradient-to-br from-green-500/5 to-emerald-500/5 border border-green-500/20">
                    <h4 className="font-semibold mb-2">Les applications sont-elles vraiment installées ?</h4>
                    <p className="text-sm text-muted-foreground">
                      Actuellement, AutoServe gère l'interface et la configuration des applications. 
                      L'intégration complète avec Docker pour le déploiement réel des containers est en développement.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500/5 to-pink-500/5 border border-purple-500/20">
                    <h4 className="font-semibold mb-2">Puis-je ajouter mes propres applications ?</h4>
                    <p className="text-sm text-muted-foreground">
                      Les administrateurs peuvent ajouter des dépôts personnalisés contenant leurs propres applications. 
                      Cette fonctionnalité nécessite des connaissances en développement.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-gradient-to-br from-orange-500/5 to-red-500/5 border border-orange-500/20">
                    <h4 className="font-semibold mb-2">Où sont stockées mes données ?</h4>
                    <p className="text-sm text-muted-foreground">
                      Toutes vos données sont stockées de manière sécurisée dans Supabase avec Row Level Security (RLS). 
                      Chaque utilisateur ne peut accéder qu'à ses propres données.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-gradient-to-br from-yellow-500/5 to-amber-500/5 border border-yellow-500/20">
                    <h4 className="font-semibold mb-2">Comment obtenir les droits administrateur ?</h4>
                    <p className="text-sm text-muted-foreground">
                      Les droits administrateur doivent être attribués directement dans la base de données. 
                      Contactez l'administrateur système de votre instance.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-gradient-to-br from-pink-500/5 to-rose-500/5 border border-pink-500/20">
                    <h4 className="font-semibold mb-2">L'application est-elle open source ?</h4>
                    <p className="text-sm text-muted-foreground">
                      Oui ! AutoServe est construit avec des technologies open source et le code source est disponible. 
                      Vous pouvez contribuer au projet ou l'héberger vous-même.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-500/5 to-violet-500/5 border border-indigo-500/20">
                    <h4 className="font-semibold mb-2">Puis-je exporter mes données ?</h4>
                    <p className="text-sm text-muted-foreground">
                      Oui, toutes vos données peuvent être exportées depuis la base de données Supabase. 
                      Les administrateurs ont accès complet à toutes les données via l'interface Supabase.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Support */}
            <Card className="glass-card border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
                    <Settings className="h-5 w-5 text-white" />
                  </div>
                  Support et Contribution
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Pour toute question, bug ou suggestion d'amélioration :
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground ml-6 list-disc">
                  <li>Consultez d'abord cette documentation et la FAQ</li>
                  <li>Vérifiez les logs dans l'onglet <strong>Logs</strong> pour diagnostiquer les problèmes</li>
                  <li>Contactez votre administrateur système</li>
                  <li>Pour les développeurs : ouvrez une issue sur le repository GitHub</li>
                </ul>

                <Alert>
                  <Code className="h-4 w-4" />
                  <AlertTitle>Vous souhaitez contribuer ?</AlertTitle>
                  <AlertDescription>
                    Les contributions sont les bienvenues ! Fork le projet, créez une branche pour votre fonctionnalité, 
                    et soumettez une pull request. Assurez-vous de suivre les conventions de code du projet.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Documentation;
