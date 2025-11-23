import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTheme, themePresets } from '@/contexts/ThemeContext';
import { Check, Palette } from 'lucide-react';
import { cn } from '@/lib/utils';

type ColorTheme = keyof typeof themePresets;

export const ThemeSwitcher = () => {
  const { colorTheme, setColorTheme } = useTheme();

  return (
    <Card className="glass-card hover:shadow-2xl transition-all duration-500 border-primary/20 animate-scale-in hover-lift" style={{ animationDelay: '0.3s' }}>
      <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-t-2xl">
        <CardTitle className="flex items-center gap-3 text-2xl">
          <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-accent shadow-xl button-texture-primary">
            <Palette className="h-6 w-6 text-white" />
          </div>
          Thème de couleur
        </CardTitle>
        <CardDescription className="text-base">
          Personnalisez l'apparence de votre interface
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(Object.keys(themePresets) as ColorTheme[]).map((themeKey, index) => {
            const preset = themePresets[themeKey];
            const isActive = colorTheme === themeKey;

            return (
              <button
                key={themeKey}
                onClick={() => setColorTheme(themeKey)}
                className={cn(
                  "relative p-4 rounded-xl border-2 transition-all duration-300 text-left hover-lift group",
                  "animate-fade-in",
                  isActive
                    ? "border-primary bg-gradient-to-br from-primary/10 to-accent/10 shadow-lg"
                    : "border-border hover:border-primary/50 bg-card"
                )}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {/* Preview gradient */}
                <div
                  className={cn(
                    "w-full h-20 rounded-lg mb-4 bg-gradient-to-br shadow-lg transition-transform duration-300 group-hover:scale-105",
                    preset.gradient
                  )}
                >
                  {/* Checkmark for active theme */}
                  {isActive && (
                    <div className="flex items-center justify-center h-full">
                      <div className="p-2 rounded-full bg-white/20 backdrop-blur-sm animate-scale-in">
                        <Check className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Theme info */}
                <div className="space-y-1">
                  <h4 className="font-bold text-foreground group-hover:text-primary transition-colors">
                    {preset.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {preset.description}
                  </p>
                </div>

                {/* Active indicator */}
                {isActive && (
                  <div className="absolute -top-2 -right-2">
                    <div className="p-2 rounded-full bg-gradient-to-br from-primary to-accent shadow-xl animate-scale-in">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Preview section */}
        <div className="mt-6 p-6 rounded-xl glass-card depth-2">
          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
            Aperçu
          </h4>
          <div className="space-y-3">
            <div className="flex gap-2">
              <Button size="sm" className="button-texture-primary">
                Bouton Principal
              </Button>
              <Button size="sm" variant="outline">
                Bouton Secondaire
              </Button>
              <Button size="sm" variant="ghost">
                Bouton Ghost
              </Button>
            </div>
            <div className="p-4 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
              <p className="text-sm text-foreground">
                <span className="font-bold text-primary">Thème actif:</span>{' '}
                {themePresets[colorTheme].name}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Les changements sont appliqués instantanément et sauvegardés automatiquement
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
