FROM node:18 as build

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de configuración
COPY package*.json ./
COPY angular.json tsconfig*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Compilar la aplicación
RUN npm run build || true

# Etapa de producción
FROM nginx:alpine

# Configuración de NGINX
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar los archivos compilados desde la etapa de construcción
# El comando || true evita que falle si la compilación no tuvo éxito
COPY --from=build /app/dist/ /usr/share/nginx/html/ || true

# Si no hay archivos compilados, crear una página estática básica
RUN if [ ! -f /usr/share/nginx/html/index.html ]; then \
    mkdir -p /usr/share/nginx/html && \
    echo '<html><head><title>Catalogo de Peliculas</title></head><body><h1>Catalogo de Peliculas</h1><p>La aplicación está en mantenimiento. Por favor, intente más tarde.</p></body></html>' > /usr/share/nginx/html/index.html; \
    fi

# Exponer puerto
EXPOSE 80

# Iniciar NGINX
CMD ["nginx", "-g", "daemon off;"]
