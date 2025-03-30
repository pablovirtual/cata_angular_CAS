# Etapa de compilación
FROM node:18 as build

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package.json package-lock.json ./

# Instalar dependencias
RUN npm ci

# Copiar el resto del código fuente
COPY . .

# Compilar la aplicación
RUN npm run build

# Etapa de producción
FROM nginx:alpine

# Copiar el script de inicio
COPY start.sh /start.sh
RUN chmod +x /start.sh

# Copiar la aplicación compilada desde la etapa de build
COPY --from=build /app/dist/catalogo-peliculas/browser /usr/share/nginx/html

# Exponer puerto (esto es informativo, el puerto real lo determina Railway)
EXPOSE 8080

# Ejecutar el script de inicio
CMD ["/start.sh"]
