import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Palette, Type, Radius, Sparkles } from 'lucide-react';
import { CodeBlock } from './CodeBlock';

export const DesignTokens = () => {
  const colorTokens = [
    { name: 'Primary', var: '--primary', class: 'bg-primary' },
    { name: 'Accent', var: '--accent', class: 'bg-accent' },
    { name: 'Background', var: '--background', class: 'bg-background border' },
    { name: 'Foreground', var: '--foreground', class: 'bg-foreground' },
    { name: 'Muted', var: '--muted', class: 'bg-muted' },
    { name: 'Card', var: '--card', class: 'bg-card border' },
  ];

  const animationTokens = [
    { name: 'fade-in', duration: '0.5s', easing: 'ease-out' },
    { name: 'scale-in', duration: '0.3s', easing: 'ease-out' },
    { name: 'slide-up', duration: '0.6s', easing: 'ease-out' },
    { name: 'float', duration: '6s', easing: 'ease-in-out infinite' },
    { name: 'shimmer', duration: '2s', easing: 'ease-in-out infinite' },
    { name: 'gradient-shift', duration: '15s', easing: 'ease infinite' },
  ];

  const colorUsageExample = `// Using color tokens in Tailwind
<div className="bg-primary text-primary-foreground">
  Primary colored element
</div>

<div className="bg-gradient-to-r from-primary to-accent">
  Gradient using tokens
</div>

// Using in CSS
.custom-element {
  background: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
}`;

  const animationExample = `// Using animations in Tailwind
<div className="animate-fade-in">
  Fades in on mount
</div>

<div className="animate-scale-in hover-lift">
  Scales in with hover effect
</div>

// Custom animation
<div className="animate-float">
  Floating animation
</div>`;

  return (
    <div className="space-y-8">
      {/* Colors Section */}
      <Card className="glass-card border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-accent shadow-xl">
              <Palette className="h-6 w-6 text-white" />
            </div>
            Tokens de couleur
          </CardTitle>
          <CardDescription>
            Palette de couleurs sémantiques du design system
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {colorTokens.map((token) => (
              <div
                key={token.var}
                className="p-4 rounded-xl bg-card border border-border/40 hover:border-primary/50 transition-colors group"
              >
                <div className={`w-full h-24 rounded-lg mb-3 ${token.class} group-hover:scale-105 transition-transform`} />
                <div className="space-y-1">
                  <p className="font-semibold text-foreground">{token.name}</p>
                  <code className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                    {token.var}
                  </code>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Utilisation</h4>
            <CodeBlock code={colorUsageExample} />
          </div>
        </CardContent>
      </Card>

      {/* Typography Section */}
      <Card className="glass-card border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-xl">
              <Type className="h-6 w-6 text-white" />
            </div>
            Typographie
          </CardTitle>
          <CardDescription>
            Échelle typographique et hiérarchie
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-card border border-border/40">
              <h1 className="text-5xl font-bold mb-2">Titre H1 (5xl)</h1>
              <code className="text-xs text-muted-foreground">text-5xl font-bold</code>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border/40">
              <h2 className="text-4xl font-bold mb-2">Titre H2 (4xl)</h2>
              <code className="text-xs text-muted-foreground">text-4xl font-bold</code>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border/40">
              <h3 className="text-2xl font-semibold mb-2">Titre H3 (2xl)</h3>
              <code className="text-xs text-muted-foreground">text-2xl font-semibold</code>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border/40">
              <p className="text-base mb-2">Paragraphe normal (base)</p>
              <code className="text-xs text-muted-foreground">text-base</code>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border/40">
              <p className="text-sm mb-2">Texte secondaire (sm)</p>
              <code className="text-xs text-muted-foreground">text-sm</code>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Spacing & Radius */}
      <Card className="glass-card border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 shadow-xl">
              <Radius className="h-6 w-6 text-white" />
            </div>
            Espacement & Bordures
          </CardTitle>
          <CardDescription>
            Système d'espacement et border-radius
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold">Border Radius</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-20 h-20 bg-primary rounded-sm" />
                  <div className="text-sm">
                    <p className="font-medium">sm</p>
                    <code className="text-xs text-muted-foreground">rounded-sm</code>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-20 h-20 bg-primary rounded-lg" />
                  <div className="text-sm">
                    <p className="font-medium">lg</p>
                    <code className="text-xs text-muted-foreground">rounded-lg</code>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-20 h-20 bg-primary rounded-xl" />
                  <div className="text-sm">
                    <p className="font-medium">xl</p>
                    <code className="text-xs text-muted-foreground">rounded-xl</code>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-20 h-20 bg-primary rounded-2xl" />
                  <div className="text-sm">
                    <p className="font-medium">2xl</p>
                    <code className="text-xs text-muted-foreground">rounded-2xl</code>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Spacing Scale</h4>
              <div className="space-y-3">
                {[1, 2, 3, 4, 6, 8, 12].map((space) => (
                  <div key={space} className="flex items-center gap-3">
                    <div className={`h-8 bg-primary`} style={{ width: `${space * 0.25}rem` }} />
                    <code className="text-sm text-muted-foreground">
                      {space} ({space * 0.25}rem)
                    </code>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Animations */}
      <Card className="glass-card border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 shadow-xl">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            Animations
          </CardTitle>
          <CardDescription>
            Bibliothèque d'animations réutilisables
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {animationTokens.map((anim) => (
              <div
                key={anim.name}
                className="p-4 rounded-xl bg-card border border-border/40 hover:border-primary/50 transition-colors"
              >
                <div className="space-y-2">
                  <code className="text-sm font-semibold text-primary">
                    animate-{anim.name}
                  </code>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>Duration: {anim.duration}</p>
                    <p>Easing: {anim.easing}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Exemples d'utilisation</h4>
            <CodeBlock code={animationExample} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
