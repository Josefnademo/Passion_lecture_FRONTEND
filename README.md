# Passion_lecture_FRONTEND

### Explication du script PowerShell

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

#### Docker :

Les conteneurs exposent les ports nécessaires

- 6033 (MySQL)
- 8081 (Phpmyadmin)

Permettant au backend de se connecter à ces services via localhost.
