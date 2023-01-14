# Utilisez une image de noeud officielle comme base
FROM node:17

# Définissez l'emplacement de travail du conteneur
WORKDIR /usr/src/app

# Copiez les fichiers de l'application dans le conteneur
COPY src/app.js .
COPY package.json .

# Installez les dépendances
RUN yarn


# Exposez le port sur lequel l'application écoute
EXPOSE 3000

# Définissez le point d'entrée de l'application
CMD ["node", "app.js"]