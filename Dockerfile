FROM nginx:alpine

# Copiar configuración personalizada
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Crear carpeta de la aplicación
WORKDIR /usr/share/nginx/html

# Copiar archivos estáticos
COPY ./dist/catalogo-peliculas /usr/share/nginx/html

# Exponer puerto 80
EXPOSE 80

# Comando de inicio
CMD ["nginx", "-g", "daemon off;"]
