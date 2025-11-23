import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ComponentShowcase } from '@/components/docs/ComponentShowcase';
import { DesignTokens } from '@/components/docs/DesignTokens';
import { Book, Palette, Code, Sparkles } from 'lucide-react';

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
                  Documentation
                </h1>
                <p className="text-muted-foreground text-lg mt-2">
                  Guide complet du design system et des composants UI
                </p>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
                <div className="flex items-center gap-2 mb-1">
                  <Code className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium text-muted-foreground">Composants</span>
                </div>
                <p className="text-2xl font-bold text-foreground">25+</p>
              </div>
              
              <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                <div className="flex items-center gap-2 mb-1">
                  <Palette className="h-4 w-4 text-purple-500" />
                  <span className="text-sm font-medium text-muted-foreground">Thèmes</span>
                </div>
                <p className="text-2xl font-bold text-foreground">5</p>
              </div>
              
              <div className="p-4 rounded-xl bg-gradient-to-br from-orange-500/10 to-amber-500/10 border border-orange-500/20">
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="h-4 w-4 text-orange-500" />
                  <span className="text-sm font-medium text-muted-foreground">Animations</span>
                </div>
                <p className="text-2xl font-bold text-foreground">12+</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="components" className="space-y-8">
          <div className="glass-card p-2 rounded-2xl depth-2 sticky top-4 z-10 backdrop-blur-xl">
            <TabsList className="flex w-full gap-2 bg-transparent">
              <TabsTrigger
                value="components"
                className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl transition-all duration-300"
              >
                <Code className="mr-2 h-4 w-4" />
                Composants
              </TabsTrigger>
              <TabsTrigger
                value="tokens"
                className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl transition-all duration-300"
              >
                <Palette className="mr-2 h-4 w-4" />
                Design Tokens
              </TabsTrigger>
              <TabsTrigger
                value="guide"
                className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl transition-all duration-300"
              >
                <Book className="mr-2 h-4 w-4" />
                Guide d'utilisation
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="components" className="space-y-8 animate-fade-in">
            <ComponentShowcase />
          </TabsContent>

          <TabsContent value="tokens" className="space-y-8 animate-fade-in">
            <DesignTokens />
          </TabsContent>

          <TabsContent value="guide" className="space-y-8 animate-fade-in">
            <Card className="glass-card border-primary/20 p-8">
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Guide d'utilisation
                  </h2>
                  <p className="text-lg text-muted-foreground">
                    Apprenez à utiliser efficacement notre design system
                  </p>
                </div>

                <div className="space-y-6">
                  <section className="space-y-3">
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                      <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/20 text-primary font-bold text-sm">
                        1
                      </span>
                      Utiliser les composants
                    </h3>
                    <p className="text-muted-foreground pl-10">
                      Tous les composants sont disponibles dans <code className="bg-muted px-2 py-1 rounded">@/components/ui</code>. 
                      Importez-les directement dans vos fichiers.
                    </p>
                  </section>

                  <section className="space-y-3">
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                      <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/20 text-primary font-bold text-sm">
                        2
                      </span>
                      Utiliser les tokens de couleur
                    </h3>
                    <p className="text-muted-foreground pl-10">
                      Privilégiez les tokens sémantiques (<code className="bg-muted px-2 py-1 rounded">primary</code>, 
                      <code className="bg-muted px-2 py-1 rounded mx-1">accent</code>, 
                      <code className="bg-muted px-2 py-1 rounded">muted</code>) plutôt que des couleurs directes.
                    </p>
                  </section>

                  <section className="space-y-3">
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                      <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/20 text-primary font-bold text-sm">
                        3
                      </span>
                      Animations et transitions
                    </h3>
                    <p className="text-muted-foreground pl-10">
                      Utilisez les classes d'animation prédéfinies (<code className="bg-muted px-2 py-1 rounded">animate-fade-in</code>, 
                      <code className="bg-muted px-2 py-1 rounded mx-1">hover-lift</code>) pour une expérience cohérente.
                    </p>
                  </section>

                  <section className="space-y-3">
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                      <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/20 text-primary font-bold text-sm">
                        4
                      </span>
                      Accessibilité
                    </h3>
                    <p className="text-muted-foreground pl-10">
                      Tous les composants supportent les paramètres d'accessibilité (contraste élevé, mouvement réduit, navigation clavier).
                      Assurez-vous d'ajouter des labels ARIA appropriés.
                    </p>
                  </section>

                  <section className="space-y-3">
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                      <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/20 text-primary font-bold text-sm">
                        5
                      </span>
                      Responsive Design
                    </h3>
                    <p className="text-muted-foreground pl-10">
                      Utilisez les breakpoints Tailwind (<code className="bg-muted px-2 py-1 rounded">sm:</code>, 
                      <code className="bg-muted px-2 py-1 rounded mx-1">md:</code>, 
                      <code className="bg-muted px-2 py-1 rounded">lg:</code>, 
                      <code className="bg-muted px-2 py-1 rounded mx-1">xl:</code>) pour adapter l'interface.
                    </p>
                  </section>
                </div>

                <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
                  <h4 className="font-semibold text-lg mb-2 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    Bonnes pratiques
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>Utilisez toujours les composants UI plutôt que du HTML brut</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>Privilégiez les classes utilitaires Tailwind aux styles inline</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>Testez toujours en mode sombre et avec différents thèmes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>Vérifiez l'accessibilité avec les paramètres activés</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>Utilisez les skeletons loaders pendant les chargements</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Documentation;
