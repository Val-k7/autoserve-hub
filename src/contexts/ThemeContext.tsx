import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type ThemeMode = 'light' | 'dark';
type ColorTheme = 'default' | 'purple' | 'green' | 'orange' | 'red';

interface ThemeContextType {
  theme: ThemeMode;
  colorTheme: ColorTheme;
  toggleTheme: () => void;
  setColorTheme: (theme: ColorTheme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const themePresets = {
  default: {
    name: 'Océan Bleu',
    description: 'Thème par défaut élégant',
    primary: '221 83% 53%',
    accent: '221 83% 53%',
    gradient: 'from-blue-500 to-cyan-500',
  },
  purple: {
    name: 'Nébuleuse Violette',
    description: 'Mystérieux et cosmique',
    primary: '271 81% 56%',
    accent: '291 64% 42%',
    gradient: 'from-purple-500 to-pink-500',
  },
  green: {
    name: 'Forêt Émeraude',
    description: 'Naturel et apaisant',
    primary: '142 76% 36%',
    accent: '142 71% 45%',
    gradient: 'from-green-500 to-emerald-500',
  },
  orange: {
    name: 'Coucher de Soleil',
    description: 'Chaleureux et énergique',
    primary: '25 95% 53%',
    accent: '33 100% 50%',
    gradient: 'from-orange-500 to-amber-500',
  },
  red: {
    name: 'Flamme Ardente',
    description: 'Puissant et dynamique',
    primary: '0 72% 51%',
    accent: '4 90% 58%',
    gradient: 'from-red-500 to-rose-500',
  },
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const stored = localStorage.getItem('autoserve_theme_mode');
    return (stored as ThemeMode) || 'light';
  });

  const [colorTheme, setColorThemeState] = useState<ColorTheme>(() => {
    const stored = localStorage.getItem('autoserve_color_theme');
    return (stored as ColorTheme) || 'default';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Apply theme mode (light/dark)
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('autoserve_theme_mode', theme);

    // Apply color theme
    const preset = themePresets[colorTheme];
    root.style.setProperty('--primary', preset.primary);
    root.style.setProperty('--accent', preset.accent);
    root.style.setProperty('--ring', preset.primary);
    
    localStorage.setItem('autoserve_color_theme', colorTheme);

    // Add smooth transition for theme changes
    root.style.transition = 'background-color 0.5s ease, color 0.5s ease';
    
    const timeoutId = setTimeout(() => {
      root.style.transition = '';
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [theme, colorTheme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const setColorTheme = (newColorTheme: ColorTheme) => {
    setColorThemeState(newColorTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, colorTheme, toggleTheme, setColorTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
