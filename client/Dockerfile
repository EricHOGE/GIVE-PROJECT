# Étape 1 : Construire l'app

# Utilisez une image Node.js pour construire l'application
FROM node:18 as build
# Définissez le répertoire de travail dans le conteneur
WORKDIR /app
# Copiez le reste des fichiers de l'application
COPY . .
# Copiez les fichiers package.json et package-lock.json
COPY package*.json ./
# Mettez à jour npm et installez les dépendances
RUN npm update && npm install
# Corrigez les vulnérabilités potentielles dans les dépendances
RUN npm audit fix
# Construisez l'application
RUN npm run build

# Étape 2 : Exécuter l'app

# Utilisez une image Nginx pour servir l'application
FROM nginx:stable-alpine
# Copiez les fichiers construits dans le répertoire de Nginx
COPY --from=build /app/dist /usr/share/nginx/html
# Exposez le port 80 du conteneur
EXPOSE 80
# Démarrez Nginx
CMD ["nginx", "-g", "daemon off;"]



# docker build -t give_frontend:dev . 
# docker run -it --rm -p 3000:80 give_frontend:dev