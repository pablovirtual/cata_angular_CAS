# Etapa de compilación
FROM node:18 as build

# Establecer directorio de trabajo
WORKDIR /app

# Primero copiar solo los archivos package.json y package-lock.json
COPY package.json package-lock.json ./

# Instalar dependencias sin ejecutar scripts
RUN npm install --ignore-scripts

# Ahora copiar el resto del código fuente
COPY . .

# Crear un identificador de compilación único para forzar la reconstrucción e invalidar el caché
RUN echo "BUILD_ID=$(date +%s)" > .build-id

# Compilar la aplicación con la configuración de producción
RUN npm run build -- --configuration production

# Etapa de producción
FROM nginx:alpine

# Copiar el script de inicio
COPY start.sh /start.sh
RUN chmod +x /start.sh

# Copiar la aplicación compilada desde la etapa de build
COPY --from=build /app/dist/catalogo-peliculas/browser /usr/share/nginx/html

# Añadir archivo de configuración para controlar el caché
RUN echo 'add_header Cache-Control "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0";' > /etc/nginx/conf.d/nocache.conf

# Exponer puerto (esto es informativo, el puerto real lo determina Railway)
EXPOSE 8080

# Ejecutar el script de inicio
CMD ["/start.sh"]
