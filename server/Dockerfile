# Utilise l'image officielle Node.js 18 comme image de base
FROM node:18

# Définit le répertoire de travail dans le conteneur
WORKDIR /app

# Copie les fichiers package.json et package-lock.json dans le répertoire de travail du conteneur
COPY package*.json ./

# Installe les dépendances de l'application
RUN npm install

# Installe le module dotenv
RUN npm install dotenv

# Copie le code source de l'application dans le répertoire de travail du conteneur
COPY . .

# Votre application se lie au port 8001, donc vous utiliserez l'instruction EXPOSE pour l'avoir mappé par le démon Docker
EXPOSE 8001

# Définit la commande pour exécuter votre application en utilisant CMD qui définit votre environnement d'exécution
CMD [ "npm", "start" ]

# docker build -t give_backend:dev .
# docker run -it --rm -p 8000:8000 give_backend:dev
