FROM nginx:alpine

# Crear un archivo index.html básico
COPY index.html /usr/share/nginx/html/index.html

# Exponer puerto (Railway requiere que escuche en el puerto asignado por la variable $PORT)
EXPOSE 80

# Comando para iniciar NGINX y configurarlo para escuchar en el puerto de Railway
CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
