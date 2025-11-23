# Structure du Projet AutoServe

Ce document décrit l'organisation du code source du projet.

## 📁 Organisation des dossiers

```
src/
├── components/
│   ├── ui/              # Composants UI de base (shadcn/ui)
│   ├── features/        # Composants métier de l'application
│   ├── layouts/         # Composants de mise en page
│   ├── guards/          # Composants de protection de routes
│   └── docs/            # Composants de documentation
├── pages/              # Pages de l'application
├── contexts/           # Contextes React (état global)
├── hooks/              # Hooks personnalisés
├── lib/                # Utilitaires et helpers
├── types/              # Types et interfaces TypeScript
├── data/               # Données statiques et constantes
├── integrations/       # Intégrations externes (Supabase, etc.)
├── App.tsx             # Composant racine
├── main.tsx            # Point d'entrée
└── index.css           # Styles globaux
```

## 📦 Description des dossiers

### `components/`

#### `ui/`
Composants UI réutilisables basés sur shadcn/ui. Ces composants sont des primitives de base.

**Exemples:** Button, Card, Dialog, Input, etc.

#### `features/`
Composants métier spécifiques à l'application AutoServe.

**Contenus:**
- `AppCard.tsx` - Carte d'affichage d'une application
- `CatalogAppCard.tsx` - Carte pour le catalogue
- `StatsCard.tsx` - Carte de statistiques
- `StatusBadge.tsx` - Badge de statut
- `SystemMetricsChart.tsx` - Graphique des métriques système
- `ActivityTimeline.tsx` - Timeline d'activité
- `QuickActions.tsx` - Actions rapides
- `ThemeSwitcher.tsx` - Sélecteur de thème
- `AccessibilitySettings.tsx` - Paramètres d'accessibilité
- `InstallDialog.tsx` - Dialog d'installation
- `OptimizedAppList.tsx` - Liste optimisée d'applications

#### `layouts/`
Composants de structure et navigation.

**Contenus:**
- `Layout.tsx` - Layout principal avec sidebar
- `AppSidebar.tsx` - Barre latérale de navigation
- `NavLink.tsx` - Composant de lien de navigation

#### `guards/`
Composants de protection de routes.

**Contenus:**
- `ProtectedRoute.tsx` - Route nécessitant authentification
- `AdminRoute.tsx` - Route réservée aux administrateurs

#### `docs/`
Composants pour la documentation.

**Contenus:**
- `CodeBlock.tsx` - Bloc de code avec coloration syntaxique
- `ComponentShowcase.tsx` - Showcase de composants UI
- `DesignTokens.tsx` - Affichage des tokens de design

### `pages/`
Pages de l'application accessibles via le routeur.

**Contenus:**
- `Home.tsx` - Page d'accueil
- `Dashboard.tsx` - Tableau de bord
- `AppCatalog.tsx` - Catalogue d'applications
- `Logs.tsx` - Journaux système
- `Profile.tsx` - Profil utilisateur
- `Settings.tsx` - Paramètres (admin)
- `Users.tsx` - Gestion des utilisateurs (admin)
- `Login.tsx` - Page de connexion
- `Documentation.tsx` - Documentation interne
- `NotFound.tsx` - Page 404

### `contexts/`
Contextes React pour la gestion d'état global.

**Contenus:**
- `AppContext.tsx` - État des applications et logs
- `AuthContext.tsx` - Authentification et utilisateur
- `ThemeContext.tsx` - Thème et apparence

### `hooks/`
Hooks React personnalisés réutilisables.

**Contenus:**
- `use-toast.ts` - Hook pour les notifications toast
- `use-mobile.tsx` - Hook de détection mobile
- `useDebounce.ts` - Hook de debounce pour optimiser les performances

### `lib/`
Fonctions utilitaires et helpers.

**Contenus:**
- `utils.ts` - Utilitaires divers (cn pour className, etc.)

### `types/`
Définitions de types TypeScript.

**Contenus:**
- `app.ts` - Types liés aux applications

### `data/`
Données statiques de l'application.

**Contenus:**
- `apps.ts` - Liste des applications disponibles

### `integrations/`
Code d'intégration avec services externes (généré automatiquement).

**Contenus:**
- `supabase/` - Client et types Supabase (Cloud)

## 🎨 Système de Design

Le projet utilise un système de design basé sur des tokens CSS définis dans `index.css` et configurés dans `tailwind.config.ts`.

### Principes
- **Tokens sémantiques** : Utiliser `--primary`, `--accent`, etc. plutôt que des couleurs directes
- **Mode clair/sombre** : Support automatique via les variables CSS
- **Thèmes multiples** : 5 thèmes de couleurs prédéfinis
- **Accessibilité** : Support du contraste élevé et de la réduction des mouvements

## 🔒 Authentification et Routes

### Routes Publiques
- `/login` - Connexion

### Routes Protégées
- `/` - Accueil (authentification requise)
- `/dashboard` - Dashboard (authentification requise)
- `/catalog` - Catalogue (authentification requise)
- `/logs` - Logs (authentification requise)
- `/profile` - Profil (authentification requise)
- `/documentation` - Documentation (authentification requise)

### Routes Admin
- `/settings` - Paramètres (admin uniquement)
- `/users` - Gestion utilisateurs (admin uniquement)

## 🚀 Performances

### Optimisations implémentées
- **Lazy loading** : Chargement différé des pages avec React.lazy()
- **Code splitting** : Division automatique du code par route
- **Debounce** : Sur les champs de recherche
- **Progressive loading** : Chargement progressif des listes longues
- **Virtual scrolling** : Via Intersection Observer

## 📝 Conventions de Code

### Imports
Utiliser les alias de chemin :
```typescript
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { App } from '@/types/app';
```

### Composants
- Utiliser des **fonctions** pour les composants
- Exporter avec `export const` ou `export function`
- Props typées avec TypeScript

### Styling
- Utiliser **Tailwind CSS** et les classes utilitaires
- Utiliser les **tokens de design** (--primary, --accent, etc.)
- Éviter les styles inline sauf animation delay
- Utiliser `cn()` pour combiner les classes

## 🛠️ Technologies

- **React 18** - Framework UI
- **TypeScript** - Typage statique
- **Vite** - Bundler et dev server
- **Tailwind CSS** - Framework CSS utility-first
- **shadcn/ui** - Composants UI
- **React Router** - Routing
- **TanStack Query** - Gestion état serveur
- **Recharts** - Graphiques
- **Lucide React** - Icônes
- **date-fns** - Manipulation de dates
