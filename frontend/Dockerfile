# Utilisez une image de node officielle comme base
FROM node:17

# Définissez l'emplacement de travail du conteneur
WORKDIR /usr/src/app

# Copiez les fichiers de l'application dans le conteneur
COPY . .

# Installez les dépendances
RUN yarn


# Construire l'application
RUN npm run build

# Exposez le port sur lequel l'application écoute
EXPOSE 8080

# Définissez le point d'entrée de l'application
CMD ["npm", "start"]
