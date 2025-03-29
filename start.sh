#!/bin/sh

# Railway proporciona el puerto en la variable $PORT
# Este es el puerto en el que DEBE escuchar la aplicación
if [ -z "$PORT" ]; then
  echo "Error: La variable PORT no está definida. Railway requiere que la aplicación escuche en el puerto especificado por esta variable."
  exit 1
fi

echo "Configurando NGINX para escuchar en el puerto: $PORT"

# Crear una configuración de nginx específica para Railway
cat > /etc/nginx/conf.d/default.conf << EOF
server {
    # Es CRUCIAL escuchar en el puerto proporcionado por Railway
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

echo "Configuración de NGINX completada para Railway. NGINX escuchará en el puerto $PORT."
echo "Iniciando servidor NGINX..."

# Iniciar NGINX en primer plano
exec nginx -g 'daemon off;'
