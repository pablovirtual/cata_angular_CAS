#!/bin/sh
# Establecer el puerto por defecto si no está definido
PORT=${PORT:-80}
echo "Configurando NGINX para escuchar en el puerto: $PORT"

# Crear una configuración de nginx que escuche en el puerto correcto
cat > /etc/nginx/conf.d/default.conf << EOF
server {
    listen $PORT default_server;
    server_name _;
    
    root /usr/share/nginx/html;
    index index.html;
    
    # Configuración para Angular SPA
    location / {
        try_files \$uri \$uri/ /index.html;
    }
    
    # Configuración de caché para archivos estáticos
    location ~* \.(jpg|jpeg|png|gif|ico|css|js)\$ {
        expires 1y;
        add_header Cache-Control "public, max-age=31536000";
    }
    
    # Configuración de seguridad
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Content-Type-Options "nosniff";
}
EOF

echo "Configuración de NGINX completada. Iniciando servidor..."

# Iniciar nginx en primer plano
exec nginx -g 'daemon off;'
