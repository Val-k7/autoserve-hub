import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Eye, Focus, Keyboard, Volume2 } from 'lucide-react';
import { toast } from 'sonner';

export const AccessibilitySettings = () => {
  const [settings, setSettings] = useState({
    highContrast: localStorage.getItem('accessibility_high_contrast') === 'true',
    reducedMotion: localStorage.getItem('accessibility_reduced_motion') === 'true',
    focusVisible: localStorage.getItem('accessibility_focus_visible') === 'true',
    screenReader: localStorage.getItem('accessibility_screen_reader') === 'true',
  });

  useEffect(() => {
    const root = document.documentElement;

    // Apply high contrast
    if (settings.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // Apply reduced motion
    if (settings.reducedMotion) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }

    // Apply enhanced focus
    if (settings.focusVisible) {
      root.classList.add('focus-visible-enhanced');
    } else {
      root.classList.remove('focus-visible-enhanced');
    }

    // Save to localStorage
    localStorage.setItem('accessibility_high_contrast', String(settings.highContrast));
    localStorage.setItem('accessibility_reduced_motion', String(settings.reducedMotion));
    localStorage.setItem('accessibility_focus_visible', String(settings.focusVisible));
    localStorage.setItem('accessibility_screen_reader', String(settings.screenReader));
  }, [settings]);

  const handleToggle = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    toast.success('Paramètre d\'accessibilité mis à jour');
  };

  const accessibilityOptions = [
    {
      key: 'highContrast' as const,
      icon: Eye,
      title: 'Contraste élevé',
      description: 'Augmente le contraste des couleurs pour une meilleure lisibilité',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      key: 'reducedMotion' as const,
      icon: Focus,
      title: 'Mouvement réduit',
      description: 'Désactive les animations et transitions pour réduire les distractions',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      key: 'focusVisible' as const,
      icon: Keyboard,
      title: 'Focus amélioré',
      description: 'Affiche un outline coloré visible lors de la navigation au clavier',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      key: 'screenReader' as const,
      icon: Volume2,
      title: 'Support lecteur d\'écran',
      description: 'Optimise l\'interface pour les technologies d\'assistance',
      gradient: 'from-orange-500 to-amber-500',
    },
  ];

  return (
    <Card className="glass-card hover:shadow-2xl transition-all duration-500 border-primary/20 animate-scale-in hover-lift" style={{ animationDelay: '0.4s' }}>
      <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-t-2xl">
        <CardTitle className="flex items-center gap-3 text-2xl">
          <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 shadow-xl button-texture-primary">
            <Eye className="h-6 w-6 text-white" />
          </div>
          Accessibilité
        </CardTitle>
        <CardDescription className="text-base">
          Personnalisez l'interface pour une meilleure accessibilité
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          {accessibilityOptions.map((option, index) => (
            <div
              key={option.key}
              className="p-4 rounded-xl bg-gradient-to-r from-background to-background/50 border border-border/40 hover:border-primary/30 transition-all duration-300 depth-2 animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  {/* Icon */}
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${option.gradient} shadow-lg`}>
                    <option.icon className="h-5 w-5 text-white" />
                  </div>

                  {/* Info */}
                  <div className="space-y-1">
                    <Label
                      htmlFor={option.key}
                      className="text-base font-semibold cursor-pointer hover:text-primary transition-colors"
                    >
                      {option.title}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {option.description}
                    </p>
                  </div>
                </div>

                {/* Switch */}
                <Switch
                  id={option.key}
                  checked={settings[option.key]}
                  onCheckedChange={() => handleToggle(option.key)}
                  className="scale-125"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Info box */}
        <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
          <p className="text-sm text-foreground">
            <span className="font-bold">💡 Astuce:</span> Ces paramètres sont sauvegardés localement et s'appliquent uniquement à votre navigateur.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
