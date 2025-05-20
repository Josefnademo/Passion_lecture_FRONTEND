# Passion_lecture_FRONTEND

## 🛠️ Technologies utilisées

Ce projet utilise plusieurs technologies modernes côté frontend et backend :

🌐 Frontend

- Vue.js 3 – Framework JavaScript pour construire une interface utilisateur réactive
- Vue Router – Pour la navigation entre les pages
- Pinia (optionnel) – Pour la gestion d'état globale si nécessaire
- SCSS / CSS3 – Pour le style et la mise en page
- Vite – Serveur de développement rapide et bundler

⚙ Backend

- Node.js – Environnement d'exécution JavaScript côté serveur
- Express.js – Framework minimaliste pour créer une API REST
- Multer – Pour la gestion des fichiers (upload d’images)
- Sequelize – ORM pour interagir avec la base de données SQL
- MySQL – Base de données relationnelle

🔐 Sécurité / Authentification

- JWT (JSON Web Token) – Pour sécuriser les routes et vérifier l’identité des utilisateurs grâce à un token signé

🗂️ Autres outils

- Git & GitHub – Pour le versionnage et le travail collaboratif
- Insomnia – Pour tester les routes de l'API
- Prettier – Pour assurer une qualité de code cohérent

## Installation et déploiement

**Étapes pour lancer le projet :**

1. Cloner le dépôt Git :

```bash
git clone https://github.com/Josefnademo/Passion_lecture_FRONTEND/
```

2. Se rendre dans le répertoire du projet :

```bash
 cd Passion_lecture_FRONTEND\backend\code
```

3. Lancer les conteneurs Docker :

```bash
 docker-compose up -d
```

4. Se rendre dans le répertoire de base du projet :

```bash
 cd ../..
```

5. Exécuter le script PowerShell : Le script **Script_de_demarrage_automatique.ps1** automatise toute l'installation et déploiement

## Explication du script PowerShell

Ce script automatise l'installation et le démarrage du backend et frontend.

1. Backend :

- Installe les dépendances (npm install).

- Démarre le serveur avec npm start.

2. Frontend :

- Installe les dépendances (npm install).

- Démarre le serveur avec npm run dev.

3. Affichage :

- Affiche les URLs des serveurs backend (http://localhost:9999) et frontend (http://localhost:5173).

4. Gestion :

- Attend que l'utilisateur arrête les serveurs (Ctrl+C).

- Nettoie les jobs de backend et frontend à l'arrêt.

### Docker :

Les conteneurs exposent les ports nécessaires

- 6033 (MySQL)
- 8081 (Phpmyadmin)

Permettant au backend de se connecter à ces services via localhost.
