# Etapa de compilación
FROM node:18 as build

# Directorio de trabajo
WORKDIR /app

# Copiar archivos de configuración
COPY package*.json ./

# Instalar dependencias con opciones para evitar errores
RUN npm config set legacy-peer-deps true \
    && npm config set fetch-retry-maxtimeout 600000 \
    && npm install --no-audit --no-fund

# Copiar código fuente
COPY . .

# Construir la aplicación
RUN npm run build -- --configuration=production

# Etapa de producción
FROM nginx:alpine

# Copiar el script de inicio
COPY start.sh /start.sh
RUN chmod +x /start.sh

# Copiar la aplicación compilada desde la etapa de compilación
COPY --from=build /app/dist/catalogo-peliculas /usr/share/nginx/html

# Exponer puerto (esto es informativo, el puerto real lo determina Railway)
EXPOSE 8080

# Ejecutar el script de inicio
CMD ["/start.sh"]
