FROM node:18-alpine as build

WORKDIR /app

# Copia package.json y package-lock.json
COPY package*.json ./

# Instala dependencias usando npm install en lugar de npm ci
RUN npm install

# Copia el resto del código fuente
COPY . .

# Construye la aplicación
RUN npm run build

# Etapa de producción
FROM node:18-alpine as production

WORKDIR /app

# Instala serve globalmente
RUN npm install -g serve

# Copia los archivos de construcción desde la etapa anterior
COPY --from=build /app/dist/catalogo-peliculas ./dist

# Expone el puerto que utilizará la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["serve", "-s", "dist", "-p", "3000"]
