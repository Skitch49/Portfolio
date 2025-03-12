# Portfolio - Alexis Delaunay

Bienvenue sur le repository de mon portfolio ! 🚀

## 🎨 Technologies utilisées
Ce portfolio est construit avec les technologies suivantes :
- **Angular** - Framework front-end
- **SCSS** - Préprocesseur CSS
- **Three.js** - Bibliothèque JavaScript pour le rendu 3D
- **API REST** - Pour récupérer les données Spotify

## 🌍 Aperçu
Vous pouvez voir le portfolio en ligne ici : [alexis-delaunay.fr](https://alexis-delaunay.fr/)

## 🚀 Installation et exécution

### Prérequis
Assurez-vous d'avoir installé les outils suivants sur votre machine :
- [Node.js](https://nodejs.org/fr)
- [Angular CLI](https://v17.angular.io/cli)

### Étapes d'installation

1. Cloner le repository
```
git clone https://github.com/Skitch49/portfolio.git
cd portfolio
```

2. Installer les dépendances
`npm install`

3. Lancer l'application en mode développement
`ng serve`
L'application sera accessible sur http://localhost:4200/

## 🎵 Intégration de vos données Spotify
J'ai créé une API REST en Node.js et Express pour récupérer les données Spotify et les afficher dans la page Présentation > Music.

📌 Lien vers le repository de l'API REST : [API Spotify Portfolio](https://github.com/Skitch49/API-spotify-portfolio)

### 🔧 Générer un fichier d'environnement

Si vous n'avez pas encore de fichier `environment.ts`, vous pouvez le générer manuellement en exécutant :
`ng generate environment`

Puis, dans `src/environments/environment.ts`, ajoutez :

```
export const environment = { 
  clientId: 'VOTRE_CLIENT_ID',
  APIBackendUrl: 'VOTRE_URL_BACKEND',
};
```

## 📬 Contact

Si vous avez des questions ou souhaitez discuter du projet, n'hésitez pas à me contacter via mon site web : [alexis-delaunay.fr 🎯](https://alexis-delaunay.fr/)