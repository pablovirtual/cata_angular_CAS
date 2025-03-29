FROM node:18-alpine as builder

WORKDIR /app

# Copia solo los archivos de configuración primero
COPY package.json tsconfig*.json ./

# Instala TypeScript en la versión correcta primero
RUN npm install -g typescript@5.5.2

# Instala las dependencias con flags para evitar problemas
RUN npm install --no-package-lock --legacy-peer-deps

# Copia el resto del código fuente
COPY . .

# Corrige cualquier problema de permisos y realiza la build
RUN chmod -R 777 /app && \
    npm run build

# Configura una imagen muy ligera para servir la aplicación
FROM nginx:alpine

# Copia los archivos de la build
COPY --from=builder /app/dist/catalogo-peliculas /usr/share/nginx/html

# Copia una configuración personalizada de nginx
RUN echo 'server { \
  listen 80; \
  location / { \
    root /usr/share/nginx/html; \
    index index.html; \
    try_files $uri $uri/ /index.html; \
  } \
}' > /etc/nginx/conf.d/default.conf

# Expone el puerto 80
EXPOSE 80

# Inicia NGINX
CMD ["nginx", "-g", "daemon off;"]
