# Documentation Technique AutoServe

## 🚀 Démarrage Rapide

```bash
# Installation
npm install

# Développement
npm run dev

# Tests
npm run test
npm run test:watch
npm run test:ui
npm run test:coverage
```

## 📁 Structure du Projet

```
src/
├── components/          # Composants React
│   ├── features/       # Composants métier (RepositoryManager, SessionMonitor, etc.)
│   ├── layouts/        # Layouts de page (AppSidebar, Layout)
│   ├── guards/         # Protection de routes (ProtectedRoute, AdminRoute)
│   └── ui/             # Composants UI shadcn
├── contexts/           # Contexts React
│   ├── AuthContext.tsx # Authentification et sessions
│   ├── AppContext.tsx  # État global de l'application
│   └── ThemeContext.tsx # Thème dark/light
├── hooks/              # Custom hooks
│   ├── useRepositories.ts  # Gestion des dépôts
│   └── __tests__/          # Tests unitaires des hooks
├── lib/                # Utilitaires
│   ├── validation.ts   # Fonctions de validation
│   └── __tests__/      # Tests unitaires
├── pages/              # Pages de l'application
└── test/               # Configuration des tests

supabase/
├── functions/          # Edge Functions
│   └── sync-repository/ # Synchronisation des catalogues GitHub
└── migrations/         # Migrations de base de données
```

## 🔐 Système d'Authentification

### Contexte Auth

Le `AuthContext` gère :
- Authentification utilisateur (login/signup/logout)
- Sessions avec tokens JWT
- Monitoring d'expiration de session (warning 5min avant)
- Rafraîchissement automatique des tokens
- Vérification du rôle admin (server-side)

```typescript
const { isAuthenticated, isAdmin, user, session, refreshSession } = useAuth();
```

### Protection de Routes

```typescript
// Route protégée (authentifié)
<ProtectedRoute><Page /></ProtectedRoute>

// Route admin uniquement
<AdminRoute><AdminPage /></AdminRoute>
```

## 🔄 Système de Cache

### Table manifest_cache

```sql
CREATE TABLE manifest_cache (
  id UUID PRIMARY KEY,
  repository_id UUID REFERENCES repositories(id),
  manifest_data JSONB,
  cached_at TIMESTAMP,
  expires_at TIMESTAMP,  -- +24h après cached_at
  UNIQUE(repository_id)
);
```

### Fonctionnement

1. **Première sync** : Fetch GitHub → Cache → Traitement
2. **Sync suivante** : 
   - Si cache < 24h → Utilise cache
   - Si cache > 24h → Fetch GitHub → Update cache
3. **Nettoyage** : Fonction `clean_expired_manifest_cache()` pour supprimer les caches expirés

### Edge Function

```typescript
// 1. Vérification du cache
const { data: cachedData } = await supabase
  .from('manifest_cache')
  .select('*')
  .eq('repository_id', repoId)
  .maybeSingle();

// 2. Si cache valide, utiliser
if (cachedData && new Date(cachedData.expires_at) > new Date()) {
  // Utiliser cachedData.manifest_data
}

// 3. Sinon, fetch et mettre en cache
const response = await fetch(url);
await supabase.from('manifest_cache').upsert({
  repository_id: repoId,
  manifest_data: apps,
  expires_at: new Date(Date.now() + 24*60*60*1000)
});
```

## ✅ Validation des Entrées

### Fonctions de Validation

```typescript
// Validation URL GitHub raw
validateGitHubRawUrl(url: string): boolean

// Validation nom de dépôt (3-100 chars)
validateRepositoryName(name: string): boolean

// Sanitization contre XSS
sanitizeString(str: string): string

// Validation structure manifest
validateManifest(data: any): boolean
```

### Utilisation

```typescript
const errors = {};
if (!validateGitHubRawUrl(url)) {
  errors.url = 'URL invalide';
}
if (!validateRepositoryName(name)) {
  errors.name = 'Nom invalide (3-100 caractères)';
}
```

## 🧪 Tests

### Configuration

- **Framework** : Vitest
- **Testing Library** : @testing-library/react
- **Coverage** : v8

### Types de Tests

#### 1. Tests de Validation

```typescript
describe('validateGitHubRawUrl', () => {
  it('should accept valid URLs', () => {
    expect(validateGitHubRawUrl('https://raw.githubusercontent.com/...')).toBe(true);
  });
  
  it('should reject invalid URLs', () => {
    expect(validateGitHubRawUrl('https://github.com/...')).toBe(false);
  });
});
```

#### 2. Tests de Hooks

```typescript
describe('useRepositories', () => {
  it('should fetch repositories', async () => {
    const { result } = renderHook(() => useRepositories());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.repositories).toBeDefined();
  });
});
```

### Mocking Supabase

```typescript
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        order: vi.fn(() => Promise.resolve({ data: [], error: null }))
      }))
    })),
    auth: {
      getUser: vi.fn(() => Promise.resolve({ 
        data: { user: { id: 'test-id' } }, 
        error: null 
      }))
    }
  }
}));
```

## 📊 Base de Données

### Tables Principales

#### repositories
```sql
- id: UUID
- name: TEXT
- url: TEXT (GitHub raw URL)
- type: TEXT ('github')
- is_official: BOOLEAN
- is_enabled: BOOLEAN
- sync_status: TEXT ('pending'|'in_progress'|'completed'|'error')
- sync_error: TEXT
- last_synced_at: TIMESTAMP
```

#### catalog_apps
```sql
- id: UUID
- repository_id: UUID FK
- app_id: TEXT (unique par repo)
- name: TEXT
- description: TEXT
- icon: TEXT
- category: TEXT
- version: TEXT
- docker_image: TEXT
- environment_variables: JSONB
- ports: JSONB
- volumes: JSONB
- manifest_data: JSONB
```

#### manifest_cache
```sql
- id: UUID
- repository_id: UUID FK (UNIQUE)
- manifest_data: JSONB
- cached_at: TIMESTAMP
- expires_at: TIMESTAMP
```

### RLS Policies

```sql
-- Lecture publique des repos activés
CREATE POLICY "Anyone can view enabled repositories"
ON repositories FOR SELECT
USING (is_enabled = true);

-- Lecture publique des apps depuis repos activés
CREATE POLICY "Anyone can view apps from enabled repositories"
ON catalog_apps FOR SELECT
USING (EXISTS (
  SELECT 1 FROM repositories 
  WHERE id = catalog_apps.repository_id 
  AND is_enabled = true
));

-- Lecture publique du cache
CREATE POLICY "Anyone can view manifest cache"
ON manifest_cache FOR SELECT
USING (true);
```

## 🔧 Edge Functions

### sync-repository

**Endpoint** : `supabase.functions.invoke('sync-repository', { body: { repositoryId } })`

**Processus** :

1. Vérifier le cache (< 24h)
2. Si cache valide → Utiliser
3. Sinon :
   - Valider l'URL du repository
   - Fetch le manifest depuis GitHub
   - Parser et valider le JSON
   - Extraire les apps
   - Upsert dans catalog_apps
   - Mettre en cache pour 24h
4. Retourner le résultat

**Gestion d'Erreurs** :

```typescript
try {
  const response = await fetch(url, {
    headers: {
      'Accept': 'application/json, application/vnd.github+json',
      'User-Agent': 'AutoServe-Sync/1.0'
    },
    signal: controller.signal // Timeout 10s
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  const data = await response.json();
  // Traitement...
  
} catch (error) {
  // Log détaillé
  console.error('Sync error:', error);
  
  // Update du statut en erreur
  await supabase
    .from('repositories')
    .update({ sync_status: 'error', sync_error: error.message })
    .eq('id', repositoryId);
    
  throw error;
}
```

## 🎨 Design System

Le projet utilise :
- **shadcn/ui** pour les composants UI
- **Tailwind CSS** avec tokens sémantiques
- **Lucide React** pour les icônes

### Tokens Sémantiques

```css
:root {
  --background: ...;
  --foreground: ...;
  --primary: ...;
  --primary-foreground: ...;
  --secondary: ...;
  --accent: ...;
  --muted: ...;
  --border: ...;
}
```

### Utilisation

```tsx
// ✅ Bon - Utilise les tokens
<div className="bg-background text-foreground border-border">

// ❌ Éviter - Couleurs hardcodées
<div className="bg-white text-black border-gray-300">
```

## 🔒 Sécurité

### Validations

1. **Client-side** : Validation immédiate pour UX
2. **Server-side** : Validation dans l'edge function
3. **Database** : RLS policies pour contrôle d'accès

### Protection XSS

```typescript
// Sanitization automatique
const clean = sanitizeString(userInput);
// Enlève < > et trim
```

### URLs Sécurisées

```typescript
// Seules les URLs GitHub raw sont acceptées
if (!url.startsWith('https://raw.githubusercontent.com/')) {
  throw new Error('URL invalide');
}
```

## 📈 Performance

### Optimisations

- **Code Splitting** : Lazy loading des pages
- **Cache** : 24h pour les manifests
- **Indexes** : Sur repository_id et expires_at
- **Memoization** : useCallback dans les contexts

### Monitoring

- Logs d'edge functions accessibles
- Statut de sync visible dans l'UI
- Messages d'erreur détaillés

## 🐛 Debugging

### Logs Edge Function

```bash
# Via l'interface
Settings → Repositories → [Repo] → Voir les logs

# Ou via les outils Supabase
```

### Tests en Échec

```bash
# Verbose mode
npm run test -- --reporter=verbose

# Specific file
npm run test validation.test.ts

# Debug mode
npm run test -- --inspect-brk
```

### Erreurs Communes

| Erreur | Cause | Solution |
|--------|-------|----------|
| "URL invalide" | URL n'est pas GitHub raw | Utiliser raw.githubusercontent.com |
| "404 Not Found" | Fichier inexistant | Vérifier que manifest.json existe |
| "Invalid JSON" | JSON malformé | Valider avec jsonlint.com |
| "Missing id/name" | Champs requis absents | Ajouter id et name à chaque app |

## 🔗 Liens Utiles

- [Guide des Manifests](./MANIFEST_GUIDE.md)
- [Configuration Tests](./SETUP_TESTS.md)
- [README Tests](./README.test.md)
- [Supabase Docs](https://supabase.com/docs)
- [Vitest Docs](https://vitest.dev/)
