#!/bin/sh
# Configurar nginx para usar el puerto asignado por Railway
echo "
server {
    listen $PORT;
    server_name _;
    
    location / {
        root /usr/share/nginx/html;
        index index.html;
        try_files \$uri \$uri/ /index.html;
    }
}
" > /etc/nginx/conf.d/default.conf

# Iniciar nginx
nginx -g 'daemon off;'
