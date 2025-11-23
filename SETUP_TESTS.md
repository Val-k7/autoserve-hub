# Configuration des Tests

## Étapes de configuration manuelle

### 1. Ajouter les scripts de test à package.json

Ajoutez les scripts suivants dans la section `"scripts"` de votre `package.json` :

```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest run --coverage"
  }
}
```

### 2. Configuration terminée ✅

Les dépendances de test sont déjà installées :
- ✅ vitest
- ✅ @testing-library/react
- ✅ @testing-library/jest-dom
- ✅ @vitest/ui

Les fichiers de configuration sont créés :
- ✅ `vitest.config.ts`
- ✅ `src/test/setup.ts`

Les tests sont prêts :
- ✅ `src/lib/__tests__/validation.test.ts`
- ✅ `src/hooks/__tests__/useRepositories.test.tsx`

### 3. Lancer les tests

Après avoir ajouté les scripts, vous pouvez lancer :

```bash
# Exécuter tous les tests
npm run test

# Mode watch (relance automatique)
npm run test:watch

# Interface UI
npm run test:ui

# Rapport de couverture
npm run test:coverage
```

## Système de Cache Implémenté

Le système de cache pour les manifests GitHub a été implémenté avec :

### Table Supabase
- ✅ Table `manifest_cache` créée
- ✅ Expiration automatique après 24h
- ✅ Index optimisés pour les requêtes
- ✅ Fonction de nettoyage automatique

### Edge Function
- ✅ Vérification du cache avant fetch
- ✅ Stockage automatique des nouveaux manifests
- ✅ Invalidation après 24h
- ✅ Logs détaillés pour le debugging

### Fonctionnement
1. Lors d'une synchronisation, l'edge function vérifie d'abord le cache
2. Si le cache est valide (< 24h), utilise les données en cache
3. Sinon, fetch le manifest depuis GitHub et met à jour le cache
4. Les données cachées expirent automatiquement après 24h

## Sécurité

Le warning de sécurité Supabase concernant la protection contre les mots de passe divulgués est une configuration globale du système d'authentification. Pour l'activer :

1. Allez dans la configuration Auth de Supabase
2. Activez "Password strength and leaked password protection"
3. Cette fonctionnalité vérifie les mots de passe contre des bases de données de mots de passe divulgués

Cette configuration n'affecte pas le fonctionnement du système de cache ou des tests.
