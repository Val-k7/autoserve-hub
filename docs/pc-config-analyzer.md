# 🖥️ PC Config Analyzer & Upgrade Advisor

## Présentation

**PC Config Analyzer** est un outil qui analyse la configuration matérielle d’un PC (CPU, GPU, RAM, stockage, carte mère, etc.), calcule une note globale sur 10 et propose des recommandations d’upgrade adaptées aux usages (gaming, virtualisation, multitâche…). L’objectif est de rendre la compréhension des limites matérielles et le choix des composants d’amélioration clairs et accessibles.

## ✨ Fonctionnalités (version initiale)

### 🔍 Analyse des composants PC
- Détection des composants installés : CPU, GPU, RAM, stockage, carte mère, etc.
- Récupération des spécifications via :
  - APIs de bases de données hardware (TechPowerUp, PCPartPicker, etc.)
  - Outils système (WMI, `lspci`, etc. selon l’OS)
- Normalisation des données dans un modèle interne

### 📊 Système de notation sur 10
- Note **globale** (0 à 10) pour la configuration complète
- Notes **par usage** (gaming, virtualisation, création de contenu, etc.)
- Exemples :
  - `5/10` → jeux en **medium**, virtualisation lourde déconseillée
  - `7/10` → jeux récents en **high**, multitâche fluide
  - `9/10` → jeux en **ultra**, virtualisation avancée, création 3D

### 🚀 Propositions d’upgrade
- Suggestion de composants à remplacer (GPU, CPU, RAM, stockage…)
- Estimation de l’impact :
  - Nouveau score global estimé
  - Amélioration par usage (gaming, virtualisation, etc.)
- Exemples :
  - Upgrade GPU → `5/10` ➜ `7/10` (jeux récents en **high**)
  - Upgrade CPU + RAM → `7/10` ➜ `9/10` (jeux en **ultra** + virtualisation de plusieurs VM)

### 📡 Données à jour
- Connexion à une ou plusieurs **API de composants** pour récupérer :
  - Spécifications
  - Benchmarks (si disponibles)
  - Prix (optionnel)
- Fallback possible sur une **base locale** mise à jour régulièrement

## 🧠 Vision
- **Lecture simple** pour les utilisateurs non techniques : score et explications claires
- **Vue détaillée** pour les power-users : specs, modèles exacts, liens vers comparatifs
- Recommandations cohérentes :
  - Éviter les upgrades déséquilibrés (ex : gros GPU sur CPU trop faible)
  - Proposer des scénarios « budget », « perf max », etc. (versions futures)

## 🏗️ Architecture proposée

> Indicative et susceptible d’évoluer.

- **Backend** : Python (FastAPI) ou Node.js (Express/Nest)
  - Module d’analyse de la configuration
  - Connexion aux APIs hardware
  - Calcul des scores et recommandations
- **Frontend** : React / Vue / Svelte
  - Dashboard affichant :
    - Score global
    - Détails par composant
    - Suggestions d’upgrade
- **Modules principaux** :
  - `core/scoring` : algorithme de calcul des notes
  - `core/recommendations` : génération des upgrades
  - `integrations/hardware_api` : connecteurs vers APIs externes
  - `system/scanner` : analyse locale de la machine

## 🚀 Installation (placeholder)

> À compléter une fois la stack technique fixée.

```bash
git clone https://github.com/TON_COMPTE/pc-config-analyzer.git
cd pc-config-analyzer

# Exemple Python
# python -m venv venv
# source venv/bin/activate
# pip install -r requirements.txt

# Exemple Node.js
# npm install
```

## 🧪 Utilisation (placeholder)

À compléter lorsque le premier prototype sera disponible.

Exemples possibles :

- CLI : `pc-config-analyzer scan --output report.json`
- Interface web : lancer le backend puis ouvrir le dashboard dans le navigateur

## 🛣️ Roadmap
- Définir la stack technique finale (langage, framework)
- Implémenter le module de scan de configuration
- Intégrer une première API hardware
- Implémenter l’algorithme de notation globale
- Ajouter le moteur de recommandations d’upgrade
- Créer un dashboard web minimal
- Ajouter un mode « profil utilisateur » (gaming, boulot, mixte, etc.)
- Exporter des rapports (PDF / JSON)

## 🤝 Contributions
Les contributions seront les bienvenues une fois la base du projet en place. Une section `CONTRIBUTING.md` précisera les règles de contribution et le style de code.

## 📄 Licence
À définir (MIT recommandée pour un projet open-source).
