# AutoServe – Plateforme d'Applications Self-Hosted Préconfigurées

**AutoServe est un logiciel Linux avec une interface web simpliste** permettant d'installer et de configurer automatiquement des applications web auto-hébergées.

L'objectif est d'offrir une expérience d'installation en 1 clic, avec des apps déjà prêtes à l'emploi, sans besoin d'expertise serveur.

## 🖥️ Plateforme et Interface

- **Backend** : Logiciel Linux (compatible VPS, serveur dédié, NAS avec Docker, PC personnel)
- **Interface** : Panneau web simpliste accessible via navigateur (HTTPS)
- **Gestion** : Installation, démarrage, arrêt et suppression d'applications en quelques clics

## 📋 Architecture du projet

🧰 AutoServe peut être déployé sur un VPS, un serveur dédié, un NAS (avec Docker), un PC personnel ou un mini-serveur domestique.

## ✨ Caractéristiques principales

📦 Installation automatisée d'apps (torrent, cloud perso, serveur multimédia, synchronisation, etc.)

🔐 Configuration sécurisée par défaut (HTTPS, firewall, utilisateurs, permissions)

🎛 **Panneau Web simpliste** : installer, démarrer, arrêter ou supprimer une app via navigateur

📁 Structure de stockage standardisée (Applications, Données, Médiathèques)

🧩 Support des extensions et intégrations externes (webhooks, scripts, media scanners)

🔄 Mises à jour en un clic

☁️ Accès distant simplifié avec certificats HTTPS automatiques

## 💾 Architecture simplifiée

```
AutoServe
 ├── core/                    # Scripts & gestion centrale (Linux)
 ├── config/                  # Utilisateurs, domaines, certificats
 ├── apps/                    # Applications installables
 │   ├── media/               # Ex : Plex, Jellyfin, Navidrome…
 │   ├── download/            # Ex : qBittorrent, Transmission, SABnzbd…
 │   ├── automation/          # Ex : Sonarr, Radarr, Lidarr…
 │   ├── cloud/               # Ex : Nextcloud, Seafile, Syncthing…
 │   └── tools/               # Ex : Portainer, FileBrowser, Code-Server…
 ├── data/                    # Données persistantes des apps
 └── logs/                    # Journaux
```

## 📚 Bibliothèque d'applications installables

| Catégorie | Exemples |
|-----------|----------|
| 🎬 Serveurs multimédias | Jellyfin, Plex, Navidrome |
| 📥 Téléchargement & Seedbox | qBittorrent, Transmission, SABnzbd |
| 🔁 Automatisation | Sonarr, Radarr, Lidarr, Readarr, Bazarr |
| 🌩 Cloud privé | Nextcloud, Seafile, Syncthing |
| 🧰 Outils avancés | Portainer, Code-Server, FileBrowser |
| 🔐 Sécurité | Vaultwarden, Authelia (en option) |

Toutes les applications sont :
✔️ pré-configurées
✔️ installables via l'interface web
✔️ accessibles par lien sécurisé

## 🛠 Installation (Linux avec Docker)

```bash
curl -sSL https://autoserve.sh/install | bash
```

Une fois l'installation complétée :

🎛 **Accès au panneau web** : `https://votre-domaine-ou-ip:9443`

🔑 Créez votre compte admin

📦 Installez vos premières applications

## 📂 Structure des dossiers par défaut

| Type de données | Chemin par défaut |
|----------------|-------------------|
| Applications | `/opt/autoserve/apps/` |
| Données persistantes | `/opt/autoserve/data/` |
| Médiathèques | `/srv/media/` |
| Téléchargements | `/srv/downloads/` |

📝 Tous les chemins sont modifiables depuis le panneau de configuration.

## 🔌 Intégration d'applications automatisées (exemple)

Pour ajouter une application compatible :

```
apps/
 └── media/
     └── jellyfin/
         ├── docker-compose.yml
         ├── config.yml
         └── hooks/
             ├── post_install.sh
             └── update.sh
```

AutoServe détecte automatiquement l'app, génère la configuration et la rend installable dans l'interface.

## 🔐 Sécurité

AutoServe applique automatiquement :

- HTTPS + certificats auto-générés
- Configuration pare-feu
- Isolation des conteneurs
- Création automatique d'utilisateurs et permissions
- Politiques anti-abus (IO/charge excessive)

## 🎯 Objectifs du projet

- Rendre le self-hosting aussi simple qu'un App Store
- Permettre l'auto-hébergement sur tout type de matériel
- Fournir des configurations robustes et sûres par défaut
- Centraliser la gestion, les backups, les mises à jour

## 🤝 Contribution

Les contributions sont les bienvenues !
Pull requests, suggestions d'applications, ou reporting de bugs dans :

📌 issues/ ou via le canal community (Discord / Matrix).

## 📝 Licence

AutoServe est publié sous licence GPL v3.
Cela garantit que le code amélioré reste libre et accessible à tous.
