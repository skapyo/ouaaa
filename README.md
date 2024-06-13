# Start in local

For launching in local (Start the Server in local if you want to connect to your local database):

Duplicate .env.dist file, and rename the copy to .env.development

`npm install --legacy-peer-deps` -- to fetch dependancies

`npm run dev` -- launch server on localhost:3000

## Environnement

```
node >= 20
npm >= 10
```

# Build and deploy

Il y a une intégration continue de la branche `develop` sur [beta.tour.alternatiba.eu](https://recette.ouaaa-transition.fr/). 
Pour déployer sur la production https://ouaaa-transition.fr/ Fusionner la branche `develop` dans la branche `master` :

    git checkout develop
    git pull origin develop
    git checkout main
    git pull origin main
    git merge develop
    git push origin main

