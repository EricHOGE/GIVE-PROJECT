# Étape 1 : Construire l'app
FROM node:18 as build
WORKDIR /app
COPY package*.json ./
RUN npm update && npm install
RUN npm audit fix
COPY . ./
RUN npm run build

# Étape 2 : Exécuter l'app
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


# docker build -t give_frontend:dev . 
# docker run -it --rm -p 3000:80 give_frontend:dev