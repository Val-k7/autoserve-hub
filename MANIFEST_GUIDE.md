# Guide des Manifests GitHub

## Structure du Manifest

Votre fichier JSON manifest doit être hébergé sur GitHub et accessible via une URL raw (raw.githubusercontent.com).

### Format Attendu

Le manifest peut être structuré de trois façons :

#### 1. Objet avec tableau d'apps (Recommandé)
```json
{
  "version": "1.0.0",
  "repository": "Mon Catalogue",
  "description": "Description du catalogue",
  "apps": [
    {
      "id": "app-unique-id",
      "name": "Nom de l'App",
      "description": "Description de l'application",
      "icon": "https://url-de-l-icone.png",
      "category": "tools",
      "version": "1.0.0",
      "author": "Votre Nom",
      "website_url": "https://example.com",
      "documentation_url": "https://docs.example.com",
      "repository_url": "https://github.com/user/repo",
      "docker_image": "image:tag",
      "docker_compose": "version: '3'...",
      "environment_variables": [...],
      "ports": [...],
      "volumes": [...],
      "dependencies": [...]
    }
  ]
}
```

#### 2. Tableau direct d'apps
```json
[
  {
    "id": "app1",
    "name": "App One",
    ...
  },
  {
    "id": "app2",
    "name": "App Two",
    ...
  }
]
```

#### 3. App unique
```json
{
  "id": "single-app",
  "name": "Single App",
  ...
}
```

## Champs Requis

Chaque application DOIT avoir au minimum :
- `id` (string) : Identifiant unique de l'application
- `name` (string) : Nom de l'application

## Champs Optionnels

- `description` (string) : Description de l'application
- `icon` (string) : URL de l'icône
- `category` (string) : Catégorie (tools, productivity, cms, etc.)
- `version` (string) : Version de l'application
- `author` (string) : Auteur/créateur
- `website_url` (string) : Site web officiel
- `documentation_url` (string) : Documentation
- `repository_url` (string) : Repository source
- `docker_image` (string) : Image Docker
- `docker_compose` (string) : Configuration Docker Compose
- `environment_variables` (array) : Variables d'environnement
- `ports` (array) : Ports exposés
- `volumes` (array) : Volumes Docker
- `dependencies` (array) : Dépendances

### Structure des Variables d'Environnement

```json
{
  "environment_variables": [
    {
      "name": "VAR_NAME",
      "description": "Description de la variable",
      "required": true,
      "default": "valeur_par_defaut"
    }
  ]
}
```

### Structure des Ports

```json
{
  "ports": [
    {
      "container": 80,
      "host": 8080,
      "protocol": "tcp"
    }
  ]
}
```

### Structure des Volumes

```json
{
  "volumes": [
    {
      "container": "/data",
      "host": "/opt/app/data"
    }
  ]
}
```

## Héberger votre Manifest sur GitHub

1. Créez un repository GitHub
2. Ajoutez votre fichier `manifest.json`
3. Commitez et poussez les changements
4. Récupérez l'URL raw :
   - Ouvrez le fichier sur GitHub
   - Cliquez sur "Raw"
   - Copiez l'URL (format: `https://raw.githubusercontent.com/user/repo/branch/manifest.json`)

## Validation

Avant d'ajouter votre repository, assurez-vous :

✅ L'URL commence par `https://raw.githubusercontent.com/`
✅ Le fichier est un JSON valide
✅ Chaque app a au minimum `id` et `name`
✅ Le fichier est accessible publiquement
✅ Les URLs des icônes sont valides et accessibles

## Exemple Complet

Voir le fichier `public/example-manifest-valid.json` pour un exemple complet et fonctionnel.

## Système de Cache

- Les manifests sont automatiquement mis en cache pendant 24h
- Les synchronisations ultérieures utilisent le cache si disponible
- Le cache est invalidé automatiquement après 24h
- Forcer une nouvelle synchronisation actualise le cache

## Debugging

Si votre synchronisation échoue :

1. Vérifiez que l'URL raw est correcte
2. Validez votre JSON avec un validateur en ligne
3. Vérifiez les logs de synchronisation dans l'interface
4. Assurez-vous que le fichier est accessible publiquement
5. Vérifiez que tous les champs requis sont présents

## Erreurs Communes

| Erreur | Solution |
|--------|----------|
| "URL invalide" | Utilisez une URL GitHub raw |
| "Failed to parse JSON" | Vérifiez la syntaxe JSON |
| "404 Not Found" | Vérifiez que le fichier existe et est public |
| "Missing id or name" | Ajoutez les champs requis à chaque app |
| "Type de contenu invalide" | Assurez-vous d'utiliser l'URL raw, pas l'URL normale GitHub |
